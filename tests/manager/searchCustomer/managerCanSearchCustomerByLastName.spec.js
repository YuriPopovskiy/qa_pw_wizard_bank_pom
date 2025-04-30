import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

let firstName;
let lastName;
let postalCode; 

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

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode(); 

  await addCustomer.open();

  await addCustomer.fillField(addCustomer.firstNameField, firstName);
  await addCustomer.fillField(addCustomer.lastNameField, lastName);
  await addCustomer.fillField(addCustomer.postalCodeField, postalCode);

  await addCustomer.clickBtn(addCustomer.btnAddCustomer);

  await addCustomer.reloadPage();


});

test('Assert manager can search customer by Last Name', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Fill the lastName to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/
const addCustomer = new AddCustomerPage(page, firstName, lastName, postalCode);
await addCustomer.openCustomersListTab();

await addCustomer.fillField(addCustomer.fieldSearch, lastName);

await addCustomer.expectText(addCustomer.myLocator, `${firstName} ${lastName}`);

await addCustomer.expectTextNotVisible(addCustomer.myLocator, "Hello There");
await addCustomer.assertNoMoreFields(addCustomer.myLocatorHidden);
});