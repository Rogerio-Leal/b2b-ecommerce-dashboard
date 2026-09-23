describe('Fluxo de Compras B2B', () => {
  
  it('Visitante (Deslogado): deve ver o aviso de login e não o botão de adicionar', () => {
    cy.visit('http://localhost:3000');
    
    // Pesquisa o produto
    cy.get('input[placeholder="Buscar produtos pelo nome..."]').type('Detergente');
    
    // Valida a regra de negócio do B2B
    cy.contains('Faça login para ver o preço').should('be.visible');
    // Garante que o botão de compra realmente não existe para quem não tem conta
    cy.contains('button', 'Adicionar').should('not.exist');
  });

  it('Cliente B2B (Autenticado): deve conseguir adicionar o produto ao orçamento', () => {
    // Intercetamos a rota do NextAuth e injetamos uma sessão falsa com os seus dados
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        user: { name: 'Rogério Leal', email: 'rogerionarcizoleal@gmail.com' },
        expires: '9999-12-31T23:59:59.999Z'
      }
    }).as('mockSession');

    cy.visit('http://localhost:3000');
    
    // Aguardamos que o mock de autenticação seja aplicado antes de interagir com a tela
    cy.wait('@mockSession');

    // Pesquisa o produto novamente
    cy.get('input[placeholder="Buscar produtos pelo nome..."]').type('Detergente');
    
    // Como estamos "logados", o botão Adicionar deve aparecer. Clicamos nele!
    cy.contains('button', 'Adicionar').click();
    
    // Validamos se a gaveta abriu e se o produto está lá dentro
    cy.contains('Resumo do Pedido').should('be.visible');
    cy.contains('Detergente').should('be.visible');
  });
});