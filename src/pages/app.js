const { InventoryPage } = require( './Inventory.page');


const { LoginPage } = require('./Login.page'); 
const { ShopingCartPage } = require('./ShopingCart.page');
export class App {
    //url = '';

    page;
    login;

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.shopingCartPage = new ShopingCartPage(page);
    }

    // async below added to show the function returns a promise
    // async getUrl() { return this.page.url(); }

    // async navigate() {
    //     await this.page.goto(this.url);
    // }
}
