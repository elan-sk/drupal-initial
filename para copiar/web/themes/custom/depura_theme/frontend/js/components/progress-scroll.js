
function progressScroll(){
  const $progressScroll = $('.progress-scroll__bar');
  let scrollTop = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - window.innerHeight;
  let progress = scrollTop / height;
  $progressScroll.css('width', progress * 100 + '%');
}

window.addEventListener('scroll', function() {
  progressScroll();
});

window.addEventListener('resize', function() {
  progressScroll();
});
