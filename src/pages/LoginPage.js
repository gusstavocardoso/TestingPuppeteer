import LoginElement from '../elements/LoginElements'
let user = new LoginElement()

export default class LoginPage {
  
  constructor(page) {
    this.page = page
  }

  async login(user_id, user_password) {
    await this.page.waitAndType(user.element.username, user_id)
    await this.page.waitAndType(user.element.password, user_password)
    await this.page.waitAndClick(user.element.loginButton)
  }
}
