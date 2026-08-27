import{Page,Locator,expect}from"@playwright/test";
export class applyleave{
readonly page:Page;
readonly leavemanagement:Locator;
readonly applyleavebtn:Locator;
readonly fromdate:Locator;
readonly todate:Locator;
readonly subject:Locator;

    constructor(page:Page){
      this.page=page;
      this.leavemanagement=page.locator("(//p[text()='Leave Management'])[1]");
      //this.applyleavebtn=page.getByText("Apply Leave");
      this.applyleavebtn=page.locator("//button[text()='Apply Leave']");
      this.fromdate=page.getByPlaceholder("From");
      this.todate=page.getByPlaceholder("To");
      this.subject=page.locator("//input[@name='subject']");

    }
async leave(d_frm:string,d_to:string,sub:string){
await this.leavemanagement.click();
await this.page.waitForLoadState('domcontentloaded');
await this.applyleavebtn.click();
await this.fromdate.fill(d_frm);
await this.todate.fill(d_to);
await this.subject.fill(sub);

}
}
