import { test } from "@playwright/test"
import { Loginpage } from "../pages/login";
import { AddingEmploye } from "../pages/addemp";
import { generateEmployeeData } from "../testdata/Testgenerator";
import *as fs from "fs";

const filepath = "C:\\Users\\Admin\\Playwright\\playwright-typescript\\testdata\\Employees.json";
const EmployeeNameSearch = JSON.parse(fs.readFileSync(filepath, "utf-8"));


test.beforeEach(async ({ page }) => {
    const login_page = new Loginpage(page);
    await login_page.gotologinpage();
    await login_page.login();
});

test("Add Employee", async ({ page }) => {

    const e = new AddingEmploye(page);
    const empdata = generateEmployeeData();
    await e.addemployee({ ...empdata });
    await page.waitForLoadState("domcontentloaded");
    await e.searchemployee(empdata.firstName);

});

test("Search Employee", async ({ page }) => {
    const e = new AddingEmploye(page);
    await page.waitForLoadState("domcontentloaded");
    await e.searchemployee(EmployeeNameSearch.SearchEmpName);
});


test("checkfieldvalidation error", async ({ page }) => {
    const e = new AddingEmploye(page);

})

