import { Page, Locator } from "@playwright/test";
export class salarymanagement {
    readonly page: Page;
    readonly smbtn: Locator;
    readonly addincentive_btn: Locator;
    readonly enterempid: Locator;
    readonly enteramt: Locator;
    readonly submitbtn: Locator;
    readonly cancelbtn: Locator;
    readonly deductionbtn: Locator;
    readonly empid: Locator;
    readonly ddamt: Locator;
    readonly ddreason: Locator;
    readonly ddsubmitbtn: Locator;
    readonly genpayroll: Locator;
    readonly payslipbtn: Locator;
    readonly ps_empid: Locator;
    readonly ps_submitbtn: Locator;
    readonly ps_allemp: Locator;
    readonly ps_month: Locator;
    readonly auditbtn: Locator;
    readonly importbtn: Locator;
    readonly uploadbtn: Locator;
    readonly filesubmit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.smbtn = page.locator("(//p[text()='Salary Management'])[1]");
        this.addincentive_btn = page.getByText("Add Incentive");
        this.enterempid = page.locator("//input[@name='empId']");
        this.enteramt = page.locator("//input[@name='amount']");
        this.submitbtn = page.getByText("Submit");
        this.cancelbtn = page.getByText("Cancel");
        this.deductionbtn = page.getByRole("button", { name: "Add Deduction" });
        this.empid = page.locator("//input[@name='empId']");
        this.ddamt = page.locator("//input[@name='amount']");
        this.ddreason = page.locator("//textarea[@name='reason']");
        this.ddsubmitbtn = page.getByRole("button", { name: "Submit" });
        this.genpayroll = page.getByRole("button", { name: "Generate Payroll" });
        this.payslipbtn = page.getByRole("button", { name: "Generate Payslip" });
        this.ps_empid = page.locator("//input[@id='EmpID']");
        this.ps_submitbtn = page.getByText("Submit");
        this.ps_allemp = page.getByRole("radio", { name: "All Employees" });
        this.ps_month = page.locator("//input[@id='date']");
        this.auditbtn = page.getByText("Generate Audit");
        this.importbtn = page.getByRole("button", { name: "Import Leaves" });
        this.uploadbtn = page.locator("//label[@id='uploadBtn']");
        this.filesubmit = page.getByRole("button", { name: "Submit" });
    }
    async addincentive(emp_id: string, amt: string) {
        await this.smbtn.click();
        await this.addincentive_btn.click();
        await this.enterempid.fill(emp_id);
        await this.enteramt.fill(amt);
        await this.submitbtn.click();


    }

    async cancel(emp_id: string, amt: string) {
        await this.smbtn.click();
        await this.addincentive_btn.click();
        await this.enterempid.fill(emp_id);
        await this.enteramt.fill(amt);
        await this.cancelbtn.click();
    }

    async deduction(enterid: string, enterddamt: string, enterreason: string) {
        //enterreason:string
        await this.smbtn.click();
        await this.deductionbtn.click();
        await this.empid.fill(enterid);
        await this.ddamt.fill(enterddamt);
        await this.ddreason.click();
        await this.ddreason.fill(enterreason);
        await this.ddsubmitbtn.click();

    }
    async generatepayroll() {
        await this.smbtn.click();
        const downloadPromise = this.page.waitForEvent("download", { timeout: 120000 });
        await this.genpayroll.click();
        const download = await downloadPromise;
        await download.path();
        console.log(await download.suggestedFilename());
        // await this.page.waitForLoadState("domcontentloaded");

    }

    async payslip(enter_id: string) {
        await this.smbtn.click();
        await this.payslipbtn.click();
        await this.ps_empid.fill(enter_id);
        await this.ps_submitbtn.click();
    }

    async allemppayslip(entermonth: string) {
        await this.smbtn.click();
        await this.payslipbtn.click();
        await this.ps_allemp.click();
        await this.ps_month.click();
        await this.ps_month.fill(entermonth);
        await this.ps_submitbtn.click()
        // const [download] = await Promise.all([
        //     this.page.waitForEvent("download", { timeout: 120000 }),]);
        // console.log("Downloaded:", await download.suggestedFilename());
    }

    async generateaudit() {
        await this.smbtn.click();
        await this.auditbtn.click();
        const [download] = await Promise.all([
            this.page.waitForEvent("download", { timeout: 120000 }),]);
        console.log("Downloaded:", await download.suggestedFilename());
    }

    async importleaves() {
        await this.smbtn.click();
        await this.importbtn.click();
        await this.uploadbtn.click();
        await this.uploadbtn.setInputFiles("C:\\Users\\Admin\\Downloads\\Untitled spreadsheet.xlsx");
        await this.filesubmit.click();
        
    }
}
