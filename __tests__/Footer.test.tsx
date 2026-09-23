import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
    it('deve renderizar os links institucionais corretamente', () => {
        render(<Footer />);

        const linkSobre = screen.getByText('Sobre Nós');
        const linkPrivacidade = screen.getByText('Política de Privacidade');
        const linkContato = screen.getByText('Contato');

        expect(linkSobre).toBeInTheDocument();
        expect(linkPrivacidade).toBeInTheDocument();
        expect(linkContato).toBeInTheDocument();
    });

    it('deve exibir o ano atual nos direitos autorais', () => {
        render(<Footer />);
        const anoAtual = new Date().getFullYear().toString();

        const copyrightText = screen.getByText(new RegExp(anoAtual, 'i'));
        expect(copyrightText).toBeInTheDocument();
    });
});