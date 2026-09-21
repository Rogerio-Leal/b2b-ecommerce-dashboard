import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 mt-16 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6">

                <div className="text-gray-500 text-sm font-roboto">
                    &copy; {new Date().getFullYear()} Vitrine B2B. Todos os direitos reservados.
                </div>

                <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
                    <Link href="/sobre" className="hover:text-blue-600 transition-colors">
                        Sobre Nós
                    </Link>
                    <Link href="/privacidade" className="hover:text-blue-600 transition-colors">
                        Política de Privacidade
                    </Link>
                    <Link href="/contato" className="hover:text-blue-600 transition-colors">
                        Contato
                    </Link>
                </nav>

            </div>
        </footer>
    );
}