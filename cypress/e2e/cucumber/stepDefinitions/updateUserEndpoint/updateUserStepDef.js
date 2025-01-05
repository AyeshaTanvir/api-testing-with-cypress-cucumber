import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const validApiUrl = '/api/users/2';
const invalidApiUrl = '/api/users/999';

Given('I have a valid update user API endpoint', function () {
    cy.wrap(validApiUrl).as('apiEndpoint');
});

When('I send a PUT request to the endpoint with valid user data', function () {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'PUT',
            url: url,
            body: {
                name: 'Alice',
                job: 'Engineer',
            },
        }).as('apiResponse');
    });
});

When('I send a PATCH request to the endpoint with valid partial user data', function () {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'PATCH',
            url: url,
            body: {
                job: 'Engineer',
            },
        }).as('apiResponse');
    });
});

When('I send a PUT request to the endpoint with invalid or missing fields', function () {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'PUT',
            url: url,
            failOnStatusCode: false,
            body: {
                name: null, // Invalid field
            },
        }).as('apiResponse');
    });
});

Then('I should receive a 200 status code', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(200);
    });
});

Then('the response should contain the updated user details', function () {
    cy.get('@apiResponse').then((response) => {
        cy.log(JSON.stringify(response.body)); // Log the response body for debugging
        if (response.requestHeaders['method'] === 'PUT') {
            expect(response.body).to.have.property('name').that.is.a('string');
        }
        else if (response.requestHeaders['method'] === 'PATCH') {
        expect(response.body).to.have.property('job').that.is.a('string');
        }
    });
});

Then('the response should contain a timestamp', function () {
    cy.get('@apiResponse').then((response) => {
        cy.log(JSON.stringify(response.body)); // Log the response body for debugging
        expect(response.body).to.have.property('updatedAt').that.is.a('string');
        const updatedAt = new Date(response.body.updatedAt);
        expect(updatedAt.toString()).to.not.eq('Invalid Date'); // Valid timestamp
    });
});

Then('the response should contain an error message', function () {
    cy.get('@apiResponse').then((response) => {
        cy.log(JSON.stringify(response.body)); // Log the response body for debugging
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.a('string');
    });
});