import { test, expect } from "@playwright/test";
import { Loginpage } from "../pages/login";
import { PaySlip } from "../pages/payslip_m";

test.beforeEach("login", async ({ page }) => {
    const login_page = new Loginpage(page);
    await login_page.gotologinpage();
    await login_page.login();
})

test("Payslip_Tests", async ({ page }) => {
    const pay_slip = new PaySlip(page);
    await pay_slip.GeneratePayslip();
})