import{test,expect,BrowserContext,Page,Locator}from "@playwright/test";
test("dropdown",async ({page})=>{
    await page.goto("https://dev.urbuddi.com/");
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    const gotoemp:Locator=page.locator("(//p[text()='Employees'])[1]");
    await gotoemp.click();
    await page.waitForTimeout(2000);
    await page.getByText("Add Employee").click();
    //await page.getByRole("columnheader",{name:"EMP ID"}).click();
     const dd:Locator=page.locator("//select[@id='reportingToRole']");
     await dd.click();
    await dd.selectOption({value:"Admin"});
    await page.waitForTimeout(2000);
});