import {
  reachThePage,
  fillInTheField,
  clickElement,
  waitUntilElementHasState,
  compareSnapshot,
  compareSnapshotByDayPeriod,
  checkUncheckItem,
  unfocusField,
} from "../../support/commands"

import User from "../../models/user"
import Environment from "../../models/environment"
import loginSel from "../../selectors/login.sel"
import basicData from "../../support/basicData"
import toDoSel from "../../selectors/toDo.sel"

describe(
  "Visual tests for manage ToDo list",
  { tags: ["@visual", "@manageToDoList", "@manageToDoListVisual"] },
  () => {
    let user: User
    let env: Environment
    let itemToDo: string

    beforeEach(() => {
      user = new User()
      env = new Environment()
      itemToDo = "Cleaning"

      cy.step("Reach the page")
      reachThePage(env.getEnvironment())

      cy.step("Login user")
      fillInTheField(loginSel.emailField, user.getValidStaticEmail())
      fillInTheField(loginSel.passwordField, user.getValidStaticPassword())
      clickElement(loginSel.submitLoginButton)
    })

    it("Should be able to add a ToDo item", () => {
      cy.step("Click on 'add' icon")
      clickElement(toDoSel.addIcon)

      cy.step("Wait until the page is loaded")
      waitUntilElementHasState(
        toDoSel.createToDoButton,
        basicData.stateData.beVisible
      )

      cy.step("Take a screenshot before inserting a ToDo item")
      compareSnapshot("Before inserting a ToDo item")

      cy.step("Fill in the field with the new ToDo item")
      fillInTheField(toDoSel.addToDoField, itemToDo)

      cy.step("Click on [Create ToDo] button")
      clickElement(toDoSel.createToDoButton)

      cy.step("Wait until the item is added on the list")
      waitUntilElementHasState(toDoSel.toDoItem, basicData.stateData.beVisible)

      cy.step("Take a screenshot for the new added ToDo item")
      compareSnapshotByDayPeriod("New ToDo item")
    })

    it("Should be able to check and remove a ToDo item", () => {
      cy.step("Wait until the page is loaded")
      waitUntilElementHasState(toDoSel.toDoItem, basicData.stateData.beVisible)

      cy.step("Check the ToDo item")
      checkUncheckItem(toDoSel.toDoCheckBox)

      cy.step("Unfocus the last field")
      unfocusField()

      cy.step("Take a screenshot for the checked item")
      compareSnapshotByDayPeriod("Checked item")

      cy.step("Delete the ToDo item")
      clickElement(toDoSel.deleteToDo)

      cy.step("Wait until the ToDo item is removed")
      waitUntilElementHasState(toDoSel.toDoItem, basicData.stateData.notExist)

      cy.step("Take a screenshot for the removed item")
      compareSnapshotByDayPeriod("Removed item")
    })

    it("Should receive an error when adding an empty ToDo item", () => {
      cy.step("Click on 'add' icon")
      clickElement(toDoSel.addIcon)

      cy.step("Click on [Create ToDo] button")
      clickElement(toDoSel.createToDoButton)

      cy.step("Wait until the error message is displayed")
      waitUntilElementHasState(
        toDoSel.errorMessageAddToDo,
        basicData.stateData.beVisible
      )

      cy.step("Take a screenshot with the displayed error")
      compareSnapshot("Add empty ToDo item")
    })
  }
)
