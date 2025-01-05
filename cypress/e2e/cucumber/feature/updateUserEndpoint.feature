Feature: Verify the update user endpoint functionality of the API

  Background:
    Given I have a valid update user API endpoint

  Scenario: Update a user with valid data using PUT
    When I send a PUT request to the endpoint with valid user data
    Then I should receive a 200 status code
    And the response should contain the updated user details
    And the response should contain a timestamp

  Scenario: Update a user with valid data using PATCH
    When I send a PATCH request to the endpoint with valid partial user data
    Then I should receive a 200 status code
    And the response should contain the updated user details
    And the response should contain a timestamp

  Scenario: Update a user with missing or invalid fields
    When I send a PUT request to the endpoint with invalid or missing fields
    Then I should receive a 200 status code
    But the response should contain an error message
