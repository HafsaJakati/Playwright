import { test, expect } from "@playwright/test";
import { loginpage } from "../pages/login";
import { payslip1 } from "../pages/payslip_m";

test.beforeEach("login", async ({ page }) => {
    const login_page = new loginpage(page);
    await login_page.gotologinpage();
    await login_page.login("hafsajakathi@gmail.com", "123456");
})

test("payslipm", async ({ page }) => {
    const pay_slip = new payslip1(page);
    await pay_slip.payslip();
})