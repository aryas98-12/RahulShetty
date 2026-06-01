import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly cartButton

    constructor(page: Page) {
        this.page = page
        this.cartButton = page.locator('nav').getByText('Cart')
    }

    async goToSite(){
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    addToCartButton(productName: string){
        return this.page.locator('.card-body').filter({ hasText: `${productName}` }).first()
        .getByRole('button', { name: 'Add To Cart' });
    }

    async verifyCartPageNavigation(){
        await expect(this.page).toHaveURL(/dashboard\/cart/);  //Assert navigation to cart page 
    }
}