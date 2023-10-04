const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { user_fields } = require('../../common');

Given('User is located on the main page of saucedemo website', async () => {
  await browser.url('https://www.saucedemo.com');
});

When('User clicks the "Login" button', async () => {
  const loginButton = await browser.$(user_fields.BUTTON);
  await loginButton.click();
});

Then('User should see the "Epic sadface: Username is required" error message', async () => {
  const errorMessageText = await browser.$(user_fields.ERROR_CONTAINER).getText();
  assert.strictEqual(errorMessageText, 'Epic sadface: Username is required');
}); 