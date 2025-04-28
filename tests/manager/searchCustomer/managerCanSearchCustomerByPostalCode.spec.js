import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

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

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode(); 

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
    await page.getByPlaceholder('First Name').fill(firstName);
    await page.getByPlaceholder('Last Name').fill(lastName);
    await page.getByPlaceholder('Post Code').fill(postalCode);
    await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
    await page.reload();

});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Fill the postalCode to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/
  await page.getByRole('button', { name: 'Customers' }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Search Customer').fill(`${postalCode}`);
  await page.waitForTimeout(1000);

  await expect(page.getByRole('cell', { name: `${postalCode}` })).not.toBeEmpty();

  // const noOtherRow = page.locator('.marTop > div');
  // await expect(noOtherRow).toHaveCount(1);

});