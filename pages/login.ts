import { Page, Locator, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
export class Loginpage {

  readonly page: Page;
  readonly userName: Locator;
  readonly passWord: Locator;
  readonly loginBtn: Locator;
  readonly dashBoard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator("//input[@id='userEmail']");
    this.passWord = page.locator("//input[@id='userPassword']");
    this.loginBtn = page.locator("//button[@type='submit']");
    this.dashBoard = page.locator("(//p[text()='Dashboard'])[2]");
  }
  async gotologinpage() {
    await this.page.goto(process.env.BASE_URL!);
  }

  async login() {
    await this.userName.fill(process.env.APP_USERNAME!);
    await this.passWord.fill(process.env.APP_PASSWORD!);
    await this.loginBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.dashBoard).toBeVisible({ timeout: 60000 });

  }

  async verifyloginsucess() {
    await expect(this.dashBoard).toBeVisible();
  }

}