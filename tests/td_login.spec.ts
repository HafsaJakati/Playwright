import { test, expect } from "@playwright/test";

const testdata: string[][] = [
    ["hafsajakathi@gmail.com", "123456", "valid"],
    ["hafsajakathi@gmail.com", "12345", "invalid"],
    ["hafsa@gmail.com", "123456", "invalid"],
    ["", "123456", "invalid"]
];
for (const [email, password, validity] of testdata) {
    test.describe("Login using test data", () => {
        test(`login tests using ${email} and ${password}`, async ({ page }) => {
            await page.goto("https://dev.urbuddi.com/login");
            await page.locator("//input[@id='userEmail']").fill(email);
            await page.locator("//input[@id='userPassword']").fill(password);
            await page.locator("//button[@type='submit']").click();
            if (validity.toLowerCase() === "valid") {
                const dash = page.locator("(//p[text()='Dashboard'])[2]");
                await expect(dash).toBeVisible();
            } else {
                await expect(page).toHaveURL("https://dev.urbuddi.com/login");
            }

        })
    })
}




