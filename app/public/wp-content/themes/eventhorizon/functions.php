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
    wp_enqueue_style('event_horizon_modules', get_stylesheet_directory_uri(__FILE__) . '/css/style.scss');
}
add_action( 'wp_enqueue_scripts', 'eventhorizon_enqueue_style' );

// New block type. JSX Blocks.

class JSXBlock {
    function __construct($name, $renderCallback = null, $data = null) {
        $this->name = $name;
        $this->data = $data;
        $this->renderCallback = $renderCallback;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallback($attributes, $content) {
        ob_start();
        require get_theme_file_path("/our-blocks/{$this->name}.php");
        return ob_get_clean();
    }

    function onInit() {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));

        if ($this->data) {
            wp_localize_script($this->name, $this->name, $this->data);
        }

        $ourArgs = array(
            'editor_script' => $this->name
        );

        if ($this->renderCallback) {
            $ourArgs['render_callback'] = [$this, 'ourRenderCallback'];
        }

        register_block_type("eventhorizontheme/{$this->name}", $ourArgs);
    }
}

new JSXBlock('rainbow-title');
new JSXBlock('horizon-cover');




// PLACEHOLDER BLOCKS

class PlaceholderBlock {
    function __construct($name) {
        $this->name = $name;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallback($attributes, $content) {
        ob_start();
        require get_theme_file_path("/our-blocks/{$this->name}.php");
        return ob_get_clean();
    }

    function onInit() {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/our-blocks/{$this->name}.js", array('wp-blocks', 'wp-editor'));

        register_block_type("ourblocktheme/{$this->name}", array(
            'editor_script' => $this->name,
            'render_callback' => [$this, 'ourRenderCallback']
        ));
    }
}