import { Page, Locator, expect } from "@playwright/test";
export class payslip1 {
    readonly page: Page;
    readonly payslipbtn: Locator;
    readonly monthdd: Locator;
    readonly errmsg: Locator;


    constructor(page: Page) {
        this.page = page;
        this.payslipbtn = page.locator("(//p[text()='Payslip'])[1]");
        this.monthdd = page.locator("//select[@class='selectElement']").first();
        this.errmsg = page.locator("//div[text()='Payslip not found']");
    }

    async payslip() {
        await this.payslipbtn.click();
        await this.monthdd.click();
        await this.monthdd.selectOption({ label: "July" });
        await expect(this.errmsg).toBeVisible();
    }










}