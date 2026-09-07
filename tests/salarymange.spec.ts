import { test } from "@playwright/test";
import { Loginpage } from "../pages/login";
import { SalaryManagement } from "../pages/salaryM";
import * as fs from "fs";

const filepath = "./testdata/SalaryManagement.json";
const Salarydata = JSON.parse(fs.readFileSync(filepath, "utf-8"));

test.beforeEach(async ({ page }) => {
    const login_page = new Loginpage(page);
    await login_page.gotologinpage();
    await login_page.login();
});


test.describe("IncentivesTests", () => {
    test("AddingIncentive", async ({ page }) => {
        const salary_management = new SalaryManagement(page);
        await salary_management.AddIncentive(Salarydata.EmployeeIdSM, Salarydata.AmountSM);


    })

    test("CancelIncentive", async ({ page }) => {

        const salary_management = new SalaryManagement(page);
        await salary_management.Cancel(Salarydata.EmployeeIdSM, Salarydata.AmountSM);

    })
});
test.describe("AddDeductionTests", () => {
    test("AddDeduction", async ({ page }) => {
        const salary_management = new SalaryManagement(page);
        await salary_management.AddDeduction(Salarydata.DeductionID, Salarydata.DeductionAmt, Salarydata.DeductionReason);
    });

});

test.describe("PayrollTests", () => {

    test("generatepayroll", async ({ page }) => {
        const salary_management = new SalaryManagement(page);
        await salary_management.GeneratePayroll();

    });
});

test.describe("PayslipTests", () => {

    test("genpayslip", async ({ page }) => {
        const salary_management = new SalaryManagement(page);
        await salary_management.GeneratePayslip(Salarydata.PayslipId);
    });

    test("payslipforallemp", async ({ page }) => {
        const salary_management = new SalaryManagement(page);
        await salary_management.AllEmployeesPayslip(Salarydata.AllEMployeesypayslipMonth);
    });
});
test("GenerateAuditTests", async ({ page }) => {
    const salary_management = new SalaryManagement(page);
    await salary_management.GenerateAudit();
})

test("ImportLeavesTests", async ({ page }) => {

    const salary_management = new SalaryManagement(page);
    await salary_management.ImportLeaves();
})