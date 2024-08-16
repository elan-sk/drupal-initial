<?php

/**
 * @file
 * Preprocess and suggestions for a theme Views.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * Add views unformatted template suggestions.
 *
 * @inheritdoc
 */
function depura_theme_theme_suggestions_views_view_unformatted_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'views_view_unformatted__' . $variables['view']->id();
}
