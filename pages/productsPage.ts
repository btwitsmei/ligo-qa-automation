import { expect, Locator, Page } from '@playwright/test';

export class productsPage {
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  product(name: string) {
    return this.page.getByTestId(`add-to-cart-${name}`);
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addProduct(productId: string) {
    await this.product(productId).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}