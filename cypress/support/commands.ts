/// <reference types="cypress" />

/**
 * Reach the page
 */
export const reachThePage = (url: string) => {
  cy.visit(url)
}

/**
 * Check the current state of the item and its text
 */
export const checkStateAndTextOfItem = (elementLocator, state, text) => {
  cy.get(elementLocator).should(state).and("have.text", text)
}

/**
 * Check the welcome message after user registering
 */
export const checkWelcomeMessage = (elementLocator, user) => {
  cy.get(elementLocator)
    .invoke("text")
    .then((welcomeMessage) => {
      expect(welcomeMessage).to.be.oneOf([
        `Good morning ${user}`,
        `Good Day ${user}`,
        `Good Afternoon ${user}`,
        `Good Evening ${user}`,
      ])
    })
}

/**
 * Check the current state of the item and its text
 */
export const fillInTheField = (elementLocator, value) => {
  cy.get(elementLocator).type(value)
}

/**
 * Check the current state of the item and its text
 */
export const clickElement = (elementLocator) => {
  cy.get(elementLocator).click()
}

/**
 * Check the current state of the item and its text
 */
export const checkNthElementCSSColor = (elementLocator, orderNumber, color) => {
  cy.get(elementLocator).eq(orderNumber).should("have.css", "color", color)
}
