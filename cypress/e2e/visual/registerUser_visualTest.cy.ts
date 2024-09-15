import {
  reachThePage,
  fillInTheField,
  clickElement,
  waitUntilElementHasState,
  compareSnapshot,
  unfocusField,
} from "../../support/commands"

import User from "../../models/user"
import Environment from "../../models/environment"
import registerSel from "../../selectors/register.sel"
import basicData from "../../support/basicData"

describe(
  "Visual tests for register user",
  { tags: ["@visual", "@registerUser", "@registerUserVisual"] },
  () => {
    let user: User
    let env: Environment

    beforeEach(() => {
      user = new User()
      env = new Environment()

      cy.step("Load the page")
      reachThePage(env.getEnvironment())

      cy.step("Hit the [Create new account] button")
      clickElement(registerSel.createNewAccountButton)
    })

    it("Register page", () => {
      cy.step("Wait until the page is loaded")
      waitUntilElementHasState(
        registerSel.submitButton,
        basicData.stateData.beVisible
      )

      cy.step("Take a screenshot before filling in the fields")
      compareSnapshot("Before filling in the fields")

      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getValidStaticFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getValidStaticLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getValidStaticEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getValidStaticPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(
        registerSel.confirmPasswordField,
        user.getValidStaticPassword()
      )

      cy.step("Unfocus the last field")
      unfocusField()

      cy.step("Take a screenshot after filling in the fields")
      compareSnapshot("After filling in the fields")
    })

    it("Should not be able to register the user with already registered email", () => {
      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getValidStaticFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getValidStaticLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getValidStaticEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getValidStaticPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(
        registerSel.confirmPasswordField,
        user.getValidStaticPassword()
      )

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step("Wait until the alert message is displayed")
      waitUntilElementHasState(
        registerSel.alertMessage,
        basicData.stateData.beVisible
      )

      cy.step(
        "Take a screenshot after submitting the registration with an existing email"
      )
      compareSnapshot("Register with an existing email")
    })

    it("Should receive an error when submitting the registration form with no data", () => {
      cy.step("Hit the [Sign up] button with no inserted credentials")
      clickElement(registerSel.submitButton)

      cy.step("Wait until the error message is displayed")
      waitUntilElementHasState(
        registerSel.errorText,
        basicData.stateData.beVisible
      )

      cy.step("Take a screenshot after submitting the registration withno data")
      compareSnapshot("Submit with no data")
    })

    it("Should receive an error when submitting the registration form with invalid email", () => {
      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getValidStaticFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getValidStaticLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getInvalidEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getValidStaticPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(
        registerSel.confirmPasswordField,
        user.getValidStaticPassword()
      )

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step("Wait until the error message is displayed")
      waitUntilElementHasState(
        registerSel.errorText,
        basicData.stateData.beVisible
      )

      cy.step(
        "Take a screenshot after submitting the registration with an invalid email"
      )
      compareSnapshot("Submit with an invalid email")
    })

    it("Should receive an error when submitting the registration form with invalid password", () => {
      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getValidStaticFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getValidStaticLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getValidStaticEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getInvalidPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(
        registerSel.confirmPasswordField,
        user.getInvalidPassword()
      )

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step("Wait until the error message is displayed")
      waitUntilElementHasState(
        registerSel.errorText,
        basicData.stateData.beVisible
      )

      cy.step(
        "Take a screenshot after submitting the registration with an invalid password"
      )
      compareSnapshot("Submit with an invalid password")
    })

    it("Should receive an error when submitting the registration form with a different confirm passowrd", () => {
      cy.step("Fill in the 'First Name' field")
      fillInTheField(registerSel.firstNameField, user.getValidStaticFirstName())

      cy.step("Fill in the 'Last Name' field")
      fillInTheField(registerSel.lastNameField, user.getValidStaticLastName())

      cy.step("Fill in the 'Email' field")
      fillInTheField(registerSel.emailField, user.getValidStaticEmail())

      cy.step("Fill in the 'Password' field")
      fillInTheField(registerSel.passwordField, user.getValidStaticPassword())

      cy.step("Fill in the 'Confirm Password' field")
      fillInTheField(
        registerSel.confirmPasswordField,
        user.getInvalidPassword()
      )

      cy.step("Hit the [Sign up] button")
      clickElement(registerSel.submitButton)

      cy.step("Wait until the error message is displayed")
      waitUntilElementHasState(
        registerSel.errorText,
        basicData.stateData.beVisible
      )

      cy.step(
        "Take a screenshot after submitting the registration with an invalid confirm password"
      )
      compareSnapshot("Submit with an invalid confirm password")
    })
  }
)
