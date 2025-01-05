# Cypress API Automation with Cucumber

This project demonstrates how to use Cypress with Cucumber for API automation testing. The project structure includes feature files, step definitions, and test data.

## Project Structure

- **Feature Files**: Located in the `cypress/e2e/cucumber/feature` folder.
- **Step Definitions**: Located in the `cypress/stepDefinitions` folder.
- **Test Data**: Located in the `cypress/fixtures/apiData.json` file.

## Prerequisites

### Installation

1. Install Cypress and Cucumber preprocessor plugin:
   ```bash
   npm install --save-dev cypress cypress-cucumber-preprocessor

2. Add the Cucumber preprocessor to your Cypress plugins:
**cypress/plugins/index.js**
> const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
};

 3. Configure the plugin using cosmiconfig. Add the following section to your
 {} package.json:
 ```{
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true
  }
}```

### Plugin Installation

1. Install the following VS Code plugins:
> Cucumber (Gherkin) Full Support
> Cucumber Step Definition Generator

## Running Tests

1. To run the tests in the command line:
> npx cypress run
2. To open Cypress and run tests in a specific browser:
 >npx cypress open

## Synchronizing Step Definitions and Feature Files

After writing the step definitions and feature files and running them successfully, you can edit the configuration to synchronize step definitions and feature files.

1. Go to Cucumber Features and Cucumber Glue in your VS Code settings to configure synchronization.

* *This code is written by Syeda Ayesha Tanvir.* *
* *© 2025 Syeda Ayesha Tanvir. All rights reserved.* *

