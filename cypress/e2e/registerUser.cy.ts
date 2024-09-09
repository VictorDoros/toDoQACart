import { faker } from "@faker-js/faker"

import {
  checkStateAndTextOfItem,
  checkWelcomeMessage,
  clickElement,
  fillInTheField,
  reachThePage,
  checkNthElementCSSColor,
} from "../support/commands"

import registerSel from "../selectors/register.sel"
import registrationTestData from "../fixtures/registrationTestData"
import basicData from "../support/basicData"

let createUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  invalidEmail: "",
  invalidPassword: "",
}

describe("Register user", () => {
  beforeEach(() => {
    createUser.firstName = `${faker.person.firstName()}`
    createUser.lastName = `${faker.person.lastName()}`
    createUser.email = `${faker.internet.email()}`
    createUser.password = `${faker.internet.password()}`
    ;(createUser.invalidEmail = "invalidEmail"),
      (createUser.invalidPassword = "123")

    cy.step("Load the page")
    reachThePage("/")
  })

  it("Should be able to register the user with valid credentials", () => {
    cy.step("Check that the 'Login page was loaded'")
    checkStateAndTextOfItem(
      registerSel.loadPageHeader,
      basicData.stateData.beVisible,
      registrationTestData.loadPageHeader
    )

    cy.step("Hit the [Create new account] button")
    clickElement(registerSel.createNewAccountButton)

    cy.step("Confirm that the user is on registration page")
    checkStateAndTextOfItem(
      registerSel.registrationHeader,
      basicData.stateData.beVisible,
      registrationTestData.registrationHeader
    )

    cy.step("Fill in the 'First Name' field")
    fillInTheField(registerSel.firstNameField, createUser.firstName)

    cy.step("Fill in the 'Last Name' field")
    fillInTheField(registerSel.lastNameField, createUser.lastName)

    cy.step("Fill in the 'Email' field")
    fillInTheField(registerSel.emailField, createUser.email)

    cy.step("Fill in the 'Password' field")
    fillInTheField(registerSel.passwordField, createUser.password)

    cy.step("Fill in the 'Confirm Password' field")
    fillInTheField(registerSel.confirmPasswordField, createUser.password)

    cy.step("Hit the [Sign up] button")
    clickElement(registerSel.submitButton)

    cy.step("Check that user has been successfully registered and logged in")
    checkWelcomeMessage(registerSel.welcomeHeader, createUser.firstName)
  })

  it("Should be able to register the user with valid credentials by hitting the 'Sign up' link", () => {
    cy.step("Check that the 'Login page was loaded'")
    checkStateAndTextOfItem(
      registerSel.loadPageHeader,
      basicData.stateData.beVisible,
      registrationTestData.loadPageHeader
    )

    cy.step("Hit the [Create new account] button")
    clickElement(registerSel.linkSignUp)

    cy.step("Confirm that the user is on registration page")
    checkStateAndTextOfItem(
      registerSel.registrationHeader,
      basicData.stateData.beVisible,
      registrationTestData.registrationHeader
    )

    cy.step("Fill in the 'First Name' field")
    fillInTheField(registerSel.firstNameField, createUser.firstName)

    cy.step("Fill in the 'Last Name' field")
    fillInTheField(registerSel.lastNameField, createUser.lastName)

    cy.step("Fill in the 'Email' field")
    fillInTheField(registerSel.emailField, createUser.email)

    cy.step("Fill in the 'Password' field")
    fillInTheField(registerSel.passwordField, createUser.password)

    cy.step("Fill in the 'Confirm Password' field")
    fillInTheField(registerSel.confirmPasswordField, createUser.password)

    cy.step("Hit the [Sign up] button")
    clickElement(registerSel.submitButton)

    cy.step("Check that user has been successfully registered and logged in")
    checkWelcomeMessage(registerSel.welcomeHeader, createUser.firstName)
  })

  it("Should receive an error when submitting the registration form with no data", () => {
    cy.step("Check that the 'Login page was loaded'")
    checkStateAndTextOfItem(
      registerSel.loadPageHeader,
      basicData.stateData.beVisible,
      registrationTestData.loadPageHeader
    )

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
    cy.step("Check that the 'Login page was loaded'")
    checkStateAndTextOfItem(
      registerSel.loadPageHeader,
      basicData.stateData.beVisible,
      registrationTestData.loadPageHeader
    )

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
    fillInTheField(registerSel.firstNameField, createUser.firstName)

    cy.step("Fill in the 'Last Name' field")
    fillInTheField(registerSel.lastNameField, createUser.lastName)

    cy.step("Fill in the 'Email' field")
    fillInTheField(registerSel.emailField, createUser.invalidEmail)

    cy.step("Fill in the 'Password' field")
    fillInTheField(registerSel.passwordField, createUser.password)

    cy.step("Fill in the 'Confirm Password' field")
    fillInTheField(registerSel.confirmPasswordField, createUser.password)

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
    cy.step("Check that the 'Login page was loaded'")
    checkStateAndTextOfItem(
      registerSel.loadPageHeader,
      basicData.stateData.beVisible,
      registrationTestData.loadPageHeader
    )

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
    fillInTheField(registerSel.firstNameField, createUser.firstName)

    cy.step("Fill in the 'Last Name' field")
    fillInTheField(registerSel.lastNameField, createUser.lastName)

    cy.step("Fill in the 'Email' field")
    fillInTheField(registerSel.emailField, createUser.email)

    cy.step("Fill in the 'Password' field")
    fillInTheField(registerSel.passwordField, createUser.invalidPassword)

    cy.step("Fill in the 'Confirm Password' field")
    fillInTheField(registerSel.confirmPasswordField, createUser.invalidPassword)

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

  it("Should receive an error when submitting the registration form with invalid password", () => {
    cy.step("Check that the 'Login page was loaded'")
    checkStateAndTextOfItem(
      registerSel.loadPageHeader,
      basicData.stateData.beVisible,
      registrationTestData.loadPageHeader
    )

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
    fillInTheField(registerSel.firstNameField, createUser.firstName)

    cy.step("Fill in the 'Last Name' field")
    fillInTheField(registerSel.lastNameField, createUser.lastName)

    cy.step("Fill in the 'Email' field")
    fillInTheField(registerSel.emailField, createUser.email)

    cy.step("Fill in the 'Password' field")
    fillInTheField(registerSel.passwordField, createUser.password)

    cy.step("Fill in the 'Confirm Password' field")
    fillInTheField(registerSel.confirmPasswordField, createUser.invalidPassword)

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
})
