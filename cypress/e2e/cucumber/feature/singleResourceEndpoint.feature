Feature: Verify the single resource endpoint functionality of the API

  Background:
    Given I have a valid single resource API endpoint

  Scenario: Verify successful response with valid resource ID
    When I send a GET request to the endpoint with a valid resource id
    Then I should receive a 200 status code in valid resource api
    And the response should contain the single resource details

  Scenario: Verify unsuccessful response with invalid resource ID
    When I send a GET request to the endpoint with an invalid resource id
    Then I should receive a 404 status code in an invalid resource api
    And the response body should be empty
