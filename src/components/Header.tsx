"use client";

import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useQuoteStore } from "../store/useQuoteStore";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Header() {
    // 1. Puxando os dados do usuário logado (se houver)
    const { data: session } = useSession();

    // 2. Puxando os dados do carrinho
    const items = useQuoteStore((state) => state.items);
    const openCart = useQuoteStore((state) => state.openCart);

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo / Título */}
                <h1 className="text-xl font-bold text-gray-800 font-roboto">
                    <Link href="/">Vitrine B2B</Link>
                </h1>

                {/* Lado Direito (Autenticação + Carrinho) */}
                <div className="flex items-center gap-4">

                    {/* Área do Usuário */}
                    {session ? (
                        <div className="flex items-center gap-3 border-r border-gray-200 pr-4">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                                <UserCircleIcon className="w-5 h-5 text-gray-400" />
                                {/* Mostra o e-mail ou o nome (se existir) */}
                                <span className="hidden sm:inline">
                                    {session.user?.name || session.user?.email}
                                </span>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-xs text-red-500 hover:text-red-800 transition-colors font-medium ml-2 hover:cursor-pointer"
                                title="Sair da conta"
                            >
                                Sair
                            </button>
                        </div>
                    ) : (
                        <div className="border-r border-gray-200 pr-4">
                            <Link
                                href="/login"
                                className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                            >
                                Fazer Login
                            </Link>
                        </div>
                    )}

                    {totalItems > 0 && (
                        <button
                            onClick={openCart}
                            className="bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition flex items-center gap-2 hover:cursor-pointer"
                        >
                            <ShoppingCartIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Ver Orçamento</span>
                            <span className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded-full ml-1">
                                {totalItems}
                            </span>
                        </button>
                    )}

                </div>
            </div>
        </header>
    );
}