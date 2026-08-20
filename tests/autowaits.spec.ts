import{test,expect,Page,Locator}from"@playwright/test";
test.use({actionTimeout:5000})

test("timout1",async({page})=>{
         //page.setDefaultTimeout(15000);
        await page.goto("https://dev.urbuddi.com/login");
        const email:Locator=page.locator("//input[@id='userEmaill']");
        await email.fill('hafsajakathi@gmail.com',{timeout:25000});
        const password:Locator=page.locator("//input[@id='userPassword']");
        await password.fill('123456');
        const submitbutton:Locator=page.locator("//button[@type='submit']");
        await submitbutton.click();
});

test("timout2",async({page})=>{
         //page.setDefaultTimeout(15000);
        await page.goto("https://dev.urbuddi.com/login");
        const email:Locator=page.locator("//input[@id='userEmaill']");
        await email.fill('hafsajakathi@gmail.com');
        const password:Locator=page.locator("//input[@id='userPassword']");
        await password.fill('123456');
        const submitbutton:Locator=page.locator("//button[@type='submit']");
        await submitbutton.click();
});

test("timout3",async({page})=>{
         //page.setDefaultTimeout(15000);
        await page.goto("https://dev.urbuddi.com/login");
        const email:Locator=page.locator("//input[@id='userEmaill']");
        await email.fill('hafsajakathi@gmail.com');
        const password:Locator=page.locator("//input[@id='userPassword']");
        await password.fill('123456');
        const submitbutton:Locator=page.locator("//button[@type='submit']");
        await submitbutton.click();
});



