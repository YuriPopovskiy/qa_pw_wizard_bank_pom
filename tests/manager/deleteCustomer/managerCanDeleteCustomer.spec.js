import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';


const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode();

test.beforeEach( async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
 const addCustomer = new AddCustomerPage(page);
 


 
 await addCustomer.open();
 
 await addCustomer.fillField(addCustomer.firstNameField, firstName);
 await addCustomer.fillField(addCustomer.lastNameField, lastName);
 await addCustomer.fillField(addCustomer.postalCodeField, postCode);
 
 await addCustomer.clickBtn(addCustomer.btnAddCustomer);

});

test('Assert manager can delete customer', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Click [Delete] for the row with customer name.
3. Assert customer row is not present in the table. 
4. Reload the page.
5. Assert customer row is not present in the table. 
*/
//https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list

const addCustomer = new AddCustomerPage(page, firstName, lastName, postCode);
const text = `${firstName} ${lastName} ${postCode}`;

await addCustomer.openCustomersListTab();

await addCustomer.clickBtn(addCustomer.myLocatorCustomerForDel);
  //page.getByRole('row', { name: `${firstName} ${lastName} ${postCode}` }).getByRole('button'));

await addCustomer.expectTextNotVisible(addCustomer.myLocator, text);

await addCustomer.reloadPage();

await addCustomer.expectTextNotVisible(addCustomer.myLocator, text);

});