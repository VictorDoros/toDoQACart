import { faker } from "@faker-js/faker";

export default  {
    "firstName": faker.person.firstName(),
    "lastname": faker.person.lastName(),
    "email": faker.internet.email(),
    "password": faker.internet.password(),

    "invalidEmail": "invalidEmail",
    "invalidPassword": "123"
}