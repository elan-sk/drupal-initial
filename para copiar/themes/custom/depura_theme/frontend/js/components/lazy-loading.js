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

    let dots = 0;
    const loadingInterval = setInterval(function() {
        dots = (dots + 1) % 4;
        let text = ".".repeat(dots);
        $("#ellipsis-loading").text(text);
    }, 200);

    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.src = element.dataset.src;
        element.classList.remove('lazy-load');
      }
    });
    resolve(loadingInterval);
  });
}

$(document).ready(function() {
    lazyLoad().then((loadingInterval) => {
      setTimeout(function() {
        viewTransition('exit', $loader, () => {
          $loader.removeClass('active');
          $('body').removeClass('loader-active');
          clearInterval(loadingInterval);
        });
      }, 500);
    });
});
