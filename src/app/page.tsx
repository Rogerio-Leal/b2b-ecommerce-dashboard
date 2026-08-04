"use client";

import { useProducts } from "../hooks/useProducts";
import { useQuoteStore } from "../store/useQuoteStore";
import { Header } from "../components/Header";
import { QuoteDrawer } from "../components/QuoteDrawer";

export default function Home() {
  const { data: products, isLoading, isError } = useProducts();
  const addItem = useQuoteStore((state) => state.addItem);

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

  return (
    <>
      <Header />
      <QuoteDrawer />
      
      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between h-full text-center">
              <div>
                <h2 className="font-bold text-lg mb-2 font-roboto">{product.name}</h2>
                <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full mb-4">
                  {product.category}
                </span>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              <button 
                onClick={() => addItem(product)}
                className="w-full bg-gray-900 text-white py-2 rounded font-medium hover:bg-gray-800 transition-colors"
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