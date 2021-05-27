import Page from 'classes/Page'

export default class Contact extends Page {
  constructor () {
    super({
      id: 'contact',
      element: '.contact',
      elements: {
        navigation: '.navigation',
        title: '.contact__title'
      }
    })
  }

  create () {
    super.create()
  }
}
