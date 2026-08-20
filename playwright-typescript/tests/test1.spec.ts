import {test,expect,Locator} from'@playwright/test';
test("invalidlogin",async({page})=>{
    await page.goto("https://dev.urbuddi.com/login");
    //getbytitle
    await expect(page.getByTitle("urBuddi")).toBeVisible;
    //by alttext
    await expect(page.getByAltText("loginVector")).toBeVisible();
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('test@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('test1234');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    await page.waitForTimeout(3000);
   const errmsg:Locator= page.locator("//p[text()='Invalid credentials']");
   await expect(errmsg).toHaveText("*Invalid credentials");
});

test("validlogin",async({page})=>{
 await page.goto("https://dev.urbuddi.com/login");
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
});

test("logout",async({page})=>{
 await page.goto("https://dev.urbuddi.com/login");
    const email:Locator=page.locator("//input[@id='userEmail']");
    await email.fill('hafsajakathi@gmail.com');
    const password:Locator=page.locator("//input[@id='userPassword']");
    await password.fill('123456');
    const submitbutton:Locator=page.locator("//button[@type='submit']");
    await submitbutton.click();
    const logout:Locator=page.locator("//p[text()='Logout']");
    await logout.click();
    const logoutmodal:Locator=page.locator("//div[@class='logout-modal-container']/p[text()='Are you sure want to logout?']");
    await expect(logoutmodal).toHaveText("Are you sure want to logout?");
    const yes:Locator=page.locator("//div[@class='d-flex gap-2']/button[text()='Yes']");
    await yes.click();

});