import {
  reachThePage,
  fillInTheField,
  clickElement,
  waitUntilElementHasState,
  compareSnapshot,
  compareSnapshotByDayPeriod,
} from "../../support/commands"

import User from "../../models/user"
import Environment from "../../models/environment"
import loginSel from "../../selectors/login.sel"
import basicData from "../../support/basicData"

describe(
  "Visual tests for login",
  { tags: ["@visual", "@login", "@loginVisual"] },
  () => {
    let user: User
    let env: Environment

    beforeEach(() => {
      user = new User()
      env = new Environment()

      cy.step("Load the page")
      reachThePage(env.getEnvironment())
    })

    it("Visual test for successfull login in", () => {
      cy.step("Fill in the email field")
      fillInTheField(loginSel.emailField, user.getValidStaticEmail())

      cy.step("Fill in the password field")
      fillInTheField(loginSel.passwordField, user.getValidStaticPassword())

      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step("Wait untill the page is loaded")
      waitUntilElementHasState(
        loginSel.logoutButton,
        basicData.stateData.beVisible
      )

      cy.step("Take the snapshot according to the day period")
      compareSnapshotByDayPeriod("Login")
    })

    it("Visual test for login with no credentials", () => {
      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step("Wait untill the error is displayed")
      waitUntilElementHasState(
        loginSel.errorEmail,
        basicData.stateData.beVisible
      )

      cy.step("Take the snapshot after submitting with no credentials")
      compareSnapshot("Login, no credentials")
    })

    it("Visual test for login with invalid email", () => {
      cy.step("Fill in the email field")
      fillInTheField(loginSel.emailField, user.getInvalidEmail())

      cy.step("Fill in the password field")
      fillInTheField(loginSel.passwordField, user.getValidStaticPassword())

      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step("Wait untill the error is displayed")
      waitUntilElementHasState(
        loginSel.errorEmail,
        basicData.stateData.beVisible
      )

      cy.step("Take the snapshot after submitting with invalid email")
      compareSnapshot("Login, invalid email")
    })

    it("Visual test for login with invalid password", () => {
      cy.step("Fill in the email field")
      fillInTheField(loginSel.emailField, user.getValidStaticEmail())

      cy.step("Fill in the password field")
      fillInTheField(loginSel.passwordField, user.getInvalidPassword())

      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step("Wait untill the error is displayed")
      waitUntilElementHasState(
        loginSel.alertMessage,
        basicData.stateData.beVisible
      )

      cy.step("Take the snapshot after submitting with invalid password")
      compareSnapshot("Login, invalid password")
    })

    it("Visual test for login with invalid credentials", () => {
      cy.step("Fill in the email field")
      fillInTheField(loginSel.emailField, user.getInvalidEmail())

      cy.step("Fill in the password field")
      fillInTheField(loginSel.passwordField, user.getInvalidPassword())

      cy.step("Hit the [Login] button")
      clickElement(loginSel.submitLoginButton)

      cy.step("Wait untill the error is displayed")
      waitUntilElementHasState(
        loginSel.errorEmail,
        basicData.stateData.beVisible
      )

      cy.step("Take the snapshot after submitting with invalid credentials")
      compareSnapshot("Login, invalid credentials")
    })
  }
)
