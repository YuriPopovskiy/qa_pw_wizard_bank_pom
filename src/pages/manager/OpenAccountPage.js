const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page, firstName, lastName, postCode) {
    this.page = page; 
    this.currencyDropDown = page.locator('#currency');
    this.customerDropDown = page.locator('#userSelect');
    this.customerName = `${firstName} ${lastName}`;
    this.btnProcess = page.getByRole('button', { name: 'Process' });
    this.btnCustomers = page.getByRole('button', { name: 'Customers' });
    this.myLocator = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row').last();
    
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
    
  }

  async selectCurrency(currencyName) {
    await this.currencyDropDown.selectOption(currencyName);
  }
  async reloadPage(){
    await this.page.reload();
  }

  async selectMyCustomer() {
    await this.customerDropDown.selectOption(this.customerName);
  }

  async clickProcessBtn(){
    await this.btnProcess.click();
  }
  async clickCustomersBtn(){
    await this.btnCustomers.click();
  }

  async assertSelectCurrencyDropdownContainsValue(value) {
    const currentOptionText = await this.currencyDropDown.inputValue();
    expect(currentOptionText).toBe(value);
  }

  async assertCustomerNumberNotEmpty(){
    await expect(this.myLocator.getByRole('cell').nth(3)).not.toBeEmpty(); //.not.toBe('');
  }
}
