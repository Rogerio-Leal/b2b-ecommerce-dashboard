import { NextResponse } from "next/server";
import { Product } from '../../../types/product';

export async function GET() {
    const products: Product[] = [
        {
            id: "1",
            name: "Papel Toalha",
            description: "Papel Toalha Interfolhado 1000 folhas",
            category: "Higiene",
            imageUrl: "/images/products/papel-toalha-interfolha-elite.png"
        },
        {
            id: "2",
            name: "Detergente Líquido",
            description: "Detergente 500ml",
            category: "Limpeza",
            imageUrl: "/images/products/detergente-limpol-500ml.jpg"
        },
        {
            id: "3",
            name: "Desinfetante Lavanda",
            description: "Desinfetante 5L",
            category: "Limpeza",
            imageUrl: "/images/products/Desinfetante-5L-Lavanda.png"
        },
        {
            id: "4",
            name: "Papel Higiênico",
            description: "Papel Higiênico 12 rolos 30 metros",
            category: "Higiene",
            imageUrl: "/images/products/papel-higienico-neve-30m.jpg"
        }
    ];

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(products);
}