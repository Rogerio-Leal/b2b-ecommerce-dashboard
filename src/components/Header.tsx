"use client";

import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useQuoteStore } from "../store/useQuoteStore";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Header() {
    const { data: session } = useSession();
    const items = useQuoteStore((state) => state.items);
    const openCart = useQuoteStore((state) => state.openCart);
    const clearCart = useQuoteStore((state) => state.clearCart);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <h1 className="text-xl font-bold text-gray-800 font-roboto">
                    <Link href="/">Vitrine B2B</Link>
                </h1>

                <div className="flex items-center gap-4">
                    {session ? (
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col text-right">
                                <span className="text-sm font-bold text-gray-700">{session.user?.email}</span>
                                <div className="flex items-center justify-end gap-2">
                                    <Link href="/dashboard" className="text-xs text-blue-600 hover:underline font-medium hover:cursor-pointer">
                                        Meus Pedidos
                                    </Link>
                                    <span className="text-gray-300">|</span>
                                    <button
                                        onClick={() => {
                                            clearCart();
                                            signOut({ callbackUrl: "/" });
                                        }}
                                        className="text-xs text-red-500 hover:text-red-700 hover:underline transition-colors font-medium hover:cursor-pointer"
                                    >
                                        Sair
                                    </button>
                                </div>
                            </div>
                            <UserCircleIcon className="w-8 h-8 text-gray-400" />
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