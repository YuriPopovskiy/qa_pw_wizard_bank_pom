import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { AddCustomerPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
/* 
Test:
1. Open the Open account page https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
2. Select currency Dollar
3. Assert the drop-dwon has value Dollar
4. Select currency Pound
5. Assert the drop-dwon has value Pound
6. Select currency Rupee
7. Assert the drop-dwon has value Rupee
*/
const addSome = new AddCustomerPage(page);

await addSome.open();

await addSome.selectCurrency('Dollar');

await addSome.assertSelectCurrencyDropdownContainsValue('Dollar');

await addSome.selectCurrency('Pound');

await addSome.assertSelectCurrencyDropdownContainsValue('Pound');

await addSome.selectCurrency('Rupee');

await addSome.assertSelectCurrencyDropdownContainsValue('Rupee');
});