import { test, expect } from "@playwright/test";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

interface loginrecord {
    email: string;
    password: string;
    validity: string;
};

const filepath = "C:\\Users\\Admin\\Playwright\\playwright-typescript\\testdata\\testdata - testdata.csv";
const fileContent = fs.readFileSync(filepath, "utf-8");
const loginrecords = parse<loginrecord>(fileContent,
    {
        columns: true,
        skip_empty_lines: true
    });
test.describe("Login using test data from csv file", () => {
    for (const data1 of loginrecords) {
        test(`login tests using ${data1.email} and ${data1.password}`, async ({ page }) => {
            await page.goto("https://dev.urbuddi.com/login");
            await page.locator("//input[@id='userEmail']").fill(data1.email);
            await page.locator("//input[@id='userPassword']").fill(data1.password);
            await page.locator("//button[@type='submit']").click();
            if (data1.validity.toLowerCase() === "valid") {
                const dash = page.locator("(//p[text()='Dashboard'])[2]");
                await expect(dash).toBeVisible();
            } else {
                await expect(page).toHaveURL("https://dev.urbuddi.com/login");
            }

        });
    }
})


