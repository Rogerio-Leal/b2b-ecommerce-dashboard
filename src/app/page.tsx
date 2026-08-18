"use client";

import Image from "next/image";
import { useProducts } from "../hooks/useProducts";
import { useQuoteStore } from "../store/useQuoteStore";
import { Header } from "../components/Header";
import { QuoteDrawer } from "../components/QuoteDrawer";
import { useState } from "react";

export default function Home() {
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
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <>
      <Header />
      <QuoteDrawer />

      <main className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="w-full md:w-1/2 relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
                key={product.id} 
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center h-full"
              >
                <div className="w-full h-48 relative bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={`Imagem do produto ${product.name}`}
                      fill
                      priority
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm font-roboto">Imagem Indisponível</span>
                  )}
                </div>

                <span className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full mb-3 font-medium">
                  {product.category}
                </span>

                <h2 className="font-bold text-lg mb-2 font-roboto text-gray-800">
                  {product.name}
                </h2>

                <p className="text-gray-500 text-sm mb-6 leading-relaxed grow">
                  {product.description}
                </p>

                <div className="w-full border-t border-gray-100 pt-4 mb-4">
                  <span className="text-sm text-gray-400">Preço sob consulta</span>
                </div>

                <button 
                  onClick={() => addItem(product)}
                  className="w-full bg-green-600 text-white font-roboto font-medium py-2.5 rounded-lg hover: cursor-pointer hover:bg-green-800 transition-colors"
                >
                  Adicionar ao Orçamento
                </button>
              </div>
          ))}
        </div>
      </main>
    </>
  );
}