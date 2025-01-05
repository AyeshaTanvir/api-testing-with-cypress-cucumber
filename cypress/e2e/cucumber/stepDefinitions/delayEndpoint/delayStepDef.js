import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const apiUrl = '/api/users?delay=3';

Given('I have a valid delayed API endpoint', () => {
    cy.wrap(apiUrl).as('apiEndpoint');
});

When('I send a GET request to the endpoint', () => {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'GET',
            url: url,
        }).as('apiResponse');
    });
});

When('I send a POST request to the endpoint', () => {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'POST',
            url: url,
            failOnStatusCode: false,
        }).as('apiResponse');
    });
});

Then('I should receive a 200 status code', () => {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(200);
    });
});

Then('the response should contain a list of users', () => {
    cy.get('@apiResponse').then((response) => {
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');
    });
});

Then('the response should be received after a delay', () => {
    const apiStartTime = Date.now();
      cy.request('GET', '/api/users?delay=3').then((response) => {
        const apiEndTime = Date.now();
        const elapsedTime = apiEndTime - apiStartTime;
        expect(elapsedTime).to.be.gte(3000); // Check if the elapsed time is greater than or equal to 3000 ms
    });
});
  

Then('I should receive a 201 status code', () => {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(201);
        assert.isNotNull(response, 'Response should not be null');
        ;
    });
});

Then('the response should contain an error message', () => {
    cy.get('@apiResponse').then((response) => {
        expect(response.body.error).to.match(/undefined/);
    });
});
