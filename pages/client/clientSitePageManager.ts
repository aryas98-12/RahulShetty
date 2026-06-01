import { Page } from "@playwright/test";
import { DashboardPage } from "./dashboardPage";
import { LoginPage } from "./loginPage";
import { CartPage } from "./cartPage";
import { CheckoutPage } from "./checkoutPage";
import { RegisterUserPage } from "./registerUserPage"

export class PageManager {
    readonly page: Page;
    readonly loginPage: LoginPage
    readonly dashboardPage: DashboardPage
    readonly cartPage: CartPage
    readonly checkoutPage: CheckoutPage
    readonly registerUserPage : RegisterUserPage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.dashboardPage = new DashboardPage(page)
        this.cartPage = new CartPage(page)
        this.checkoutPage = new CheckoutPage(page)
        this.registerUserPage = new RegisterUserPage(page)
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getRegisterUserPage(){
        return this.registerUserPage;
    }
}