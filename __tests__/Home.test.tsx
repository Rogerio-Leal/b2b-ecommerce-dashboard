import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(() => ({
        data: { user: { name: 'Rogério Leal' } },
        status: 'authenticated',
    })),
}));

jest.mock('@/hooks/useProducts', () => ({
    useProducts: jest.fn(() => ({
        data: [
            { id: '1', name: 'Detergente Líquido', category: 'Limpeza', price: 15.99 },
            { id: '2', name: 'Papel Toalha', category: 'Higiene', price: 25.50 }
        ],
        isLoading: false,
        isError: false
    }))
}));

describe('Interações da Página Inicial', () => {
    it('deve atualizar o valor da barra de busca quando o usuário digitar', async () => {
        const queryClient = new QueryClient();
        const user = userEvent.setup();

        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );

        const searchInput = screen.getByPlaceholderText('Buscar produtos pelo nome...');
        expect(searchInput).toHaveValue('');

        await user.type(searchInput, 'Detergente');
        expect(searchInput).toHaveValue('Detergente');
    });
});