<?php/** * 'apwp_player' Shortcode *  * @package Audio Player with Playlist Pro * @since 1.0.0 */// Exit if accessed directlyif ( !defined( 'ABSPATH' ) ) exit;function apwpultimate_shortcode( $atts, $content = null ) {	// Shortcode Parameter	extract(shortcode_atts(array(				'limit'         => '10',		'audio_id'     	=> '',		'playlist_id'   => '',			'layout'        => 'layout-1',		'playlist_hide'	=> false,			'order'			=> 'DESC',		'orderby'		=> 'date',			), $atts));		$shortcode_layout 	= apwpultimate_player_layout();	$limit 				= !empty($limit) 					? $limit 						: '10';	$audio_id			= !empty($audio_id)					? explode(',', $audio_id) 		: array();		$playlist_id 		= (!empty($playlist_id)) 			? explode(',', $playlist_id) 	: '';	$layout 			= ($layout && (array_key_exists(trim($layout), $shortcode_layout))) ? trim($layout) : 'layout-1';	$order				= ( strtolower($order) == 'asc' ) 	? 'ASC' 						: 'DESC';	$playlist_hide 		= ( $playlist_hide == 'true')		? true							: false;	$orderby			= !empty($orderby) 					? $orderby 						: 'date';		// Shortcode file	$design_file_path 	= APWPULTIMATE_DIR . '/templates/playlist/' . $layout . '.php';	$design_file 		= (file_exists($design_file_path)) ? $design_file_path : '';		// Taking some variables	$prefix = APWPULTIMATE_META_PREFIX; // Metabox prefix		// Enqueus required script	wp_enqueue_script( 'apwpultimate-jplayer-script' );	wp_enqueue_script( 'apwpultimate-jpplaylist-script');	wp_enqueue_script( 'apwpultimate-slimscroll-script' );	wp_enqueue_script( 'apwpultimate-public-script');			// Getting post data	global $post;		$unique = apwpultimate_get_unique();			// WP Query Parameters	$args = array (		'posts_per_page' 		=> $limit,		'post_type'     	 	=> APWPULTIMATE_POST_TYPE,		'post_status' 			=> array( 'publish' ),		'orderby'        		=> $orderby,		'order'          		=> $order,		'post__in'		 		=> $audio_id,			);	// Category Parameter	if( $playlist_id != "" ) {		$args['tax_query'] = array(			array(					'taxonomy' 			=> APWPULTIMATE_CAT,					'field' 			=> 'term_id',					'terms' 			=> $playlist_id,									));	}		// WP Query Parameters	$query 				= new WP_Query($args);	$post_count 		= $query->post_count;		ob_start();	global $apwpultimate_ultimate_options;	// If post is there	if ( $query->have_posts() ) { ?>		<div id="apwp-audio-player-wrp-<?php echo $unique; ?>" class="apwp-audio-player-wrp apwp-jplayer-design-overide apwpultimate-clearfix apwpultimate-<?php echo $layout; ?>" data-palyer="apwp-audio-player-<?php echo $unique; ?>" data-id="<?php echo $unique; ?>">								<?php					if( $design_file ) {							include( $design_file );						}											while ( $query->have_posts() ) : $query->the_post();						$title      	= get_the_title( $post->ID);						$artist_name 	= get_post_meta( $post->ID, $prefix.'artist_name', true );						$audio_file 	= get_post_meta( $post->ID, $prefix.'audio_file', true );						$duration 	= get_post_meta( $post->ID, $prefix.'duration', true );						$poster_image 	= get_the_post_thumbnail_url( $post->ID, 'large' );												$record['playlist'][] = array(													'title' 		=> $title,													'artist_name' 	=> $artist_name,													'audio_file'	=> $audio_file,													'poster_image'	=> $poster_image,													'duration'		=> $duration,													'playlistid'	=> 'playlistid-'.$unique													);											endwhile; 					 ?>				<div class="apwpultimate-conf apwpultimate-hide"><?php echo htmlspecialchars(json_encode($record)); ?></div>						</div>				<?php }			$content .= ob_get_clean();	return $content;	}// 'popup_anything' shortcodeadd_shortcode('apwp_player', 'apwpultimate_shortcode');