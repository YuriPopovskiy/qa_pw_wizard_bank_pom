import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';

test('Assert manager can Login ', async ({ page }) => {
/* 
Test:
1. Open Wizard bank home page (https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login)
2. Click [Bank Manager Login]
3. Assert button [Add Customer] is visible
4. Assert button [Open Account] is visible
5. Assert button [Customers] is visible
*/
const home = new BankHomePage(page);

await home.open();

await home.expectBtnCustomerLoginVisible();

//await home.clickCustomerLoginButton();

await home.clickBankManagerLoginButton();

await home.expectAddCustomerBtnVisible();
await home.expectCustomersBtnVisible();
await home.expectOpenAccountBtnVisible();


});