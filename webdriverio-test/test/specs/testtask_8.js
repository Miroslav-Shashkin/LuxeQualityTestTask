const assert = require('assert');
const { user_fields, precondition_login, user_values } = require('../common');

describe('Valid Checkout', () => {
	let expecteditem;
	let price;
	let subtotalprice;
	it('Click on the "Add to cart" button near any product', async () => {
		await precondition_login();
		const itemCont = await browser.$(user_fields.CONTAINER);
		expecteditem = await itemCont.$(user_fields.ITEM_NAME).getText();

		const priceText = await itemCont.$(user_fields.PRICES).getText();
		price = parseFloat(priceText.replace('$', ''));
		const itemButton = await itemCont.$('.btn');
		await itemButton.click();
		browser.pause(4000);

		const cartBadgeText = await browser.$(user_fields.CARTBADGE).getText();
		assert.ok(cartBadgeText, 'Item wasn`t added to the cart');
		assert.strictEqual(cartBadgeText, '1');
	})
	it('Click on the "Cart" button at the top right corner', async () => {
		const cartButton = await browser.$(user_fields.CART);
		await cartButton.click();
		browser.pause(4000);

		const cartItems = await browser.$(user_fields.CARTITEM);
		const itemName = await cartItems.$(user_fields.ITEM_NAME).getText();
		assert.ok(itemName, 'Item wasn`t added to the cart');
		assert.strictEqual(itemName, expecteditem);
	})
	it('Click on the "Checkout" button', async () => {
		const checkoutButton = await browser.$(user_fields.CHECKOUT);
		await checkoutButton.click();
		browser.pause(4000);

		const currentUrl = await browser.getUrl();
		assert.strictEqual(currentUrl, 'https://www.saucedemo.com/checkout-step-one.html');
	})
	it('Fill all fields with valid data and click "Continue" btn', async () => {
		const firstName = await browser.$(user_fields.FIRSTNAME);
		assert.ok(firstName, 'Zip field not found');
		await firstName.addValue(user_values.NAME_DATA);
		browser.pause(1000);

		const lastName = await browser.$(user_fields.LASTNAME);
		assert.ok(lastName, 'Zip field not found');
		await lastName.addValue(user_values.SURNAME_DATA);
		browser.pause(1000);

		const zipCode = await browser.$(user_fields.ZIPCODE);
		assert.ok(zipCode, 'Zip field not found');
		await zipCode.addValue(user_values.ZIP_DATA);
		browser.pause(1000);

		const continueButton = await browser.$(user_fields.CONTINUE);
		await continueButton.click();
		browser.pause(4000);

		const currentUrl = await browser.getUrl();
		assert.strictEqual(currentUrl, 'https://www.saucedemo.com/checkout-step-two.html');

		// const errorMessageText = await browser.$(user_fields.ERROR_CONTAINER).getText();
		// assert.ok(errorMessageText, 'Error message element not found');
		// assert.ok(erorsmessages.includes(errorMessageText), 'Error message isn`t found');

		const curentItemName = await browser.$(user_fields.ITEM_NAME).getText();
		subtotalprice = await browser.$(user_fields.SUBITEMPRICE).getText();
		subtotalprice = parseFloat(subtotalprice.split('$')[1]);
		assert.strictEqual(curentItemName, expecteditem, 'Item isn`t match with added on first step');
		assert.strictEqual(subtotalprice, price, 'Prise of item isn`t equal with added on first step');
	})
	it('Click on the "Continue" button', async () => {
		const finishButton = await browser.$(user_fields.FINISH);
		await finishButton.click();
		browser.pause(4000);

		const currentUrl = await browser.getUrl();
		assert.strictEqual(currentUrl, 'https://www.saucedemo.com/checkout-complete.html');
		const comleteText = await browser.$(user_fields.COMPLETE).getText();
		assert.strictEqual(comleteText, user_values.COMPLETE_MESSAGE, 'Complite massage isn`t found');
	})
	it('Click on the "Back Home" button', async () => {
		const BackHomeButton = await browser.$(user_fields.BACKHOME);
		await BackHomeButton.click();
		browser.pause(4000);
		const currentUrl = await browser.getUrl();
		assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');

		const cartBadge = await browser.$(user_fields.CARTBADGE).isExisting();
		assert.ok(!cartBadge, 'Cart isn`t empty');
	})
})