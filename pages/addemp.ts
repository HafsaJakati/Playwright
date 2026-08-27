import { Page,Locator } from "@playwright/test";
export class addingemploye{
    readonly page:Page;
    readonly empbtn:Locator;
    readonly addempbtn:Locator;
    readonly firstname:Locator;
    readonly lastname:Locator;
    readonly empid:Locator;
    readonly e_mail:Locator;
    readonly pmail:Locator;
    readonly roledd:Locator;
    readonly password:Locator;
    readonly dob:Locator;
    readonly joining:Locator;
   readonly pastexp:Locator;
   readonly qualification:Locator;
   readonly department:Locator;
   readonly gender:Locator;
   readonly number:Locator;
   readonly bgrp:Locator;
   readonly designation:Locator;
   readonly salary:Locator;
   readonly locationemp:Locator;
   readonly reportingtorole:Locator;
   readonly reportingto:Locator;
   readonly addbtn:Locator;
   readonly searchemp:Locator;


    constructor(page:Page){
        this.page=page;
        this.empbtn=page.locator("(//p[text()='Employees'])[1]");
        this.addempbtn=page.getByText("Add Employee");
       this.firstname=page.locator("//input[@name='firstName']");
       this.lastname=page.locator("//input[@name='lastName']");
       this.empid=page.locator("//input[@id='employeeID']");
       this.e_mail=page.locator("//input[@name='email']");
       this.pmail=page.locator("//input[@name='personalEmail']");
       this.roledd=page.locator("//select[@id='role']");
       this.password=page.locator("//input[@type='password']");
       this.dob=page.locator("//input[@name='dob']");
       this.joining=page.locator("//input[@name='joiningDate']");
       this.pastexp=page.locator("//input[@name='pastExperience']");
       this.qualification=page.locator("//select[@id='qualifications']");
       this.department=page.locator("//input[@name='department']");
       this.gender=page.locator("//select[@id='gender']");
       this.number=page.locator("//input[@name='mobileNumber']");
       this.bgrp=page.locator("//select[@id='bloodGroup']");
       this.designation=page.locator("//input[@name='designation']");
       this.salary=page.locator("//input[@name='salary']");
       this.locationemp=page.locator("//input[@name='location']");
       this.reportingtorole=page.locator("//select[@id='reportingToRole']");
       this.reportingto=page.locator("//select[@id='reportingTo']");
       this.addbtn=page.locator("//button[text()='Add']");
       this.searchemp=page.locator("//input[@aria-label='NAME Filter Input']");
    }

    async addemployee(fname:string,lname:string,eid:string,mail:string,
        p_mail:string,e_pass:string,pexp:string,dep:string,num:string,
        dgn:string,sal:string,loc:string){
        await this.empbtn.click();
        await this.addempbtn.click();
        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.empid.fill(eid);
        await this.e_mail.fill(mail);
        await this.pmail.fill(p_mail);
        await this.roledd.click();
        await this.roledd.selectOption({value:"Admin"});
        await this.password.fill(e_pass);
        await this.dob.pressSequentially("28-12-2003",{delay:200});
        await this.joining.pressSequentially("28-12-2025",{delay:200});
        await this.pastexp.fill(pexp);
        await this.qualification.click();
        await this.qualification.selectOption({label:"B.Tech"});
        await this.department.fill(dep);
        await this.gender.click();
        await this.gender.selectOption({index:2});
        await this.number.fill(num);
        await this.bgrp.click();
        await this.bgrp.selectOption({index:1});
        await this.designation.fill(dgn)
        await this.salary.fill(sal);
        await this.locationemp.fill(loc);
        await this.reportingtorole.click();
        await this.reportingtorole.selectOption({index:2});
        await this.reportingto.click();
        await this.reportingto.selectOption({index:3});
        await this.addbtn.click();

    }

    async searchemployee(semp:string){
        await this.searchemp.fill(semp);
    }
}