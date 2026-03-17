/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  cy.setCookie('accessToken', 'mock-access-token');
  window.localStorage.setItem('refreshToken', 'mock-refresh-token');
});

Cypress.Commands.add('logout', () => {
  cy.clearCookie('accessToken');
  window.localStorage.removeItem('refreshToken');
});

Cypress.Commands.add('waitForAppLoad', () => {
  cy.wait('@getIngredients');
});

Cypress.Commands.add('openIngredientModal', (ingredientName: string) => {
  cy.get('[data-cy="ingredient-item"]')
    .contains(ingredientName)
    .click();
  cy.get('[data-cy="modal"]', { timeout: 10000 }).should('be.visible');
  cy.get('[data-cy="modal-close-button"]').should('be.visible');
});

Cypress.Commands.add('closeModalByButton', () => {
  cy.get('[data-cy="modal-close-button"]').click();
  cy.verifyModalClosed();
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get('[data-cy="modal-overlay"]').click({ force: true });
  cy.verifyModalClosed();
});

Cypress.Commands.add('closeModalByEsc', () => {
  cy.get('body').type('{esc}');
  cy.verifyModalClosed();
});

Cypress.Commands.add('verifyModalClosed', () => {
  cy.location('pathname').should('eq', '/');
  cy.get('[data-cy="modal"]').should('not.exist');
});
