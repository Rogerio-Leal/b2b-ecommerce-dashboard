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
    incrementItem: (productId: string) => void;
    decrementItem: (productId: string) => void;
    clearQuote: () => void;
    openCart: () => void;
    closeCart: () => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
    items: [],
    isOpen: false,

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
                    isOpen: true,
                };
            }
            return {
                items: [...state.items, { product, quantity: 1 }],
                isOpen: true,
            };
        }),

    incrementItem: (productId) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ),
        })),

    decrementItem: (productId) =>
        set((state) => {
            const existingItem = state.items.find((item) => item.product.id === productId);

            if (existingItem?.quantity === 1) {
                return {
                    items: state.items.filter((item) => item.product.id !== productId),
                };
            }

            return {
                items: state.items.map((item) =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };
        }),

    removeItem: (productId) =>
        set((state) => ({
            items: state.items.filter((item) => item.product.id !== productId),
        })),

    clearQuote: () => set({ items: [], isOpen: false }),
}));