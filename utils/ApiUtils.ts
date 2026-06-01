import { APIRequestContext } from '@playwright/test';
import { siteConfigs } from './testUsers';
import { getTokenFromStorage } from './storageHelper';
import { getUserIdFromStorage } from './storageHelper';

export class ApiUtils {
    private apiContext: APIRequestContext;
    private token: string;
    private siteName: string;
    private userId: string;

    private get siteConfig() {
        const config = siteConfigs.find(s => s.name === this.siteName);
        if (!config) throw new Error(`❌ Site config not found for: ${this.siteName}`);
        return config;
    }

    private get ORDER_CREATE_URL() {
        return `${this.siteConfig.apiBaseURL}order/create-order`;
    }

    private get REMOVE_FROM_CART_URL() {
        return `${this.siteConfig.apiBaseURL}user/remove-from-cart/`;
    }

    private get USER_CART() {
        return `${this.siteConfig.apiBaseURL}user/get-cart-products/${this.userId}`;
    }

    constructor(apiContext: APIRequestContext, workerIndex: number, siteName: string = 'client') {
        this.apiContext = apiContext;
        this.token = getTokenFromStorage(workerIndex, siteName)
        this.userId = getUserIdFromStorage(workerIndex, siteName)
        this.siteName = siteName;
    }

    // ── Order ──────────────────────────────────────────────

    async createOrder(orderPayload: any): Promise<string> {
        const orderCreationResponse = await this.apiContext.post(this.ORDER_CREATE_URL, {
            data: orderPayload,
            headers: {
                'authorization': this.token,
                'content-type': 'application/json'
            }
        });

        const orderCreationResponseJson = await orderCreationResponse.json();
        const orderId = orderCreationResponseJson.orders[0];
        //console.log(`✅ Order created: ${orderId}`);
        return orderId;
    }

    // ── Cart ───────────────────────────────────────────────

    async getCartItems(): Promise<any> {
        const cartResponse = await this.apiContext.get(this.USER_CART, {
            headers: { authorization: this.token }
        })
        const cartBody = await cartResponse.json();
        const cartItems = cartBody.data;
        //console.log(`✅ Cart Items fetched`);
        return cartItems
    }

    async deleteCartItem(itemId: any): Promise<any> {
        await this.apiContext.delete(`${this.REMOVE_FROM_CART_URL}${itemId}`, {
            headers: { authorization: this.token }
        })
        console.log(`🗑️ Removed item ${itemId} from cart`);
    }
}