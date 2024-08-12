import { GnCarousel } from '../libraries/slick'
import { responsiveSliderNumL, BREAKPOINTS } from "../libraries/utils";

const numbersSlider = responsiveSliderNumL(3);

const SELECTORS = {
  component: '.js-slider-mini'
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
        slidesToScroll: numbersSlider.l,
        slidesToShow: numbersSlider.l,
      }
    },
    {
      breakpoint: BREAKPOINTS.get('xl'),
      settings: {
        slidesToScroll: numbersSlider.xl,
        slidesToShow: numbersSlider.xl,
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
