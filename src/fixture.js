const pw = require( '@playwright/test');
const { LoginPage } = require( './pages/Login.page');
const { InventoryPage } = require( './pages/Inventory.page');
const { ShopingCartPage } = require( './pages/ShopingCart.page');
const { App } = require( './pages/app');

export const test = pw.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    shopingCartPage: async ({ page }, use) => {
        await use(new ShopingCartPage(page));
    },
    app: async ({ page }, use) => {
        await use(new App(page));
    },
});
