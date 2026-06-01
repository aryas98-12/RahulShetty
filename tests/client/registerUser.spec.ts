import { test, expect } from '@playwright/test';
import { PageManager } from '../../pages/client/clientSitePageManager'

test.skip(`Register and login to the application`, async ({ page }) => {
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  const pageManager = new PageManager(page)
  console.log(randomNumber)
  const registerUserPage = pageManager.getRegisterUserPage();
  await registerUserPage.goToSite()
  await registerUserPage.firstName.fill(`Arya${randomNumber}`);
  await registerUserPage.lastName.fill('S Kumar');
  await registerUserPage.email.fill(`aryas${randomNumber}@test.com`);
  await registerUserPage.phoneNumber.fill('3364635218');
  await registerUserPage.femaleRadioButton.check();
  await registerUserPage.occupationDropdown.selectOption('3: Engineer');
  await registerUserPage.password.fill('Aryas@123');
  await registerUserPage.confirmPassword.fill('Aryas@123');
  await registerUserPage.checkBox.check()
  await registerUserPage.registerButton.click()
  await expect(registerUserPage.accountCreationSuccessMessage).toBeVisible()
  await expect(registerUserPage.loginButton).toBeVisible();
  await registerUserPage.loginButton.click();

  const loginPage = pageManager.getLoginPage();
  await loginPage.loginToSite(`aryas${randomNumber}@test.com`, 'Aryas@123')
  await loginPage.verifyLoginSuccessful()
});