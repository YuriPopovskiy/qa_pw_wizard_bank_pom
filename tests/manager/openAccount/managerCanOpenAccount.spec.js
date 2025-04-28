import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

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

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
    await page.getByPlaceholder('First Name').fill(firstName);
    await page.getByPlaceholder('Last Name').fill(lastName);
    await page.getByPlaceholder('Post Code').fill(postCode);
    await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
    await page.reload();
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
  await page.getByRole('button', { name: 'Open Account' }).click();
  await page.waitForTimeout(1000);

  const justCreatedUser = page.locator('#userSelect');
  await justCreatedUser.selectOption(`${firstName} ${lastName}`);

  await page.locator('#currency').selectOption('Dollar');

  await page.getByRole('button', { name: 'Process' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Customers' }).click();
  await page.waitForTimeout(1000);

  const accountNumber = page.getByRole('table').getByRole('row').last();
  await expect(accountNumber.getByRole('cell').nth(3)).not.toBeEmpty();

});