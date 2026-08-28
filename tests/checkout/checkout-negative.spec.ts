import { test } from '../../fixtures/test-fixtures';
import users from '../../data/users.json';
import checkoutData from '../../data/checkout-data.json';

test.describe('HU-4 Negative and boundary cases', () => {
  test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await productsPage.addProduct('sauce-labs-backpack');
    await productsPage.openCart();
    await cartPage.checkout();
  });

  test('@regression required first name validation', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation({
      firstName: checkoutData.boundary.emptyFirstName,
      lastName: checkoutData.valid.lastName,
      postalCode: checkoutData.valid.postalCode,
    });
    await checkoutPage.continue();

    await checkoutPage.expectError('First Name is required');
  });

  test('@regression required last name validation', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation({
      firstName: checkoutData.valid.firstName,
      lastName: checkoutData.boundary.emptyLastName,
      postalCode: checkoutData.valid.postalCode,
    });
    await checkoutPage.continue();

    await checkoutPage.expectError('Last Name is required');
  });

  test('@regression required postal code validation', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation({
      firstName: checkoutData.valid.firstName,
      lastName: checkoutData.valid.lastName,
      postalCode: checkoutData.boundary.emptyPostalCode,
    });
    await checkoutPage.continue();

    await checkoutPage.expectError('Postal Code is required');
  });
});
