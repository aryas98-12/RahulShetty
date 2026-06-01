import { Page, Locator } from "@playwright/test";

export class RegisterUserPage {
    readonly page: Page
    readonly firstName: Locator
    readonly lastName: Locator
    readonly email: Locator
    readonly phoneNumber: Locator
    readonly femaleRadioButton: Locator
    readonly occupationDropdown: Locator
    readonly password: Locator
    readonly confirmPassword: Locator
    readonly checkBox: Locator
    readonly registerButton: Locator
    readonly loginButton: Locator
    readonly accountCreationSuccessMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.firstName = page.getByLabel('First Name');
        this.lastName = page.getByLabel('Last Name');
        this.email = page.getByPlaceholder("email@example.com")
        this.phoneNumber = page.getByPlaceholder("enter your number");
        this.femaleRadioButton = page.locator("input[value='Female']");
        this.occupationDropdown = page.getByRole('combobox');
        this.password = page.getByRole('textbox', { name: 'Passsword' });
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm Password' })
        this.checkBox = page.getByRole('checkbox')
        this.registerButton = page.getByRole('button', { name: 'Register' })
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.accountCreationSuccessMessage = page.getByText("Account Created Successfully")
    }

    async goToSite() {
        await this.page.goto('https://rahulshettyacademy.com/client/auth/register');
    }
}