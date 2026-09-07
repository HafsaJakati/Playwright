import { test } from "@playwright/test";
import { Loginpage } from "../pages/login";
import { Reimbursement } from "../pages/reimbursement";
import * as fs from "fs";

const filepath = "./testdata/Reimbursementdata.json";
const Reimbursementdata = JSON.parse(fs.readFileSync(filepath, "utf-8"));
test.beforeEach(async ({ page }) => {
    const login_page = new Loginpage(page);
    await login_page.gotologinpage();
    await login_page.login();
});

test("Reimbursement", async ({ page }) => {
    const reimburese = new Reimbursement(page);
    await reimburese.GoToReimbursement();
});
test("ApplyExtraWork", async ({ page }) => {
    const reimbursement = new Reimbursement(page);
    await reimbursement.ApplyExtraWork();
});
test("SearchExtraWork", async ({ page }) => {
    const reimbursement = new Reimbursement(page);
    await reimbursement.SearchExtraWork(Reimbursementdata.SearchextraworkDate);
});
test("AllHistory", async ({ page }) => {
    const reimbursement = new Reimbursement(page);
    await reimbursement.AllHIstory();
});