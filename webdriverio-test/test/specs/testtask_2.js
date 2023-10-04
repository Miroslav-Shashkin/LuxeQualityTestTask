const assert = require('assert');
const { user_fields, user_values } = require('../common');

describe('Login with invalid password', () => {
	it('"Epic sadface: Username and password do not match any user in this service" - error message is displayed', async () => {
		await browser.url('https://www.saucedemo.com');
		const usernameInput = await browser.$(user_fields.USERNAME);
		await usernameInput.addValue(user_values.V_USERNAME);
		browser.pause(1000);

		const passwordInput = await browser.$(user_fields.PASSWORD);
		await passwordInput.addValue(user_values.IV_PASSWORD);
		browser.pause(1000);

		const loginButton = await browser.$(user_fields.BUTTON);
		await loginButton.click();
		browser.pause(4000);

		const errorMessage = await browser.$(user_fields.ERROR_CONTAINER);

		assert.ok(errorMessage, 'Error message element not found');

		const errorMessageText = await errorMessage.getText();
		assert.strictEqual(errorMessageText, user_values.ERROR_MESSAGE);
	})
})