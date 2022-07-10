import { expect } from 'chai'
import { step } from 'mocha-steps'

import Page from '../builder'
import CustomCommand from '../lib/CustomCommands'
import LoginPage from '../pages/LoginPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import ProductPage from '../pages/ProductPage'
import LoginElement from '../elements/LoginElements'
import CartElemnet from '../elements/CartElements'
import CheckoutElemnet from '../elements/CheckoutElements'

describe('Puppeteer End-to-end Testing', () => {
  let page
  let login
  let cart  
  let checkout
  let product
  let action
  let userEl
  let cartEl
  let checkoutEl

  before(async () => {
    page = await Page.build('Desktop')
    action = await new CustomCommand(page)
    login = await new LoginPage(action)    
    cart = await new CartPage(action)
    checkout = await new CheckoutPage(action)
    product = await new ProductPage(action)
    userEl = new LoginElement()
    cartEl = new CartElemnet()
    checkoutEl = new CheckoutElemnet()
  })

  after(async () => {
    await page.close()
  })

  step('Should access homepage SWAGLABS', async () => {
    expect(await action.isElementVisible(userEl.element.logo)).to.be.true;
  })

  step('Should login to application', async () => {
    await login.login('standard_user', 'secret_sauce')
    expect(await action.isElementVisible(userEl.element.product)).to.be.true;
  })

  step('Should add product to cart', async () => {
    await product.addProduct()
    await product.goToCart()
  })

  step('Should see the product in the cart', async () => {
    const itemCart =  await page.$eval(cartEl.element.itemDescription, ele => ele.textContent);
    expect(itemCart).to.equal('Sauce Labs Backpack')
  })

  step('Should go to checkout', async () => {
    await cart.goToCheckout()
    await checkout.checkoutInformation('Yngwie', 'Malmsteen', '14.680-000')
  })

  step('Should see order summary', async () => {
    const checkoutOverview =  await page.$eval(checkoutEl.element.checkoutOverview, ele => ele.textContent);
    expect(checkoutOverview).to.equal('Checkout: Overview')
  })

  step('Should finalize the order', async () => {
    await checkout.finishOrder()
    const completeOrder =  await page.$eval(checkoutEl.element.completeOrder, ele => ele.textContent);
    expect(completeOrder).to.equal('THANK YOU FOR YOUR ORDER')
  })
})


