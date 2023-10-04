const assert = require('assert');
const { user_fields, precondition_login } = require('../common');

describe('Footer links', () => {
	let links = [];
	it('Twitter link', async () => {
		await precondition_login();

		links = await $$(`${user_fields.SOCIAL} a`)
		await links[0].click();
		browser.pause(4000);

		const tabs = await browser.getWindowHandles();
		const newTab = tabs[tabs.length - 1];
		await browser.switchToWindow(newTab);

		const currentUrl = await browser.getUrl();
		assert.strictEqual(currentUrl, 'https://twitter.com/saucelabs');
		browser.pause(4000);
		await browser.switchToWindow(tabs[0]);
	})
	it('Facebook link', async () => {
		await links[1].click();
		browser.pause(4000);

		const tabs = await browser.getWindowHandles();
		const newTab = tabs[tabs.length - 1];
		await browser.switchToWindow(newTab);

		const currentUrl = await browser.getUrl();
		assert.strictEqual(currentUrl, 'https://www.facebook.com/saucelabs');
		browser.pause(4000);
		await browser.switchToWindow(tabs[0]);
	})
	it('Linkedin link', async () => {
		await links[2].click();
		browser.pause(4000);

		const tabs = await browser.getWindowHandles();
		const newTab = tabs[tabs.length - 1];
		await browser.switchToWindow(newTab);

		const currentUrl = await browser.getUrl();
		assert.strictEqual(currentUrl, 'https://www.linkedin.com/company/sauce-labs/');
		browser.pause(4000);
		await browser.switchToWindow(tabs[0]);
	})
})