'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        setError(
          result?.error
            ? "E-mail ou senha inválidos."
            : "Não foi possível concluir o login. Tente novamente."
        );
        return;
      }

      router.replace("/signatures");
      router.refresh();
    } catch (error) {
      console.error("Falha ao autenticar:", error);
      setError("Não foi possível concluir o login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-sand-50 lg:grid-cols-[1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-forest-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div className="absolute -right-36 top-1/4 h-[30rem] w-[30rem] rounded-full border border-white/10" />
        <div className="absolute -right-16 top-[34%] h-[20rem] w-[20rem] rounded-full border border-white/10" />
        <Link href="/" className="relative flex w-fit items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime-300 text-sm font-bold tracking-tight text-forest-950">VOZ</span>
          <span className="text-sm font-semibold">Voz coletiva</span>
        </Link>
        <div className="relative max-w-xl pb-12">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">Área restrita</p>
          <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em] xl:text-6xl">
            Cuidar de cada voz também é parte da mudança.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/65">
            Acesse o painel para acompanhar as participações registradas nesta iniciativa.
          </p>
        </div>
        <p className="relative text-xs text-white/45">Acesso exclusivo para administradores</p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-8 lg:justify-center lg:px-12 xl:px-20">
        <Link href="/" className="flex w-fit items-center gap-3 lg:hidden">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-800 text-xs font-bold tracking-tight text-lime-300">VOZ</span>
          <span className="text-sm font-semibold text-forest-950">Voz coletiva</span>
        </Link>
        <div className="mx-auto flex w-full max-w-md flex-1 items-center py-12 lg:flex-none lg:py-0">
          <form onSubmit={handleSubmit} className="w-full rounded-[1.75rem] border border-sand-200 bg-white p-6 shadow-card sm:p-9">
            <div className="mb-8">
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-forest-100 text-forest-700">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Zm10-11V7a4 4 0 0 0-8 0v4h8Z" />
                </svg>
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-forest-600">Painel administrativo</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-forest-950">Bem-vindo de volta</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Entre com suas credenciais para acessar as assinaturas.</p>
            </div>

            {error && (
              <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mb-5">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@exemplo.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Sua senha"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="primary-button mt-7 w-full">
              {loading ? "Entrando..." : "Entrar no painel"}
              {!loading && <span aria-hidden="true">→</span>}
            </button>

            <div className="mt-6 border-t border-sand-200 pt-5 text-center">
              <Link href="/" className="text-sm font-medium text-forest-700 transition hover:text-forest-500">
                <span aria-hidden="true">←</span> Voltar para a página inicial
              </Link>
            </div>
          </form>
        </div>
        <p className="text-center text-xs text-muted lg:mt-12">Acesso exclusivo para administradores</p>
      </section>
    </main>
  );
}
