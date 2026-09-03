"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuoteStore } from "../../../store/useQuoteStore";
import { Product } from "../../../types/product";

export default function ProductDetailsPage() {
    const params = useParams();
    const id = params?.id as string;

    const { data: session } = useSession();
    const addItem = useQuoteStore((state) => state.addItem);

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                const foundProduct = data.find((p: Product) => String(p.id) === String(id));
                setProduct(foundProduct || null);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (isLoading) return <div className="p-10 text-center text-gray-500 font-medium animate-pulse">Carregando detalhes...</div>;
    if (!product) return <div className="p-10 text-center text-red-500 font-bold">Produto não encontrado no catálogo.</div>;

    return (
        <main className="max-w-6xl mx-auto p-4 sm:p-8 font-roboto min-h-screen">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 font-medium mb-6 transition-colors">
                <ArrowLeftIcon className="w-4 h-4" />
                Voltar para a vitrine
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative w-full h-80 md:h-125 bg-gray-50 rounded-xl flex items-center justify-center p-6 border border-gray-100">
                    {product.imageUrl ? (
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                            priority
                        />
                    ) : (
                        <span className="text-gray-400">Sem imagem</span>
                    )}
                </div>

                <div className="flex flex-col justify-center">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full w-fit mb-4 font-bold uppercase tracking-wide">
                        {product.category}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        {session ? (
                            <div className="flex flex-col gap-5">
                                <p className="text-sm text-green-700 font-medium flex items-center gap-2 bg-green-50 w-fit px-3 py-1.5 rounded-md border border-green-200">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Estoque disponível para envio
                                </p>
                                <button
                                    onClick={() => addItem(product)}
                                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all active:scale-[0.98] text-lg"
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        ) : (
                            <div className="text-center p-4">
                                <p className="text-gray-600 font-medium mb-3">Preços e estoques exclusivos para lojistas parceiros.</p>
                                <Link href="/login" className="inline-block bg-gray-900 text-white font-medium px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                                    Fazer Login Corporativo
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}