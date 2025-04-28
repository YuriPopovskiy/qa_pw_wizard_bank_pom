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
  */

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
    await page.getByPlaceholder('First Name').fill(firstName);
    await page.getByPlaceholder('Last Name').fill(lastName);
    await page.getByPlaceholder('Post Code').fill(postCode);
    await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
    await page.reload();

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
  await page.getByRole('button', { name: 'Customers' }).click();
  
  const customerRow = page.getByRole('row', { name: `${firstName} ${lastName} ${postCode}` });
  const deleteBtn = customerRow.getByRole('button');
  await deleteBtn.click();
  
  await expect(customerRow).not.toBeVisible();
  await page.reload();
  await expect(customerRow).not.toBeVisible();

});