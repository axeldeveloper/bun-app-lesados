import { z } from 'zod';

export const signatureSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('E-mail inválido.'),
  phone: z.string().optional(),
  cpf: z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 11, 'O CPF deve conter exatamente 11 dígitos.'),
  city: z.string().min(2, 'Informe a cidade.'),
  state: z.string().length(2, 'Use a sigla do estado com 2 letras (ex: SC, SP).'),
  lossAmount: z.string().optional(),
  report: z.string().optional(),
});

export type SignatureFormData = z.infer<typeof signatureSchema>;
