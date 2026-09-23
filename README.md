# 🏬 Vitrine B2B - Catálogo & Dashboard de E-Commerce

> **Status:** Concluído / Em Produção 🚀

Um catálogo digital corporativo (B2B) de alta performance, construído com as tecnologias mais modernas do ecossistema React/Next.js. O sistema simula um ambiente real de distribuidora de suprimentos, aplicando separação de microsserviços para dados estáticos e precificação dinâmica, controle estrito de autenticação e uma suíte completa de testes automatizados (Unitários e E2E).

---

## 🛠️ Tecnologias e Arquitetura

Este projeto foi desenvolvido adotando as melhores práticas de arquitetura de software, desacoplando o estado do servidor, o estado do cliente e as regras de autorização:

* **Next.js (App Router):** Roteamento moderno, componentes de servidor (RSC) e renderização híbrida.
* **TypeScript:** Tipagem estática rigorosa para garantir consistência em todos os contratos de interface.
* **Tailwind CSS (v4):** Estilização utilitária responsiva e otimizada.
* **NextAuth.js:** Gerenciamento seguro de sessões de utilizador e controle de acesso B2B.
* **TanStack Query (React Query):** Gerenciamento de *Server State* (cacheamento, re-fetch automático e tratamento de loading/erro para APIs voláteis).
* **Zustand:** Gerenciamento enxuto e performático de *Client State* para controle do carrinho de orçamentos e estado da gaveta lateral.
* **Jest & React Testing Library:** Testes unitários e de integração de componentes e stores.
* **Cypress:** Testes End-to-End (E2E) simulando a jornada completa do usuário no navegador real.

---

## 🎯 Funcionalidades Principais

1. **Catálogo B2B Protegido:** Visualização de produtos disponível para todos, com **restrição de visibilidade de preços e botões de compra apenas para usuários autenticados**.
2. **Busca e Filtros Instantâneos:** Barra de pesquisa em tempo real por nome e categoria de produtos.
3. **Orçamento em Tempo Real (Quote Drawer):**
   * Adição/remoção de itens com cálculo automático do total via Zustand e React Query.
   * Modificação de quantidades diretamente na gaveta.
4. **Páginas Institucionais:** Sobre Nós, Política de Privacidade e Formulário de Contato.
5. **Integração WhatsApp:** Botão flutuante para atendimento direto ao cliente B2B.

---

## 🏗️ Decisões Arquiteturais

Para simular uma estrutura corporativa real, o fluxo de dados foi propositalmente separado:

### 1. Separação de Microsserviços Simulados (Route Handlers)
* **`/api/products` (Simulação de PIM):** Devolve dados estáticos (Nome, Categoria, Descrição e Imagem). Configurado para aceitar cache de longa duração.
* **`/api/stock` (Simulação de ERP):** Recebe o ID do produto e retorna informações altamente voláteis (Preço e Estoque em tempo real).

### 2. Padrão "Contract-First"
Todas as interfaces de dados (`src/types/product.ts`) foram definidas antes da implementação visual. Os componentes consomem estes contratos de forma agnóstica, facilitando refatorações futuras na API.

---

## 🧪 Suíte de Testes Automatizados

A aplicação conta com uma cobertura de testes robusta para garantir a estabilidade das regras de negócio.

### 1. Testes Unitários e de Integração (Jest)
* **Componentes Visual & Interação:** Validação de renderização e preenchimento de inputs com `@testing-library/user-event`.
* **Estado Global (Zustand):** Testes diretos na loja `useQuoteStore` validando adição de itens e alteração de quantidades sem duplicação de IDs.
* **Mocks de Contexto:** Simulação controlada de sessões do `NextAuth` e provedores do `QueryClientProvider`.

### 2. Testes End-to-End (Cypress)
* **Jornada do Visitante (Deslogado):** Garante que usuários anônimos vejam o alerta `"Faça login para ver o preço"` e que o botão de compra permaneça oculto no DOM.
* **Jornada do Cliente B2B (Autenticado):** Utilização de `cy.intercept()` para injetar sessões mockadas na rota `/api/auth/session`, validando a pesquisa do produto, o clique em `"Adicionar"` e a abertura automática da gaveta de orçamento com o item correto.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (v18 ou superior)
* npm, yarn ou pnpm

### Passos:

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/b2b-ecommerce-dashboard.git
   cd b2b-ecommerce-dashboard
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz com as chaves necessárias:
   ```env
   NEXTAUTH_SECRET=sua_chave_secreta
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:3000` no seu navegador.

---

## 📋 Comandos de Teste

* **Executar suíte de testes unitários (Jest):**
  ```bash
  npm run test
  ```

* **Abrir interface interativa de testes E2E (Cypress):**
  ```bash
  npx cypress open
  ```
  *(Certifique-se de que o servidor local `npm run dev` está ativo ao rodar os testes do Cypress)*.

---

## 🌐 Deploy

O projeto está otimizado para deploy contínuo na **Vercel**. O pipeline de compilação realiza a minificação automática do código via compilador SWC do Next.js.
