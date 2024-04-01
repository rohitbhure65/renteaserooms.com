describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/'); // Replace with your register page URL
    cy.visit('/auth/register'); // Replace with your register page URL
  });

  it('should allow user to fill out the form and submit', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('jsdfdfsdf@example.com');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="role"]').type('User');
    cy.get('input[name="city"]').type('New York');
    cy.fixture('profile.jpg').then((fileContent:any) => {
      // Attach the file to the input field
      cy.get('input[name="profileImg"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'profile.jpg',
        mimeType: 'image/jpeg'
      });
    });
  })
});
