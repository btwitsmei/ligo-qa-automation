import { test, expect } from '../../fixtures/test-fixtures';
import users from '../../data/users.json';

test.describe('HU-1 Authentication', () => {
  test('@smoke @regression login with valid credentials', async ({ loginPage, productsPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(productsPage.title).toHaveText('Products');
  });

  test('@regression login with invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.invalid.username, users.invalid.password);

    await loginPage.expectLoginError('Username and password do not match');
  });

  test('@regression login with locked user', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.locked.username, users.locked.password);

    await loginPage.expectLoginError('Sorry, this user has been locked out');
  });

  test('@regression login with performance glitch user and validate latency tolerance', async ({ loginPage, productsPage }) => {
    await loginPage.open();
    
    const startTime = Date.now();
    
    await loginPage.login(users.glitch.username, users.glitch.password);
    
    await productsPage.expectLoaded();
    
    const duration = Date.now() - startTime;
    expect(duration).toBeGreaterThanOrEqual(5000);
  });
});
