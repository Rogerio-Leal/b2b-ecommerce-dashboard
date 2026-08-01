import { NextResponse } from "next/server";
import { Product } from '../../../types/product';

export async function GET() {
    const products: Product[] = [
        {
            id: "1",
            name: "Papel Toalha Elite",
            description: "Papel Toalha Elite 1000 folhas",
            category: "Papel Toalha"
        },
        {
            id: "2",
            name: "Detergente Limpol",
            description: "Detergente Limpol 500ml",
            category: "Detergente"
        },
        {
            id: "3",
            name: "Desinfetante Girando Sol",
            description: "Desinfetante Girando Sol 5L",
            category: "Desinfetante"
        },
        {
            id: "4",
            name: "Papel Higiênico Neve",
            description: "Papel Higiênico Neve 12 rolos",
            category: "Papel Higiênico"
        }
    ];

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(products);
}