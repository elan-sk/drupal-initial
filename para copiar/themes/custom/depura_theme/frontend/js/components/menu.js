const CLASSES = {
  animIn: 'slide-down',
  animOut: 'slide-up',
  activeMenu: 'main-header--sticky',
  hiddenMenu: 'main-header--hidden'
}

const SELECTORS = {
  component: '.js-menu'
}

const menuInstance = document.querySelector(SELECTORS.component)

class Navbar {
  constructor (context) {
    this.context = context
    this.bannerHeight = context.clientHeight
    this.offset = 0
    this.refoffset = 0
  }

  init () {
    this.subscribe()
  }

  subscribe () {
    window.addEventListener('scroll', () => {
      this.handleScroll()
    })
  }

  handleScroll () {
    this.offset = window.scrollY
    this.context.classList.remove(CLASSES.hiddenMenu)

    if (this.offset > this.bannerHeight) {
      if (this.offset >= this.refoffset) {
        this.context.classList.add(CLASSES.hiddenMenu)
        this.context.classList.remove(CLASSES.animIn)
        this.context.classList.remove(CLASSES.activeMenu)
        this.context.classList.add(CLASSES.animOut)
      } else if (this.offset < this.refoffset) {
        this.context.classList.remove(CLASSES.animOut)
        this.context.classList.add(CLASSES.animIn)
        this.context.classList.add(CLASSES.activeMenu)
      }

      this.refoffset = this.offset
    } else {
      this.context.classList.remove(CLASSES.activeMenu)
    }
  }
}

if (menuInstance) {
  const mainMenu = new Navbar(menuInstance)
  mainMenu.init()
}
