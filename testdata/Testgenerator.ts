import { faker } from "@faker-js/faker";

export function generateEmployeeData() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        employeeId: faker.string.alphanumeric(6),
        email: faker.internet.email(),
        personalEmail: faker.internet.email(),
        password: faker.internet.password(),
        experience: faker.number.int({ min: 1, max: 10 }).toString(),
        department: "Testers",
        mobileNumber: faker.string.numeric(10),
        designation: "QA Engineer",
        salary: faker.number.int({ min: 20000, max: 80000 }).toString(),
        location: faker.location.city()

    };
}