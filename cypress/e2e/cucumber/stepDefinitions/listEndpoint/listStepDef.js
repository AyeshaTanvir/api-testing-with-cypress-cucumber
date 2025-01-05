import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const endpoints = {
    users: '/api/users?page=',
    resources: '/api/unknown',
};

Given('I have a valid list of users API endpoint', () => {
    cy.wrap(endpoints.users).as('apiEndpoint');
});

Given('I have a valid list of resources API endpoint', () => {
    cy.wrap(endpoints.resources).as('apiEndpoint');
});

When('I send a GET request to the endpoint with a valid page number', function () {
    cy.get('@apiEndpoint').then((url) => {
        cy.request({
            method: 'GET',
            url: `${url}/2`,
        }).as('apiResponse');
    });
});


Then('I should receive a 200 status code', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(200);
    });
});

Then('the response should contain a list of users', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.greaterThan(0);
    });
});

Then('each user should have an id, email, first_name, last_name, and avatar', function () {
    cy.get('@apiResponse').then((response) => {
        response.body.data.forEach((user) => {
            expect(user).to.have.property('id').that.is.a('number');
            expect(user).to.have.property('email').that.is.a('string');
            expect(user).to.have.property('first_name').that.is.a('string');
            expect(user).to.have.property('last_name').that.is.a('string');
            expect(user).to.have.property('avatar').that.is.a('string');
        });
    });
});

Then('the response should contain a list of resources', function () {
    cy.get('@apiResponse').then((response) => {
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.greaterThan(0);
    });
});

Then('each resource should have an id, name, year, color, and pantone_value', function () {
    cy.get('@apiResponse').then((response) => {
        response.body.data.forEach((resource) => {
            expect(resource).to.have.property('id').that.is.a('number');
            expect(resource).to.have.property('name').that.is.a('string');
            expect(resource).to.have.property('year').that.is.a('number');
            expect(resource).to.have.property('color').that.is.a('string');
            expect(resource).to.have.property('pantone_value').that.is.a('string');
        });
    });
});
