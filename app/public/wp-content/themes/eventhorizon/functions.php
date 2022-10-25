<?php

// Enqueueing Parent styles and support
function enqueue_styles_child_theme() {

	$parent_style = 'parent-style';
	$child_style  = 'child-style';

	wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );

	wp_enqueue_style( $child_style, get_stylesheet_directory_uri() . '/style.css',
		array( $parent_style ),
	wp_get_theme()->get('Version')
	);
}
add_action( 'wp_enqueue_scripts', 'enqueue_styles_child_theme' );



// Add Bree-serif Font Family
function eventhorizon_enqueue_style() {
	wp_enqueue_style('custom_font', '//href="https://use.typekit.net/jmc8mwh.css', array(), null, 'all');
}
add_action( 'wp_enqueue_scripts', 'eventhorizon_enqueue_style' );


// Add Lit Components
function theme_enqueue_script() {
    wp_enqueue_script('Lit', './src/@components/@libComponents.js', false);
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_script');
