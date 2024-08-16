import 'slick-carousel'
window.$ = window.jQuery
class GnCarousel {
  constructor (element, slickOptions, parent) {
    this.SELECTORS = {
      slide: '.js_gn_carousel__slide',
      iframe: '.js_gn_carousel__iframe',
      nextArrow: '.js_gn_carousel__next_arrow',
      prevArrow: '.js_gn_carousel__prev_arrow',
      dots: '.js_gn_carousel__dots'
    }
    this.CLASSES = {
      enablePlayer: 'video-gallery__slide--loaded'
    }
    this.element = element
    this.children = [...this.element.children]
    this.carousel = $(element)
    this.parent = parent
    this.carouselIsRunning = false
    this.dots = $(this.parent.querySelector(this.SELECTORS.dots))
    this.prevArrow = $(this.parent.querySelector(this.SELECTORS.prevArrow))
    this.nextArrow = $(this.parent.querySelector(this.SELECTORS.nextArrow))
    this.carouselOptions = {
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      accessibility: false,
      autoplay: false,
      infinite: false,
      mobileFirst: true,
      centerMode: false,
      // If autoHideArrows is set to true the prev arrow will be hidden if
      // the current slide is the first one and the right arrow will be hidden
      // if the last slide is being shown
      autoHideArrows: false,
      // if watchAria is set to true, the carousel will set the aria-hidden=true
      // attr to the current slide
      watchAria: false,
      watchAnimation: false,
      watchArrows: false,
      watchIframes: false,
      speed: 700,
      adaptiveHeight: true,
    }
    this.dots ? this.carouselOptions.appendDots = this.dots : null
    this.prevArrow ? this.carouselOptions.prevArrow = this.prevArrow : null
    this.nextArrow ? this.carouselOptions.nextArrow = this.nextArrow : null
    this.toggleArrows = this.toggleArrows.bind(this)
    Object.assign(this.carouselOptions, slickOptions)
  }

  // eslint-disable-next-line
  watchArrows({
    target
  }, {
    slideCount
  }, currentSlide, nextSlide) {
    this.toggleArrows(slideCount, nextSlide)
  }

  toggleArrows (slideCount, slideIndex) {
    if (slideCount > 1) {
      if (slideIndex === slideCount - 1) {
        this.nextArrow.css({
          visibility: 'hidden'
        })
        this.prevArrow.css({
          visibility: 'visible'
        })
      } else if (slideIndex < slideCount - 1 && slideIndex > 0) {
        this.nextArrow.css({
          visibility: 'visible'
        })
        this.prevArrow.css({
          visibility: 'visible'
        })
      } else if (slideIndex === 0) {
        this.nextArrow.css({
          visibility: 'visible'
        })
        this.prevArrow.css({
          visibility: 'hidden'
        })
      }
    } else {
      this.nextArrow.css({
        visibility: 'hidden'
      })
      this.prevArrow.css({
        visibility: 'hidden'
      })
    }
  }

  /**
   * Sets the aria hidden attribute only to the current slide
   * @param {Event} event
   * @param {Object} slick slick instance
   * @param {int} currentSlide current slide index
   */
  watchAriaAttributes (event, slick, currentSlide) {
    setTimeout(() => {
      [...slick.$slides].forEach((slide, index) => {
        slide.setAttribute('aria-hidden', !(currentSlide === index))
      })
    }, 100) // wait for the slick cycle to finish
  }

  /**
   * Sets the animation attribute only to the current slide
   * @param {Event} event
   * @param {Object} slick slick instance
   * @param {int} currentSlide current slide index
   */
  watchAnimation (event, slick, currentSlide) {
    setTimeout(() => {
      [...slick.$slides].forEach((slide, index) => {
        const animatedItem = slide.querySelector('.animate__item')

        animatedItem.classList.add('hidden')

        if (animatedItem.classList.contains('animate__fadeInLeftBig')) {
          animatedItem.classList.remove('animate__fadeInLeftBig')

          setTimeout(() => {
            animatedItem.classList.remove('hidden')
            animatedItem.classList.add('animate__fadeInLeftBig')
          }, 300)
        } else {
          animatedItem.classList.remove('animate__fadeInRightBig')
          setTimeout(() => {
            animatedItem.classList.remove('hidden')
            animatedItem.classList.add('animate__fadeInRightBig')
          }, 300)
        }
      })
    }, 100) // wait for the slick cycle to finish
  }

  /**
   * Delete the iframe presents in each slide
   * @param {Event} event
   * @param {Object} slick slick instance
   * @param {int} currentSlide current slide index
   */
  watchIframes (event, slick, currentSlide) {
    setTimeout(() => {
      [...slick.$slides].forEach((slide, index) => {
        const iframe = slide.querySelector(this.SELECTORS.iframe)
        const slideWrapper = slide.querySelector(this.SELECTORS.slide)

        if (iframe) {
          slideWrapper.classList.remove(this.CLASSES.enablePlayer)
          iframe.parentNode.removeChild(iframe)
        }
      })
    }, 100) // wait for the slick cycle to finish
  }

  initCarousel () {
    this.carousel.not('.slick-initialized').slick(this.carouselOptions)
    this.carouselIsRunning = true

    if (this.carouselOptions.watchAria) {
      this.carousel.on('afterChange', this.watchAriaAttributes.bind(this))
    }

    if (this.carouselOptions.watchIframes) {
      this.carousel.on('beforeChange', this.watchIframes.bind(this))
    }

    if (this.carouselOptions.watchAnimation) {
      this.carousel.on('beforeChange', this.watchAnimation.bind(this))
    }

    if (this.carouselOptions.autoHideArrows) {
      const {
        slideCount,
        currentSlide
      } = this.carousel.slick('getSlick')

      this.carousel.on('beforeChange', this.watchArrows.bind(this))
      this.toggleArrows(slideCount, currentSlide)
    }

    if(this.dots.find('li').length <= 1){
      this.dots.css({visibility: 'hidden'});
    }
  }

  destroyCarousel () {
    if (this.carouselIsRunning) {
      this.carousel.slick('unslick')
      this.carouselIsRunning = false
    }
  }

  reInitcarousel () {
    if (this.carousel.slick) {
      this.carousel.slick('unslick')
      this.initCarousel()
    }
  }
}

export {
  GnCarousel
}
