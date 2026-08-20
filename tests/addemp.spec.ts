import{test,expect,Locator}from"@playwright/test";
test("addemp",async({page})=>{
 await page.goto("https://dev.urbuddi.com/login");
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    await page.waitForTimeout(6000);
    await page.locator("//p[text()='Employees']").first().click();
    await page.getByText("Add Employee").click();
    await page.getByLabel("First Name*").fill("harry");
    await page.waitForTimeout(3000);
});