# 🚧 Vitrine B2B - Dashboard de E-commerce

> **Status:** Em desenvolvimento (Work In Progress) 🚀

Um catálogo digital corporativo (B2B) construído com foco em alta performance, gerenciamento de estado moderno e arquitetura escalável. Este projeto simula um ambiente real de distribuidora de suprimentos, separando as responsabilidades de catálogo estático e precificação dinâmica.

---

## 🛠️ Tecnologias e Arquitetura

Este projeto foi desenhado utilizando os padrões mais recentes do ecossistema React, substituindo o tradicional Client-Side Rendering por Server Components, e adotando ferramentas mais leves para gerenciamento de estado.

*   **Next.js (App Router):** Roteamento moderno e renderização híbrida.
*   **TypeScript:** Tipagem estática rigorosa para garantir consistência de dados (Contratos de Interface).
*   **Tailwind CSS (v4):** Estilização utilitária de ponta a ponta.
*   **TanStack Query (React Query):** Gerenciamento exclusivo do *Server State*. Responsável pelo cacheamento inteligente dos produtos, tentativas de reconexão e status de carregamento, substituindo a necessidade de reducers complexos para consumo de APIs.
*   **Zustand:** Gerenciamento de *Client State*. Utilizado de forma enxuta e sem boilerplate para controlar a gaveta lateral (Slide-over) e a lógica matemática do carrinho de orçamentos.

---

## 🏗️ Decisões Arquiteturais

Para simular um ambiente corporativo real de e-commerce e demonstrar domínio sobre arquitetura de software, o fluxo de dados foi propositalmente desacoplado:

### 1. Separação de Microsserviços Simulados (Next.js Route Handlers)
*   **`/api/products` (Simulação de PIM):** Devolve apenas informações estáticas (Nome, Categoria, Descrição). Possui *delay* artificial simulando a busca em banco de dados e foi desenhado para aceitar um cache de longa duração.
*   **`/api/stock` (Simulação de ERP):** Recebe o ID do produto e devolve informações altamente voláteis (Preço e Estoque em tempo real).

### 2. Padrão "Contract-First"
O desenvolvimento foi iniciado pela camada de dados. Interfaces rigorosas no TypeScript (`src/types/product.ts`) foram estabelecidas antes da construção visual, garantindo que os componentes da interface sejam apenas "consumidores" cegos e não quebrem com mudanças futuras na API.

---

## ⚙️ Como rodar o projeto localmente

Como o projeto está em desenvolvimento ativo, você pode acompanhar os avanços clonando e rodando o repositório em sua máquina:

1. Clone o repositório:
```bash
git clone https://github.com/Rogerio-Leal/b2b-ecommerce-dashboard.git
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse `http://localhost:3000` em seu navegador.
