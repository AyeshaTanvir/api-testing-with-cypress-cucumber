import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const apiUrl = '/api/users';

beforeEach(() => {
    cy.fixture('apiData').as('data');
});

Given('I have a valid single user API endpoint', () => {
    cy.wrap(apiUrl).as('apiEndpoint');
});

When('I send a GET request to the endpoint with a valid user ID', () => {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'GET',
            url: `${url}/2`,
        }).as('apiResponse');
    });
});

When('I send a GET request to the endpoint with an invalid user ID', () => {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'GET',
            url: `${url}/23`,
            failOnStatusCode: false, // Prevent Cypress from failing on 404
        }).as('apiResponse');
    });
});

Then('I should receive a 200 status code', () => {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(200);
    });
});

Then('the response should contain the single user details', () => {
    cy.get('@data').then((data) => {
        cy.get('@apiResponse').then((response) => {
            expect(response.body.data).to.have.property('id', 2);
            expect(response.body.data).to.have.property('email', data.singleUserEmail);
            expect(response.body.data).to.have.property('first_name', data.firstName);
            expect(response.body.data).to.have.property('last_name', data.lastName);
            expect(response.body.data).to.have.property('avatar', data.avatar);
            expect(response.body.support).to.have.property('url', data.singleURL);
            expect(response.body.support).to.have.property('text', data.text);
        });
    });
});

Then('I should receive a 404 status code', () => {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(404);
    });
});

Then('the response body should be empty', () => {
    cy.get('@apiResponse').then((response) => {
        expect(response.body).to.deep.eq({});
    });
});
