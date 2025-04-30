import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager can add new customer', async ({ page }) => {
/* 
Test:
1. Open add customer page by link https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
2. Fill the First Name.  
3. Fill the Last Name.
4. Fill the Postal Code.
5. Click [Add Customer].
6. Reload the page (This is a simplified step to close the popup)
7. Click [Customers] button.
8. Assert the First Name of the customer is present in the table in the last row. 
9. Assert the Last Name of the customer is present in the table in the last row. 
10. Assert the Postal Code of the customer is present in the table in the last row. 
11. Assert there is no account number for the new customer in the table in the last row. 

Tips:
1. Use faker for test data generation, example:
usage:
 const firstName = faker.person.firstName();
 const lastName = faker.person.LastName();
 const postCode = faker.location.zipCode(); 

 2. Do not rely on the customer row id for the steps 8-11. Use the ".last()" locator to get the last row.
*/
const addCustomer = new AddCustomerPage(page);

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode();

await addCustomer.open();

await addCustomer.fillField(addCustomer.firstNameField, firstName);
await addCustomer.fillField(addCustomer.lastNameField, lastName);
await addCustomer.fillField(addCustomer.postalCodeField, postCode);

await addCustomer.clickBtn(addCustomer.btnAddCustomer);

await addCustomer.reloadPage();

await addCustomer.clickBtn(addCustomer.tabBtnCustomers);

await addCustomer.expectText(addCustomer.myLocator, firstName); //getByRole('cell').nth(0)
await addCustomer.expectText(addCustomer.myLocator, lastName);  //getByRole('cell').nth(1)
await addCustomer.expectText(addCustomer.myLocator, postCode);  //getByRole('cell').nth(2)

await addCustomer.expectText(addCustomer.myLocator, '');

await addCustomer.expectText(addCustomer.myLocator.getByRole('cell').nth(3), '');
await addCustomer.expectText(addCustomer.myLocator.getByRole('cell').nth(4), 'Delete');
//await addCustomer.expectText(addCustomer.myLocator.getByRole('cell').nth(4), 'Create'); this check wrong input
});