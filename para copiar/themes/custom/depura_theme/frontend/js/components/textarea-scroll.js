document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.querySelector("textarea");

  function checkOverflow() {
    if (textarea.scrollHeight > textarea.clientHeight) {
      textarea.classList.add("overflow-active");
    } else {
      textarea.classList.remove("overflow-active");
    }
  }

  textarea.addEventListener("input", checkOverflow);
  textarea.addEventListener("paste", () => {
    setTimeout(checkOverflow, 0);
  });
  textarea.addEventListener("change", checkOverflow);

  checkOverflow();
});
