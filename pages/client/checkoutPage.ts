import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly creditCardNumberField: Locator
    readonly cvvField: Locator
    readonly nameOnCardField: Locator
    readonly coupon: Locator
    readonly applyButton: Locator
    readonly placeOrderButton: Locator
    readonly country: Locator
    readonly countryDropdown: Locator

    constructor(page: Page) {
        this.page = page
        this.creditCardNumberField = page.locator('div.form__cc div.row').filter({ hasText: 'Credit Card Number' }).locator('input')
        this.cvvField = page.locator('div.form__cc div.row').locator('div.field.small:has(span.numberCircle) input')
        this.nameOnCardField = page.locator('div.form__cc div.row').locator('div.field:has(div.title:text-is("Name on Card")) input')
        this.coupon = page.locator('input[name="coupon"]')
        this.applyButton = page.getByRole('button', { name: 'Apply Coupon' })
        this.placeOrderButton = page.locator('a:has-text("PLACE ORDER")');
        this.country = page.getByPlaceholder("Select Country")
        this.countryDropdown = page.locator(".ta-results button")
    }

    async waitForPaymentInfo() {
        await this.page.locator('div.payment__info').waitFor();
    }

    async pickCountryFromDropDown(countryName: string) {
        const optionsCount = await this.countryDropdown.count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.countryDropdown.nth(i).textContent();
            if (text?.trim().toLowerCase() === countryName.trim().toLowerCase()) {
                await this.countryDropdown.nth(i).click();
                break;
            }
        }
    }

    //Assert that credit card number field is not empty and has the expected value
    async verifyCreditCardPrePopulatedValue(creditCardNumber: string) {
        const creditCardNumberValue = await this.creditCardNumberField.inputValue();
        expect(creditCardNumberValue).toBe(creditCardNumber);
    }

    //Assert email id in shipping info
    async verifyEmailIdInShippingInfo(emailId: string) {
        await expect(this.page.getByText(emailId)).toBeVisible();
    }

    //Assert that coupon is applied
    async verifyCouponApplied() {
        await expect(this.page.locator('p:has-text("* Coupon Applied")')).toBeVisible();
    }

    async verifyThankyouPageNavigation() {
        //Assert navigation to order confirmation page and verify order details
        await expect(this.page).toHaveURL(/dashboard\/thank/);
        expect(this.page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    }

    async verifyOrderIdVisibleInOrderHistory() {
        const orderNumberString = await this.page.locator('td.em-spacer-1 label.ng-star-inserted').textContent();
        const orderNumber = orderNumberString?.trim().split('|')[1]?.trim() || " ";
        const orderHistory = this.page.locator('label[routerlink="/dashboard/myorders"]')
        await orderHistory.click()
        //Assert navigation to order history page and verify that the order number is visible in order history
        await expect(this.page).toHaveURL(/dashboard\/myorders/);
        await expect(this.page.getByText(orderNumber)).toBeVisible();
    }
}