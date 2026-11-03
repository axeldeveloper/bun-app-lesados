"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createSignature } from "./actions";

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
};

export default function SignatureForm() {
  const [state, formAction, isPending] = useActionState(createSignature, initialState);

  return (
    <main className="min-h-screen overflow-hidden bg-sand-50">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="Página inicial">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-800 text-sm font-bold tracking-tight text-lime-300">
            VOZ
          </span>
          <span className="text-sm font-semibold tracking-tight text-forest-950 sm:text-base">
            Voz coletiva
          </span>
        </Link>
        <Link
          href="/signatures"
          className="rounded-full border border-sand-300 bg-white/70 px-4 py-2.5 text-xs font-semibold text-forest-800 transition hover:border-forest-300 hover:bg-white sm:text-sm"
        >
          Acesso administrativo <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-12 pt-8 sm:px-8 sm:pb-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-16 lg:px-12 lg:pb-20 lg:pt-14">
        <section className="relative pt-2 lg:sticky lg:top-12 lg:pt-8">
          <div className="absolute -left-24 -top-20 -z-0 h-72 w-72 rounded-full bg-lime-300/25 blur-3xl" />
          <div className="relative">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-forest-200 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-700">
              <span className="h-2 w-2 rounded-full bg-forest-500" />
              Uma iniciativa coletiva
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-forest-950 sm:text-5xl lg:text-6xl">
              Quando nos unimos,{" "}
              <span className="text-forest-500">nossa voz ganha força.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Registre sua participação. Cada assinatura ajuda a dar visibilidade
              a esta causa e mostra que ninguém precisa agir sozinho.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["01", "Preencha seus dados", "Leva apenas alguns minutos."],
                ["02", "Conte sua experiência", "O relato é opcional."],
                ["03", "Envie sua participação", "Revise antes de confirmar."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="flex items-start gap-3 rounded-2xl border border-sand-200/80 bg-white/60 p-4 sm:p-3 lg:max-w-sm lg:border-0 lg:bg-transparent lg:p-0"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest-100 text-xs font-bold text-forest-700">
                    {number}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-muted">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 hidden max-w-sm border-t border-sand-200 pt-5 text-xs leading-5 text-muted lg:block">
              Os campos marcados como obrigatórios são necessários para registrar
              sua participação.
            </p>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-sand-200 bg-white p-5 shadow-card sm:p-8 lg:p-10">
          <div className="mb-7 border-b border-sand-200 pb-6 sm:mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-600">
              Formulário de participação
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-forest-950 sm:text-3xl">
              Faça parte desta voz
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Preencha as informações abaixo para registrar sua assinatura.
            </p>
          </div>

          {state?.message && (
            <div
              role="status"
              className={`mb-6 rounded-xl border p-4 text-sm ${
                state.success
                  ? "border-forest-200 bg-forest-50 text-forest-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {state.message}
            </div>
          )}

          <form action={formAction} className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="form-label">Nome completo <span className="text-forest-600">*</span></label>
              <input id="name" name="name" autoComplete="name" placeholder="Como podemos chamar você?" className="form-input" required />
              {state?.errors?.name && <p className="mt-1.5 text-xs text-red-600">{state.errors.name[0]}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="form-label">E-mail <span className="text-forest-600">*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" className="form-input" required />
              {state?.errors?.email && <p className="mt-1.5 text-xs text-red-600">{state.errors.email[0]}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="form-label">Telefone <span className="font-normal text-muted">(opcional)</span></label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" className="form-input" />
            </div>

            <div>
              <label htmlFor="cpf" className="form-label">CPF <span className="text-forest-600">*</span></label>
              <input id="cpf" name="cpf" inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" className="form-input" required />
              {state?.errors?.cpf && <p className="mt-1.5 text-xs text-red-600">{state.errors.cpf[0]}</p>}
            </div>

            <div>
              <label htmlFor="city" className="form-label">Cidade <span className="text-forest-600">*</span></label>
              <input id="city" name="city" autoComplete="address-level2" placeholder="Sua cidade" className="form-input" required />
              {state?.errors?.city && <p className="mt-1.5 text-xs text-red-600">{state.errors.city[0]}</p>}
            </div>

            <div>
              <label htmlFor="state" className="form-label">Estado (UF) <span className="text-forest-600">*</span></label>
              <input id="state" name="state" autoComplete="address-level1" placeholder="SP" maxLength={2} className="form-input uppercase" required />
              {state?.errors?.state && <p className="mt-1.5 text-xs text-red-600">{state.errors.state[0]}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="loss_amount" className="form-label">Valor do prejuízo <span className="font-normal text-muted">(opcional)</span></label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-muted">R$</span>
                <input id="loss_amount" name="loss_amount" type="number" min="0" step="0.01" inputMode="decimal" placeholder="0,00" className="form-input pl-12" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="report" className="form-label">Conte sua experiência <span className="font-normal text-muted">(opcional)</span></label>
              <textarea id="report" name="report" placeholder="Se quiser, compartilhe um pouco do que aconteceu..." rows={4} className="form-input min-h-28 resize-y" />
            </div>

            <div className="sm:col-span-2">
              <button type="submit" disabled={isPending} className="primary-button w-full">
                {isPending ? "Enviando..." : "Registrar minha assinatura"}
                {!isPending && <span aria-hidden="true">→</span>}
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-muted">
                Confira seus dados antes de enviar sua participação.
              </p>
            </div>
          </form>
        </section>
      </div>

      <footer className="border-t border-sand-200 px-5 py-5 text-center text-xs text-muted sm:px-8">
        Voz coletiva <span className="mx-1.5 text-forest-400">·</span> Sua participação importa
      </footer>
    </main>
  );
}
