import { test } from "@playwright/test";
import { Loginpage } from "../pages/login";
import { HrModule } from "../pages/HR";

test.beforeEach(async ({ page }) => {
    const login_page = new Loginpage(page);
    await login_page.gotologinpage();
    await login_page.login();
});

test("creatingJob", async ({ page }) => {
    const hr = new HrModule(page);
    await hr.createJob();
});