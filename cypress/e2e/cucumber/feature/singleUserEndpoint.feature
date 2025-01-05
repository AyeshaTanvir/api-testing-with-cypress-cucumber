Feature: Verify the single user endpoint functionality of the API

  Background:
    Given I have a valid single user API endpoint

  Scenario: Verify successful response with valid user ID
    When I send a GET request to the endpoint with a valid user ID
    Then I should receive a 200 status code
    And the response should contain the single user details

  Scenario: Verify unsuccessful response with invalid user ID
    When I send a GET request to the endpoint with an invalid user ID
    Then I should receive a 404 status code
    And the response body should be empty
