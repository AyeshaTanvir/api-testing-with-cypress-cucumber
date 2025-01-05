Feature: Verify the list of users and resources endpoint functionality of the API

  Scenario: Verify successful response of the list of users endpoint
    Given I have a valid list of users API endpoint
    When I send a GET request to the endpoint with a valid page number
    Then I should receive a 200 status code
    And the response should contain a list of users
    And each user should have an id, email, first_name, last_name, and avatar

  Scenario: Verify successful response of the list of resources endpoint
    Given I have a valid list of resources API endpoint
    When I send a GET request to the endpoint
    Then I should receive a 200 status code
    And the response should contain a list of resources
    And each resource should have an id, name, year, color, and pantone_value
