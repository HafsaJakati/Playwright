import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
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
    readonly publishdate;
    readonly submitCreateJobBtn;
    readonly hiringSearchBox;
    readonly afterSearchJTitle;
    readonly referCandidateBtn;
    readonly fName;
    readonly lastName;
    readonly email;
    readonly mobileNumber;
    readonly referalTotalExperiance;
    readonly referalResume;
    readonly submitReferalBtn;
    readonly readyCandidates;
    readonly searchCandidateName;
    //readonly viewResume;
    readonly status;
    readonly candidateStatus;
    readonly sortByDropdown;
    readonly closeJobPopupBtn;

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
        this.requiredSkills = this.page.locator(".create-job-field-full").filter({ hasText: "Required Skills" }).locator("input");
        this.description = this.page.locator("//textarea[@name='description']");
        this.publishdate = this.page.locator("//input[@name='publishedDate']");
        this.submitCreateJobBtn = this.page.locator("//button[text()='Create Job']");
        this.hiringSearchBox = this.page.locator("//input[@class='hiring-search-input']");
        this.afterSearchJTitle = this.page.locator("//p[@class='jt-title']");
        this.referCandidateBtn = this.page.locator("//button[text()='Refer a Candidate']");
        this.fName = this.page.locator("//input[@name='firstName']");
        this.lastName = this.page.locator("//input[@name='lastName']");
        this.email = this.page.locator("//input[@name='email']");
        this.mobileNumber = this.page.locator("//input[@name='mobile']");
        this.referalTotalExperiance = this.page.locator("//input[@name='totalExperience']");
        this.referalResume = this.page.locator("//input[@accept='application/pdf,.pdf']");
        this.submitReferalBtn = this.page.locator("//button[text()='Submit Referral']");
        this.readyCandidates = this.page.locator("//button[text()='Ready Candidates']");
        this.searchCandidateName = this.page.locator("//input[@aria-label='CANDIDATE NAME Filter Input']");
        // this.viewResume = this.page
        //     .locator('svg')
        //     .filter({
        //         has: this.page.locator("title", {
        //             hasText: "View resume & overview"
        //         })
        //     });
        this.status = this.page.locator("//div[@role='status']");
        this.candidateStatus = this.page.locator("//span[@class='cd-stat-status-chip']");
        this.sortByDropdown = this.page.locator("//select[@class='sc-dAlyuH XOyfJ']");
        this.closeJobPopupBtn = this.page.locator("//button[text()='Close Job']");


    }



    async createJob(Enterjobtitle: string, designation: string, location: string, veccancy: string, EXP: string,
        rSkill1: string, rSkill2: string, rSkill3: string, rSkill4: string, description: string, publishdate: string) {
        await this.hrBtn.click();
        await this.hiringBtn.click();
        await expect(this.hiringOverview).toBeVisible();
        await this.createjoBbtn.click();
        await this.jobTitle.fill(Enterjobtitle);
        await this.jobDesignation.fill(designation);
        await this.employmentType.click();
        await this.employmentType.selectOption({ value: "Full-time" });
        await this.location.fill(location);
        await this.vaccancies.fill(veccancy);
        await this.experiance.fill(EXP)
        await this.requiredSkills.fill(rSkill1);
        await this.requiredSkills.press("Enter");
        await this.requiredSkills.fill(rSkill2);
        await this.requiredSkills.press("Enter");
        await this.requiredSkills.fill(rSkill3);
        await this.requiredSkills.press("Enter");
        await this.requiredSkills.fill(rSkill4);
        await this.requiredSkills.press("Enter");
        await this.description.fill(description);
        await this.publishdate.fill(publishdate)
        await this.submitCreateJobBtn.click();
        await this.hiringSearchBox.fill(Enterjobtitle);
        const jobTitle = Enterjobtitle;
        await this.hiringSearchBox.fill(jobTitle);
        const matchingJobRow = this.page.locator(".jt-row").filter({ hasText: jobTitle });
        await expect(matchingJobRow).toBeVisible({ timeout: 10000 });
        const displayedJobTitle = matchingJobRow.locator(".jt-title");
        await expect(displayedJobTitle).toHaveText(jobTitle);
    };


    async searchAddedJob(searchtitle: string) {
        await this.hrBtn.click();
        await this.hiringBtn.click();
        const jobTitle = searchtitle;
        await this.hiringSearchBox.fill(jobTitle);
        const matchingJobRow = this.page.locator(".jt-row").filter({
            has: this.page.locator(".jt-title").filter({ hasText: new RegExp(`^${searchtitle}$`) })
        });
        await expect(matchingJobRow).toBeVisible({ timeout: 10000 });
        const displayedJobTitle = matchingJobRow.locator(".jt-title");
        await expect(displayedJobTitle).toHaveText(jobTitle);
        console.log(displayedJobTitle);
    };

    async referCandidate(searchtitle: string) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        // Navigate to job and open referral form
        await this.hrBtn.click();
        await this.hiringBtn.click();
        await this.hiringSearchBox.fill(searchtitle);
        const matchingJobRow = this.page.locator('.jt-row').filter({
            has: this.page.locator('.jt-title').filter({ hasText: new RegExp(`^${searchtitle}$`) })
        });
        await matchingJobRow.click();

        await this.referCandidateBtn.click();
        await this.fName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(faker.internet.email({ firstName, lastName }));
        await this.mobileNumber.fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString());
        await this.referalTotalExperiance.fill('4');
        await this.referalResume.setInputFiles('C:\\Users\\Admin\\Downloads\\Test_Engineer_Resume.pdf');

        // Submit
        await this.submitReferalBtn.click();


    }



    async viewCandidateResume(searchtitle: string) {
        await this.hrBtn.click();
        await this.hiringBtn.click();
        await this.hiringSearchBox.fill(searchtitle);
        const matchingJobRow = this.page.locator('.jt-row').filter({
            has: this.page.locator('.jt-title').filter({ hasText: new RegExp(`^${searchtitle}$`) })
        });
        await matchingJobRow.click();
        await this.readyCandidates.click();
        await this.searchCandidateName.fill("Roma Lesch");
        const row = this.page.getByRole('row', { name: 'Roma Lesch', exact: true });
        await expect(row).toBeVisible({ timeout: 10000 });
        await row.hover();
        const rowIndex = await row.getAttribute('row-index');
        const viewResumeIcons = this.page.getByRole('img', { name: 'View resume & overview' });
        await viewResumeIcons.nth(Number(rowIndex)).click();
        await expect(this.candidateStatus).toHaveText("APPLIED");

    }

    async sortResume(searchtitle: string) {
        await this.hrBtn.click();
        await this.hiringBtn.click();
        await this.hiringSearchBox.fill(searchtitle);
        const matchingJobRow = this.page.locator('.jt-row').filter({
            has: this.page.locator('.jt-title').filter({ hasText: new RegExp(`^${searchtitle}$`) })
        });
        await matchingJobRow.click();
        await this.readyCandidates.click();
        await this.sortByDropdown.click();
        await this.sortByDropdown.selectOption({ value: "LOWEST_SCORE" });
        const candidateNames = this.page.locator('.ag-row .ag-cell[col-id="name"]');
        console.log("Candidate count:", await candidateNames.count());
        const names = await candidateNames.allTextContents();
        console.log("Candidate Names:");
        names.forEach((name, index) => { console.log(`${index + 1}. ${name.trim()}`); });
    }


    async closeAndReopenJob(closejobname: string) {
        await this.hrBtn.click();
        await this.hiringBtn.click();
        await this.hiringSearchBox.fill(closejobname);
        const matchingJobRow = this.page.locator('.jt-row').filter({
            has: this.page.locator('.jt-title').filter({ hasText: new RegExp(`^${closejobname}$`) })
        });
        // await matchingJobRow.click();
        await matchingJobRow.locator('button[title="Close Job"]').click();
        await this.closeJobPopupBtn.click();
    }






}
