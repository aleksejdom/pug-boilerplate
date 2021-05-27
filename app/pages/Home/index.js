import Page from 'classes/Page'

export default class Home extends Page {
  constructor () {
    super({
      id: 'home',
      element: '.home',
      elements: {
        navigation: '.navigation',
        link: '.home__link'
      }
    })
  }

  create () {
    super.create()
  }
}
