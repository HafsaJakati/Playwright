import{test,expect,Locator, chromium,BrowserContext,Page}from "@playwright/test"

test ("empmodule",async({page})=>{
await page.goto("https://dev.urbuddi.com/login");
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    const gotoemp:Locator=page.locator("(//p[text()='Employees'])[1]");
    await gotoemp.click();
    // text locator
    const release:Locator=page.locator('text=Released');
    await release.click();
    //get by role locator 
    await page.getByRole("columnheader",{name:"EMP ID"}).click();
    await page.getByRole("button",{name:"Add Employee"}).click();
    // getbyext
    await page.getByText("Leave Management").click();
    // getbyalttext
   await page.getByAltText("profile-pic").click();
   await page.waitForTimeout(3000);
});

test("browser",async()=>{
    const browser:BrowserContext=await chromium.launchPersistentContext('',{headless:false,channel:'chrome'});
   const pages=browser.pages();
   const page:Page=pages[0];
   //const page:Page= await browser.newPage();
   await page.goto("https://dev.urbuddi.com/login");
   await page.waitForTimeout(2000);
});