import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page
        this.email = page.getByPlaceholder("email@example.com")
        this.password = page.getByRole('textbox', { name: 'Passsword' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goToSite(){
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async loginToSite(username: string, password: string) {
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccessful(){
        await expect(this.page).toHaveURL(/dashboard\/dash/);
    }

    //Combined Function for complex testcases
    async loginToTheSiteSuccessfully(username: string, password: string){
        await this.page.goto('https://rahulshettyacademy.com/client')
        await this.email.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
        await expect(this.page).toHaveURL(/dashboard\/dash/);
    }
}