import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

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
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode(); 
    
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
    await page.getByPlaceholder('First Name').fill(firstName);
    await page.getByPlaceholder('Last Name').fill(lastName);
    await page.getByPlaceholder('Post Code').fill(postCode);
    await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
    await page.reload();
    await page.getByRole('button', { name: 'Customers' }).click();
    await page.waitForTimeout(1000);
    
    await expect(page.getByRole('cell').last()).toBeVisible();
    await expect(page.getByRole('cell', { name: `${firstName}` })).toBeVisible();
    await expect(page.getByRole('cell', { name: `${lastName}` })).toBeVisible();
    await expect(page.getByRole('cell', { name: `${postCode}` })).toBeVisible();
    await expect(page.getByRole('row', { name: `${firstName} ${lastName} ${postCode}` }).getByRole('cell').nth(3)).toBeEmpty();



    

});