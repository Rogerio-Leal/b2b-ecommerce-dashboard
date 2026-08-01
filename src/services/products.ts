import { Product } from '../types/product';

export async function getProducts(): Promise<Product[]> {
    const response = await fetch('http://localhost:3000/api/products');

    if (!response.ok) {
        throw new Error("Erro ao carregar o catálogo");
    }

    return response.json();
}