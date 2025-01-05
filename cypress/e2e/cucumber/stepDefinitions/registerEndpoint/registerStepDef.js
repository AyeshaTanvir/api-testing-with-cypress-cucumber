import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const apiUrl = '/api/register';

beforeEach(() => {
  cy.fixture('apiData').as('data');
});

Given('I have a valid registration API endpoint', () => {
  cy.wrap(apiUrl).as('apiEndpoint');
});

When('I send a POST request to the endpoint with valid registration data', () => {
  cy.get('@data').then((data) => {
    cy.get('@apiEndpoint').then((url) => {
      cy.request({
        method: 'POST',
        url: url,
        body: {
          email: data.registerEmail,
          password: data.registerPassword,
        },
      }).as('apiResponse');
    });
  });
});

When('I send a POST request to the endpoint with missing required fields', () => {
  cy.get('@data').then((data) => {
    cy.get('@apiEndpoint').then((url) => {
      cy.request({
        method: 'POST',
        url: url,
        failOnStatusCode: false,
        body: {
          email: data.registerEmail,
        },
      }).as('apiResponse');
    });
  });
});

When('I send a POST request to the endpoint with an invalid email format', () => {
  cy.get('@data').then((data) => {
    cy.get('@apiEndpoint').then((url) => {
      cy.request({
        method: 'POST',
        url: url,
        failOnStatusCode: false,
        body: {
          email: data.invalidEmailFormat,
          password: data.registerPassword,
        },
      }).as('apiResponse');
    });
  });
});

Then('I should receive a 200 status code', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then('the response should contain a token', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('token');
});
});

Then('the response should contain the registered user details', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('token');
  });
});

Then('I should receive a 400 status code', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(400);
  });
});

Then('the response should contain an error message indicating missing fields', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.match(/Missing password/);
  });
});

Then('the response should contain an error message indicating an invalid email format', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.match(/Note: Only defined users succeed registration/);
  });
});
