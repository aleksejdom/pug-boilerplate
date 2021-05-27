/* import env from '/app/images/env.png'
 */
import each from 'lodash/each'

import Home from 'pages/Home'
import Contact from 'pages/Contact'

class App {
  constructor () {
    this.createContent()
    this.createPages()
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages () {
    this.pages = {
      home: new Home(),
      contact: new Contact()
    }
    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()
  }


}

new App()
