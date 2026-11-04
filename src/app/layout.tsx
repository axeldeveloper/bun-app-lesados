import "./globals.css";

export const metadata = {
  title: {
    default: "Assinaturas | Voz coletiva",
    template: "%s | Assinaturas",
  },
  description: "Registre sua participação e fortaleça esta iniciativa coletiva.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
