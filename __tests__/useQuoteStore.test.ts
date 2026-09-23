import { act } from '@testing-library/react';
import { useQuoteStore } from '@/store/useQuoteStore';

describe('Estado Global - Carrinho/Orçamento (Zustand)', () => {

    beforeEach(() => {
        useQuoteStore.setState({ items: [] });
    });

    it('deve adicionar um novo produto ao orçamento', () => {
        // 1. Produto base puro (sem price e quantity, pois não pertencem a esta interface)
        const novoProduto = {
            id: '1',
            name: 'Detergente Líquido',
            description: 'Detergente para limpeza geral',
            category: 'Limpeza',
            imageUrl: '/img/detergente.jpg',
        };

        act(() => {
            // Assumindo que a sua loja empacota o produto internamente
            useQuoteStore.getState().addItem(novoProduto);

            // NOTA: Se o sublinhado vermelho persistir no addItem, a sua função pode 
            // exigir o objeto de carrinho completo: addItem({ product: novoProduto, quantity: 1 })
        });

        const state = useQuoteStore.getState();
        expect(state.items).toHaveLength(1);

        // 2. Acedemos a .product.name porque a loja encapsula o produto
        expect(state.items[0].product.name).toBe('Detergente Líquido');
    });

    it('deve incrementar a quantidade se o produto já existir no orçamento', () => {
        const produto = {
            id: '1',
            name: 'Detergente Líquido',
            description: 'Detergente para limpeza geral',
            category: 'Limpeza',
            imageUrl: '/img/detergente.jpg',
        };

        act(() => {
            useQuoteStore.getState().addItem(produto);
            useQuoteStore.getState().addItem(produto);
        });

        const state = useQuoteStore.getState();

        expect(state.items).toHaveLength(1);
        // 3. A quantidade fica na raiz do item do carrinho
        expect(state.items[0].quantity).toBe(2);
    });
});