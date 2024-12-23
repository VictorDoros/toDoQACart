# ToDo QA Cart App
For testing purposes the application [QAcart Todo App](https://todo.qacart.com/) was used, which allows the user to create, edit and delete a list of tasks (called todos).

The purpose of the project is to show one of the ways on structuring a big project in Cypress. 

The focus was on the creation of the E2E tests, which includes:
* functional tests
* visual tests

# Prerequisites
* Node.js (v14.x or later)
* npm (v7.x or later)

# Installation
1. Clone the repo locally:
2. Navigate to the project directory and install the npm dependencies:
```
npm install
```
3. Run Cypress using one of the 2 options:

_Open mode:_
```
npx cypress open --env env='prod'
```
_Headless mode:_
```
npx cypress run --env env='prod'
```

NOTE:

--env env='prod' flag is added to specify the environment that is wanted to be run, configured in contactListApp/cypress/models/environment.ts (this is just an example on how it looks like when it's desired to run on multiple environments) :
* dev
* staging
* prod 
   
# Dependencies used within the project
1. @cypress/grep -  [@cypress/grep documentation](https://www.npmjs.com/package/@cypress/grep)
2. @faker-js/faker - [@faker-js/faker documentation](https://www.npmjs.com/package/@faker-js/faker)
3. cypress-image-diff-js - [cypress-image-diff-js documentation](https://www.npmjs.com/package/cypress-image-diff-js)
4. cypress-mochawesome-reporter - [cypress-mochawesome-reporter documentation](https://www.npmjs.com/package/cypress-mochawesome-reporter)
5. cypress-plugin-steps - [cypress-plugin-steps documentation](https://github.com/filiphric/cypress-plugin-steps)
