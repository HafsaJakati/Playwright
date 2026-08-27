import { test } from "@playwright/test";
import { loginpage } from "../pages/login";
import { salarymanagement } from "../pages/salaryM";


test.describe("incentives", () => {
    test("salarymanagement", async ({ page }) => {
        const login_page = new loginpage(page);
        const salary_management = new salarymanagement(page);
        await login_page.gotologinpage();
        await login_page.login("hafsajakathi@gmail.com", "123456");
        await salary_management.addincentive("D0XVPd", "5000");


    })

    test("cancelincentive", async ({ page }) => {
        const login_page = new loginpage(page);
        const salary_management = new salarymanagement(page);
        await login_page.gotologinpage();
        await login_page.login("hafsajakathi@gmail.com", "123456");
        await salary_management.cancel("D0XVPd", "5000");
        await page.waitForTimeout(5000);
    })
})
test.describe("adddeduction", () => {
    test("dd", async ({ page }) => {
        const login_page = new loginpage(page);
        const salary_management = new salarymanagement(page);
        await login_page.gotologinpage();
        await login_page.login("hafsajakathi@gmail.com", "123456");
        await salary_management.deduction("EmpOne", "2000", "test reason");
    })

})

test.describe("payroll", () => {
    test.setTimeout(120000);
    test("generatepayroll", async ({ page }) => {
        const login_page = new loginpage(page);
        const salary_management = new salarymanagement(page);
        await login_page.gotologinpage();
        await login_page.login("hafsajakathi@gmail.com", "123456");
        await salary_management.generatepayroll();

    })
})

test.describe("generatepayslip", () => {
    test.setTimeout(150000);
    test("genpayslip", async ({ page }) => {
        const login_page = new loginpage(page);
        const salary_management = new salarymanagement(page);
        await login_page.gotologinpage();
        await login_page.login("hafsajakathi@gmail.com", "123456");
        await salary_management.payslip("EmpOne");
    })

    test("payslipforallemp", async ({ page }) => {
        const login_page = new loginpage(page);
        const salary_management = new salarymanagement(page);
        await login_page.gotologinpage();
        await login_page.login("hafsajakathi@gmail.com", "123456");
        await salary_management.allemppayslip("July 2026");
    })
})
test("generateaudit", async ({ page }) => {
    test.setTimeout(120000);
    const login_page = new loginpage(page);
    const salary_management = new salarymanagement(page);
    await login_page.gotologinpage();
    await login_page.login("hafsajakathi@gmail.com", "123456");
    await salary_management.generateaudit();
})

test("import_leaves", async ({ page }) => {
    const login_page = new loginpage(page);
    const salary_management = new salarymanagement(page);
    await login_page.gotologinpage();
    await login_page.login("hafsajakathi@gmail.com", "123456");
    await salary_management.importleaves();
})