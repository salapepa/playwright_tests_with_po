const { BaseSwagLabPage } = require('./BaseSwagLab.page');
const { expect } = require('@playwright/test');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); } //

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    filterSelectLocator = this.page.locator('.select_container') 
    
    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async clickSorting(text){
        await this.filterSelectLocator.click()
        await this.sortByText(text);

    }

    async sortByText(text){
        switch (text) {
            case 'Name (A to Z)':
            await this.page.locator('.product_sort_container').selectOption('Name (A to Z)');
            break;
            case 'Name (Z to A)':
            await this.page.locator('.product_sort_container').selectOption('Name (Z to A)');
            break;
            case 'Price (low to high)':
            await this.page.locator('.product_sort_container').selectOption('Price (low to high)');
            break;
            case 'Price (high to low)':
            await this.page.locator('.product_sort_container').selectOption('Price (high to low)');
            break;
            default:
              console.log('Wrong choice');
          }
    }

    async expectSortingPriceHighLowIsCorrect() {
        let allPrices = await this.page.locator('[data-test="inventory-item-price"]').allInnerTexts();
        let allPricesWithoutCurrency = allPrices.map(element=>element.replace('$', '')).map(parseFloat);
        let allPricesArraySorted = allPricesWithoutCurrency.sort((a,b)=>a - b);
        expect(allPricesArraySorted).toEqual(allPricesWithoutCurrency);
    }

    async expectSortingPriceLowToHighIsCorrect() {
        let allPrices = await this.page.locator('[data-test="inventory-item-price"]').allInnerTexts();
        let allPricesWithoutCurrency = allPrices.map(element=>element.replace('$', '')).map(parseFloat);
        let allPricesArraySorted = allPricesWithoutCurrency.sort((a,b)=>b - a);
        expect(allPricesArraySorted).toEqual(allPricesWithoutCurrency);
    }

    async expectSortingNameAtoZIsCorrect() {
        let allNames = await this.page.locator('[data-test="inventory-item-name"]').allInnerTexts();
        let allNamesSorted = allNames.sort((a,b)=>a - b);
        expect(allNamesSorted).toEqual(allNames);
    }

    async expectSortingNameZtoAIsCorrect() {
        let allNames = await this.page.locator('[data-test="inventory-item-name"]').allInnerTexts();
        let allNamesSorted = allNames.sort((a,b)=>b - a);
        expect(allNamesSorted).toEqual(allNames);
    }
}
