describe('Profile Page', () => {
  const mockProfile = {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: 28,
    gender: 'female',
    height: 165,
    weight: 60,
    activityLevel: 'moderate',
    goal: 'maintain',
    dailyCalorieTarget: 2200,
  };

  beforeEach(() => {
    cy.intercept('GET', '/api/profile', { statusCode: 200, body: mockProfile }).as('getProfile');
    cy.visit('/profile');
  });

  it('displays the user profile after loading', () => {
    cy.wait('@getProfile');
    cy.contains('Your Profile');
    cy.contains('Jane Doe');
    cy.contains('Age: 28');
    cy.contains('Weight: 60 kg');
    cy.contains('Daily Calorie Target: 2200 kcal');
  });

  it('enters edit mode and displays editable fields', () => {
    cy.wait('@getProfile');
    cy.contains('Edit Profile').click();

    cy.get('input[name="name"]').should('have.value', 'Jane Doe');
    cy.get('input[name="age"]').should('have.value', '28');
    cy.get('input[name="weight"]').should('have.value', '60');
    cy.get('select[name="gender"]').should('have.value', 'female');
    cy.get('select[name="goal"]').should('have.value', 'maintain');
  });

  it('updates the profile and returns to view mode', () => {
    cy.wait('@getProfile');
    cy.contains('Edit Profile').click();

    cy.get('input[name="weight"]').clear().type('62');

  });

  it('handles API failure and shows default profile', () => {
    cy.intercept('GET', '/api/profile', { forceNetworkError: true }).as('getProfileFail');
    cy.visit('/profile');
    cy.wait('@getProfileFail');

    cy.contains('John Doe');
    cy.contains('Age: 30');
    cy.contains('Weight: 75 kg');
  });
});
