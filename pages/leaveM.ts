import { Page, Locator, expect } from "@playwright/test";
export class ApplyLeave {
  readonly page: Page;
  readonly leaveManagement: Locator;
  readonly applyLeavebtn: Locator;
  readonly fromDate: Locator;
  readonly toDate: Locator;
  readonly subject: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leaveManagement = page.getByRole("link", { name: "Leave Management" })
    //this.applyleavebtn=page.getByText("Apply Leave");
    this.applyLeavebtn = page.locator("//button[text()='Apply Leave']");
    this.fromDate = page.getByPlaceholder("From");
    this.toDate = page.getByPlaceholder("To");
    this.subject = page.locator("//input[@name='subject']");

  }
  async applyLeave(d_frm: string, d_to: string, sub: string) {
    await this.leaveManagement.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.applyLeavebtn.click();
    await this.fromDate.fill(d_frm);
    await this.toDate.fill(d_to);
    await this.subject.fill(sub);

  }
}
