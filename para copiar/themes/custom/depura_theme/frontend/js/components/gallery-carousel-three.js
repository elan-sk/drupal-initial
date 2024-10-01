import { GnCarousel } from '../libraries/slick'
import { responsiveSliderNumL, BREAKPOINTS } from "../libraries/utils";

const numbersSlider = responsiveSliderNumL(3);

const SELECTORS = {
  component: '.js-gallery-carousel-three'
}

const OPTIONS = {
  arrows: true,
  dots: false,
  mobileFirst: true,
  infinite: true,
  touchMove:true,
  speed: 400,
  slidesToScroll: numbersSlider.xs,
  slidesToShow: numbersSlider.xs,
  variableHeight: true,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: BREAKPOINTS.get('s'),
      settings: {
        dots: true,
        slidesToScroll: numbersSlider.s,
        slidesToShow: numbersSlider.s,
      }
    },
    {
      breakpoint: BREAKPOINTS.get('m'),
      settings: {
        dots: true,
        slidesToScroll: numbersSlider.m,
        slidesToShow: numbersSlider.m,
      }
    },
    {
      breakpoint: BREAKPOINTS.get('l'),
      settings: {
        dots: true,
        slidesToScroll: numbersSlider.l,
        slidesToShow: numbersSlider.l,
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
