import{test,expect,Locator, chromium,BrowserContext,Page}from "@playwright/test";
test("mousehover",async({page})=>{
    await page.goto("https://www.spicejet.com/");
    await page.waitForTimeout(5000);
    await page.getByText("Travel Policies");
      await page.waitForTimeout(2000);
    await page.getByText("Baggage Information").click();
    await page.waitForTimeout(2000);
    
});

test("clicks",async({page})=>{
    await page.goto("https://dev.urbuddi.com/login");
       const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    //await page.getByText("Employees").dblclick();
    // for right left middle click
    await page.getByText("Employees").click({button:"right"});
    // for shift click 
    await page.getByText("https://dev.urbuddi.com/login").click({modifiers:["Shift"]});

    //drag a nd drop
    //await page.locator("").dragTo("");
});

test("searchemp",async({page})=>{
    await page.goto("https://dev.urbuddi.com/login");
       const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    //await page.getByText("Employees").click();
    await page.locator("//p[text()='Employees']").first().click();
    //await page.locator("//input[@id='ag-1242-input']").pressSequentially("haf",{delay:500});
   await page.locator("//input[@aria-label='NAME Filter Input']").pressSequentially("haf",{delay:500});
   await page.waitForTimeout(3000);

});