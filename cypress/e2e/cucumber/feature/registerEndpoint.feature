Feature: Verify the registration functionality of the application

  Background:
    Given I have a valid registration API endpoint

  Scenario: Verify successful registration with valid data
    When I send a POST request to the endpoint with valid registration data
    Then I should receive a 200 status code
    And the response should contain a token
    And the response should contain the registered user details

  Scenario: Verify registration with missing required fields
    When I send a POST request to the endpoint with missing required fields
    Then I should receive a 400 status code
    And the response should contain an error message indicating missing fields

  Scenario: Verify registration with invalid email format
    When I send a POST request to the endpoint with an invalid email format
    Then I should receive a 400 status code
    And the response should contain an error message indicating an invalid email format
