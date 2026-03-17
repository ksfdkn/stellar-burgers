const INGREDIENTS = {
  BUN: "Краторная булка N-200i",
  MAIN: "Биокотлета из марсианской Магнолии"
}

describe('Конструктор бургера — интеграционные тесты', () => {
  describe('Работа конструктора БЕЗ авторизации', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
      cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');

      cy.visit('/');

      cy.waitForAppLoad();
    });

    afterEach(() => {
      cy.logout();
    });

    it('отображает список ингредиентов с корректными data‑cy атрибутами', () => {
      cy.get('[data-cy="ingredient-item"]').contains(INGREDIENTS.BUN).should('be.visible');
      cy.get('[data-cy="ingredient-item"]').contains(INGREDIENTS.MAIN).should('be.visible');
    });

    describe('Работа модального окна', () => {
      it('открывает модальное окно ингредиента при клике', () => {
        cy.openIngredientModal(INGREDIENTS.BUN);
      });

      it('закрывает модальное окно по клику на крестик', () => {
        cy.openIngredientModal(INGREDIENTS.BUN);
        cy.closeModalByButton();
      });

      it('закрывает модальное окно по клику на оверлей', () => {
        cy.openIngredientModal(INGREDIENTS.BUN);
        cy.closeModalByOverlay();
      });

      it('закрывает модальное окно по нажатию клавиши Esc', () => {
        cy.openIngredientModal(INGREDIENTS.MAIN);
        cy.closeModalByEsc();
      });

      it('отображает в модальном окне все данные ингредиента: изображение, название и КБЖУ', () => {
        cy.openIngredientModal(INGREDIENTS.BUN);

        cy.get('[data-cy="modal-content"]').within(() => {
          cy.get('img').should('be.visible');
          cy.contains('h3', INGREDIENTS.BUN).should('be.visible');

          cy.contains('Калории, ккал').should('be.visible');
          cy.contains('420').should('be.visible');

          cy.contains('Белки, г').should('be.visible');
          cy.contains('8').should('be.visible');

          cy.contains('Жиры, г').should('be.visible');
          cy.contains('24').should('be.visible');

          cy.contains('Углеводы, г').should('be.visible');
          cy.contains('53').should('be.visible');
        });

        cy.closeModalByButton();
      });
    });

    describe('Процесс создания заказа без авторизации', () => {
      it('отправляет на страницу логина', () => {
        cy.get('[data-cy="ingredient-item"]')
          .contains(INGREDIENTS.BUN)
          .parent()
          .find('button')
          .click();

        cy.get('[data-cy="ingredient-item"]')
          .contains(INGREDIENTS.MAIN)
          .parent()
          .find('button')
          .click();

        cy.get('[data-cy="constructor"]').get('[data-cy="constructor-element"]').should('have.length', 3);

        cy.get('[data-cy="order-button"]').find('button').click();

        cy.location('pathname').should('eq', '/login');
      });
    });
  });

  describe('Работа конструктора c авторизацией', () => {
    beforeEach(() => {
      cy.login();

      cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
      cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');

      cy.visit('/');

      cy.waitForAppLoad();
    });

    afterEach(() => {
      cy.logout();
    });

    describe('Процесс создания заказа с авторизацией', () => {
      it('оформляет заказ и отображает модальное окно с номером заказа', () => {
        cy.wait('@getUser');

        cy.get('[data-cy="ingredient-item"]')
          .contains(INGREDIENTS.BUN)
          .parent()
          .find('button')
          .click();

        cy.get('[data-cy="ingredient-item"]')
          .contains(INGREDIENTS.MAIN)
          .parent()
          .find('button')
          .click();

        cy.get('[data-cy="constructor"]').get('[data-cy="constructor-element"]')
          .should('have.length', 3);

        cy.get('[data-cy="order-button"]').find('button').click();

        cy.wait('@createOrder');

        cy.get('[data-cy="modal"]').should('be.visible');

        cy.get('[data-cy="order-number"]').should('contain', '12456');

        cy.get('[data-cy="order-icon"]').should('be.visible');

        cy.get('[data-cy="order-title"]').should('contain', 'Ваш заказ начали готовить');

        cy.closeModalByButton();

        cy.get('[data-cy="constructor"]').contains('Выберите булки').should('exist');
      });
    });
  });
});
