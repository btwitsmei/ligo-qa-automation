import { expect, Locator, Page } from '@playwright/test';

export class cartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByTestId('title');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  item(name: string): Locator {
    const productNames: Record<string, string> = {
      'sauce-labs-backpack': 'Sauce Labs Backpack',
    };

    return this.page
      .locator('.cart_item')
      .filter({
        hasText: productNames[name] ?? name,
      });
  }

  async expectItemVisible(name: string) {
    await expect(this.item(name)).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}