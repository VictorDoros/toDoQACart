import {
  checkStateAndTextOfItem,
  checkWelcomeMessage,
  clickElement,
  fillInTheField,
  reachThePage,
  checkLengthOfItems,
  checkElementText,
  checkElementState,
  checkUncheckItem,
  checkElementHasCSSTextDecoration,
  checkElementDoesNotHaveCSSTextDecoration,
} from "../../support/commands"

import { faker } from "@faker-js/faker"
import User from "../../models/user"
import Environment from "../../models/environment"
import registerSel from "../../selectors/register.sel"
import basicData from "../../support/basicData"
import registrationTestData from "../../fixtures/registrationTestData"
import toDoSel from "../../selectors/toDo.sel"
import toDoTestData from "../../fixtures/toDoTestData"

describe("ToDo List", { tags: ["@functional", "@manageToDoList"] }, () => {
  let user: User
  let env: Environment
  let randomWords: string
  let itemTwoChar: string

  beforeEach(() => {
    user = new User()
    env = new Environment()
    randomWords = faker.word.words()
    itemTwoChar = "ab"

    cy.step("Reach the page")
    reachThePage(env.getEnvironment())

    cy.step("Register the user")
    clickElement(registerSel.createNewAccountButton)
    checkStateAndTextOfItem(
      registerSel.registrationHeader,
      basicData.stateData.beVisible,
      registrationTestData.registrationHeader
    )
    fillInTheField(registerSel.firstNameField, user.getFirstName())
    fillInTheField(registerSel.lastNameField, user.getLastName())
    fillInTheField(registerSel.emailField, user.getEmail())
    fillInTheField(registerSel.passwordField, user.getPassword())
    fillInTheField(registerSel.confirmPasswordField, user.getPassword())
    clickElement(registerSel.submitButton)
    checkWelcomeMessage(registerSel.welcomeHeader, user.getFirstName())
  })

  it("Should be able to add a ToDo", () => {
    cy.step("Click on 'add' icon")
    clickElement(toDoSel.addIcon)

    cy.step("Confirm that the 'Add ToDo' was opened")
    checkStateAndTextOfItem(
      toDoSel.addToDoHeader,
      basicData.stateData.beVisible,
      toDoTestData.addToDoHeader
    )

    cy.step("Fill in the field with the new ToDo item")
    fillInTheField(toDoSel.addToDoField, randomWords)

    cy.step("Click on [Create ToDo] button")
    clickElement(toDoSel.createToDoButton)

    cy.step("Confirm that the user was redirected to the 'Welcome' page")
    checkWelcomeMessage(registerSel.welcomeHeader, user.getFirstName())

    cy.step("Check that only one item has been added")
    checkLengthOfItems(toDoSel.toDoItem, 1)

    cy.step("Check that the added item is displayed")
    checkElementText(toDoSel.toDoItem, randomWords)
  })

  it("Should not be able to add an empty TO DO", () => {
    cy.step("Click on 'add' icon")
    clickElement(toDoSel.addIcon)

    cy.step("Confirm that the 'Add ToDo' was opened")
    checkStateAndTextOfItem(
      toDoSel.addToDoHeader,
      basicData.stateData.beVisible,
      toDoTestData.addToDoHeader
    )

    cy.step("Click on [Create ToDo] button")
    clickElement(toDoSel.createToDoButton)

    cy.step("Check the presence of the error and its text")
    checkStateAndTextOfItem(
      toDoSel.errorMessageAddToDo,
      basicData.stateData.beVisible,
      toDoTestData.emptyToDoError
    )
  })

  it("Should not be able to add a ToDo having less than 3 characters", () => {
    cy.step("Click on 'add' icon")
    clickElement(toDoSel.addIcon)

    cy.step("Confirm that the 'Add ToDo' was opened")
    checkStateAndTextOfItem(
      toDoSel.addToDoHeader,
      basicData.stateData.beVisible,
      toDoTestData.addToDoHeader
    )

    cy.step(
      "Fill in the field with a value having less than 3 characters e.g. 'ab'"
    )
    fillInTheField(toDoSel.addToDoField, itemTwoChar)

    cy.step("Click on [Create ToDo] button")
    clickElement(toDoSel.createToDoButton)

    cy.step("Check the presence of the error and its text")
    checkStateAndTextOfItem(
      toDoSel.errorMessageAddToDo,
      basicData.stateData.beVisible,
      toDoTestData.emptyToDoError
    )
  })

  it("Should be able to get back to the 'Welcome' page", () => {
    cy.step("Click on 'add' icon")
    clickElement(toDoSel.addIcon)

    cy.step("Confirm that the 'Add ToDo' was opened")
    checkStateAndTextOfItem(
      toDoSel.addToDoHeader,
      basicData.stateData.beVisible,
      toDoTestData.addToDoHeader
    )

    cy.step("Click on ''Go back to your ToDos")
    clickElement(toDoSel.backToDoList)

    cy.step("Confirm that the user was got back to the 'Welcome' page")
    checkWelcomeMessage(registerSel.welcomeHeader, user.getFirstName())
  })

  it("Should be able to remove a ToDo item", () => {
    cy.step("Click on 'add' icon")
    clickElement(toDoSel.addIcon)

    cy.step("Confirm that the 'Add ToDo' was opened")
    checkStateAndTextOfItem(
      toDoSel.addToDoHeader,
      basicData.stateData.beVisible,
      toDoTestData.addToDoHeader
    )

    cy.step("Fill in the field with the new ToDo item")
    fillInTheField(toDoSel.addToDoField, randomWords)

    cy.step("Click on [Create ToDo] button")
    clickElement(toDoSel.createToDoButton)

    cy.step("Confirm that the user was redirected to the 'Welcome' page")
    checkWelcomeMessage(registerSel.welcomeHeader, user.getFirstName())

    cy.step("Check that only one item has been added")
    checkLengthOfItems(toDoSel.toDoItem, 1)

    cy.step("Check that the added item is displayed")
    checkElementText(toDoSel.toDoItem, randomWords)

    cy.step("Delete the ToDo item")
    clickElement(toDoSel.deleteToDo)

    cy.step("Confirm that the message 'No Available Todos' is displayed")
    checkStateAndTextOfItem(
      toDoSel.noToDo,
      basicData.stateData.beVisible,
      toDoTestData.noAvailableToDos
    )

    cy.step("Confirm that there are no ToDo items displayed")
    checkElementState(toDoSel.toDoItem, basicData.stateData.notExist)
  })

  it("Should be able to select ToDo item", () => {
    cy.step("Click on 'add' icon")
    clickElement(toDoSel.addIcon)

    cy.step("Confirm that the 'Add ToDo' was opened")
    checkStateAndTextOfItem(
      toDoSel.addToDoHeader,
      basicData.stateData.beVisible,
      toDoTestData.addToDoHeader
    )

    cy.step("Fill in the field with the new ToDo item")
    fillInTheField(toDoSel.addToDoField, randomWords)

    cy.step("Click on [Create ToDo] button")
    clickElement(toDoSel.createToDoButton)

    cy.step("Confirm that the user was redirected to the 'Welcome' page")
    checkWelcomeMessage(registerSel.welcomeHeader, user.getFirstName())

    cy.step("Check that only one item has been added")
    checkLengthOfItems(toDoSel.toDoItem, 1)

    cy.step("Check that the added item is displayed")
    checkElementText(toDoSel.toDoItem, randomWords)

    cy.step("Confirm that the toDo item is not checked")
    checkElementState(toDoSel.toDoCheckBox, basicData.stateData.notBeChecked)

    cy.step("Check the ToDo item")
    checkUncheckItem(toDoSel.toDoCheckBox)

    cy.step("Confirm that the toDo item is checked")
    checkElementState(toDoSel.toDoCheckBox, basicData.stateData.beChecked)

    cy.step("Confirm that the item is line-throughed")
    checkElementHasCSSTextDecoration(toDoSel.toDoText)

    cy.step("Uncheck the ToDo item")
    checkUncheckItem(toDoSel.toDoCheckBox)

    cy.step("Confirm that the toDo item is checked")
    checkElementState(toDoSel.toDoCheckBox, basicData.stateData.notBeChecked)

    cy.step("Confirm that the item is not line-throughed")
    checkElementDoesNotHaveCSSTextDecoration(toDoSel.toDoText)
  })
})
