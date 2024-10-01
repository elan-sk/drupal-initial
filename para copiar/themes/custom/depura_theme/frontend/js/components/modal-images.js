$(document).ready(function() {
  $('.js-modal-images').each(function() {
    const $this = $(this);

    let currentIndex = 0;
    const $slides = $this.find('.modal-images__image');
    const totalSlides = $slides.length;

    // Verificar si hay solo un slide
    if (totalSlides === 1) {
      $this.find('.carousel-arrows__prev, .carousel-arrows__next').css('display', 'none');
    }

    function showSlide(index) {
      const offset = -index * 100;
      $this.find('.modal-images__wrapper').css('transform', `translateX(${offset}%)`);
    }

    // Función para mover al slide anterior
    $this.find('.carousel-arrows__prev').click(function() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      showSlide(currentIndex);
    });

    // Función para mover al siguiente slide
    $this.find('.carousel-arrows__next').click(function() {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    });
  });
});
