# Cypress API Automation with Cucumber

This project demonstrates how to use Cypress with Cucumber for API automation testing. The project structure includes feature files, step definitions, and test data.

## Project Structure

- **Feature Files**: Located in the `cypress/e2e/cucumber/feature` folder.
- **Step Definitions**: Located in the `cypress/stepDefinitions` folder with same folder name as feature file of the testcase to synchronise step definition file.
- **Test Data**: Located in the `cypress/fixtures/apiData.json` file.

## Prerequisites

### Installation

1. Install Cypress and Cucumber preprocessor plugin:

   ```bash
   npm install cypress@13.6.0
   npm install --save-dev cypress-cucumber-preprocessor
   ```


3. Add the Cucumber preprocessor to your Cypress plugins:
**cypress/plugins/index.js**

  ```const cucumber = require('cypress-cucumber-preprocessor').default;

  module.exports = (on, config) => {
    on('file:preprocessor', cucumber());
  };
```

4. Configure the plugin using cosmiconfig. Add the following section to your
 {} package.json:
 ```{
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true
  }
}
```

### Plugin Installation

1. Install the following VS Code plugins:
> Cucumber (Gherkin) Full Support

> Cucumber Step Definition Generator

## Running Tests

1. To run the tests in the command line in headless mode:
> npx cypress run
2. To open Cypress and run tests in a specific browser:
 >npx cypress open



