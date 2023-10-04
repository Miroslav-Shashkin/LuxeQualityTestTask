const assert = require('assert');

module.exports.user_fields = {
    USERNAME: '#user-name',
    PASSWORD: '#password',
    BUTTON: '#login-button',
    BURGER: '#react-burger-menu-btn',
    ERROR_CONTAINER: '.error-message-container',

    LOGOUT: '#logout_sidebar_link',

    ITEM_NAME: '.inventory_item_name',
    CART: '.shopping_cart_link',
    CARTITEM: '.cart_item',
    CARTBADGE: '.shopping_cart_badge',
    CONTAINER: '.inventory_item_description',
    CHECKOUT: '#checkout',

    IVENTORY: '.inventory_list',
    PRICES: '.inventory_item_price',
    FILTER: '.product_sort_container',

    SOCIAL: '.social',

    FIRSTNAME: '#first-name',
    LASTNAME: '#last-name',
    ZIPCODE: '#postal-code',
    CONTINUE: '#continue',
    SUBITEMPRICE: '.summary_subtotal_label',
    FINISH: '#finish',
    COMPLETE: '.complete-header',
    BACKHOME: '#back-to-products'
};

module.exports.user_values = {
    V_USERNAME: 'standard_user',
    V_PASSWORD: 'secret_sauce',
    IV_USERNAME: 'standarD_userD',
    IV_PASSWORD: 'asdasdasd',
    ERROR_MESSAGE: 'Epic sadface: Username and password do not match any user in this service',

    EMPTYCART_MESSAGE: 'Cart is empty',

    NAME_DATA: 'Myroslav',
    SURNAME_DATA: 'Shashkin',
    ZIP_DATA: '100110',
    NAME_ERROR: 'Error: First Name is required',
    SUR_ERROR: 'Error: Last Name is required',
    ZIP_ERROR: 'Error: Postal Code is required',
    COMPLETE_MESSAGE: 'Thank you for your order!'
};

module.exports.precondition_login = async () => {
    await browser.url('https://www.saucedemo.com');
    const usernameInput = await browser.$(this.user_fields.USERNAME);
    await usernameInput.addValue(this.user_values.V_USERNAME);
    browser.pause(1000);

    const passwordInput = await browser.$(this.user_fields.PASSWORD);
    await passwordInput.addValue(this.user_values.V_PASSWORD);
    browser.pause(1000);

    const loginButton = await browser.$(this.user_fields.BUTTON);
    await loginButton.click();
    browser.pause(4000);
};

module.exports.function_logout = async () => {
    const loginButton = await browser.$(this.user_fields.BURGER);
    await loginButton.click();
    browser.pause(4000);

    const logout = await browser.$(this.user_fields.LOGOUT);
    assert.ok(logout, 'Logout link element not found');
    await logout.click()
    browser.pause(4000);

    const currentUrl = await browser.getUrl();
    assert.strictEqual(currentUrl, 'https://www.saucedemo.com/');

    const usernameInput = await browser.$(this.user_fields.USERNAME).getValue();
    assert.strictEqual(usernameInput, '');
    const passwordInput = await browser.$(this.user_fields.PASSWORD).getValue();
    assert.strictEqual(passwordInput, '');
};