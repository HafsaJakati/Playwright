import{test}from"@playwright/test";
import { loginpage} from "../pages/login";
test("test1",async({page})=>{
    const login_page=new loginpage(page);
    await login_page.gotologinpage();
    await login_page.login("hafsajakathi@gmail.com","123456");
    await login_page.verifyloginsucess();

})