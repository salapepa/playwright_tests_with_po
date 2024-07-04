// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('', () => {

    test.beforeEach(async ({ app }) => {
        await app.loginPage.navigate();
        await app.loginPage.performLogin('standard_user', 'secret_sauce');

        await expect(app.inventoryPage.headerTitle).toBeVisible();
      })

    test('Perform login', async ({ app }) => {
        expect(await app.inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('Add and remove product from the cart', async ({app }) => {
        await app.inventoryPage.addItemToCartById(0);
        expect(await app.inventoryPage.getNumberOfItemsInCart()).toBe('1');

        await app.inventoryPage.shopingCart.click();
        expect(await app.shopingCartPage.cartItems.count()).toBeGreaterThanOrEqual(1);

        await app.shopingCartPage.removeCartItemById(0);
        await expect(app.shopingCartPage.cartItems).not.toBeAttached();
    });

    // Task1
    test('Perform sorting Price high to low', async ({ app }) => {
        await app.inventoryPage.clickSorting('Price (high to low)');
        await app.inventoryPage.expectSortingPriceHighLowIsCorrect();
    });

    test('Perform sorting Price low to high', async ({ app }) => {
        await app.inventoryPage.clickSorting('Price (low to high)');
        await app.inventoryPage.expectSortingPriceLowToHighIsCorrect();
    });

    test('Perform sorting Z-A', async ({ app }) => {
        await app.inventoryPage.clickSorting('Name (Z to A)');
        await app.inventoryPage.expectSortingNameZtoAIsCorrect();
    });

    test('Perform sorting A-Z', async ({ app }) => {
        await app.inventoryPage.clickSorting('Name (A to Z)');
        await app.inventoryPage.expectSortingNameAtoZIsCorrect();
    });
    
    //Task2
    
    test('Add random items to Cart', async ({ app }) => {
        const randomAddedItems = await app.inventoryPage.addRandomItemsToCart();
        await app.inventoryPage.clickGoToCart();

        const itemsInCart = await app.shopingCartPage.getAllItemsInCart();
        await expect(itemsInCart).toEqual(randomAddedItems);
    });

});
