const assert = require('assert');
const { user_fields, precondition_login } = require('../common');

describe('Logout', () => {
	it('User are redirecred to the "Login" page, "Username" and "Password" field are empty', async () => {
		await precondition_login();

		const loginButton = await browser.$(user_fields.BURGER);
		await loginButton.click();
		browser.pause(4000);

		const logout = await browser.$(user_fields.LOGOUT);
	
		assert.ok(logout, 'Logout link element not found');
		await logout.click()
		browser.pause(4000);

		const currentUrl = await browser.getUrl();
		assert.strictEqual(currentUrl, 'https://www.saucedemo.com/');

		const usernameInput = await browser.$(user_fields.USERNAME).getValue();
		assert.strictEqual(usernameInput, '');
		const passwordInput = await browser.$(user_fields.PASSWORD).getValue();
		assert.strictEqual(passwordInput, '');
	})
})