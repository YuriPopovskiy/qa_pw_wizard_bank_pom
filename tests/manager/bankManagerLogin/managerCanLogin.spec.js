import { expect, test } from '@playwright/test';

test('Assert manager can Login ', async ({ page }) => {
/* 
Test:
1. Open Wizard bank home page (https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login)
2. Click [Bank Manager Login]
3. Assert button [Add Customer] is visible
4. Assert button [Open Account] is visible
5. Assert button [Customers] is visible
*/
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Bank Manager Login' }).click();
    await page.waitForTimeout(1000);
    
    const addCustomerbtn = page.getByRole('button', { name: 'Add Customer' });
    await expect(addCustomerbtn).toBeVisible();

    const openAccountbtn = page.getByRole('button', { name: 'Open Account' });
    await expect(openAccountbtn).toBeVisible();

    const customersbtn = page.getByRole('button', { name: 'Customers' });
    await expect(customersbtn).toBeVisible();




});