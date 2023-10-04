const assert = require('assert');
const { precondition_login } = require('../common');

describe('Valid Login', () => {
	it('The login button should redirect user to the inventory page',async () => {
			await precondition_login(browser);

			const currentUrl = await browser.getUrl();
			assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');
	})
})