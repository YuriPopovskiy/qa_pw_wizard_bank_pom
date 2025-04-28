import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Assert manager can choose currencies for account', async ({ page }) => {
/* 
Test:
1. Open the Open account page   
2. Select currency Dollar
3. Assert the drop-dwon has value Dollar
4. Select currency Pound
5. Assert the drop-dwon has value Pound
6. Select currency Rupee
7. Assert the drop-dwon has value Rupee
*/
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');
    await page.waitForTimeout(1000);

    const currencyDollar = page.locator('#currency');
    await currencyDollar.selectOption('Dollar');
    await expect(currencyDollar).toHaveValue('Dollar');

    const currencyPound = page.locator('#currency');
    await currencyPound.selectOption('Pound');
    await expect(currencyPound).toHaveValue('Pound');

    const currencyRupee = page.locator('#currency');
    await currencyRupee.selectOption('Rupee');
    await expect(currencyRupee).toHaveValue('Rupee');

});