import { Page, Locator, expect } from "@playwright/test";
export class ResourcetrackingPage {
    readonly page: Page;
    readonly resourceTrackingBtn: Locator;
    readonly addResourceBtn: Locator;
    readonly allocateDate: Locator;
    readonly deviceType: Locator;
    readonly serialId: Locator;
    readonly model: Locator;
    readonly submitBtn: Locator;
    readonly successMsg: Locator;
    readonly searchAddedDevice: Locator;
    readonly assignBtn: Locator;
    readonly assign_Id: Locator;
    readonly assign_Date: Locator;
    readonly asignSubmitBtn: Locator;
    readonly assignStatus: Locator;
    readonly releaseBtn: Locator;
    readonly searcModelAgain: Locator;
    readonly releaseMsg: Locator;
    readonly importSheet: Locator;
    readonly uploadBtn: Locator;
    readonly i_submitBtn: Locator;
    readonly ImportSuccessMsg: Locator;
    readonly resourceCount: Locator;
    readonly DeviceFilter: Locator;
    readonly FilterDeviceCount: Locator;
    readonly r_summaryBtn: Locator;
    readonly r_summaryCount: Locator;
    readonly TrackingHistoryBtn: Locator;
    readonly Export_Tracking_History: Locator;
    readonly modelFilter: Locator;
    readonly SearchwithSID: Locator;
    readonly Status: Locator;



    constructor(page: Page) {
        this.page = page;
        this.resourceTrackingBtn = page.getByRole("link", { name: "Resource Tracking" });
        this.addResourceBtn = page.getByRole("button", { name: "Add Resource" });
        this.allocateDate = page.locator("//input[@name='allocatedDate']");
        this.deviceType = page.locator("//select[@name='deviceType']");
        this.serialId = page.locator("//input[@name='serialId']");
        this.model = page.locator("//input[@name='model']");
        this.submitBtn = page.getByRole("button", { name: "Submit" });
        this.successMsg = page.locator("//div[text()='Resource Added Successfully']");
        this.searchAddedDevice = page.locator("//input[@id='ag-22-input']");
        this.assignBtn = page.getByRole("button", { name: "Assign" });
        this.assign_Id = page.locator("//input[@name='employeeId']");
        this.assign_Date = page.locator("//input[@name='allocatedDate']");
        this.asignSubmitBtn = page.getByRole("button", { name: "Submit" });
        this.assignStatus = page.locator("(//span[text()='Assigned'])[7]");
        this.releaseBtn = page.locator("//button[text()='Release']");
        this.searcModelAgain = page.locator('input[aria-label="MODEL Filter Input"]');
        this.releaseMsg = page.locator("//div[text()='Resource Released successfully']");
        this.importSheet = page.getByText("Import Excel Sheet");
        this.uploadBtn = page.locator("//label[@id='uploadBtn']");
        this.i_submitBtn = page.locator("//button[text()='Submit']");
        this.ImportSuccessMsg = page.locator("//div[text()='Resource Imported Successfully']");
        this.resourceCount = page.locator("//div[@class='resourceCount']");
        this.DeviceFilter = page.locator("//select[@class='sc-dAlyuH fTcvlu']");
        this.FilterDeviceCount = page.locator("//div[@class='resourceCount']/p");
        this.r_summaryBtn = page.getByRole("button", { name: "Summary" });
        this.r_summaryCount = page.locator("//span[@ref='lbRecordCount']");
        this.TrackingHistoryBtn = page.getByRole("button", { name: "Tracking History" });
        this.Export_Tracking_History = page.getByRole("button", { name: "Export Tracking History" });
        this.modelFilter = page.locator("//div[@role='rowgroup']//div[1]//div[2]//button[1]//span[1]");
        this.SearchwithSID = page.locator("//input[@aria-label='SERIAL ID Filter Input']");
        this.Status = page.locator("//span[text()='Not Assigned']");

    }

