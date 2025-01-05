Feature: Verify the create user endpoint functionality of the API

  Background:
    Given I have a valid create user API endpoint

  Scenario: Verify successful response with valid user data
    When I send a POST request to the endpoint with valid user data
    Then I should receive a 201 status code

  Scenario: Verify response with missing required fields
    When I send a POST request to the create user endpoint with missing required fields
    Then I should receive a 201 status code

  Scenario: Verify response with empty or null values
    When I send a POST request to the endpoint with empty or null values
    Then I should receive a 201 status code
    And the response should contain the generated id and timestamp
    But the user details should reflect the provided empty or null values
