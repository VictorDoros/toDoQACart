import User from "../../models/user"
import Environment from "../../models/environment"

describe("Visual tests", {tags: ['@visual']}, () => {
    let user: User
    let env: Environment

    beforeEach(() => {
        user = new User()
        env = new Environment()
    })

    it("Screenshot testing", () => {
        cy.visit(env.getEnvironment())
        cy.compareSnapshot("firstFirst")

    })
})