import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const validResourceApiEndpoint = '/api/unknown';

Given('I have a valid single resource API endpoint', function () {
  // Store the base URL for future requests
  cy.wrap(validResourceApiEndpoint).as('apiEndpoint');
});

When('I send a GET request to the endpoint with a valid resource id', function () {
  cy.get('@apiEndpoint').then((url) => {
    cy.request({
      method: 'GET',
      url: `${url}/2`, // Valid resource ID
    }).as('apiResponse');
  });
});

When('I send a GET request to the endpoint with an invalid resource id', function () {
  cy.get('@apiEndpoint').then((url) => {
    cy.request({
      method: 'GET',
      url: `${url}/23`, // Invalid resource ID
      failOnStatusCode: false, 
    }).as('apiResponse');
  });
});

Then('I should receive a 200 status code in valid resource api', function () {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then('the response should contain the single resource details', function () {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('data'); // Ensure data exists
    expect(response.body.data).to.have.property('id', 2); // Check valid ID
    expect(response.body.data).to.have.property('name').that.is.a('string');
    expect(response.body.data).to.have.property('year').that.is.a('number');
    expect(response.body.data).to.have.property('color').that.is.a('string');
    expect(response.body.data).to.have.property('pantone_value').that.is.a('string');
  });
});

Then('I should receive a 404 status code in an invalid resource api', function () {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(404);
  });
});

Then('the response body should be empty', function () {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.deep.eq({});
  });
});
