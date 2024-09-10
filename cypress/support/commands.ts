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
 * Check the welcome message after user registering or logging in
 */
export const checkWelcomeMessage = (elementLocator, user) => {
  cy.get(elementLocator)
    .invoke("text")
    .then((welcomeMessage) => {
      expect(welcomeMessage).to.be.oneOf([
        `Good morning ${user}`,
        `Good Day ${user}`,
        `Good afternoon ${user}`,
        `Good Evening ${user}`,
      ])
    })
}

/**
 * Fill in the input field
 */
export const fillInTheField = (elementLocator, value) => {
  cy.get(elementLocator).type(value)
}

/**
 * Click on the element
 */
export const clickElement = (elementLocator) => {
  cy.get(elementLocator).click()
}

/**
 * Click on the element containing a specific text
 */
export const clickElementContainingText = (textElement) => {
  cy.contains(textElement).click()
}

/**
 * Check the color of the nth element
 */
export const checkNthElementCSSColor = (elementLocator, orderNumber, color) => {
  cy.get(elementLocator).eq(orderNumber).should("have.css", "color", color)
}
