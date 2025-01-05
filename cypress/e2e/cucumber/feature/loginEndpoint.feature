Feature: Verify the login functionality of the application

  Background:
    Given I have a valid login API endpoint

  Scenario: Verify successful login with valid credentials
    When I send a POST request to the endpoint with valid credentials
    Then I should receive a 200 status code
    And the response should contain a token

  Scenario: Verify unsuccessful login with invalid credentials
    When I send a POST request to the endpoint with invalid credentials
    And I send a POST request to the endpoint with missing credentials
    Then I should receive a 400 status code
    And The response should contain an error message
