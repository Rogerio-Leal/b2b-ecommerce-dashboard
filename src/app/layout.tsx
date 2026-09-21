import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../components/Providers";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteDrawer } from "@/components/QuoteDrawer";

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
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <Providers>
          <Header />
          <QuoteDrawer />
          <main className="grow">
            {children}
          </main>
          <WhatsAppButton />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
