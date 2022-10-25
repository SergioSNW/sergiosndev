<?php

// Adding a trial Custom post type
function horizon_post_types() {
    register_post_type('event', array(  // first arg defines the slug on an ind post type
        'supports' => array('title', 'editor', 'excerpt' ), // adds support for specific requested features (keywords)
        'rewrite' => array('slug' => 'events'),
        'has_archive' => true,  // allows the custom post type to have an archive page.
        'public' => true,
        'show_in_rest' => true, // Adds the block editor as option for building the custom Post Type
        'labels' => array(
            'name' => 'Events',
            'add_new_item' => 'Add New Event',
            'edit_item' => 'Edit Event',
            'all_items' => 'All Events',
            'singular_name' => 'Event'
        ),
        'menu_icon' => 'dashicons-calendar-alt'
    ));
}

add_action('init', 'horizon_post_types');