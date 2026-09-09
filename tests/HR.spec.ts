import { test } from "@playwright/test";
import { Loginpage } from "../pages/login";
import { HrModule } from "../pages/HR";
import * as fs from "fs";

const filepath = "./testdata/HR.json";
const hrdata = JSON.parse(fs.readFileSync(filepath, "utf-8"));

test.beforeEach(async ({ page }) => {
    const login_page = new Loginpage(page);
    await login_page.gotologinpage();
    await login_page.login();
});

test("creatingJob", async ({ page }) => {
    const hr = new HrModule(page);
    await hr.createJob(hrdata.jobtitle, hrdata.Designation, hrdata.Location, hrdata.Veccancy,
        hrdata.Experiance, hrdata.Skill1, hrdata.Skill2, hrdata.Skill3, hrdata.Skill4, hrdata.description, hrdata.publishdate);
});

test("searchingAddedJob", async ({ page }) => {
    const hr = new HrModule(page);
    await hr.searchAddedJob(hrdata.searchjobtitle);
});
test("referACandidate", async ({ page }) => {
    const hr = new HrModule(page);
    await hr.referCandidate(hrdata.searchjobtitle);
});
test("ViewtheReadyCandidate", async ({ page }) => {
    const hr = new HrModule(page);
    await hr.viewCandidateResume(hrdata.searchjobtitle);
});

test("sortByResume", async ({ page }) => {
    const hr = new HrModule(page);
    await hr.sortResume(hrdata.searchjobtitle);
});
test("closeJobAndReopenJobTest", async ({ page }) => {
    const hr = new HrModule(page);
    await hr.closeAndReopenJob(hrdata.closejobname);
});