export interface StockData {
    productId: string;
    price: number;
    stock: number;
}

export async function getProductStock(id: string): Promise<StockData> {
    const response = await fetch(`http://localhost:3000/api/stock?productId=${id}`);

    if (!response.ok) {
        throw new Error("Erro ao buscar dados do ERP");
    }

    return response.json();
}