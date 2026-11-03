'use server'

import { headers } from 'next/headers';
import { ratelimit } from '@/lib/ratelimit';
import { db } from '@/lib/db';
import { signatures } from '@/db/schema';
import { encryptCpf, hashCpf } from '@/lib/crypto';
import { signatureSchema } from '@/lib/validations/signature';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createSignature(prevState: any, formData: FormData) {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "127.0.0.1";

  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
    return {
      success: false,
      message: `Muitas tentativas detectadas. Tente novamente em ${retryAfterSeconds} segundos.`,
    };
  }

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    cpf: formData.get('cpf'),
    city: formData.get('city'),
    state: formData.get('state'),
    lossAmount: formData.get('loss_amount'),
    report: formData.get('report'),
  };

  const validationResult = signatureSchema.safeParse(rawData);
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const data = validationResult.data;
  const cpfHash = hashCpf(data.cpf);

  const existing = await db.select().from(signatures).where(eq(signatures.cpfHash, cpfHash));
  if (existing.length > 0) {
    return { success: false, message: 'Este CPF já está cadastrado no sistema.' };
  }

  const encryptedCpf = encryptCpf(data.cpf);

  try {
    const signatureValues = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      cpf: encryptedCpf,
      cpfHash,
      city: data.city,
      state: data.state.toUpperCase(),
      lossAmount: data.lossAmount ? data.lossAmount : null,
      report: data.report || null,
      consentAt: new Date(),
    } satisfies typeof signatures.$inferInsert;

    await db.insert(signatures).values(signatureValues);

    revalidatePath('/');
    return { success: true, message: 'Assinatura cadastrada com sucesso!' };
  } catch (error) {
    return { success: false, message: 'Erro ao salvar no banco de dados.' };
  }
}
