import { test } from "@playwright/test";
import { ResourcetrackingPage } from "../pages/resourcetracking";
import { loginpage } from "../pages/login";
test.beforeEach(async ({ page }) => {
    const login_page = new loginpage(page);
    await login_page.gotologinpage();
    await login_page.login("hafsajakathi@gmail.com", "123456");
});
test("Resource_tracking", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.gotoresourcetrackingpage("10016", "testmodel16");
});
test("Assign_resource", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.assignresource("16", "testro001");
    await page.waitForTimeout(4000);
});

test("Release_resource", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.releaseaddedresource("16");
});

test("Import_resource", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.importresource("first");
});
test("DeviceTypeFilter", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.DeviceTypeFilter();
});
test("Summary_Resource", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.ResourceSummary();
});

test("Resource_Tracking_History", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.TrackingHistory();
});

test("Apply Filter", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.filters();
});
