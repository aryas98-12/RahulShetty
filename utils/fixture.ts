import { test as base } from '@playwright/test';
import { siteConfigs } from './testUsers';

type TestData = {
  productName: string,
  creditCardNumber: string,
  name: string,
  cvv: string,
  couponValue: string,
  countryName: string
}

type Fixtures = {
  data: TestData;
}

export const test = base.extend<Fixtures>({
  page: async ({ page, browser }, use, testInfo) => {
    const projectName = testInfo.project.name;

    const siteConfig = siteConfigs.find(s => s.name === projectName);
    if (!siteConfig) throw new Error(`❌ Site config not found for: ${projectName}`);

    const workerIndex = testInfo.workerIndex % siteConfigs.find(s => s.name === 'client')!.workers;
    const storageState = `storage/${projectName}/user-${workerIndex}.json`;

    const context = await browser.newContext({ storageState });
    const workerPage = await context.newPage();

    await use(workerPage);
    await context.close();
  },

  data: async ({ }, use) => {
    await use({
      productName: "ZARA COAT 3",
      creditCardNumber: "4542 9931 9292 2293",
      name: "Anshika",
      cvv: "452",
      couponValue: "rahulshettyacademy",
      countryName: "Cuba"
    });
  }
});