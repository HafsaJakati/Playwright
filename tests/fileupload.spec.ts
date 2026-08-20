import{test,expect,Locator}from"@playwright/test";
test("fileupload",async({page})=>{
    await page.goto("https://dev.urbuddi.com/login");
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    await page.locator("//p[text()='Employees']").first().click();
    await page.getByText("Import Excel Sheet").click();
    await page.getByLabel("Upload").setInputFiles("C:\\Users\\Admin\\Downloads\\sample_employee_details_T001.xlsx");
    await page.waitForTimeout(3000);
    await page.locator("//button[text()='Submit']").click();
    await page.waitForTimeout(4000);
    await page.locator("//button[@class='sc-iGgWBj hcjqcP uploadBtn-2']").click();
    //await page.locator("//input[@class='sc-imWYAI fbrKEO']").setInputFiles("C:\\Users\\Admin\\Downloads\\sample_employee_details_T001.xlsx");
});

test("empexists",async({page})=>{
    await page.goto("https://dev.urbuddi.com/login");
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    await page.locator("//p[text()='Employees']").first().click();
    await page.getByText("Import Excel Sheet").click();
    await page.getByLabel("Upload").setInputFiles("C:\\Users\\Admin\\Downloads\\sample_employee_details_T001.xlsx");
    await page.waitForTimeout(3000);
    await page.locator("//button[text()='Submit']").click();
    await page.locator("//button[@class='sc-iGgWBj hcjqcP uploadBtn-2']").click();
    await expect(page.locator("//p[contains(.,'same ID or email address')]")).toBeVisible();
     await page.waitForTimeout(2000);
});

test("invalidfileformat",async({page})=>{
    await page.goto("https://dev.urbuddi.com/login");
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    await page.locator("//p[text()='Employees']").first().click();
    await page.getByText("Import Excel Sheet").click();
    await page.getByLabel("Upload").setInputFiles("C:\\Users\\Admin\\Downloads\\image (18).png");
    await page.locator("//button[text()='Submit']").click();
    await expect(page.locator("//p[contains(.,'Excel format is')]")).toBeVisible();
})

test("exportdata",async({page})=>{
   await page.goto("https://dev.urbuddi.com/login");
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    await page.locator("//p[text()='Employees']").first().click();
    await page.getByText("Export Data").click(); 
    await page.getByText("Active Employees").click();
})
