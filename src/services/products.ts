import { Product } from '../types/product';

export async function getProducts(): Promise<Product[]> {
    const response = await fetch('/api/products');

    if (!response.ok) {
        throw new Error("Erro ao carregar o catálogo");
    }

    return response.json();
}