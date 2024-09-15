import {
  checkStateAndTextOfItem,
  checkWelcomeMessage,
  clickElement,
  fillInTheField,
  reachThePage,
  checkNthElementCSSColor,
} from "../../support/commands"

import User from "../../models/user"
import Environment from "../../models/environment"
import registerSel from "../../selectors/register.sel"
import registrationTestData from "../../fixtures/registrationTestData"
import basicData from "../../support/basicData"

let user: User
let env: Environment

describe(
  "Register user",
  { tags: ["@functional", "@registerUser", "@registerUserFunctional"] },
  () => {
    beforeEach(() => {
      //Create a new object for user and environment
      user = new User()
      env = new Environment()

      //Load the page and check that the user was got to the 'Log in' page
      cy.step("Load the page")
      reachThePage(env.getEnvironment())

      cy.step("Check that the 'Login page' was loaded")
      checkStateAndTextOfItem(
        registerSel.loadPageHeader,
        basicData.stateData.beVisible,
        registrationTestData.loadPageHeader
      )
    })

    it("Should be able to register the user with valid credentials", () => {
      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.createNewAccountButton)

      cy.step("Confirm that the user is on registration page")
      checkStateAndTextOfItem(
        registerSel.registrationHeader,
        basicData.stateData.beVisible,
        registrationTestData.registrationHeader
      )

      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(registerSel.confirmPasswordField, user.getPassword())

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step("Check that user has been successfully registered and logged in")
      checkWelcomeMessage(registerSel.welcomeHeader, user.getFirstName())
    })

    it("Should be able to register the user with valid credentials by hitting the 'Sign up' link", () => {
      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.linkSignUp)

      cy.step("Confirm that the user is on registration page")
      checkStateAndTextOfItem(
        registerSel.registrationHeader,
        basicData.stateData.beVisible,
        registrationTestData.registrationHeader
      )

      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(registerSel.confirmPasswordField, user.getPassword())

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step("Check that user has been successfully registered and logged in")
      checkWelcomeMessage(registerSel.welcomeHeader, user.getFirstName())
    })

    it("Should not be able to register the user with already registered email", () => {
      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.createNewAccountButton)

      cy.step("Confirm that the user is on registration page")
      checkStateAndTextOfItem(
        registerSel.registrationHeader,
        basicData.stateData.beVisible,
        registrationTestData.registrationHeader
      )

      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getValidStaticEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(registerSel.confirmPasswordField, user.getPassword())

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step("Confirm that user cannot register with already registered email")
      checkStateAndTextOfItem(
        registerSel.alertMessage,
        basicData.stateData.beVisible,
        registrationTestData.alertMessageEmailRegistered
      )
    })

    it("Should receive an error when submitting the registration form with no data", () => {
      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.createNewAccountButton)

      cy.step("Confirm that the user is on registration page")
      checkStateAndTextOfItem(
        registerSel.registrationHeader,
        basicData.stateData.beVisible,
        registrationTestData.registrationHeader
      )

      cy.step(
        "Check the color of asterisk before hitting the [Submit] button (should be white)"
      )
      checkNthElementCSSColor(registerSel.asterisk, 0, basicData.colors.white)

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step(
        "Check the color of asterisk after hitting the [Submit] button (should be red)"
      )
      checkNthElementCSSColor(registerSel.asterisk, 0, basicData.colors.red)

      cy.step("Check the presence of the error text")
      checkStateAndTextOfItem(
        registerSel.errorText,
        basicData.stateData.beVisible,
        registrationTestData.errorFirstNameField
      )
    })

    it("Should receive an error when submitting the registration form with invalid email", () => {
      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.createNewAccountButton)

      cy.step("Confirm that the user is on registration page")
      checkStateAndTextOfItem(
        registerSel.registrationHeader,
        basicData.stateData.beVisible,
        registrationTestData.registrationHeader
      )

      cy.step(
        "Check the color of asterisk before hitting the [Submit] button (should be white)"
      )
      checkNthElementCSSColor(registerSel.asterisk, 2, basicData.colors.white)

      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getInvalidEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(registerSel.confirmPasswordField, user.getPassword())

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step(
        "Check the color of asterisk after hitting the [Submit] button (should be red)"
      )
      checkNthElementCSSColor(registerSel.asterisk, 2, basicData.colors.red)

      cy.step("Check the presence of the error text")
      checkStateAndTextOfItem(
        registerSel.errorText,
        basicData.stateData.beVisible,
        registrationTestData.errorEmailField
      )
    })

    it("Should receive an error when submitting the registration form with invalid password", () => {
      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.createNewAccountButton)

      cy.step("Confirm that the user is on registration page")
      checkStateAndTextOfItem(
        registerSel.registrationHeader,
        basicData.stateData.beVisible,
        registrationTestData.registrationHeader
      )

      cy.step(
        "Check the color of asterisk before hitting the [Submit] button (should be white)"
      )
      checkNthElementCSSColor(registerSel.asterisk, 3, basicData.colors.white)

      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getInvalidPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(
        registerSel.confirmPasswordField,
        user.getInvalidPassword()
      )

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step(
        "Check the color of asterisk after hitting the [Submit] button (should be red)"
      )
      checkNthElementCSSColor(registerSel.asterisk, 3, basicData.colors.red)

      cy.step("Check the presence of the error text")
      checkStateAndTextOfItem(
        registerSel.errorText,
        basicData.stateData.beVisible,
        registrationTestData.errorPasswordField
      )
    })

    it("Should receive an error when submitting the registration form with a different confirm passowrd", () => {
      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.createNewAccountButton)

      cy.step("Confirm that the user is on registration page")
      checkStateAndTextOfItem(
        registerSel.registrationHeader,
        basicData.stateData.beVisible,
        registrationTestData.registrationHeader
      )

      cy.step(
        "Check the color of asterisk before hitting the [Submit] button (should be white)"
      )
      checkNthElementCSSColor(registerSel.asterisk, 4, basicData.colors.white)

      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(
        registerSel.confirmPasswordField,
        user.getInvalidPassword()
      )

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step(
        "Check the color of asterisk after hitting the [Submit] button (should be red)"
      )
      checkNthElementCSSColor(registerSel.asterisk, 4, basicData.colors.red)

      cy.step("Check the presence of the error text")
      checkStateAndTextOfItem(
        registerSel.errorText,
        basicData.stateData.beVisible,
        registrationTestData.errorConfirmPasswordField
      )
    })

    it("Should be able to get back to the 'Home' page", () => {
      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.createNewAccountButton)

      cy.step("Confirm that the user is on registration page")
      checkStateAndTextOfItem(
        registerSel.registrationHeader,
        basicData.stateData.beVisible,
        registrationTestData.registrationHeader
      )

      cy.step("Get back to the 'Log in' page")
      clickElement(registerSel.goBackLogin)

      cy.step("Confirm that user has got back to the 'Log in' page")
      checkStateAndTextOfItem(
        registerSel.loadPageHeader,
        basicData.stateData.beVisible,
        registrationTestData.loadPageHeader
      )
    })

    it("Should be able to get back to the 'Home' page by hitting the 'Home' link", () => {
      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.createNewAccountButton)

      cy.step("Confirm that the user is on registration page")
      checkStateAndTextOfItem(
        registerSel.registrationHeader,
        basicData.stateData.beVisible,
        registrationTestData.registrationHeader
      )

      cy.step("Hit the 'Home' link to get back to the 'Log in' page")
      clickElement(registerSel.linkHome)

      cy.step("Confirm that user has got back to the 'Log in' page")
      checkStateAndTextOfItem(
        registerSel.loadPageHeader,
        basicData.stateData.beVisible,
        registrationTestData.loadPageHeader
      )
    })
  }
)
