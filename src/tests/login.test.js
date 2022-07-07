import { expect } from 'chai'
import { step } from 'mocha-steps'

import Page from '../builder'
import CustomCommand from '../commands/CustomCommands'
import LoginPage from '../pages/LoginPage'
import LoginElement from '../elements/LoginElements'

describe('Puppeteer End-to-end Testing', () => {
  let page
  let loginPage
  let action
  let user

  before(async () => {
    page = await Page.build('Desktop')
    action = await new CustomCommand(page)
    loginPage = await new LoginPage(action)    
    user = new LoginElement()
  })

  after(async () => {
    await page.close()
  })

  step('Should access homepage SWAGLABS', async () => {
    await page.goto('https://www.saucedemo.com/')
    expect(await action.isElementVisible(user.element.logo)).to.be.true;
  })

  step('Should login to application', async () => {
    await loginPage.login('standard_user', 'secret_sauce')
    expect(await action.isElementVisible(user.element.product)).to.be.true;
  })
})
