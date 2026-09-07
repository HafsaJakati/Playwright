import { Page, Locator, expect } from "@playwright/test";
export interface EmployeeData {
    firstName: string;
    lastName: string;
    employeeId: string;
    email: string;
    personalEmail: string;
    password: string;
    experience: string;
    department: string;
    mobileNumber: string;
    designation: string;
    salary: string;
    location: string;
};
export class AddingEmploye {
    readonly page: Page;
    readonly empBtn: Locator;
    readonly addempBtn: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly empId: Locator;
    readonly e_Mail: Locator;
    readonly Pmail: Locator;
    readonly Roledd: Locator;
    readonly Password: Locator;
    readonly Dob: Locator;
    readonly Joining: Locator;
    readonly pastExp: Locator;
    readonly Qualification: Locator;
    readonly Department: Locator;
    readonly Gender: Locator;
    readonly Number: Locator;
    readonly Bgrp: Locator;
    readonly Designation: Locator;
    readonly Salary: Locator;
    readonly locationEmp: Locator;
    readonly reportingToRole: Locator;
    readonly reportingTo: Locator;
    readonly addBtn: Locator;
    readonly searchEmp: Locator;
    readonly FilterBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.empBtn = page.getByRole("link", { name: "Employees" })
        this.addempBtn = page.getByText("Add Employee");
        this.firstName = page.locator("//input[@name='firstName']");
        this.lastName = page.locator("//input[@name='lastName']");
        this.empId = page.locator("//input[@id='employeeID']");
        this.e_Mail = page.locator("//input[@name='email']");
        this.Pmail = page.locator("//input[@name='personalEmail']");
        this.Roledd = page.locator("//select[@name='role']");
        this.Password = page.locator("//input[@type='password']");
        this.Dob = page.locator("//input[@name='dob']");
        this.Joining = page.locator("//input[@name='joiningDate']");
        this.pastExp = page.locator("//input[@name='pastExperience']");
        this.Qualification = page.locator("//select[@id='qualifications']");
        this.Department = page.locator("//input[@name='department']");
        this.Gender = page.locator("//select[@id='gender']");
        this.Number = page.locator("//input[@name='mobileNumber']");
        this.Bgrp = page.locator("//select[@id='bloodGroup']");
        this.Designation = page.locator("//input[@name='designation']");
        this.Salary = page.locator("//input[@name='salary']");
        this.locationEmp = page.locator("//input[@name='location']");
        this.reportingToRole = page.locator("//select[@id='reportingToRole']");
        this.reportingTo = page.locator("//select[@id='reportingTo']");
        this.addBtn = page.locator("//button[text()='Add']");
        this.searchEmp = page.locator("//input[@aria-label='NAME Filter Input']");
        this.FilterBtn = page.locator("//span[@ref='eText' and text()='NAME']/following-sibling::span[@ref='eFilter']");
    }

    async addemployee(data: EmployeeData) {

        await this.empBtn.click();
        await this.addempBtn.click();
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.empId.fill(data.employeeId);
        await this.e_Mail.fill(data.email);
        await this.Pmail.fill(data.personalEmail);
        await this.Roledd.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.Roledd.selectOption({ value: "Admin" });
        await this.Password.fill(data.password);
        await this.Dob.pressSequentially("28-12-2003", { delay: 200 });
        await this.Joining.pressSequentially("28-12-2025", { delay: 200 });
        await this.pastExp.fill(data.experience);
        await this.Qualification.click();
        await this.Qualification.selectOption({ label: "B.Tech" });
        await this.Department.fill(data.department);
        await this.Gender.click();
        await this.Gender.selectOption({ index: 2 });
        await this.Number.fill(data.mobileNumber);
        await this.Bgrp.click();
        await this.Bgrp.selectOption({ index: 1 });
        await this.Designation.fill(data.designation)
        await this.Salary.fill(data.salary);
        await this.locationEmp.fill(data.location);
        await this.reportingToRole.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.reportingToRole.selectOption({ index: 2 });
        await this.reportingTo.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.reportingTo.selectOption({ index: 3 });
        await this.addBtn.click();

    };

    async searchemployee(semp: string) {
        await this.empBtn.click();
        await expect(this.searchEmp).toBeVisible({ timeout: 10000 });
        await this.searchEmp.fill(semp);
        await expect(this.searchEmp).toHaveValue(semp);
        console.log("The Employee Name Is Present" + semp)
        // await this.page.waitForLoadState("domcontentloaded");
        // await this.searchemp.fill(semp)
        // await this.page.waitForLoadState("domcontentloaded");;
        // await expect(this.Filterbtn).toBeVisible({ timeout: 5000 });
    };
}