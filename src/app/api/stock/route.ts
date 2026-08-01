import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    const stockDataBase: Record<string, { price: number; stock: number }> = {
        "1": { price: 20.90, stock: 100 },
        "2": { price: 10.50, stock: 200 },
        "3": { price: 15.75, stock: 150 },
        "4": { price: 5.25, stock: 300 }
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!productId || !stockDataBase[productId]) {
        return NextResponse.json(
            { error: "Produto ou estoque não encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        productId,
        price: stockDataBase[productId].price,
        stock: stockDataBase[productId].stock
    });
}
