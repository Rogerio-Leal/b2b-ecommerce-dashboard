import { create } from 'zustand';
import { Product } from '../types/product';

export interface QuoteItem {
    product: Product;
    quantity: number;
}

interface QuoteStore {
    items: QuoteItem[];
    isOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearQuote: () => void;
    openCart: () => void;
    closeCart: () => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
    items: [],
  isOpen: false, // Controle da gaveta lateral

    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),

    addItem: (product) =>
    set((state) => {
    const existingItem = state.items.find((item) => item.product.id === product.id);
    
    if (existingItem) {
        return {
        items: state.items.map((item) =>
            item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
          isOpen: true, // Abre a gaveta automaticamente ao adicionar
        };
    }
    
    return { 
        items: [...state.items, { product, quantity: 1 }],
        isOpen: true, // Abre a gaveta automaticamente ao adicionar
    };
    }),
    
    removeItem: (productId) =>
    set((state) => ({
    items: state.items.filter((item) => item.product.id !== productId),
    })),
    
clearQuote: () => set({ items: [], isOpen: false }),
}));