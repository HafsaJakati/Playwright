import { test, expect } from "@playwright/test";
import *as xlsx from "xlsx";
const excelpath = "./testdata/testdata.xlsx";
const workbook = xlsx.readFile(excelpath);
//const sheetnames = workbook.SheetNames[0];
const sheetname = "testdata";
const datasheet = workbook.Sheets[sheetname];
const logindata: any = xlsx.utils.sheet_to_json(datasheet);

test.describe("Login using test data from excel file", () => {
    for (const { email, password, validity } of logindata) {
        test(`login tests using ${email} and ${password}`, async ({ page }) => {
            await page.goto("https://dev.urbuddi.com/login");
            await page.locator("//input[@id='userEmail']").fill(String(email));
            await page.locator("//input[@id='userPassword']").fill(String(password));
            await page.locator("//button[@type='submit']").click();
            if (validity.toLowerCase() === "valid") {
                const dash = page.locator("(//p[text()='Dashboard'])[2]");
                await expect(dash).toBeVisible();
            } else {
                await expect(page).toHaveURL("https://dev.urbuddi.com/login");
            }

        });
    }
})




