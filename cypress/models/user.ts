import { faker } from "@faker-js/faker"

export default class User {
  private firstName: string
  private lastName: string
  private email: string
  private password: string
  private invalidEmail: string
  private invalidPassword: string

  constructor() {
    this.firstName = faker.person.firstName()
    this.lastName = faker.person.lastName()
    this.email = faker.internet.email()
    this.password = faker.internet.password()
    this.invalidEmail = "invalidEmail"
    this.invalidPassword = "123"
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
}
