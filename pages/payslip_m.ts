import { Page, Locator, expect } from "@playwright/test";
export class PaySlip {
    readonly page: Page;
    readonly payslipBtn: Locator;
    readonly monthDd: Locator;
    readonly errMsg: Locator;


    constructor(page: Page) {
        this.page = page;
        this.payslipBtn = page.getByRole("link", { name: "Payslip" });
        this.monthDd = page.locator("//select[@class='selectElement']").first();
        this.errMsg = page.locator("//div[text()='Payslip not found']");
    }

    async GeneratePayslip() {
        await this.payslipBtn.click();
        await this.monthDd.click();
        await this.monthDd.selectOption({ label: "July" });
        await expect(this.errMsg).toBeVisible();
    }










}