    async AddResource(A_Date: string, s_id: string, model: string) {
        await this.resourceTrackingBtn.click();
        await this.addResourceBtn.click();
        await this.allocateDate.click();
        await this.allocateDate.fill(A_Date);
        await this.deviceType.click();
        await this.deviceType.selectOption({ index: 1 });
        await this.serialId.fill(s_id);
        await this.model.fill(model);
        await this.submitBtn.click();
        //await expect(this.successmsg).toBeVisible();


    }
    async assignResource(Assigndate: string, model: string, a_id: string) {
        await this.resourceTrackingBtn.click();
        await this.searchAddedDevice.fill(model);
        const row = this.page.locator(".ag-center-cols-container .ag-row").filter({ hasText: model });
        await expect(row).toBeVisible({ timeout: 10000 });
        await row.getByRole("button", { name: "Assign" }).click();
        await this.assign_Id.fill(a_id);
        await this.assign_Date.fill(Assigndate);
        await this.asignSubmitBtn.click();
    };
    async CheckAssignStatus(model: string) {
        await this.resourceTrackingBtn.click();
        await this.searchAddedDevice.fill(model);
        const updatedRow = this.page.locator(".ag-center-cols-container .ag-row").filter({ hasText: model });
        const status = updatedRow.locator('[col-id="status"]');
        await expect(status).toHaveText("Assigned", {
            timeout: 30000
        });

    };

    async releaseAddedResource(model11: string) {

        await this.resourceTrackingBtn.click();
        await expect(this.searcModelAgain).toBeVisible();
        await this.searcModelAgain.fill(model11);
        const row = this.page.locator(".ag-center-cols-container .ag-row").filter({ hasText: model11 });
        await expect(row).toBeVisible({ timeout: 10000 });
        await row.getByRole("button", { name: "Release" }).click();

    };
    async CheckReleseStatus(model11: string) {

        await this.resourceTrackingBtn.click();
        await expect(this.searcModelAgain).toBeVisible({ timeout: 30000 });
        await this.searcModelAgain.fill(model11);
        const updatedRow = this.page.locator(".ag-center-cols-container .ag-row").filter({ hasText: model11 });
        await expect(updatedRow).toBeVisible({ timeout: 30000 });
        const status = updatedRow.locator('[col-id="status"]');
        await expect(this.Status).toHaveText("Not Assigned", { timeout: 30000 });
    };



    async importResource(s_model: string) {
        await this.resourceTrackingBtn.click();
        await this.importSheet.click();
        //await this.uploadbtn.click();
        await this.uploadBtn.setInputFiles("C:\\Users\\Admin\\Downloads\\import resource.xlsx");
        await this.i_submitBtn.click();
        //await expect(this.ImportSuccessmsg).toBeVisible();
        await expect(this.resourceCount).toHaveText("314");
        //await this.searcmodelagain.fill(s_model);


    }
    async DeviceTypeFilter() {
        await this.resourceTrackingBtn.click();
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
        await this.resourceTrackingBtn.click();
        await expect(this.r_summaryBtn).toBeVisible();
        await this.r_summaryBtn.click();
        await expect(
            this.page.getByText("EMP ID", { exact: true })
        ).toBeVisible({ timeout: 60000 });
        // Now wait for the row count
        await expect(this.r_summaryCount).toBeVisible({
            timeout: 10000
        });
        const summaryCount = await this.r_summaryCount.textContent();
        console.log("Resource Summary Count:", summaryCount);
    }
    async TrackingHistory() {
        await this.resourceTrackingBtn.click();
        await this.TrackingHistoryBtn.click();
        const [download] = await Promise.all([
            this.page.waitForEvent("download", {
                timeout: 60000
            }),
            this.Export_Tracking_History.click()
        ]);

        console.log("Downloaded file:", download.suggestedFilename());
    }
    async filters() {
        await this.resourceTrackingBtn.click();
        await this.modelFilter.click();
    }
}








