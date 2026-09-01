export interface StockData {
    productId: string;
    price: number;
    stock: number;
}

export async function getProductStock(id: string): Promise<StockData> {
    const response = await fetch(`/api/stock?productId=${id}`);

    if (!response.ok) {
        throw new Error("Erro ao buscar dados do ERP");
    }

    return response.json();
}