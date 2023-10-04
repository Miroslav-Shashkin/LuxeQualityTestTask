const assert = require('assert');
const { user_fields, precondition_login, user_values } = require('../common');

describe('Checkout without products', () => {
	let links = [];
	it('Error message about empty cart ', async () => {
		await precondition_login();

		const cartButton = await browser.$(user_fields.CART);
		await cartButton.click();
		browser.pause(4000);

		const currentUrl = await browser.getUrl();
		assert.strictEqual(currentUrl, 'https://www.saucedemo.com/cart.html');
		browser.pause(4000);

		const checkoutButton = await browser.$(user_fields.CHECKOUT);
		await checkoutButton.click();
		browser.pause(4000);
		
		const errorMessage = await browser.$(user_fields.ERROR_CONTAINER);
		const errorMessageText = await errorMessage.getText();
		
		assert.ok(user_values.EMPTYCART_MESSAGE === errorMessageText, `Error message ${user_values.EMPTYCART_MESSAGE} is expected.`);
	})
})
