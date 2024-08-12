function viewTransition(nameTransition, $element, functionRun) {
  if (!document.startViewTransition) {
    functionRun();
    return;
  }

  $element.css('view-transition-name', nameTransition);
  document.startViewTransition(() => {
    $element.css('view-transition-name', '');
    functionRun();
  });
}

export { viewTransition };
