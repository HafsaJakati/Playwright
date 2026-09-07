import { test } from "@playwright/test";
import { ResourcetrackingPage } from "../pages/resourcetracking";
import { Loginpage } from "../pages/login";
import * as fs from "fs";
const filepath = "./testdata/ResourceTracking.json";
const ResourceTdata = JSON.parse(fs.readFileSync(filepath, "utf-8"));
test.beforeEach(async ({ page }) => {
    const login_page = new Loginpage(page);
    await login_page.gotologinpage();
    await login_page.login();
});
test("ADDResource_tracking", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.AddResource(ResourceTdata.AddresourceDate, ResourceTdata.ResourceserialID, ResourceTdata.ResourceModel);
});
test("Assign_resource", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.assignResource(ResourceTdata.AssignresourceDate, ResourceTdata.AssigningmodelName, ResourceTdata.AssigningEmpid);
});
test("AssignStatus", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.CheckAssignStatus(ResourceTdata.AssigningmodelName)
})

test("Release_resource", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.releaseAddedResource(ResourceTdata.ReleaseresourceModel);

});

test("ReleaseStatus", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    rt.CheckReleseStatus(ResourceTdata.ReleaseresourceModel)

});

test("Import_resource", async ({ page }) => {
    const rt = new ResourcetrackingPage(page);
    await rt.importResource("first");
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
