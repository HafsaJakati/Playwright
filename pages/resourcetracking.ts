import { Page, Locator, expect } from "@playwright/test";
export class ResourcetrackingPage {
    readonly page: Page;
    readonly resourcetrackingbtn: Locator;
    readonly addresourcebtn: Locator;
    readonly allocatedate: Locator;
    readonly devicetype: Locator;
    readonly serialid: Locator;
    readonly model: Locator;
    readonly submitbtn: Locator;
    readonly successmsg: Locator;
    readonly searchaddeddevice: Locator;
    readonly assignbtn: Locator;
    readonly assign_id: Locator;
    readonly assign_date: Locator;
    readonly asignsubmitbtn: Locator;
    readonly assignstatus: Locator;
    readonly releasebtn: Locator;
    readonly searcmodelagain: Locator;
    readonly releasemsg: Locator;
    readonly importsheet: Locator;
    readonly uploadbtn: Locator;
    readonly i_submitbtn: Locator;
    readonly ImportSuccessmsg: Locator;
    readonly resourcecount: Locator;
    readonly DeviceFilter: Locator;
    readonly FilterDeviceCount: Locator;
    readonly r_summarybtn: Locator;
    readonly r_summarycount: Locator;
    readonly TrackingHistorybtn: Locator;
    readonly Export_tracking_history: Locator;
    readonly modelfilter: Locator;



    constructor(page: Page) {
        this.page = page;
        this.resourcetrackingbtn = page.locator("(//p[text()='Resource Tracking'])[1]");
        this.addresourcebtn = page.getByRole("button", { name: "Add Resource" });
        this.allocatedate = page.locator("//input[@name='allocatedDate']");
        this.devicetype = page.locator("//select[@name='deviceType']");
        this.serialid = page.locator("//input[@name='serialId']");
        this.model = page.locator("//input[@name='model']");
        this.submitbtn = page.getByRole("button", { name: "Submit" });
        this.successmsg = page.locator("//div[text()='Resource Added Successfully']");
        this.searchaddeddevice = page.locator("//input[@id='ag-22-input']");
        this.assignbtn = page.getByRole("button", { name: "Assign" });
        this.assign_id = page.locator("//input[@name='employeeId']");
        this.assign_date = page.locator("//input[@name='allocatedDate']");
        this.asignsubmitbtn = page.getByRole("button", { name: "Submit" });
        this.assignstatus = page.locator("(//span[text()='Assigned'])[7]");
        this.releasebtn = page.locator("//button[text()='Release']");
        this.searcmodelagain = page.locator("//input[@aria-label='MODEL Filter Input']");
        this.releasemsg = page.locator("//div[text()='Resource Released successfully']");
        this.importsheet = page.getByText("Import Excel Sheet");
        this.uploadbtn = page.locator("//label[@id='uploadBtn']");
        this.i_submitbtn = page.locator("//button[text()='Submit']");
        this.ImportSuccessmsg = page.locator("//div[text()='Resource Imported Successfully']");
        this.resourcecount = page.locator("//div[@class='resourceCount']");
        this.DeviceFilter = page.locator("//select[@class='sc-dAlyuH fTcvlu']");
        this.FilterDeviceCount = page.locator("//div[@class='resourceCount']/p");
        this.r_summarybtn = page.getByRole("button", { name: "Summary" });
        this.r_summarycount = page.locator("//span[@ref='lbRecordCount']");
        this.TrackingHistorybtn = page.getByRole("button", { name: "Tracking History" });
        this.Export_tracking_history = page.getByRole("button", { name: "Export Tracking History" });
        this.modelfilter = page.getByRole('presentation')

    }

