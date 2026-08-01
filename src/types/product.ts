export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
}

export interface ProductStock {
    productId: string;
    price: number;
    stock: number;
}