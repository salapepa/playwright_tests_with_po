const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    cartItemNameLocator = this.page.locator('[data-test="inventory-item-name"]');
    cartItemDescriptionLocator = this.page.locator('[data-test="inventory-item-desc"]');
    cartItemPriceLocator = this.page.locator('[data-test="inventory-item-price"]');

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getAllItemsInCart() {
        const countItemsInCart = await this.cartItemNameLocator.count();
        let allItemsInCart= [];
        for (let i = 0; i < countItemsInCart; i++) {
            const itemName = await this.cartItemNameLocator.nth(i).innerText();
            const itemDescription = await this.cartItemDescriptionLocator.nth(i).innerText();
            const itemPrice = await this.cartItemPriceLocator.nth(i).innerText();
            
            allItemsInCart.push({
                name:itemName, description: itemDescription, price:itemPrice
            })
        }
        return allItemsInCart;
    }


}
