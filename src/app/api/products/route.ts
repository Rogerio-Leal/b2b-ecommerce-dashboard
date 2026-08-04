import { NextResponse } from "next/server";
import { Product } from '../../../types/product';

export async function GET() {
    const products: Product[] = [
        {
            id: "1",
            name: "Papel Toalha",
            description: "Papel Toalha Interfolhado 1000 folhas",
            category: "Papel Toalha"
        },
        {
            id: "2",
            name: "Detergente Líquido",
            description: "Detergente 500ml",
            category: "Detergente"
        },
        {
            id: "3",
            name: "Desinfetante Lavanda",
            description: "Desinfetante 5L",
            category: "Desinfetante"
        },
        {
            id: "4",
            name: "Papel Higiênico",
            description: "Papel Higiênico 12 rolos 30 metros",
            category: "Papel Higiênico"
        }
    ];

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(products);
}