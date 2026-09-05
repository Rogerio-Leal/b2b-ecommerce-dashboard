"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const banners = [
    {
        id: 1,
        title: "Oferta especial de Limpeza",
        subtitle: "Até 30% de desconto em produtos selecionados",
        bgClass: "bg-gradient-to-r from-blue-60 to-blue-400",
    },
    {
        id: 2,
        title: "Novo Papel Toalha Premium",
        subtitle: "Mais absorção para o seu negócio. Confira as condições.",
        bgClass: "bg-gradient-to-r from-emerald-600 to-teal-400",
    },
    {
        id: 3,
        title: "Frete Grátis B2B",
        subtitle: "Para pedidos acima de R$ 2.000,00 na região Sul e Sudeste.",
        bgClass: "bg-gradient-to-r from-purple-600 to-indigo-500",
    }
];

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => {
        setCurrent(current === 0 ? banners.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === banners.length - 1 ? 0 : current + 1);
    };

    return (
        <div className="relative w-full h-48 sm:h-64 mb-10 rounded-2xl overflow-hidden shadow-sm group">

            <div
                className="flex transition-transform duration-700 ease-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {banners.map((banner) => (
                    <div key={banner.id} className={`w-full flex-shrink-0 flex flex-col items-center justify-center text-white px-8 text-center ${banner.bgClass}`}>
                        <h2 className="text-2xl sm:text-4xl font-bold mb-2 drop-shadow-md">{banner.title}</h2>
                        <p className="text-sm sm:text-lg opacity-90">{banner.subtitle}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${current === index ? "bg-white w-6" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}