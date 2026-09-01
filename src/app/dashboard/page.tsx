"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeftIcon, CheckIcon, TruckIcon } from "@heroicons/react/24/outline";

const STEPS = [
    "Pedido aprovado",
    "Em separação",
    "Pronto para envio",
    "Pedido enviado",
    "Pedido entregue"
];

const mockOrders = [
    {
        id: "B2B-84729",
        date: "31/08/2026",
        total: 1250.0,
        payment: "Pix",
        currentStep: 1,
        items: "3x Papel Toalha, 1x Papel Higiênico"
    },
    {
        id: "B2B-10394",
        date: "15/08/2026",
        total: 3400.5,
        payment: "Boleto 30 dias",
        currentStep: 4,
        items: "10x Detergente Líquido, 5x Desinfetante Lavanda",
        deliveredAt: "01/09/2026 às 14:30"
    }
];

export default function DashboardPage() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center font-roboto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Acesso Restrito</h1>
                    <p className="text-gray-500 mb-6">Faça login para ver seu histórico de pedidos.</p>
                    <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
                        Fazer Login
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto font-roboto">

                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 font-medium mb-2">
                            <ArrowLeftIcon className="w-4 h-4" />
                            Voltar para o catálogo
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">Meus Pedidos</h1>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-sm text-gray-500">Cliente</p>
                        <p className="font-bold text-gray-800">{session.user?.email}</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {mockOrders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4">
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <h2 className="text-lg font-bold text-blue-700">Pedido #{order.id}</h2>
                                        <p className="text-sm text-gray-500">Realizado em {order.date}</p>
                                    </div>

                                    {/* Lógica da Etiqueta de Prazo/Entrega */}
                                    {order.currentStep === 4 ? (
                                        <div className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-md w-fit border border-green-200">
                                            <CheckIcon className="w-4 h-4" />
                                            Entregue em: {order.deliveredAt}
                                        </div>
                                    ) : order.currentStep >= 1 ? (
                                        <div className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-md w-fit border border-amber-200">
                                            <TruckIcon className="w-4 h-4" />
                                            Previsão de entrega: até 3 dias úteis
                                        </div>
                                    ) : null}
                                </div>

                                {/* Lado Direito: Valores */}
                                <div className="text-left sm:text-right">
                                    <p className="text-xl font-bold text-gray-800">R$ {order.total.toFixed(2)}</p>
                                    <p className="text-xs text-gray-500">Pago via {order.payment}</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <p className="text-sm font-medium text-gray-700 mb-1">Itens do pedido:</p>
                                <p className="text-sm text-gray-500">{order.items}</p>
                            </div>

                            <div className="flex items-center w-full relative">
                                {STEPS.map((step, index) => {
                                    const isCompleted = index <= order.currentStep;
                                    const isCurrent = index === order.currentStep;

                                    return (
                                        <div key={step} className="flex-1 flex flex-col items-center relative">
                                            {index !== 0 && (
                                                <div className={`absolute top-4 left-[-50%] w-full h-1 z-0 ${index <= order.currentStep ? 'bg-green-500' : 'bg-gray-200'
                                                    }`} />
                                            )}
                                            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors shadow-sm ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 border border-gray-200'
                                                }`}>
                                                {isCompleted ? <CheckIcon className="w-5 h-5" /> : index + 1}
                                            </div>
                                            <span className={`text-xs sm:text-sm mt-3 text-center px-1 ${isCurrent ? 'font-bold text-green-600' : 'font-medium text-gray-500'
                                                }`}>
                                                {step}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}