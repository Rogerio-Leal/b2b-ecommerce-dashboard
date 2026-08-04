"use client";

import { useQuoteStore } from "../store/useQuoteStore";

export function Header() {
    const items = useQuoteStore((state) => state.items);
    const openCart = useQuoteStore((state) => state.openCart);
    
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 font-roboto">Vitrine B2B</h1>
        <button 
        onClick={openCart}
        className="bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition flex items-center gap-2"
        >
        <span>Ver Orçamento</span>
        {totalItems > 0 && (
            <span className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
            {totalItems}
            </span>
        )}
        </button>
    </div>
    </header>
    );
}