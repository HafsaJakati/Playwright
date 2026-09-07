import { Page, Locator, expect } from "@playwright/test";
export class HrModule {
    readonly page;
    readonly hrBtn;
    readonly hiringBtn;
    readonly hiringOverview;
    readonly createjoBbtn;
    readonly jobTitle;
    readonly jobDesignation;
    readonly employmentType;
    readonly location;
    readonly vaccancies;
    readonly experiance;
    readonly requiredSkills;
    readonly description;

    constructor(page: Page) {
        this.page = page;
        this.hrBtn = this.page.locator("//p[text()='HR']");
        //this.hrBtn = this.page.getByRole("link", { name: "HR" });
        this.hiringBtn = this.page.getByRole("link", { name: "Hiring" });
        this.hiringOverview = this.page.locator("//p[text()='Hiring Overview']");
        this.createjoBbtn = this.page.getByRole("button", { name: "+ Create Job" });
        this.jobTitle = this.page.locator("//input[@name='title']");
        this.jobDesignation = this.page.locator("//input[@name='designation']");
        this.employmentType = this.page.locator("//select[@name='employmentType']");
        this.location = this.page.locator("//input[@name='location']");
        this.vaccancies = this.page.locator("//input[@name='vacancies']");
        this.experiance = this.page.locator("//input[@name='experience']");
        this.requiredSkills = this.page.locator("//div[@class='create-job-section']//div[4]//div[1]//div[1]//input[1]");
        this.description=this.page.locator("//textarea[@name='description']");
    }

    async createJob() {
        await this.hrBtn.click();
        await this.hiringBtn.click();
        await expect(this.hiringOverview).toBeVisible();
        await this.createjoBbtn.click();
        await this.jobTitle.fill("Automation Test Engineer");
        await this.jobDesignation.fill("Test Lead");
        await this.employmentType.click();
        await this.employmentType.selectOption({ value: "Full-time" });
        await this.location.fill("Hyderabad");
        await this.vaccancies.fill("2");
        await this.experiance.fill("5")
        await this.requiredSkills.fill("Manual Testing");
        await this.requiredSkills.press("Enter");
        await this.requiredSkills.fill("Automation Testing");
        await this.requiredSkills.press("Enter");
        await this.requiredSkills.fill("selenium");
        await this.requiredSkills.press("Enter");
        await this.requiredSkills.fill("playwright");
        await this.requiredSkills.press("Enter");
        await this.description.fill(`Job Title: QA Automation Engineer, Experience: 4–5 years, Location: Hyderabad,
            Job Description: We are looking for a QA Automation Engineer to design, develop, and maintain automated
            tests to ensure the quality and reliability of web applications.`);
        await this.page.waitForTimeout(4000);

    };
}

