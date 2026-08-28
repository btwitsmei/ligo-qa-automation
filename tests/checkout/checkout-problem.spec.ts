import { test, expect } from '../../fixtures/test-fixtures';
import users from '../../data/users.json';
import checkoutData from '../../data/checkout-data.json';

test.describe('HU-4 Bug detection with problem_user', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.problem.username, users.problem.password);
  });

  test('@regression capture broken images defect on products page', async ({ page }) => {
    test.fail(true, 'Known defect: problem_user renders sl-404 broken images for all products');

    const firstProductImage = page.locator('.inventory_item_img img').first();
    await expect(firstProductImage).toBeVisible();

    const imageSrc = await firstProductImage.getAttribute('src');
    expect(imageSrc).not.toContain('sl-404');
  });

  test('@regression capture add to cart failure defect', async ({ productsPage }) => {
    await productsPage.addProduct('sauce-labs-bike-light');
    await productsPage.expectCartCount(1);
  });

  test('@regression capture blocked last name input defect in checkout', async ({ productsPage, cartPage, checkoutPage }) => {
    test.fail(true, 'Known defect: problem_user locks the Last Name input field in checkout');

    await productsPage.addProduct('sauce-labs-backpack');
    await productsPage.openCart();
    await cartPage.checkout();

    await checkoutPage.firstName.fill(checkoutData.valid.firstName);
    await checkoutPage.lastName.fill(checkoutData.valid.lastName);
    await checkoutPage.postalCode.fill(checkoutData.valid.postalCode);

    await expect(checkoutPage.lastName).toHaveValue(checkoutData.valid.lastName);
  });
});