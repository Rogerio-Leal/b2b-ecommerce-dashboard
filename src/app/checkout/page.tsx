"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuoteStore } from "../../store/useQuoteStore";
import { useQueries } from "@tanstack/react-query";
import { getProductStock } from "../../services/stock";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function CheckoutPage() {
    const { data: session } = useSession();
    const { items, clearCart } = useQuoteStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderNumber, setOrderNumber] = useState<string | null>(null);

    const stockQueries = useQueries({
        queries: items.map((item) => ({
            queryKey: ["stock", item.product.id],
            queryFn: () => getProductStock(item.product.id),
            staleTime: 1000 * 60 * 5,
        })),
    });

    const total = items.reduce((acc, item, index) => {
        const price = stockQueries[index].data?.price || 0;
        return acc + (price * item.quantity);
    }, 0);

    const handleConfirmarPedido = () => {
        setIsSubmitting(true);

        setTimeout(() => {
            const numeroGerado = Math.floor(10000 + Math.random() * 90000);
            setOrderNumber(`B2B-${numeroGerado}`);
            clearCart();
            setIsSubmitting(false);
        }, 2000);
    };

    if (orderNumber) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center font-roboto">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Pedido Confirmado!</h1>
                    <p className="text-gray-500 mb-6">
                        Obrigado pela preferência. Seu orçamento foi enviado para nossa equipe comercial.
                    </p>
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-lg font-bold text-xl mb-8 border border-blue-100">
                        Pedido: {orderNumber}
                    </div>
                    <Link
                        href="/"
                        className="block w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Voltar para o Catálogo
                    </Link>
                </div>
            </main>
        );
    }

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Seu carrinho está vazio</h1>
                    <Link href="/" className="text-blue-600 hover:underline font-medium">
                        Voltar para o catálogo
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto font-roboto">

                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 font-medium">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Continuar comprando
                    </Link>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-8">Resumo do Orçamento</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6">

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Itens Solicitados</h2>
                            <div className="divide-y divide-gray-100">
                                {items.map((item, index) => {
                                    const itemPrice = stockQueries[index].data?.price || 0;
                                    return (
                                        <div key={item.product.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-gray-800">{item.product.name}</p>
                                                <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                                            </div>
                                            <div className="font-bold text-gray-800">
                                                R$ {(itemPrice * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Dados de Entrega</h2>
                            <p className="text-gray-600 text-sm mb-1"><span className="font-bold">Cliente:</span> {session?.user?.email}</p>
                            <p className="text-gray-600 text-sm mb-1"><span className="font-bold">Endereço:</span> Rua Fictícia, 123 - Centro</p>
                            <p className="text-gray-600 text-sm"><span className="font-bold">Prazo estimado:</span> 3 a 5 dias úteis após faturamento</p>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Total do Pedido</h2>

                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-bold text-gray-800">R$ {total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600">Frete (FOB)</span>
                                <span className="font-medium text-gray-500 text-sm">A calcular</span>
                            </div>

                            <div className="flex justify-between items-center border-t pt-4 mb-6">
                                <span className="font-bold text-gray-800 text-lg">Total Previsto</span>
                                <span className="font-bold text-green-600 text-2xl">R$ {total.toFixed(2)}</span>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Condição de Pagamento</label>
                                <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border outline-none">
                                    <option>Boleto 30/60/90 dias</option>
                                    <option>Boleto 30 dias</option>
                                    <option>Pix Antecipado (5% desconto)</option>
                                </select>
                            </div>

                            <button
                                onClick={handleConfirmarPedido}
                                disabled={isSubmitting}
                                className="w-full bg-green-600 text-white font-bold py-3.5 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400 text-lg"
                            >
                                {isSubmitting ? "Processando..." : "Confirmar Pedido"}
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                Ao confirmar, nossa equipe entrará em contato para aprovação de crédito e faturamento.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}