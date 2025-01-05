Feature: Verify the delayed response functionality of the API

  Background:
    Given I have a valid delayed API endpoint

  Scenario: Verify successful response with delayed data
    When I send a GET request to the endpoint
    Then I should receive a 200 status code
    And the response should contain a list of users
    And the response should be received after a delay

  Scenario: Verify invalid response for incorrect request method
    When I send a POST request to the endpoint
    Then I should receive a 201 status code
    And the response should contain an error message
