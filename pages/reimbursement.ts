import { Page, Locator, expect } from "@playwright/test";
export class Reimbursement {
    readonly page: Page;
    readonly ClickOnReimbursement: Locator;
    readonly ApplyEWBtn: Locator;
    readonly SelectDate: Locator;
    readonly SelectHours: Locator;
    readonly SelectLead: Locator;
    readonly SubmitBtn: Locator;
    readonly SelectMonth: Locator;
    readonly EnterDate: Locator;
    readonly SearchaddedDate: Locator;
    readonly row: Locator;
    Status: Locator;
    readonly RecordCount: Locator;
    readonly All_History: Locator;
    constructor(page: Page) {
        this.page = page;
        this.ClickOnReimbursement = page.getByRole("link", { name: "Reimbursement" });
        this.ApplyEWBtn = page.getByRole("button", { name: "Apply Extra Work" });
        this.SelectDate = page.locator("//input[@name='date']");
        this.SelectHours = page.locator("//input[@name='hours']");
        this.SelectLead = page.locator("//select[@name='lead']");
        this.SubmitBtn = page.getByRole("button", { name: "Submit" });
        this.SelectMonth = page.locator("//input[@class='date-input-label']");
        this.EnterDate = page.locator("//input[contains(@class, 'react-datepicker')]");
        this.SearchaddedDate = page.locator("//input[@id='ag-18-input']");
        this.row = page.getByRole('row', { name: '29-08-2026 8 Awaiting' })
        this.Status = page.locator("span[id^='cell-status-']");
        this.RecordCount = page.locator('span[ref="lbRecordCount"][id$="-row-count"]');
        this.All_History = page.getByRole("button", { name: "All History" });
    }
    async GoToReimbursement() {
        await this.ClickOnReimbursement.click();
        await expect(this.ApplyEWBtn).toBeVisible({ timeout: 5000 });
    };
    async ApplyExtraWork() {
        await this.ClickOnReimbursement.click();
        await this.ApplyEWBtn.click();
        await this.SelectDate.fill("2026-08-29");
        await this.SelectDate.press("Enter");
        await this.SelectHours.fill("8");
        await this.SelectLead.click();
        await this.SelectLead.selectOption({ value: "test123@gmail.com" });
        await this.SubmitBtn.click();
        await this.SelectMonth.click();
        await this.EnterDate.fill("August 2026");
        await this.page.waitForLoadState("domcontentloaded");
        await this.SearchaddedDate.fill("29");
        // await expect(this.Status).toBeVisible({ timeout: 7000 });
    };
    async SearchExtraWork(date: string) {
        await this.ClickOnReimbursement.click();
        await this.SelectMonth.click();
        await this.EnterDate.fill("August 2026");
        await this.SearchaddedDate.fill(date);
        // const row = this.page.getByRole('row', { name: '29-08-2026 8 Awaiting' })
        //     ;
        await expect(this.row).toBeVisible({ timeout: 7000 });
        this.Status = this.row;
        await expect(this.Status).toBeVisible({ timeout: 7000 });
        console.log(`Request for ${date} has status: ${await this.Status.innerText()}`);
    };
    async AllHIstory() {
        await this.ClickOnReimbursement.click();
        await this.All_History.click();
        await expect(this.RecordCount).toBeVisible();
        console.log("Before month:", await this.RecordCount.innerText());
        await this.SelectMonth.click();
        await this.EnterDate.fill("August 2026");
        await this.EnterDate.press("Enter");
        await this.page.waitForTimeout(1000);
        console.log("After month:", await this.RecordCount.innerText());
    }


}
