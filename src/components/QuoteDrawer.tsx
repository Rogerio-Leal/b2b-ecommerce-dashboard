"use client";

import { useQuoteStore } from "../store/useQuoteStore";
import { useQueries } from "@tanstack/react-query";
import { getProductStock } from "../services/stock";

export function QuoteDrawer() {
    const { items, isOpen, closeCart, removeItem, incrementItem, decrementItem } = useQuoteStore();

    const stockQueries = useQueries({
        queries: items.map((item) => ({
            queryKey: ["stock", item.product.id],
            queryFn: () => getProductStock(item.product.id),
            staleTime: 1000 * 60 * 5,
        })),
    });

    if (!isOpen) return null;

    const total = items.reduce((acc, item, index) => {
        const price = stockQueries[index].data?.price || 0;
        return acc + (price * item.quantity);
    }, 0);

    const isLoadingPrices = stockQueries.some((query) => query.isLoading);

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                onClick={closeCart}
            />

            {/* Painel Lateral */}
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
                <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 font-roboto">Resumo do Pedido</h2>
                    <button onClick={closeCart} className="text-gray-500 hover:text-red-500 text-3xl leading-none">
                        &times;
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                    {items.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">Nenhum item selecionado.</p>
                    ) : (
                        <ul className="space-y-6">
                            {items.map((item, index) => {
                                const query = stockQueries[index];
                                const price = query.data?.price;

                                return (
                                    <li key={item.product.id} className="flex justify-between items-start border-b border-gray-100 pb-4">
                                        <div>
                                            <p className="font-medium text-gray-800 font-roboto">{item.product.name}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-sm text-gray-500">Qtd:</span>
                                                <div className="flex items-center border border-gray-200 rounded-md">
                                                    <button
                                                        onClick={() => decrementItem(item.product.id)}
                                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-3 text-sm font-medium text-gray-800 border-x border-gray-200">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => incrementItem(item.product.id)}
                                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            {query.isLoading ? (
                                                <span className="text-xs text-gray-400 animate-pulse bg-gray-100 px-2 py-1 rounded">
                                                    Calculando...
                                                </span>
                                            ) : query.isError ? (
                                                <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                                                    Erro no valor
                                                </span>
                                            ) : (
                                                <p className="font-bold text-gray-700">
                                                    R$ {(price! * item.quantity).toFixed(2)}
                                                </p>
                                            )}

                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="text-red-500 text-xs font-medium hover:cursor-pointer transition-colors hover:text-red-900"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="border-t border-gray-200 p-5 bg-gray-50 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-lg font-bold text-gray-800 font-roboto">
                        <span>Total Estimado</span>
                        {isLoadingPrices ? (
                            <span className="text-sm font-normal text-gray-500 animate-pulse">Atualizando...</span>
                        ) : (
                            <span>R$ {total.toFixed(2)}</span>
                        )}
                    </div>
                    <button
                        disabled={isLoadingPrices || items.length === 0}
                        className="w-full bg-green-600 text-white py-3 rounded-md font-bold text-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm font-roboto"
                    >
                        Enviar Solicitação
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-2">
                        É um prazer ter você como nosso cliente. Conte conosco!
                    </p>
                </div>
            </div>
        </>
    );
}
