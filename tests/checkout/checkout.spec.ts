import { test, expect } from '../../fixtures/test-fixtures';
import users from '../../data/users.json';
import checkoutData from '../../data/checkout-data.json';

test.describe('HU-2 / HU-3 Main operation and state verification', () => {
  test('@smoke @regression complete purchase E2E', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await test.step('Authenticate', async () => {
      await loginPage.open();
      await loginPage.login(users.standard.username, users.standard.password);
      await productsPage.expectLoaded();
    });

    await test.step('Select product and add it to cart', async () => {
      await productsPage.addProduct('sauce-labs-backpack');
      await productsPage.expectCartCount(1);
    });

    await test.step('Verify cart state', async () => {
      await productsPage.openCart();
      await cartPage.expectLoaded();
      await cartPage.expectItemVisible('sauce-labs-backpack');
    });

    await test.step('Complete checkout', async () => {
      await cartPage.checkout();
      await checkoutPage.fillInformation(checkoutData.valid);
      await checkoutPage.continue();
      await checkoutPage.finish();
    });

    await test.step('Verify final state', async () => {
      await checkoutPage.expectOrderComplete();
    });
  });
});
