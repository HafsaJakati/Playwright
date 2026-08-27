import{Page,Locator, expect}from "@playwright/test";
export class loginpage{

readonly page:Page;
readonly username:Locator;
readonly password:Locator;
readonly loginbtn:Locator;
readonly dashboard:Locator;

constructor (page:Page){
     this.page=page;
this.username=page.locator("//input[@id='userEmail']");
this.password=page.locator("//input[@id='userPassword']");
this.loginbtn=page.locator("//button[@type='submit']");
this.dashboard=page.locator("(//p[text()='Dashboard'])[2]");
}
async gotologinpage(){
  await  this.page.goto("https://dev.urbuddi.com/login");
}

async login(user:string,pass:string){
await this.username.fill(user);
await this.password.fill(pass);
await this.loginbtn.click();
await this.page.waitForTimeout(5000);

}

async verifyloginsucess(){
    await expect(this.dashboard).toBeVisible();
}

}