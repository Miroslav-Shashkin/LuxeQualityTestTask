const assert = require('assert');
const { user_fields, precondition_login } = require('../common');

describe('Sort function', () => {
	let sortedPriceslth = [];
	let sortedPriceshtl = [];
	let categories = [];
	let sortedNamesAZ = [];
	let sortedNamesZA = [];
	it('Precondition', async () => {
		await precondition_login();
		const inventorylist = await browser.$(user_fields.IVENTORY);

		const prices = await inventorylist.$$(user_fields.PRICES);
		const pricesArray = await Promise.all(prices.map(async (priceElement) => {
			const priceText = await priceElement.getText();
			return parseFloat(priceText.replace('$', ''));
		}));
		sortedPriceslth = [...pricesArray].sort((a, b) => a - b);
		sortedPriceshtl = [...pricesArray].sort((a, b) => b - a);

		const items = await inventorylist.$$(user_fields.ITEM_NAME);
		const nameArray = await Promise.all(items.map(async (itemElement) => {
			return await itemElement.getText();
		}));
		sortedNamesAZ = [...nameArray];
		sortedNamesZA = [...nameArray].reverse();
	})
	it('Sort by low to high', async () => {
		await precondition_login();

		const sortfunction = await browser.$(user_fields.FILTER);
		await sortfunction.click();
		categories = await $$('option');
		await categories[2].click();
		const inventorylist = await browser.$(user_fields.IVENTORY);
		const prices = await inventorylist.$$(user_fields.PRICES);
		const pricesArray = await Promise.all(prices.map(async (priceElement) => {
			const priceText = await priceElement.getText();
			return parseFloat(priceText.replace('$', ''));
		}));
		assert.deepStrictEqual(pricesArray, sortedPriceslth);
	})
	it('Sort by high to low', async () => {
		await precondition_login();

		const sortfunction = await browser.$(user_fields.FILTER);
		await sortfunction.click();
		await categories[3].click();
		const inventorylist = await browser.$(user_fields.IVENTORY);
		const prices = await inventorylist.$$(user_fields.PRICES);
		const pricesArray = await Promise.all(prices.map(async (priceElement) => {
			const priceText = await priceElement.getText();
			return parseFloat(priceText.replace('$', ''));
		}));
		assert.deepStrictEqual(pricesArray, sortedPriceshtl);
	})
	it('Sort by A to Z', async () => {
		await precondition_login();

		const sortfunction = await browser.$(user_fields.FILTER);
		await sortfunction.click();
		await categories[0].click();
		const inventorylist = await browser.$(user_fields.IVENTORY);
		const items = await inventorylist.$$(user_fields.ITEM_NAME);
		const nameArray = await Promise.all(items.map(async (itemElement) => {
			return await itemElement.getText();
		}));
		assert.deepStrictEqual(nameArray, sortedNamesAZ);
	})
	it('Sort by Z to A', async () => {
		await precondition_login();

		const sortfunction = await browser.$(user_fields.FILTER);
		await sortfunction.click();
		await categories[1].click();
		const inventorylist = await browser.$(user_fields.IVENTORY);
		const items = await inventorylist.$$(user_fields.ITEM_NAME);
		const nameArray = await Promise.all(items.map(async (itemElement) => {
			return await itemElement.getText();
		}));
		assert.deepStrictEqual(nameArray, sortedNamesZA);
	})
})