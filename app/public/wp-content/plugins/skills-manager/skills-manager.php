<?php

/*
  Plugin Name: Skills management - Block Type
  Description: Bloque que recopila dinamicamente los skills asociados a Courses y Jobs para generar los skills para mostrar en el CV
  Version: 0.a
  Author: Sergio y Juan Carlos Santamaria
  Author URI: www.sergiosn.com
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class SkillsManager {
  function __construct() {
    add_action('init', [$this, 'onInit']);
  }

  function onInit() {
    wp_register_script('skillsManagerScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-i18n', 'wp-editor'));
    wp_register_style('skillsManagerStyle', plugin_dir_url(__FILE__) . 'build/index.css');

    register_block_type('ourplugin/CV-skills', array(
      'render_callback' => [$this, 'renderCallback'],
      'editor_script' => 'skillsManagerScript',
      'editor_style' => 'skillsManagerStyle'
    ));
  }

  function renderCallback($attributes) {
    return '<p>We will replace this content soon.</p>';
  }

}

$skillsManager = new SkillsManager();