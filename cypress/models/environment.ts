export default class Environment {
  getEnvironment() {
    let env = Cypress.env("env")
    if (env === "dev") {
      return "https://todo.qacart.com/"
    } else if (env === "staging") {
      return "https://todo.qacart.com/"
    } else if (env === "prod") {
      return "https://todo.qacart.com/"
    }
  }
}
