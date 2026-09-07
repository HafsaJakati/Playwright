import { test } from "@playwright/test";
import { Loginpage } from "../pages/login";
import { Expenditure } from "../pages/expenditure";
import * as fs from "fs";

const filepath = "./testdata/Expenditure.json";
const ExpData = JSON.parse(fs.readFileSync(filepath, "utf-8"));
test.beforeEach(async ({ page }) => {
    const login_page = new Loginpage(page);
    await login_page.gotologinpage();
    await login_page.login();
});
test("Expendituremodule", async ({ page }) => {
    const exp = new Expenditure(page);
    await exp.gotoExpenditure();
});
test("Upload_Bill", async ({ page }) => {
    const exp = new Expenditure(page);
    await exp.uploadBill(ExpData.BillDescription, ExpData.EventDate, ExpData.BillAmt);
});

test("ExportExpense", async ({ page }) => {
    const exp = new Expenditure(page);
    await exp.exportExpenditure();
});
test("MonthExpense", async ({ page }) => {
    const exp = new Expenditure(page);
    await exp.totalExpenseofMonth(ExpData.Startmonth, ExpData.Endmonth);
});
test("View_Bill", async ({ page }) => {
    const exp = new Expenditure(page);
    await exp.viewBill(ExpData.ViewbillDescription);
});
test("Delete_Bill", async ({ page }) => {
    const exp = new Expenditure(page);
    await exp.deleteTheBill();
})