    async gotoresourcetrackingpage(s_id: string, model: string) {
        await this.resourcetrackingbtn.click();
        await this.addresourcebtn.click();
        await this.allocatedate.click();
        await this.allocatedate.fill("2026-08-28");
        await this.devicetype.click();
        await this.devicetype.selectOption({ index: 1 });
        await this.serialid.fill(s_id);
        await this.model.fill(model);
        await this.submitbtn.click();
        await expect(this.successmsg).toBeVisible();

        //await this.assignbtn.click();


    }
    async assignresource(model: string, a_id: string) {
        await this.resourcetrackingbtn.click();
        await this.searchaddeddevice.fill(model);
        await this.page.waitForTimeout(4000);
        await this.assignbtn.click();
        await this.assign_id.fill(a_id);
        await this.assign_date.click();
        await this.assign_date.fill("2026-08-28");
        await this.asignsubmitbtn.click();
        await this.page.waitForTimeout(4000);
        await this.searcmodelagain.fill(model);
        const row = this.page
            .locator(".ag-center-cols-container .ag-row")
            .filter({ hasText: model });

        const status = row.locator('[col-id="status"]');

        await expect(status).toHaveText("Assigned", {
            timeout: 10000
        });
    }

    async releaseaddedresource(model11: string) {
        await this.resourcetrackingbtn.click();
        await this.searchaddeddevice.fill(model11);
        await this.page.waitForTimeout(4000);
        await this.releasebtn.click();
        await this.page.waitForTimeout(4000);
        await this.searcmodelagain.fill(model11);
        const row = this.page
            .locator(".ag-center-cols-container .ag-row")
            .filter({ hasText: model11 });

        const status = row.locator('[col-id="status"]');

        await expect(status).toHaveText("Not Assigned", {
            timeout: 10000
        });

    }

    async importresource(s_model: string) {
        await this.resourcetrackingbtn.click();
        await this.importsheet.click();
        //await this.uploadbtn.click();
        await this.uploadbtn.setInputFiles("C:\\Users\\Admin\\Downloads\\import resource.xlsx");
        await this.i_submitbtn.click();
        //await expect(this.ImportSuccessmsg).toBeVisible();
        await expect(this.resourcecount).toHaveText("314");
        //await this.searcmodelagain.fill(s_model);


    }
    async DeviceTypeFilter() {
        await this.resourcetrackingbtn.click();
        // Get the count before filtering
        const initialCount = (await this.FilterDeviceCount.textContent())?.trim();
        console.log("Initial Count:", initialCount);
        // Select Mouse
        await this.DeviceFilter.selectOption({ label: "Mouse" });
        console.log(
            "Selected device:",
            await this.DeviceFilter.inputValue()
        );
        // Keep checking until the count changes
        await expect.poll(
            async () => {
                return (await this.FilterDeviceCount.textContent())?.trim();
            },
            {
                timeout: 10000,
                message: "Filtered device count did not update"
            }
        ).not.toBe(initialCount);
        // Now read the updated count
        const countText = (await this.FilterDeviceCount.textContent())?.trim();
        const deviceCount = Number(countText);
        console.log("Mouse Device Count:", deviceCount);
        expect(deviceCount).toBeGreaterThan(0);
    }
    async ResourceSummary() {
        await this.resourcetrackingbtn.click();
        await expect(this.r_summarybtn).toBeVisible();
        await this.r_summarybtn.click();
        await expect(
            this.page.getByText("EMP ID", { exact: true })
        ).toBeVisible({ timeout: 60000 });
        // Now wait for the row count
        await expect(this.r_summarycount).toBeVisible({
            timeout: 10000
        });
        const summaryCount = await this.r_summarycount.textContent();
        console.log("Resource Summary Count:", summaryCount);
    }
    async TrackingHistory() {
        await this.resourcetrackingbtn.click();
        await this.TrackingHistorybtn.click();
        const [download] = await Promise.all([
            this.page.waitForEvent("download", {
                timeout: 60000
            }),
            this.Export_tracking_history.click()
        ]);

        console.log("Downloaded file:", download.suggestedFilename());
    }
    async filters() {
        await this.resourcetrackingbtn.click();
        await this.modelfilter.click();
    }
}








