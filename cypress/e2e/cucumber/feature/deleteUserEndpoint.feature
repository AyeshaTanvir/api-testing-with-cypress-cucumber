Feature: Verify the delete user endpoint functionality of the API

  Background:
    Given I have a valid delete user API endpoint

  Scenario: Delete a user with a valid id
    When I send a DELETE request to the endpoint with a valid user id
    Then I should receive a 204 status code
    And the response body should be empty

  Scenario: Test deleting a user with invalid or non-existent id
    When I send a DELETE request to the endpoint with an invalid user id
    Then I should receive a 204 status code
    But the response should contain an error message