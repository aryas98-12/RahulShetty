import { expect } from '@playwright/test'
import { test } from '../../utils/fixture'

const responseWithNoOrders = { data: [], message: "No Orders" };

const GET_CUSTOMER_ORDERS = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*";
const BASE_URL = "https://rahulshettyacademy.com/client";

test('@Api Intercept Orders Response to mimic no orders scenario', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.route(GET_CUSTOMER_ORDERS, async route => {
    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(responseWithNoOrders);
    route.fulfill({ response, body });
  });

  await page.getByText('ORDERS').click();
  await page.waitForResponse(GET_CUSTOMER_ORDERS)
  await expect(page.getByText(' You have No Orders to show at this time.')).toBeVisible()
  await expect(page.getByText(' Please Visit Back Us ')).toBeVisible()
});