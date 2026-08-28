import { test as base } from '@playwright/test';
import { loginPage } from '../pages/loginPage.ts';
import { productsPage } from '../pages/productsPage.ts';
import { cartPage } from '../pages/cartPage';
import { checkoutPage } from '../pages/checkoutPage.ts';

type Fixtures = {
  loginPage: loginPage;
  productsPage: productsPage;
  cartPage: cartPage;
  checkoutPage: checkoutPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new loginPage(page)),
  productsPage: async ({ page }, use) => use(new productsPage(page)),
  cartPage: async ({ page }, use) => use(new cartPage(page)),
  checkoutPage: async ({ page }, use) => use(new checkoutPage(page)),
});

export { expect } from '@playwright/test';
