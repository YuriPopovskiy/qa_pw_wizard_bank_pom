import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { AddCustomerPage as AddSome } from '../../../src/pages/manager/OpenAccountPage';


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
  6. Reload the page (This is a simplified step to close the popup).
  */

   const addCustomer = new AddCustomerPage(page);  
   
   await addCustomer.open();
   
   await addCustomer.fillField(addCustomer.firstNameField, firstName);
   await addCustomer.fillField(addCustomer.lastNameField, lastName);
   await addCustomer.fillField(addCustomer.postalCodeField, postCode);
   
   await addCustomer.clickBtn(addCustomer.btnAddCustomer);

});

test('Assert manager can add new customer', async ({ page }) => {
/* 
Test:
1. Click [Open Account].
2. Select Customer name you just created.
3. Select currency.
4. Click [Process].
5. Reload the page (This is a simplified step to close the popup).
6. Click [Customers].
7. Assert the customer row has the account number not empty.

Tips:
 1. Do not rely on the customer row id for the step 13. Use the ".last()" locator to get the last row.
*/
const addSome = new AddSome(page, firstName, lastName, postCode);

await addSome.open();

await addSome.selectMyCustomer();

await addSome.selectCurrency('Dollar');
await addSome.clickProcessBtn();

await addSome.reloadPage();
await addSome.clickCustomersBtn();

await addSome.assertCustomerNumberNotEmpty();


});