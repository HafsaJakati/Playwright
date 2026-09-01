import { test, expect } from "@playwright/test";
import * as fs from "fs";

const filepath = "./testdata/testdata.json";
const logindata = JSON.parse(fs.readFileSync(filepath, "utf-8"))
test.describe("Login using test data from json file", () => {
    for (const data of logindata) {
        test(`login tests using ${data.email} and ${data.password}`, async ({ page }) => {
            await page.goto("https://dev.urbuddi.com/login");
            await page.locator("//input[@id='userEmail']").fill(data.email);
            await page.locator("//input[@id='userPassword']").fill(data.password);
            await page.locator("//button[@type='submit']").click();
            if (data.validity.toLowerCase() === "valid") {
                const dash = page.locator("(//p[text()='Dashboard'])[2]");
                await expect(dash).toBeVisible();
            } else {
                await expect(page).toHaveURL("https://dev.urbuddi.com/login");
            }

        });
    }
})


