describe('Food Database Page', () => {
  const mockFoods = [
    { id: '1', name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
    { id: '2', name: 'Banana', calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3 }
  ];

  beforeEach(() => {
    cy.intercept('GET', '/api/foods', mockFoods).as('getFoods');
    cy.visit('/database');
  });

  it('displays the list of foods after loading', () => {
    cy.contains('Food Database');
    cy.get('.food-list').within(() => {
      cy.contains('Apple');
      cy.contains('Banana');
    });
  });

  it('filters foods by search term', () => {
    cy.get('input[placeholder="Search foods..."]').type('apple');
    cy.get('.food-list').within(() => {
      cy.contains('Apple').should('exist');
      cy.contains('Banana').should('not.exist');
    });
  });

  it('opens modal and adds a new food item', () => {
    const newFood = {
      id: '3',
      name: 'Orange',
      calories: 47,
      protein: 0.9,
      carbs: 12,
      fats: 0.1
    };

    cy.intercept('POST', '/api/foods', {
      statusCode: 200,
      body: newFood
    }).as('addFood');

    cy.contains('Add New Food').click();
    cy.get('input[name="name"]').type(newFood.name);
    cy.get('input[name="calories"]').type(String(newFood.calories));
    cy.get('input[name="protein"]').type(String(newFood.protein));
    cy.get('input[name="carbs"]').type(String(newFood.carbs));
    cy.get('input[name="fats"]').type(String(newFood.fats));
    cy.contains('Add Food').click();

    cy.wait('@addFood');
    cy.get('.food-list').within(() => {
      cy.contains('Orange');
    });
  });
});
