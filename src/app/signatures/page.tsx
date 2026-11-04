import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { signatures } from "@/db/schema";
import { decryptCpf } from "@/lib/crypto";
import Link from "next/link";

export default async function SignaturesPage() {
  const session = await auth();
  const allSignatures = await db.select().from(signatures);

  return (
    <main className="min-h-screen bg-sand-50">
      <header className="border-b border-sand-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-800 text-xs font-bold tracking-tight text-lime-300">VOZ</span>
            <span>
              <span className="block text-sm font-semibold text-forest-950">Voz coletiva</span>
              <span className="hidden text-xs text-muted sm:block">Painel administrativo</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="hidden rounded-xl px-3 py-2 text-sm font-medium text-forest-700 transition hover:bg-forest-50 sm:inline-flex">
              Ver página pública
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button type="submit" className="rounded-xl border border-sand-300 px-3.5 py-2 text-sm font-semibold text-forest-800 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-600">Visão geral</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-forest-950 sm:text-4xl">Assinaturas</h1>
            <p className="mt-2 text-sm text-muted">
              Acompanhamento das participações registradas
              {session?.user?.email && <> · <span className="font-medium text-ink">{session.user.email}</span></>}
            </p>
          </div>
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-sand-200 bg-white px-4 py-3 shadow-soft">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-100 text-forest-700">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m18 0v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-7.87a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <span>
              <span className="block text-xs text-muted">Total de cadastros</span>
              <span className="block text-xl font-semibold leading-6 text-forest-950">{allSignatures.length}</span>
            </span>
          </div>
        </div>

        <section className="overflow-hidden rounded-[1.5rem] border border-sand-200 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-sand-200 px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-semibold text-forest-950">Participações registradas</h2>
              <p className="mt-1 text-xs text-muted">Dados enviados pelo formulário público</p>
            </div>
            <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">
              {allSignatures.length} {allSignatures.length === 1 ? "registro" : "registros"}
            </span>
          </div>

          <div className="divide-y divide-sand-200">
          {allSignatures.map((sig) => {
            const decryptedCpf = decryptCpf(sig.cpf);
            const formattedCpf = decryptedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

            return (
              <article key={sig.id} className="p-5 transition hover:bg-sand-50/70 sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3.5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest-100 text-sm font-semibold text-forest-700">
                      {sig.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-forest-950">{sig.name}</h3>
                      <p className="mt-1 break-all text-sm text-muted">{sig.email}</p>
                      {sig.phone && <p className="mt-1 text-sm text-muted">{sig.phone}</p>}
                    </div>
                  </div>
                  <time className="shrink-0 text-xs text-muted sm:pt-1">
                    {new Date(sig.createdAt).toLocaleString("pt-BR")}
                  </time>
                </div>

                <dl className="mt-5 grid gap-3 rounded-2xl bg-sand-50 p-4 sm:grid-cols-3 sm:gap-4">
                  <div>
                    <dt className="text-xs text-muted">Localização</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">{sig.city} - {sig.state}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">CPF</dt>
                    <dd className="mt-1 font-mono text-sm font-medium text-ink">{formattedCpf}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Prejuízo informado</dt>
                    <dd className="mt-1 text-sm font-medium text-forest-700">
                      {sig.lossAmount
                        ? `R$ ${Number(sig.lossAmount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                        : "Não informado"}
                    </dd>
                  </div>
                </dl>

                {sig.report && (
                  <blockquote className="mt-4 border-l-2 border-forest-300 pl-4 text-sm leading-6 text-muted">
                    {sig.report}
                  </blockquote>
                )}
              </article>
            );
          })}
          {allSignatures.length === 0 && (
            <div className="px-6 py-16 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-forest-50 text-forest-500">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 4h8m-8 4h5m-8 6h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
                </svg>
              </span>
              <h3 className="mt-4 font-semibold text-forest-950">Ainda não há participações</h3>
              <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-muted">
                Quando alguém preencher o formulário público, os dados aparecerão aqui.
              </p>
              <Link href="/" className="mt-5 inline-flex text-sm font-semibold text-forest-700 hover:text-forest-500">
                Abrir página pública <span className="ml-1" aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
        </section>
      </div>
    </main>
  );
}
