import { GnCarousel } from '../libraries/slick'

const SELECTORS = {
  component: '.js-gallery-carousel-one'
}

const OPTIONS = {
  arrows: true,
  dots: false,
  mobileFirst: true,
  infinite: true,
  touchMove:true,
  speed: 400,
  slidesToScroll: 1,
  slidesToShow: 1,
  variableHeight: true,
  pauseOnHover: false,
  dots: true,
}

const sliderInstance = [...document.querySelectorAll(SELECTORS.component)]

if (sliderInstance) {
  sliderInstance.forEach(slider => {
    const parent = slider.parentElement
    const slickInstance = new GnCarousel(slider, OPTIONS, parent)

    slickInstance.initCarousel()
  })
}
