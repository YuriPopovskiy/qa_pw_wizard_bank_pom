const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page, firstName='', lastName='', postCode='') {
    this.page = page;

    this.btnAddCustomer = page.getByRole('form').getByRole('button', { name: 'Add Customer' })
    this.tabBtnCustomers = page.getByRole('button', { name: 'Customers' });

    this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCodeField = page.getByRole('textbox', { name: 'Post Code' });

    this.myLocator = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row').last();
    this.myLocatorHidden = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row').nth(1);

    this.myLocatorCustomerForDel = page.getByRole('row', { name: `${firstName} ${lastName} ${postCode}` }).getByRole('button');
    
    this.fieldSearch = page.getByRole('textbox', { name: 'Search Customer' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async openCustomersListTab() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list')
  }

  async fillField(field, value){
    await field.fill(value);
  }

  async clickBtn(btn){
    await btn.click()
  }

  async reloadPage() {
    await this.page.reload();
  }

  async expectText(locator, text) {
    await expect(locator).toContainText(text);
  }
  async expectTextNotVisible(locator, text) {
    await expect(locator).not.toContainText(text);
  }

  async assertNoMoreFields(locator){
    await expect(locator).toBeHidden();
  }
}