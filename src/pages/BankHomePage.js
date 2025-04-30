const { expect } = require('@playwright/test');

export class BankHomePage {
  constructor(page) {
    this.page = page; 

    this.customerLoginButton = page.getByRole('button', { name: 'Customer Login' });
    this.bankManagerLoginBtn = page.getByRole('button', { name: 'Bank Manager Login' });

    this.addCustomersBtn = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountBtn = page.getByRole('button', { name: 'Open Account' });

    this.customersBtn = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }

  async expectBtnCustomerLoginVisible(){
    await expect(this.customerLoginButton).toBeVisible();
  }

  async expectBtnVisible(btn){
    await expect(btn).toBeVisible();
  }

  async clickBtn(btn){
    await btn.click();
  }

  async clickBankManagerLoginButton(){
    await this.bankManagerLoginBtn.click();
  }

  async expectCustomersBtnVisible(){
    await expect(this.customersBtn).toBeVisible();
  }
  async expectAddCustomerBtnVisible(){
    await expect(this.addCustomersBtn).toBeVisible();
  }
  async expectOpenAccountBtnVisible(){
    await expect(this.openAccountBtn).toBeVisible();
  }
}