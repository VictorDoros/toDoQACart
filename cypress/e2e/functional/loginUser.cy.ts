import {
  reachThePage,
  fillInTheField,
  checkStateAndTextOfItem,
  clickElement,
  checkWelcomeMessage,
  checkNthElementCSSColor,
} from "../../support/commands"

import User from "../../models/user"
import Environment from "../../models/environment"
import loginTestData from "../../fixtures/loginTestData"
import loginSel from "../../selectors/login.sel"
import basicData from "../../support/basicData"

let user: User
let env: Environment

describe(
  "Log in",
  { tags: ["@functional", "@login", "@loginFunctional"] },
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
        loginSel.loadPageHeader,
        basicData.stateData.beVisible,
        loginTestData.loadPageHeader
      )
    })

    it("Should be able to login with valid credentials", () => {
      cy.step("Fill in the email field")
      fillInTheField(loginSel.emailField, user.getValidStaticEmail())

      cy.step("Fill in the password field")
      fillInTheField(loginSel.passwordField, user.getValidStaticPassword())

      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step("Check that user has successfully logged in")
      checkWelcomeMessage(
        loginSel.welcomeHeader,
        user.getValidStaticFirstName()
      )
    })

    it("Should not be able to login with no credentials", () => {
      cy.step(
        "Check the color of email's asterisk before hitting the [Submit] button (should be white)"
      )
      checkNthElementCSSColor(loginSel.asterisk, 0, basicData.colors.white)

      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step(
        "Check the color of email's asterisk after hitting the [Submit] button (should be red)"
      )
      checkNthElementCSSColor(loginSel.asterisk, 0, basicData.colors.red)

      cy.step("Check the presence of the error text")
      checkStateAndTextOfItem(
        loginSel.errorEmail,
        basicData.stateData.beVisible,
        loginTestData.emailError
      )
    })

    it("Should not be able to login with invalid email", () => {
      cy.step(
        "Check the color of email's asterisk before hitting the [Submit] button (should be white)"
      )
      checkNthElementCSSColor(loginSel.asterisk, 0, basicData.colors.white)

      cy.step("Fill in the email field")
      fillInTheField(loginSel.emailField, user.getInvalidEmail())

      cy.step("Fill in the password field")
      fillInTheField(loginSel.passwordField, user.getValidStaticPassword())

      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step(
        "Check the color of email's asterisk after hitting the [Submit] button (should be red)"
      )
      checkNthElementCSSColor(loginSel.asterisk, 0, basicData.colors.red)

      cy.step("Check the presence of the error text")
      checkStateAndTextOfItem(
        loginSel.errorEmail,
        basicData.stateData.beVisible,
        loginTestData.emailError
      )
    })

    it("Should not be able to login with invalid password", () => {
      cy.step("Fill in the email field")
      fillInTheField(loginSel.emailField, user.getValidStaticEmail())

      cy.step("Fill in the password field")
      fillInTheField(loginSel.passwordField, user.getInvalidPassword())

      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step("Check the presence of the alert message")
      checkStateAndTextOfItem(
        loginSel.alertMessage,
        basicData.stateData.beVisible,
        loginTestData.passwordAlert
      )
    })

    it("Should not be able to login with invalid credentials", () => {
      cy.step(
        "Check the color of email's asterisk before hitting the [Submit] button (should be white)"
      )
      checkNthElementCSSColor(loginSel.asterisk, 0, basicData.colors.white)

      cy.step("Fill in the email field")
      fillInTheField(loginSel.emailField, user.getInvalidEmail())

      cy.step("Fill in the password field")
      fillInTheField(loginSel.passwordField, user.getInvalidPassword())

      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step(
        "Check the color of email's asterisk after hitting the [Submit] button (should be red)"
      )
      checkNthElementCSSColor(loginSel.asterisk, 0, basicData.colors.red)

      cy.step("Check the presence of the error text")
      checkStateAndTextOfItem(
        loginSel.errorEmail,
        basicData.stateData.beVisible,
        loginTestData.emailError
      )
    })
  }
)
