Cypress.Commands.add('addFoodItem', (name: string, calories: number) => {
  cy.get('[data-testid="food-name-input"]', { timeout: 8000 }).should('be.visible').clear().type(name);
  cy.get('[data-testid="calories-input"]', { timeout: 8000 }).should('be.visible').clear().type(calories.toString());
  cy.get('[data-testid="submit-button"]', { timeout: 8000 }).should('be.enabled').click();
});

Cypress.Commands.add('deleteFoodItem', (name: string) => {
  // Найдём карточку с продуктом, содержащую нужное имя
  cy.get('[data-testid="food-item"]', { timeout: 8000 })
    .contains(name)
    .parents('[data-testid="food-item"]') // вернуться к контейнеру продукта
    .find('[data-testid="delete-button"]')
    .should('be.visible')
    .click();
});
