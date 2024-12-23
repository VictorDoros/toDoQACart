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
export const checkStateAndTextOfItem = (
  elementLocator: string,
  state: string,
  text: string
) => {
  cy.get(elementLocator).should(state).and("have.text", text)
}

/**
 * Check the welcome message after user registering or logging in
 */
export const checkWelcomeMessage = (elementLocator: string, user: string) => {
  cy.get(elementLocator)
    .invoke("text")
    .then((welcomeMessage) => {
      expect(welcomeMessage).to.be.oneOf([
        `Good morning ${user}`,
        `Good afternoon ${user}`,
        `Time to sleep ${user}`,
      ])
    })
}

/**
 * Fill in the input field
 */
export const fillInTheField = (elementLocator: string, value: string) => {
  cy.get(elementLocator).type(value)
}

/**
 * Click on the element
 */
export const clickElement = (elementLocator: string) => {
  cy.get(elementLocator).click()
}

/**
 * Click on the element containing a specific text
 */
export const clickElementContainingText = (textElement: string) => {
  cy.contains(textElement).click()
}

/**
 * Check the color of the nth element
 */
export const checkNthElementCSSColor = (
  elementLocator: string,
  orderNumber: number,
  color: string
) => {
  cy.get(elementLocator).eq(orderNumber).should("have.css", "color", color)
}

/**
 * Check the number of items
 */
export const checkLengthOfItems = (
  elementLocator: string,
  lengthNumber: number
) => {
  cy.get(elementLocator).should("have.length", lengthNumber)
}

/**
 * Check element's text
 */
export const checkElementText = (
  elementLocator: string,
  textElement: string
) => {
  cy.get(elementLocator)
    .invoke("text")
    .then((text) => {
      expect(text).to.eq(textElement)
    })
}

/**
 * Check the state of the element
 */
export const checkElementState = (
  elementLocator: string,
  elementState: string
) => {
  cy.get(elementLocator).should(elementState)
}

/**
 * Check and uncheck the item
 */
export const checkUncheckItem = (elementLocator: string) => {
  cy.get(elementLocator).then(($el) => {
    if ($el.is(":checked")) {
      cy.wrap($el).uncheck()
    } else {
      cy.wrap($el).check()
    }
  })
}

/**
 * Check the state of the element
 */
export const checkElementHasCSSTextDecoration = (elementLocator: string) => {
  cy.get(elementLocator).should(
    "have.css",
    "text-decoration",
    "line-through solid rgb(145, 158, 171)"
  )
}

/**
 * Check the state of the element
 */
export const checkElementDoesNotHaveCSSTextDecoration = (
  elementLocator: string
) => {
  cy.get(elementLocator).should(
    "not.have.css",
    "text-decoration",
    "line-through solid rgb(145, 158, 171)"
  )
}

/**
 * Wait until element has the corresponding state
 */
export const waitUntilElementHasState = (
  elementLocator: string,
  state: string
) => {
  cy.get(elementLocator).should(state)
}

/**
 * Wait until element has the corresponding state
 */
export const compareSnapshot = (nameOfFile: string) => {
  cy.compareSnapshot(nameOfFile)
}

/**
 * Take the snapshot according to the day period
 */
export const compareSnapshotByDayPeriod = (nameOfFile: string) => {
  cy.task("getCurrentTime").then((timeHour: string) => {
    if (parseInt(timeHour) >= 6 && parseInt(timeHour) <= 12) {
      cy.compareSnapshot(`Good morning - ${nameOfFile}`)
    } else if (parseInt(timeHour) > 12 && parseInt(timeHour) <= 17) {
      cy.compareSnapshot(`Good afternoon - ${nameOfFile}`)
    } else {
      cy.compareSnapshot(`Time to sleep - ${nameOfFile}`)
    }
  })
}

/**
 * Take the snapshot according to the day period
 */
export const unfocusField = () => {
  cy.get("body").click(0, 0)
}
