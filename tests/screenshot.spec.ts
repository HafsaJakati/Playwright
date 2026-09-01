import { test, expect, Locator } from "@playwright/test"
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        await testInfo.attach('failure-screenshot', {
            body: await page.screenshot({ fullPage: true }),
            contentType: 'image/png',
        });
    }
});
test("take screenshot", async ({ page }) => {
    await page.goto("https://dev.urbuddi.com/login");
    // await page.screenshot({ path: "screenshots/" + "loginpage.png" });
    const email: Locator = page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password: Locator = page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton: Locator = page.locator("//button[@type='submit']");
    await submitbutton.click();
    const timestamp: number = Date.now();
    //await page.screenshot({ path: "screenshots/" + "homepage" + timestamp + ".png", fullPage: true });
    const bday: Locator = page.locator("//div[@class='birthday-container']");
    await bday.screenshot({ path: "screenshots/" + "birthday" + timestamp + ".png" });
});

test("take sc on failure", async ({ page, context }) => {
    context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto("https://dev.urbuddi.com/login");
    const email: Locator = page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password: Locator = page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton: Locator = page.locator("//button[@type='submit']");
    await submitbutton.click();
    await expect.soft(page.locator("//p[@class='err-msg-display mt-3']")).toBeVisible();
    context.tracing.stop({ path: "trace.zip" });
});