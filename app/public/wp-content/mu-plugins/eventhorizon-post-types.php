<?php

// Adding a trial Custom post type
function horizon_post_types() {
    register_post_type('skill', array(  // first arg defines the slug on an ind post type
        'supports' => array('title', 'editor', 'excerpt' ), // adds support for specific requested features (keywords)
        'rewrite' => array('slug' => 'skills'),
        'has_archive' => true,  // allows the custom post type to have an archive page.
        'public' => true,
        'show_in_rest' => true, // Adds the block editor as option for building the custom Post Type
        'labels' => array(
            'name' => 'Skills',
            'add_new_item' => 'Add New Skill',
            'edit_item' => 'Edit Skill',
            'all_items' => 'All Skills',
            'singular_name' => 'Skill'
        ),
        'menu_icon' => 'dashicons-awards'
    ));
}

add_action('init', 'horizon_post_types');