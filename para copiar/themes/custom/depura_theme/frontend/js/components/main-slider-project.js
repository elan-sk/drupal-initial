import { GnCarousel } from '../libraries/slick'
import { BREAKPOINTS } from "../libraries/utils";

const SELECTORS = {
  component: '.js-main-slider-project'
}

const OPTIONS = {
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableHeight: false,
  infinite:true,
  fade: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: BREAKPOINTS.get('s'),
      settings: {
      }
    },
    {
      breakpoint: BREAKPOINTS.get('m'),
      settings: {
        dots: true,
      }
    },
    {
      breakpoint: BREAKPOINTS.get('l'),
      settings: {
        dots: true,
      }
    },
    {
      breakpoint: BREAKPOINTS.get('xl'),
      settings: {
        dots: true,
      }
    },
  ]
}

const sliderInstance = [...document.querySelectorAll(SELECTORS.component)]

if (sliderInstance) {
  sliderInstance.forEach(slider => {
    const parent = slider.parentElement
    const slickInstance = new GnCarousel(slider, OPTIONS, parent)

    slickInstance.initCarousel()
  })
}
