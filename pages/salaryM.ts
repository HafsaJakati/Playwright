import { Page, Locator } from "@playwright/test";
export class SalaryManagement {
    readonly page: Page;
    readonly smBtn: Locator;
    readonly addIncentive_btn: Locator;
    readonly enterEmpId: Locator;
    readonly enterAmt: Locator;
    readonly submitBtn: Locator;
    readonly cancelBtn: Locator;
    readonly deductionBtn: Locator;
    readonly empid: Locator;
    readonly ddAmt: Locator;
    readonly ddReason: Locator;
    readonly ddSubmitBtn: Locator;
    readonly genPayroll: Locator;
    readonly payslipBtn: Locator;
    readonly ps_EmpId: Locator;
    readonly ps_SubmitBtn: Locator;
    readonly ps_AllEmp: Locator;
    readonly ps_Month: Locator;
    readonly auditBtn: Locator;
    readonly importBtn: Locator;
    readonly uploadBtn: Locator;
    readonly fileSubmit: Locator;
    readonly IncentiveStatus: Locator;

    constructor(page: Page) {
        this.page = page;
        this.smBtn = page.getByRole("link", { name: "Salary Management" });
        this.addIncentive_btn = page.getByText("Add Incentive");
        this.enterEmpId = page.locator("//input[@name='empId']");
        this.enterAmt = page.locator("//input[@name='amount']");
        this.submitBtn = page.getByText("Submit");
        this.cancelBtn = page.getByText("Cancel");
        this.deductionBtn = page.getByRole("button", { name: "Add Deduction" });
        this.empid = page.locator("//input[@name='empId']");
        this.ddAmt = page.locator("//input[@name='amount']");
        this.ddReason = page.locator("//textarea[@name='reason']");
        this.ddSubmitBtn = page.getByRole("button", { name: "Submit" });
        this.genPayroll = page.getByRole("button", { name: "Generate Payroll" });
        this.payslipBtn = page.getByRole("button", { name: "Generate Payslip" });
        this.ps_EmpId = page.locator("//input[@id='EmpID']");
        this.ps_SubmitBtn = page.getByText("Submit");
        this.ps_AllEmp = page.getByRole("radio", { name: "All Employees" });
        this.ps_Month = page.locator("//input[@id='date']");
        this.auditBtn = page.getByText("Generate Audit");
        this.importBtn = page.getByRole("button", { name: "Import Leaves" });
        this.uploadBtn = page.locator("//label[@id='uploadBtn']");
        this.fileSubmit = page.getByRole("button", { name: "Submit" });
        this.IncentiveStatus = page.locator("//div[@role='status']");
    }
    async AddIncentive(emp_id: string, amt: string) {
        await this.smBtn.click();
        await this.addIncentive_btn.click();
        await this.enterEmpId.fill(emp_id);
        await this.enterAmt.fill(amt);
        await this.submitBtn.click();
        await this.IncentiveStatus.waitFor({ state: "visible" });


    }

    async Cancel(emp_id: string, amt: string) {
        await this.smBtn.click();
        await this.addIncentive_btn.click();
        await this.enterEmpId.fill(emp_id);
        await this.enterAmt.fill(amt);
        await this.cancelBtn.click();
    }

    async AddDeduction(enterid: string, enterddamt: string, enterreason: string) {
        //enterreason:string
        await this.smBtn.click();
        await this.deductionBtn.click();
        await this.empid.fill(enterid);
        await this.ddAmt.fill(enterddamt);
        await this.ddReason.click();
        await this.ddReason.fill(enterreason);
        await this.ddSubmitBtn.click();

    }
    async GeneratePayroll() {
        await this.smBtn.click();
        await this.page.waitForLoadState("domcontentloaded");
        const downloadPromise = this.page.waitForEvent("download", { timeout: 120000 });
        await this.genPayroll.click();
        const download = await downloadPromise;
        await download.path();
        console.log(await download.suggestedFilename());
        // await this.page.waitForLoadState("domcontentloaded");

    }

    async GeneratePayslip(enter_id: string) {
        await this.smBtn.click();
        await this.payslipBtn.click();
        await this.ps_EmpId.fill(enter_id);
        await this.ps_SubmitBtn.click();
    }

    async AllEmployeesPayslip(entermonth: string) {
        await this.smBtn.click();
        await this.payslipBtn.click();
        await this.ps_AllEmp.click();
        await this.ps_Month.click();
        await this.ps_Month.fill(entermonth);
        await this.ps_SubmitBtn.click()
        // const [download] = await Promise.all([
        //     this.page.waitForEvent("download", { timeout: 120000 }),]);
        // console.log("Downloaded:", await download.suggestedFilename());
    }

    async GenerateAudit() {
        await this.smBtn.click();
        await this.auditBtn.click();
        const [download] = await Promise.all([
            this.page.waitForEvent("download", { timeout: 120000 }),]);
        console.log("Downloaded:", await download.suggestedFilename());
    }

    async ImportLeaves() {
        await this.smBtn.click();
        await this.importBtn.click();
        await this.uploadBtn.click();
        await this.uploadBtn.setInputFiles("C:\\Users\\Admin\\Downloads\\ImportLeavesFile.xlsx");
        await this.fileSubmit.click();

    }
}
