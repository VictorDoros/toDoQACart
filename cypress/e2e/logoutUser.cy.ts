import logoutTestData from "../fixtures/logoutTestData"
import User from "../models/user"
import loginSel from "../selectors/login.sel"
import logoutSel from "../selectors/logout.sel"
import basicData from "../support/basicData"

import {
  reachThePage,
  fillInTheField,
  checkStateAndTextOfItem,
  clickElement,
  checkWelcomeMessage,
  clickElementContainingText,
} from "../support/commands"

describe("Log out", { tags: ["@functional", "@logout"] }, () => {
  let user: User

  beforeEach(() => {
    //Create a new object for user
    user = new User()

    //Load the page and log in first
    cy.step("Load the page")
    reachThePage("/")

    cy.step("Check that the 'Login page' was loaded")
    checkStateAndTextOfItem(
      logoutSel.loadPageHeader,
      basicData.stateData.beVisible,
      logoutTestData.loadPageHeader
    )
    cy.step("Fill in the email field")
    fillInTheField(loginSel.emailField, user.getValidStaticEmail())

    cy.step("Fill in the password field")
    fillInTheField(loginSel.passwordField, user.getValidStaticPassword())

    cy.step("Hit the [Login] button")
    clickElement(loginSel.submitLoginButton)

    cy.step("Check that user has successfully logged in")
    checkWelcomeMessage(loginSel.welcomeHeader, user.getValidStatisFirstName())
  })

  it("Should be able to log out after logging in", () => {
    cy.step("Hit the [Logout] button")
    clickElementContainingText(logoutTestData.logoutTextButton)

    cy.step("Confirm that user was redirected to the 'Login page' page")
    checkStateAndTextOfItem(
      logoutSel.loadPageHeader,
      basicData.stateData.beVisible,
      logoutTestData.loadPageHeader
    )
  })

  it("Should be able to log out from the 'To Do' list", () => {
    cy.step("Click on the 'add' icon")
    clickElement(logoutSel.addToDoIcon)

    cy.step("Confirm taht user was redirected to 'To Do' page")
    checkStateAndTextOfItem(
      logoutSel.createToDoHeader,
      basicData.stateData.beVisible,
      logoutTestData.createToDoHeader
    )

    cy.step("Hit the [Logout] button")
    clickElementContainingText(logoutTestData.logoutTextButton)

    cy.step("Confirm that user was redirected to the 'Login page' page")
    checkStateAndTextOfItem(
      logoutSel.loadPageHeader,
      basicData.stateData.beVisible,
      logoutTestData.loadPageHeader
    )
  })
})
