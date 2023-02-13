<?php

/*
  Plugin Name: Skills management - Block Type
  Description: Bloque que recopila dinamicamente los skills asociados a Courses y Jobs para generar los skills para mostrar en el CV
  Version: 0.a
  Author: Sergio y Juan Carlos Santamaria
  Author URI: www.sergiosn.com
*/

if (!defined('ABSPATH')) exit; // Exit if accessed directly

class SkillsManager
{
  function __construct()
  {
    add_action('init', [$this, 'onInit']);
  }

  function onInit()
  {
    wp_register_script('skillsManagerScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-i18n', 'wp-editor'));
    wp_register_script('skillsManagerCallback', plugin_dir_url(__FILE__) . 'build/back.js');
    wp_register_style('skillsManagerStyle', plugin_dir_url(__FILE__) . 'build/index.css');
    // wp_enqueue_script('script', get_stylesheet_directory_uri() . '/js/myscript.js', 'myBack', '1.0.0', true);

    register_block_type('ourplugin/cv-skills', array(
      'render_callback' => 'skillsManagerCallback',
      // 'render_callback' => [$this, 'renderCallback'],
      'editor_script' => 'skillsManagerScript',
      'editor_style' => 'skillsManagerStyle'
    ));
  }

  function zzrenderCallback($attributes) {

// ?>
//     <script type="text/javascript">
//       console.log("msg desde js in-stream")
//     </script>
// <?php



    if ($attributes['skillType']) {
      // wp_enqueue_style('featuredProfessorStyle');
          wp_enqueue_script('skillsManagerCallback', plugin_dir_url(__FILE__) . 'build/back.js', array('back', 'parte1', 'pwp-editor'));

      // return "generateSkillTypeHTML($attributes['skillType'])";
      return "feo" . $attributes['skillType'];
    } else {
      return NULL;
    }
  }
}

$skillsManager = new SkillsManager();
