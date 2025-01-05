import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const validApiUrl = '/api/users/2';
const invalidApiUrl = '/api/users/9999999999999999999999';

Given('I have a valid delete user API endpoint', function () {
    cy.wrap(validApiUrl).as('apiEndpoint');
});

When('I send a DELETE request to the endpoint with a valid user id', function () {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'DELETE',
            url: url,
        }).as('apiResponse');
    });
});

When('I send a DELETE request to the endpoint with an invalid user id', function () {
    cy.wrap(invalidApiUrl).then((url) => {
        cy.request({
            method: 'DELETE',
            url: url,
            failOnStatusCode: false,
        }).as('apiResponse');
    });
});

Then('I should receive a 204 status code', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(204);
    });
});

Then('the response body should be empty', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.body).to.be.empty;
    });
});

Then('I should receive a 204 status code', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(204);
    });
});

Then('the response should contain an error message', function () {
    cy.get('@apiResponse').then((response) => {
        cy.log(JSON.stringify(response.body)); // Log the response body for debugging
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.a('string');
    });
});