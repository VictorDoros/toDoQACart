import { faker } from "@faker-js/faker"

export default class User {
  private firstName: string
  private lastName: string
  private email: string
  private password: string
  private invalidEmail: string
  private invalidPassword: string
  private validStaticEmail: string
  private validStaticPassword: string
  private validStaticFirstName: string
  private validStaticLastName: string

  constructor() {
    this.firstName = faker.person.firstName()
    this.lastName = faker.person.lastName()
    this.email = faker.internet.email()
    this.password = faker.internet.password()
    this.invalidEmail = "invalidEmail"
    this.invalidPassword = "123"
    this.validStaticEmail = "nedstark@email.com"
    this.validStaticPassword = "Test1234"
    this.validStaticFirstName = "Ned"
    this.validStaticLastName = "Stark"
  }

  getFirstName() {
    return this.firstName
  }

  getLastName() {
    return this.lastName
  }

  getEmail() {
    return this.email
  }

  getPassword() {
    return this.password
  }

  getInvalidEmail() {
    return this.invalidEmail
  }

  getInvalidPassword() {
    return this.invalidPassword
  }

  getValidStaticEmail() {
    return this.validStaticEmail
  }

  getValidStaticPassword() {
    return this.validStaticPassword
  }

  getValidStaticFirstName() {
    return this.validStaticFirstName
  }

  getValidStaticLastName() {
    return this.validStaticLastName
  }
}
