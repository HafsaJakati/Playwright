import{test}from"@playwright/test"
import { loginpage } from "../pages/login";
import { addingemploye } from "../pages/addemp";
import{faker}from"@faker-js/faker";
// generate the test data 
const empdata={
firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        employeeId: faker.string.alphanumeric(6),
        email: faker.internet.email(),
        personalEmail: faker.internet.email(),
        password: faker.internet.password(),
        experience: faker.number.int({ min: 1, max: 10 }).toString(),
        department: "Testers",
        mobileNumber: faker.string.numeric(10),
        designation: "QA Engineer",
        salary: faker.number.int({ min: 20000, max: 80000 }).toString(),
        locationemp:faker.location.city()
        //location: "Hyderabad"
};
 
test("login",async({page})=>{
    const login_page=new loginpage(page);
    const e=new addingemploye(page);
    await login_page.gotologinpage();
    await login_page.login("hafsajakathi@gmail.com","123456");
//     await e.addemployee("qwerty","xyzabc","e45","abc@gmail.com","personal@gmail.com",
//         "7418785","26","Testers","7859654287","QA eng","20000","hyderabad");
await e.addemployee(
        empdata.firstName,
        empdata.lastName,
        empdata.employeeId,
        empdata.email,
        empdata.personalEmail,
        empdata.password,
        empdata.experience,
        empdata.department,
        empdata.mobileNumber,
        empdata.designation,
        empdata.salary,
        empdata.locationemp
    );
    await page.waitForTimeout(5000);
    await e.searchemployee(empdata.firstName);
    await page.waitForTimeout(5000);


});

test("checkfieldvalidation error",async({page})=>{
     const login_page=new loginpage(page);
    const e=new addingemploye(page);
    await login_page.gotologinpage();
    await login_page.login("hafsajakathi@gmail.com","123456");
})

