import { test, expect, Page, chromium, Locator } from "@playwright/test";
test("open page using context", async ({ context }) => {
    const page = await context.newPage();
    await page.goto("https://dev.urbuddi.com/login");
})

test("create own browser and open page", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://dev.urbuddi.com/login");
});

test("create multiple pages", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const page2 = await context.newPage();
    await page.goto("https://dev.urbuddi.com/login");
    await expect(page).toHaveTitle("urBuddi");
    await page2.goto("https://dev.urbuddi.com/login");
    const email: Locator = page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password: Locator = page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton: Locator = page.locator("//button[@type='submit']");
    await submitbutton.click();


})

test("open tabs", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/windows");
    const newPagePromise = context.waitForEvent("page");
    await page.getByText("Click Here").click();
    const newTab = await newPagePromise;
    await newTab.waitForLoadState();
    console.log("Total number of pages opened: " + context.pages().length);
    // Work with new tab
    //await newTab.bringToFront();
    await expect(newTab).toHaveTitle("New Window");
    // Close new tab
    await newTab.close();
    // Go back to original tab
    //await page.bringToFront();
    await expect(page).toHaveTitle("The Internet");
    await browser.close();

})