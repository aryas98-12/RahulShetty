import { chromium, defineConfig, devices } from '@playwright/test';
import { siteConfigs } from './utils/testUsers';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  /* Run tests in files in parallel */
  fullyParallel: true,
  workers: 6,
  /* Report file type */
  reporter: [
    ['html', { open: 'on-failure' }]
  ],
  use: {
    browserName: 'chromium',
    headless: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  globalSetup: './global-setup.ts',
  projects: siteConfigs.map((site) => ({
    name: site.name,
    testDir: `./tests/${site.name}`,
    workers: site.workers,   
    use: {
      baseURL: site.baseURL,
    },
  })),
});