import CheckoutElement from '../elements/CheckoutElements'
let checkout = new CheckoutElement()

export default class CheckoutPage {
  
  constructor(page) {
    this.page = page
  }

  async checkoutInformation(firstName, lastName, zipCode) {
    await this.page.waitAndType(checkout.element.firstName, firstName)
    await this.page.waitAndType(checkout.element.lastName, lastName)
    await this.page.waitAndType(checkout.element.zipCode, zipCode)
    await this.page.waitAndClick(checkout.element.btnContinue)
  }

  async finishOrder() {
    await this.page.waitAndClick(checkout.element.finishButton)
  }
}
