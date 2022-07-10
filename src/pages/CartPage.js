import CartElement from '../elements/CartElements'

let cart = new CartElement()

export default class CartPage {
  
  constructor(page) {
    this.page = page
  }

  async goToCheckout() {
    await this.page.waitAndClick(cart.element.checkoutButton)
  }
}






