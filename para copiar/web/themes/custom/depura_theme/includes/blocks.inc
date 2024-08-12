<?php

/**
 * @file
 * Preprocess and suggestions for a Drupal sub-theme.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function depura_theme_preprocess_block(&$variables) {
  $user_id = \Drupal::currentUser()->id();
  $user_entity = \Drupal::entityTypeManager()->getStorage('user')->load($user_id);
  $variables['user_scope'] = $user_entity;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * Add custom block theme suggestion based on block type and display.
 */
function depura_theme_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  // View mode suggestion for custom blocks.
  if (isset($variables['elements']['#configuration']['view_mode'])) {
    $view_mode = $variables['elements']['#configuration']['view_mode'];
    $suggestions[] = 'block__' . $view_mode;
  }
  else {
    $view_mode = NULL;
  }

  // Custom Blocks (Bundles and view mode).
  if (isset($variables['elements']['content']['#block_content'])) {
    // Bundle type.
    $bundle = $variables['elements']['content']['#block_content']->bundle();
    if ($view_mode = $variables['elements']['content']['#view_mode']) {
      $suggestions[] = 'block__' . $bundle . '__' . $view_mode;
    }
    $suggestions[] = 'block__' . $bundle;
  }
}
