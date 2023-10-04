const assert = require('assert');
const { user_fields, precondition_login, function_logout } = require('../common');

describe('Cart', () => {
	it('Saving the card after logout', async () => {
		await precondition_login();

		const itemCont = await browser.$(user_fields.CONTAINER);
		const expecteditem = await itemCont.$(user_fields.ITEM_NAME).getText();
		const itemButton = await itemCont.$('.btn');
		await itemButton.click();
		browser.pause(4000);

		const cartBadgeText = await browser.$(user_fields.CARTBADGE).getText();
		assert.ok(cartBadgeText, 'Item wasn`t added to the cart');
		assert.strictEqual(cartBadgeText, '1');

		await function_logout();

		await precondition_login();

		const cartButton = await browser.$(user_fields.CART);
		await cartButton.click();
		browser.pause(4000);

		const cartItems = await browser.$(user_fields.CARTITEM);
		const itemName = await cartItems.$(user_fields.ITEM_NAME).getText();
		assert.ok(itemName, 'Item wasn`t added to the cart');
		assert.strictEqual(itemName, expecteditem);

	})
})