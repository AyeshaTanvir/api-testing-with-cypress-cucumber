import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const apiUrl = 'https://reqres.in/api/users';

Given('I have a valid create user API endpoint', function () {
    cy.wrap(apiUrl).as('apiEndpoint');
});

When('I send a POST request to the endpoint with valid user data', function () {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'POST',
            url: url,
            body: {
                name: 'Ayesha',
                job: 'QA Automation Engineer',
            },
        }).as('apiResponse');
    });
});

When('I send a POST request to the create user endpoint with missing required fields', function () {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'POST',
            url: url,
            body: {
                name: 'Ayesha',
            },
        }).as('apiResponse');
    });
});

When('I send a POST request to the endpoint with empty or null values', function () {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'POST',
            url: url,
            body: {
                name: null,
                job: '',
            },
        }).as('apiResponse');
    });
});

Then('I should receive a 201 status code', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(201);
    });
});

Then('the response should contain the generated id and timestamp', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.body).to.have.property('id').that.is.a('string');
        expect(response.body).to.have.property('createdAt').that.is.a('string');
    });
});

Then('the user details should reflect the provided empty or null values', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.body).to.have.property('name', null);
        expect(response.body).to.have.property('job', '');
    });
});
