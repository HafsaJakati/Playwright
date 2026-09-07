import { test } from "@playwright/test";
import { Loginpage } from "../pages/login";
import { ApplyLeave } from "../pages/leaveM";
import * as fs from "fs";
import { json } from "node:stream/consumers";

test.beforeEach(async ({ page }) => {
    const login_page = new Loginpage(page);
    await login_page.gotologinpage();
    await login_page.login();
});


const filepath = "./testdata/LeaveManagement.json";
const ApplyLeaveData = JSON.parse(fs.readFileSync(filepath, "utf-8"));
test("ApplyLeaveTest", async ({ page }) => {
    const LM = new ApplyLeave(page);
    await LM.applyLeave(ApplyLeaveData.FromDate, ApplyLeaveData.ToDate, ApplyLeaveData.Subject);

});
