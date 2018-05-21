# Technical testing exercise

Automation test cases for the Mimecast login page and some additional functionalities.

#### Implementation details

The implementation of the tests is done with Cucumber/Gherkin, Protractor and Chai. 
Each test except for the one in Case 6 is defined by steps as atomic as possible, which is the reason why I've divided Case 2 into 4 different Scenarios.

### Prerequisites

To run the tests you will have to install the following:

```
npm install
npm install protractor --save-dev
npm install chai --save-dev
npm install cucumber --save-dev
npm install protractor-cucumber-framework --save-dev
```

### Running the tests

To run the tests, do the following:

```
webdriver-manager update
webdriver-manager start
```

And once webdriver is running, execute the tests with:

```
protractor protractor.conf.js
```
