import puppeteer from 'puppeteer'

export default class Launcher {
  static async build(viewport) {
    const launchOptions = {
      headless: false,
      slowMo: 0,
      args: [
        '--no-sandbox',
        '--disable-setui-sandbox',
        '--disable-web-security',
      ],
    }

    const browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage()
    const extendedPage = new Launcher(page)
    page.setDefaultTimeout(10000)
   
    switch (viewport) {
      case 'Mobile':
        const mobileViewport = puppeteer.devices['iPhone X']
        await page.emulate(mobileViewport)
        break
      case 'Tablet':
        const tabletViewport = puppeteer.devices['iPad landscape']
        await page.emulate(tabletViewport)
        break
      case 'Desktop':
        await page.setViewport({ width: 1024, height: 768 })
        break
      default:
        throw new Error('Supported devices are only MOBILE | TABLET | DESKTOP')
    }

    return new Proxy(extendedPage, {
      get: function (_target, property) {
        return extendedPage[property] || browser[property] || page[property]
      },
    })
  } 
}
