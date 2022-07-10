import ProductElement from '../elements/ProductElements'
let product = new ProductElement()

export default class ProductPage {
  
  constructor(page) {
    this.page = page
  }

  async addProduct() {
    await this.page.waitAndClick(product.element.backpack)
  }

  async goToCart() {
    await this.page.waitAndClick(product.element.cartIcon)
  }
}