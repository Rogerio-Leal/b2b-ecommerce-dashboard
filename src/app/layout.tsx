import type { Metadata } from "next";
import "./globals.css";
import { Providers} from "../components/Providers";

export const metadata: Metadata = {
  title: "Vitrine B2B",
  description: "Catálogo B2B moderno construído com Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
