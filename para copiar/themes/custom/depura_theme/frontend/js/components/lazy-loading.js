import { viewTransition } from "../api/_api_view-transition";

const $loader = $('#loader');

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (
      window.innerHeight ||
      document.documentElement.clientHeight
    ) &&
    rect.right <= (
      window.innerWidth ||
      document.documentElement.clientWidth
    )
  );
}

function lazyLoad() {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll('.lazy-load');
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.src = element.dataset.src;
        element.classList.remove('lazy-load');
      }
    });
    resolve();
  });
}

$(document).ready(function() {
    lazyLoad().then(() => {
      setTimeout(function() { //Retardo de tiempo
        viewTransition('exit', $loader, () => {
          $loader.removeClass('active');
          $('body').removeClass('loader-active')
        });
      }, 500);
    });
});

