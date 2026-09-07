import { Page, expect, Locator } from "@playwright/test";
export class Expenditure {
    readonly page: Page;
    readonly ExpenditureButton: Locator;
    readonly uploadBillBtn: Locator;
    readonly ExpType: Locator;
    readonly Description: Locator;
    readonly EnterDate: Locator;
    readonly EnterAmt: Locator;
    readonly uploadFile: Locator;
    readonly SubmitBillBtn: Locator;
    readonly DescriptionSearch: Locator;
    readonly BtnExport: Locator;
    readonly startMonth: Locator;
    readonly billAmount: Locator;
    readonly endMonth: Locator;
    readonly viewBillBtn: Locator;
    readonly checkBox: Locator;
    readonly deleteIcon: Locator;
    constructor(page: Page) {
        this.page = page;
        this.ExpenditureButton = page.getByRole("link", { name: "Expenditure" });
        this.uploadBillBtn = page.getByRole("button", { name: "Upload Bill" });
        this.ExpType = page.locator("//select[@name='expenditureType']");
        this.Description = page.locator("//textarea[@name='description']");
        this.EnterDate = page.locator("//input[@name='date']");
        this.EnterAmt = page.locator("//input[@name='amount']");
        this.uploadFile = page.locator("//label[@id='uploadBtn']");
        this.SubmitBillBtn = page.getByRole("button", { name: "Submit Bill" });
        this.DescriptionSearch = page.getByRole("textbox", { name: "DESCRIPTION Filter Input" });
        this.BtnExport = page.getByRole("button", { name: "Export" });
        this.startMonth = page.locator("//label[text()='Start Month']/parent::div//input");
        this.endMonth = page.locator("//label[text()='End Month']/parent::div//input");
        this.billAmount = page.locator("//span[@class='total-amount']");
        this.viewBillBtn = page.getByRole("button", { name: "View Bill" });
        this.checkBox = page.locator("ag-selection-checkbox");
        this.deleteIcon = page.locator("//button[@class='deleteIcon']");


    }

    async gotoExpenditure() {
        await this.ExpenditureButton.click();
        await expect(this.uploadBillBtn).toBeVisible();

    };
    async uploadBill(Enter_d: string, date: string, b_amt: string) {
        await this.ExpenditureButton.click();
        await this.uploadBillBtn.click();
        await this.ExpType.click();
        await this.ExpType.selectOption({ value: "Team Lunch" });
        await this.Description.fill(Enter_d);
        await this.EnterDate.fill(date);
        await this.EnterAmt.fill(b_amt);
        await this.uploadFile.setInputFiles("C:\\Users\\Admin\\Downloads\\image (18).png");
        await this.SubmitBillBtn.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.DescriptionSearch.fill(Enter_d);
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.page.getByText(Enter_d, { exact: true }).first()).toBeVisible({ timeout: 30000 });
        console.log("Description record is present");
        // await expect(this.Checkboxvisible).toBeVisible();
    };
    async exportExpenditure() {
        await this.ExpenditureButton.click();
        const [download] = await Promise.all([this.page.waitForEvent("download"), this.BtnExport.click()]);
        await download.saveAs("C:\\Users\\Admin\\Downloads\\Expenditure.xlsx");
        console.log("File saved successfully");
    };
    async totalExpenseofMonth(S_date: string, E_date: string) {

        await this.ExpenditureButton.click();
        await this.startMonth.fill(S_date);
        await this.startMonth.press("Enter");
        await this.endMonth.fill(E_date);
        await this.endMonth.press("Enter");
        await this.page.waitForLoadState("domcontentloaded");
        const totalAmount = (await this.billAmount.innerText()).trim();
        console.log("Start:", await this.startMonth.inputValue());
        console.log("End:", await this.endMonth.inputValue());
        console.log("Total Expense:", totalAmount);
    };

    async viewBill(V_description: string) {
        await this.ExpenditureButton.click();
        await this.DescriptionSearch.fill(V_description);
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForLoadState('networkidle');
        const descriptionCell = this.page.locator('[id^="cell-"]').filter({ hasText: V_description });
        await expect(descriptionCell).toHaveCount(1, { timeout: 30000 });
        const clicked = await descriptionCell.evaluate((el) => {
            const row = el.closest('tr') || el.closest('[role="row"]') || el.parentElement;
            if (!row) return false;
            const btn = Array.from(row.querySelectorAll('button')).find(b => (b.textContent || '').trim() === 'View Bill');
            if (!btn) return false;
            btn.scrollIntoView({ block: 'center' });
            (btn as HTMLElement).click();
            return true;
        });

        if (!clicked) throw new Error('View Bill button not found or not clickable for description: ' + V_description);

    };
    async deleteTheBill() {
        await this.ExpenditureButton.click();
        await this.DescriptionSearch.fill("Second Hyderabad Team Lunch");
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForLoadState('networkidle');
        const resultLocator = this.page.locator('[id^="cell-"]').filter({ hasText: "Second Hyderabad Team Lunch" });
        await resultLocator.first().waitFor({ state: 'visible', timeout: 30000 });

        // Click checkbox for every matching row
        const total = await resultLocator.count();
        for (let i = 0; i < total; i++) {
            const cell = resultLocator.nth(i);

            // Try a normal checkbox inside the same row
            const row = cell.locator('xpath=ancestor::tr');
            const checkbox = row.locator('input[type="checkbox"], ag-selection-checkbox').first();

            if (await checkbox.count() > 0) {
                await checkbox.scrollIntoViewIfNeeded();
                await checkbox.click();
                continue;
            }
            // Simple fallback: click the checkbox-like element inside the row via evaluate
            await cell.evaluate((el) => {
                const rowEl = el.closest('tr') || el.closest('[role="row"]') || el.parentElement;
                if (!rowEl) return;
                const cb = rowEl.querySelector('input[type="checkbox"], ag-selection-checkbox, .ag-checkbox-input, .checkbox-class, button.select-row');
                if (!cb) return;
                cb.scrollIntoView({ block: 'center' });
                (cb as HTMLElement).click();
            });
        }
        await this.deleteIcon.click();
        await this.DescriptionSearch.fill("Second Hyderabad Team Lunch");







    }
}