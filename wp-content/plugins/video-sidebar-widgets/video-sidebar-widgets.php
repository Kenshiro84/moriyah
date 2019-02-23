<?php
/*
Plugin Name: Video Sidebar Widgets
Plugin URI: https://github.com/denzelchia/Video-Sidebar-Widgets/
Version: 6.1
Description: Video Sidebar Widgets to display videos such as Vimeo, YouTube, MySpace Videos etc. Now with added shortcode and quicktag to embed video in post and page content.
Author: Denzel Chia
Author URI: https://github.com/denzelchia/Video-Sidebar-Widgets/
*/ 

//load helper functions
require_once(dirname(__FILE__) . "/helper-functions.php");

//Admin Settings
require_once(dirname(__FILE__) . "/vsw_admin_settings.php");

global $wp_version;
if ( version_compare( $wp_version, '5.0', '<' ) ) {
	//load tinyMCE button only for WordPress less than 5.0, which uses the old tinyMCE editor instead of Gutenberg
	//Tinymce Editor Button
	require_once(dirname(__FILE__) . "/vsw_tinymce/vsw_tinymce.php");
}

//You can comment out the widget class that you do not want to load, remember to comment out the register_widget() in load_video_sidebar_widgets() below!

// Video Sidebar Widget
require_once(dirname(__FILE__) . "/class-videosidebarwidget.php");

// Random Video Widget
require_once(dirname(__FILE__) . "/class-randomvideosidebarwidget.php");

// Post Meta Video Widget
require_once(dirname(__FILE__) . "/class-postmetavideowidget.php");

//function to register Video Sidebar Widget and Random Video Sidebar Widget and post meta video widget.
//You comment out the widget that you do not want.
function load_video_sidebar_widgets(){
	$options = get_option('vsw_plugin_options');
	if(empty($options['hide_vsw'])){
	register_widget('VideoSidebarWidget');
	}
	if(empty($options['hide_rvw'])){
	register_widget('RandomVideoSidebarWidget');
	}
	if(empty($options['hide_pmvw'])){
	register_widget('PostMetaVideoWidget');
	}	
}

//action to initiate widgets
add_action('widgets_init', 'load_video_sidebar_widgets');
?>