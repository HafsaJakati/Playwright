import{test}from"@playwright/test";
import { loginpage } from "../pages/login";
import { applyleave } from "../pages/leaveM";
test("testLM",async({page})=>{
    const login_page=new loginpage(page);
    const LM=new applyleave(page);

    await login_page.gotologinpage();
    await login_page.login("hafsajakathi@gmail.com","123456");
    await LM.leave("22","22","apply leave");
    await page.waitForTimeout(4000);

})
