"use client";

import { useProducts } from "../hooks/useProducts";
import { useQuoteStore } from "../store/useQuoteStore";
import { Header } from "../components/Header";
import { QuoteDrawer } from "../components/QuoteDrawer";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Carousel from "../components/Carousel";
import Image from "next/image";
import Link from "next/link";

const fetchStock = async (productId: string) => {
  const res = await fetch(`/api/stock?productId=${productId}`);
  if (!res.ok) throw new Error("Falha ao buscar estoque");
  return res.json();
};

function ProductPriceDisplay({ productId }: { productId: string }) {
  const { data: session } = useSession();

  const { data: stock, isLoading } = useQuery({
    queryKey: ['stock', productId],
    queryFn: () => fetchStock(productId),
  });

  if (!session) {
    return (
      <div className="flex items-center gap-1.5 bg-gray-50 text-gray-500 text-xs px-3 py-2 rounded-md border border-gray-200">
        <LockClosedIcon className="w-4 h-4 text-gray-400" />
        <span>
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Faça login
          </Link>{" "}
          para ver o preço
        </span>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-sm text-gray-400 animate-pulse">Carregando preço...</div>;
  }

  return (
    <div className="text-lg font-bold text-green-600">
      R$ {stock?.price?.toFixed(2) || "0.00"}
    </div>
  );
}
export default function Home() {
  const { data: session } = useSession();
  const { data: products, isLoading, isError } = useProducts();
  const addItem = useQuoteStore((state) => state.addItem);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  if (isLoading) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6 font-roboto">Vitrine B2B - Catálogo</h1>
        <p>Carregando os produtos do catálogo...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-8">
        <p className="text-red-500">Ocorreu um erro ao buscar os dados.</p>
      </main>
    );
  }
  const categories = ["Todos", "Limpeza", "Descartáveis", "Higiene"];
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <>
      <Header />
      <QuoteDrawer />

      <main className="max-w-7xl mx-auto p-8">

        <nav className="flex gap-3 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:cursor-pointer ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        <div className="w-full relative mb-10 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <input
            type="text"
            placeholder="Buscar produtos pelo nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-3 border-none bg-transparent focus:outline-none focus:ring-0 font-roboto text-gray-700 placeholder-gray-400"
          />
        </div>

        <Carousel />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center h-full"
            >
              <Link href={`/produto/${product.id}`} className="w-full">
                <div className="w-full h-48 relative bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden cursor-pointer group/image">

                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-10 backdrop-blur-[1px]">
                    <span className="text-white font-medium text-sm border border-white px-4 py-2 rounded-md transform translate-y-2 group-hover/image:translate-y-0 transition-transform duration-300">
                      Clique para saber mais
                    </span>
                  </div>

                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={`Imagem do produto ${product.name}`}
                      fill
                      priority
                      className="object-contain p-2 transition-transform duration-300 group-hover/image:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm font-roboto">Imagem Indisponível</span>
                  )}
                </div>
              </Link>

              <span className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full mb-3 font-medium">
                {product.category}
              </span>

              <h2 className="font-bold text-lg mb-2 font-roboto text-gray-800">
                {product.name}
              </h2>

              <p className="text-gray-500 text-sm mb-6 leading-relaxed grow">
                {product.description}
              </p>

              <div className="mt-4 mb-4 min-h-10 flex flex-col items-center justify-center">
                <ProductPriceDisplay productId={product.id} />
              </div>

              {session && (
                <button
                  onClick={() => addItem(product)}
                  className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-colors mt-2 hover:cursor-pointer"
                >
                  Adicionar ao Orçamento
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}