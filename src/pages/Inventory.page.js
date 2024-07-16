import { popRandomElementFrom } from "../Utils/utils";

const { BaseSwagLabPage } = require("./BaseSwagLab.page");
const { expect } = require("@playwright/test");

export class InventoryPage extends BaseSwagLabPage {
  url = "/inventory.html";

  get headerTitle() {
    return this.page.locator(".title");
  } //

  get inventoryItems() {
    return this.page.locator(".inventory_item");
  }

  get addItemToCartBtns() {
    return this.page.locator('[id^="add-to-cart"]');
  }

  filterSelectLocator = this.page.locator(".select_container");
  itemPriceLocator = this.page.getByTestId("inventory-item-price");
  goToCartLocator = this.page.locator('[data-test="shopping-cart-link"]');
  priceLocator = (itemName) =>
    this.page
      .locator('[data-test="inventory-item-description"]')
      .filter({ hasText: itemName })
      .locator('[data-test="inventory-item-price"]');
  descriptionLocator = (itemName) =>
        this.page
          .locator('[data-test="inventory-item-description"]')
          .filter({ hasText: itemName })
          .locator('[data-test="inventory-item-desc"]');

  async addItemToCartById(id) {
    await this.addItemToCartBtns.nth(id).click();
  }

  async clickSorting(text) {
    await this.filterSelectLocator.click();
    await this.sortByText(text);
  }

  async clickGoToCart() {
    await this.goToCartLocator.click();
  }

  async sortByText(text) {
    switch (text) {
      case "Name (A to Z)":
        await this.page
          .locator(".product_sort_container")
          .selectOption("Name (A to Z)");
        break;
      case "Name (Z to A)":
        await this.page
          .locator(".product_sort_container")
          .selectOption("Name (Z to A)");
        break;
      case "Price (low to high)":
        await this.page
          .locator(".product_sort_container")
          .selectOption("Price (low to high)");
        break;
      case "Price (high to low)":
        await this.page
          .locator(".product_sort_container")
          .selectOption("Price (high to low)");
        break;
      default:
        console.log("Wrong choice");
    }
  }

  async expectSortingPriceHighLowIsCorrect() {
    let allPrices = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allInnerTexts();
    let allPricesWithoutCurrency = allPrices
      .map((element) => element.replace("$", ""))
      .map(parseFloat);
    let allPricesArraySorted = allPricesWithoutCurrency.sort((a, b) => a - b);
    expect(allPricesArraySorted).toEqual(allPricesWithoutCurrency);
  }

  async expectSortingPriceLowToHighIsCorrect() {
    let allPrices = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allInnerTexts();
    let allPricesWithoutCurrency = allPrices
      .map((element) => element.replace("$", ""))
      .map(parseFloat);
    let allPricesArraySorted = allPricesWithoutCurrency.sort((a, b) => b - a);
    expect(allPricesArraySorted).toEqual(allPricesWithoutCurrency);
  }

  async expectSortingNameAtoZIsCorrect() {
    let allNames = await this.page
      .locator('[data-test="inventory-item-name"]')
      .allInnerTexts();
    let allNamesSorted = allNames.sort((a, b) => a - b);
    expect(allNamesSorted).toEqual(allNames);
  }

  async expectSortingNameZtoAIsCorrect() {
    let allNames = await this.page
      .locator('[data-test="inventory-item-name"]')
      .allInnerTexts();
    let allNamesSorted = allNames.sort((a, b) => b - a);
    expect(allNamesSorted).toEqual(allNames);
  }

  async addRandomItemsToCart() {
    let allNames = await this.page
      .locator('[data-test="inventory-item-name"]')
      .allInnerTexts();
    let selectedNames = [];
    let allItesTogether = [];
    for (let i = 0; i < 4; i++) {
      const randomItemName = popRandomElementFrom(allNames, selectedNames);
      const item = await this.#inventoryItemNameSelector(randomItemName);

      allItesTogether.push(item);
      await this.page
        .locator('[data-test="inventory-item-description"]')
        .filter({ hasText: randomItemName })
        .getByRole("button", { name: "Add to cart" })
        .click();
    }
    return allItesTogether;
  }

  async #inventoryItemNameSelector(randomItemName) {
    const price = await this.priceLocator(randomItemName).innerText();
    const description = await await this.descriptionLocator(randomItemName).innerText();

    return { name: randomItemName, price, description };
  }
}
