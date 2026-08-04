"use client";

import { useQuoteStore } from "../store/useQuoteStore";

export function QuoteDrawer() {
    const { items, isOpen, closeCart, removeItem } = useQuoteStore();

    if (!isOpen) return null;

    return (
    <>
      {/* Fundo escuro interativo */}
    <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
    />

      {/* Painel Lateral */}
    <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 font-roboto">
            Resumo do Pedido
        </h2>
        <button
            onClick={closeCart}
            className="text-gray-500 hover:text-red-500 text-3xl leading-none"
        >
            &times;
        </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
        {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
            Nenhum item selecionado.
            </p>
        ) : (
            <ul className="space-y-6">
            {items.map((item) => (
                <li
                key={item.product.id}
                className="flex justify-between items-start border-b border-gray-100 pb-4"
                >
                <div>
                    <p className="font-medium text-gray-800 font-roboto">
                    {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                    Quantidade: {item.quantity}
                    </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-gray-700 text-xs bg-gray-100 px-2 py-1 rounded">
                    Preço sob consulta
                    </p>
                    <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 text-xs font-medium hover:underline"
                    >
                    Remover
                    </button>
                </div>
                </li>
            ))}
            </ul>
        )}
        </div>

        <div className="border-t border-gray-200 p-5 bg-gray-50 flex flex-col gap-4">
        <div className="flex justify-between items-center text-lg font-bold text-gray-800 font-roboto">
            <span>Status do Orçamento</span>
            <span className="text-sm font-normal bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            Aguardando Análise
            </span>
        </div>
        <button className="w-full bg-green-600 text-white py-3 rounded-md font-bold text-lg hover:bg-green-700 transition-colors shadow-sm font-roboto">
            Enviar Solicitação
        </button>
        <p className="text-center text-sm text-gray-500 mt-2">
            É um prazer ter você como nosso cliente. Conte conosco (sempre)!
        </p>
        </div>
    </div>
    </>
    );
}
