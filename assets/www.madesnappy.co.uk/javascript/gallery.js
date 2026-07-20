//==============================================================================
//
// Javascript for photo galleries
//
//==============================================================================

// Create a gallery object with all the correct functions
function make_photo_gallery(options) {

  // Check if we are visible, if not reload when we are, or the code will bugger up
  if ($(window).height() == 0) {
    $(window).on("resize", function() {
      location.reload();
    });
    return null;
  }

  // Create the object
  var gallery = new Object();

  // Setup some sub objects
  gallery.pictures = make_pictures_object(options, gallery);
  gallery.audio = make_audio_object(options, gallery);
  gallery.walkthrough = make_walkthrough_object(options);
  gallery.experience = make_experience_object(options, gallery);
  gallery.embedded_events = make_embed_events(options, gallery);
  gallery.interaction = options.interaction;
  options.interaction.gallery = gallery;

  // Other variables to setup
  gallery.locked = false;
  gallery.waiting_hotspots = null;

  // Setup the gallery
  gallery.setup = function() {
    gallery.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!gallery.mobile) {
      gallery.mobile = typeof navigator.maxTouchPoints !== "undefined" && navigator.maxTouchPoints > 2;
    }
    gallery.calculate_dimensions();
    gallery.draw_view();
    if (options.navigation) {
      gallery.draw_navigation();
    }
    gallery.capture_window_events();
    gallery.embedded_events.loaded();
  }

  // Set the linker
  gallery._linker = null;
  gallery.set_linker = function(linker) {
    gallery._linker = linker;
  }

  // Add the calculate dimensions function
  gallery.calculate_dimensions = function() {
    gallery.height = $("#" + options.view).height();
  }

  // Draw the view
  gallery.draw_view = function() {

    // Set the correct speed
    var speed = 1;
    if (gallery.mobile) {
      speed = 4;
    }

    // Draw the nav bar
    if (typeof(options.max_screen) === "undefined" || !options.max_screen) {
      gallery.draw_overlays();
    }

    // Whether we auto animate
    let auto_animate_speed = false;
    if (options.auto_animate && options.auto_rotate) {
      auto_animate_speed = 1000;
    }

    // Viewer data
    var photo = {};
    if (typeof options.override_starting_angle != "undefined") {
      photo = options.override_starting_angle;
    } else {
      photo = gallery.pictures.initial_photo();
    }
    gallery.starting_angle = photo;
    var viewer_data = {
      container: options.view,
      panorama: gallery.pictures.initial_photo_path(),
      default_fov: options.default_zoom,
      min_fov: options.min_fov,
      max_fov: options.max_fov,
      time_anim: auto_animate_speed,
      anim_speed: 0.25,
      default_long: photo.longitude,
      default_lat: photo.latitude,
      mousewheel: true,
      move_speed: speed,
      navbar: [],
      markers: gallery.pictures.initial_hotspots(),
      title: options.title
    };
    gallery.last_longitude = photo.longitude;

    // Show the error message if there is no photo
    if (options.start_index == -1 && typeof options.navigation_error !== "undefined") {
      $("#" + options.navigation_error).removeClass("hidden_force");
    }

    // Add the loading image
    if (options.loading_image) {
      viewer_data.loading_image = options.loading_image;
    }

    // Check white labelling
    if (options.white_label) {
      viewer_data.white_label = options.white_label;
    }

    // Build the photosphere
    gallery.view = new PhotoSphereViewer(viewer_data);
    gallery.view.navbar.hideNavbar();
    let pan = 0;
    if (typeof options.pictures[0].pan !== "undefined") {
      pan = parseFloat(options.pictures[0].pan);
    }
    let tilt = 0;
    if (typeof options.pictures[0].tilt !== "undefined") {
      tilt = parseFloat(options.pictures[0].tilt);
    }
    let roll = 0;
    if (typeof options.pictures[0].roll !== "undefined") {
      roll = parseFloat(options.pictures[0].roll);
    }
    gallery.view.setSphereCorrection(pan, tilt, roll);

    // Capture mouse clicks
    gallery.view.on("click", function(event) {
      if (!event.wasMoving && options.auto_animate) {
        gallery.view.toggleAutorotate();
      }
      gallery.trigger_interaction();
      gallery.hide_information_points();
    });

    // Capture moving the viewer
    gallery.view.on("viewer-moved", function(rotation) {

      // Rotate any linked views
      if (gallery._linker) {
        gallery._linker.rotate(gallery, rotation);
      }

      // Trigger an interaction
      gallery.trigger_interaction();

      // Rotate the pin on the floorplan
      gallery.floorplan_rotation(rotation);

      // Hide information points
      gallery.hide_information_points();
    });

    // Capture moving the viewer
    gallery.view.on("auto-rotate", function(rotation) {
      gallery.floorplan_rotation(rotation);
    });

    // Capture zooming
    gallery.view.on("viewer-zoomed", function(zoom) {
      if (gallery._linker) {
        gallery._linker.zoom(gallery, zoom);
      }
      gallery.trigger_interaction();
      gallery.hide_information_points();
    });

    // When a marker is clicked, move to a different screen
    gallery.view.on("select-marker", function(marker, location, double_click) {

      // Ignore a double click as the single click will already have fired
      if (double_click) {
        return;
      }

      // Do nothing if the view is locked
      if (gallery.locked) {
        return;
      }
      if (gallery._linker && gallery._linker.locked(gallery)) {
        return;
      }

      // If we are in lead capture mode, break out here
      if (typeof options.lead_capture !== "undefined") {
        options.lead_capture();
        return;
      }

      // Ignore the tripod logo
      if (marker.data.marker_type == "tripod_logo") {
        gallery.hide_information_points();
        return;
      }

      // Load the scene if it is a hotspot
      if (marker.data.marker_type == "hotspot") {
        gallery.load_scene(gallery.pictures.picture_index(marker.data.to));
        gallery.trigger_interaction();
      }

      // Draw information if it is an information point
      if (marker.data.marker_type == "information_point") {
        gallery.draw_information_point(marker, location);
      } else {
        gallery.hide_information_points();
      }
    });

    // When hovering over a marker, show a mouse selection pointer
    gallery.view.on("over-marker", function(marker) {
      document.body.style.cursor = "pointer";
    });

    // When leaving a marker, put the mouse back
    gallery.view.on("leave-marker", function(marker) {
      document.body.style.cursor = "auto";
    });

    // Triggered when the scene is loaded
    gallery._first_load = true;
    gallery.view.on("panorama-loaded", function() {

      // Check if this is the first load and audio needs to be started
      let load_audio = false;
      if (gallery._first_load) {
        gallery._first_load = false;
        load_audio = true;
      }

      // Show the overlays
      $(".wait_for_load").removeClass("wait_for_load");

      // Load more
      gallery.locked = false;
      gallery.load_waiting_hotspots();

      // Move the floorplan
      if (gallery.walkthrough.current_scene != -1) {
        let photo_id = gallery.pictures.get_id_from_index(gallery.walkthrough.current_scene);

        // Update the floorplan
        if (options.floorplans) {
          options.floorplan_clear_links();
          options.floorplan_location_change(photo_id);
          options.floorplan_angle_change(photo_id, gallery.last_longitude);
        }

        // Load the audio
        if (load_audio) {
          gallery.audio.play(photo_id);
        }

        // Fire an event to the parent window
        gallery.embedded_events.scene_loaded(photo_id);
        gallery.interaction.move_scene();
      }
    });

  }

  // Trigger an interaction
  gallery.trigger_interaction = function() {
    gallery.interaction.check();
    gallery.embedded_events.interacted();
  }

  // Set the viewer position
  gallery.set_viewing_angle = function(longitude, latitude) {
    var position = {
      longitude: longitude,
      latitude: latitude
    };
    gallery.view.rotate(position);
  }

  // Draw the overlays on the tour face
  gallery.draw_overlays = function() {

    // Add the nav bar to the tour
    $("#" + options.view).append("<div class='tour_bottom_bar wait_for_load'></div>");
    gallery.navbar = $("#" + options.view + " .tour_bottom_bar");
    gallery.navbar.append("<div class='tour_bottom_left_bar'></div>");
    $("#" + options.view).append("<div class='tour_top_right_bar tour_top_right_bar_closed wait_for_load'></div>");
    let left_bar = $("#" + options.view + " .tour_bottom_left_bar");
    let right_bar = $("#" + options.view + " .tour_top_right_bar");
    
    // Add the menus
    let contact_menu_html = "<div class='vertical_flex_menus' id='contact_menu'></div>";
    let share_menu_html = "<div class='vertical_flex_menus' id='share_menu'></div>";
    right_bar.append(contact_menu_html);
    right_bar.append(share_menu_html);

    // Check if there is an apply button
    if (typeof options.apply_button !== "undefined" && options.apply_button.on != "0") {

      // Use the url unless we are using a form
      let url = (typeof options.apply_form !== "undefined" && options.apply_form.on != "0") ? ">" : "href='" + options.apply_button.url + "' target='__blank'>";

      // Draw the button
      let apply_html = "<a class='apply_button pointer' style='background-color:" + options.apply_button.colour;
      apply_html += ";color:" + options.apply_button.text_colour + "' ";
      apply_html += url;
      apply_html += options.apply_button.text;
      apply_html += "</a>";
      right_bar.append(apply_html);
    }

    // Show the tour name
    let html = "<div id='" + options.navigation_toggle + "' class='tour_room_name wait_for_load'>";
    var names = gallery.pictures.get_names();
    let name = names[gallery.pictures.start_index];
    html += "<span class='text'>" + name + "</span> <span class='opener'>&#9660;</span></div>";
    $("#" + options.view).append(html);

    var view_count_right = '';
    var view_count_bottom = '';

    // Add the embed icon to the nav bar
    if (options.embedded && typeof(options.own_tab_link) !== "undefined") {

      // Add the embed view count class for view counter
      view_count_right = ' embed_view_count';

      // Add any URL variables onto the end
      // We don't do this in PHP as the URL string is rewritten and this impacts the 
      options.own_tab_link += window.location.search;

      // Add the element to the DOM
      let html = "<a class='new_window_button wait_for_load' href='" + options.own_tab_link + "' target='__blank'>";
      html += "<img class='icon_shadow' src='" + options.icons_root + "full_screen.png?2'>";
      html += "</a>";
      $("#" + options.view).append(html);

      // Stop any other events propagating off this click
      $(".new_window_button").mouseup(function(event) {
        event.stopPropagation();
      });
      $(".new_window_button").on("touchstart", function(event) {
        event.stopPropagation();
      });
      $(".new_window_button").on("touchend", function(event) {
        event.stopPropagation();
      });

      // Move the top right bar to the bottom and invert the menu opening
      $(".tour_top_right_bar").addClass("embedded_right_bar");
      $(".vertical_flex_menus").addClass("reverse_flex_menu");
    }

    // Add the floorplan button
    if (options.floorplans) {
      let html = "<img class='floorplan_toggler hover_link hide_small icon_shadow' src='" + options.icons_root + "floorplan.png?2'>";
      left_bar.append(html);
      $("#" + options.view + " .floorplan_toggler").click(function() {
        $(".tour_floorplan").toggleClass("hidden");
        gallery.hide_information_points();
        gallery.ensure_hidden_navigation();
      });
      view_count_bottom = ' tour_view_counter_extra_space';
    }

    // Add the streetview link
    if (typeof(options.street_view_link) != "undefined" && options.street_view_link != "") {
      let html = "<a class='street_view_link_button hide_small' href='" + options.street_view_link + "' target='__blank'>";
      html += "<img class='hover_link icon_shadow' src='" + options.icons_root + "street_view.png?2'>";
      html += "</a>";
      left_bar.append(html);
      view_count_bottom = ' tour_view_counter_extra_space';
    }
    
    // Add the information link
    if (typeof(options.information_link) != "undefined" && options.information_link != "") {
      let html = "<a class='hide_small' id='information_link_button' href='" + options.information_link + "' target='__blank'>";
      html += "<img class='hover_link icon_shadow' src='" + options.icons_root + "info.png?2'>";
      html += "</a>";
      left_bar.append(html);
      view_count_bottom = ' tour_view_counter_extra_space';
    }

    // Add audio on and off
    if (gallery.audio.tracks() > 0) {
      let html = "<img class='audio_on hover_link icon_shadow' src='" + options.icons_root + "audio_on.png?2'>";
      left_bar.append(html);
      html = "<img class='audio_off hover_link hidden icon_shadow' src='" + options.icons_root + "audio_off.png?2'>";
      left_bar.append(html);
      $("#" + options.view + " .audio_on").click(function() {
        $(".audio_on").toggleClass("hidden");
        $(".audio_off").toggleClass("hidden");
        gallery.audio.off();
      });
      $("#" + options.view + " .audio_off").click(function() {
        $(".audio_on").toggleClass("hidden");
        $(".audio_off").toggleClass("hidden");
        gallery.audio.on();
      });
      view_count_bottom = ' tour_view_counter_extra_space';
    }

    // Draw the view counter
    if (typeof options.view_counter !== "undefined") {
      $(`#${options.view}`).append(`
        <div class='tour_viewer_counter${view_count_right}${view_count_bottom}'>
          <img class='icon_shadow' src='${options.icons_root}views.png?2'>
          <span class='tour_viewer_counter_text'>${options.view_count | 0}</span>
        </div>
      `);
    }

    // Phone menu
    let phone_menu = null;
    if (typeof(options.call_button) != "undefined" || typeof(options.whatsapp_button) != "undefined") {
      let phone_menu_html = "<div class='vertical_flex_menus' id='phone_menu'></div>";
      right_bar.prepend(phone_menu_html);
      phone_menu = right_bar.find("#phone_menu");
    }

    // Customer has Phone number and whatsapp input
    if (phone_menu && typeof(options.call_button) != "undefined" && typeof(options.whatsapp_button) != "undefined") {
      phone_menu.append("<img class='phone_menu_opener hover_menu_opener hover_link icon_shadow' src='" + options.icons_root + "contact_opener.png?2'>");
      let html = "<a class='right_text phone_menu_toggle_item_anchor' href='tel:" + options.call_button + "' title='" + options.call_button + "'>";
      html += "<img class='phone_menu_toggle_item phone_menu_item_call icon_shadow' alt='Call Agent' src='" + options.icons_root + "phone.png?2'>";
      html += "</a>";
      phone_menu.append(html);
      html = "<a class='right_text phone_menu_toggle_item_anchor' href='https://wa.me/" + options.whatsapp_button + "' target='_blank' rel='noopener' title='https://wa.me/" + options.whatsapp_button + "'>";
      html += "<img class='phone_menu_toggle_item phone_menu_item_whatsapp icon_shadow' alt='Message Agent' src='" + options.icons_root + "whatsapp.png?2'>";
      html += "</a>";
      phone_menu.append(html);

    // Customer only has phone number entered
    } else if (phone_menu && typeof(options.call_button) != "undefined") {
      let html = "<a class='right_text phone_menu_toggle_item_anchor' href='tel:" + options.call_button + "' title='" + options.call_button + "'>";
      html += "<img class='phone_menu_direct hover_link icon_shadow' alt='Call Agent' src='" + options.icons_root + "phone.png?2'>";
      html += "</a>";
      phone_menu.append(html);

    // Customer only has whatsapp number entered
    } else if (phone_menu && typeof(options.whatsapp_button) != "undefined") {
      html = "<a class='right_text phone_menu_toggle_item_anchor' href='https://wa.me/" + options.whatsapp_button + "' target='_blank' rel='noopener' title='https://wa.me/" + options.whatsapp_button + "'>";
      html += "<img class='phone_menu_direct hover_link icon_shadow' alt='Message Agent' src='" + options.icons_root + "whatsapp.png?2'>";
      html += "</a>";
      phone_menu.append(html);
    }

    // Draw the contact menu items
    let contact_menu_items = 0;
    let contact_menu = $("#contact_menu");

    // Add a link to the website
    if (typeof(options.weblink_button) != "undefined") {
      contact_menu_items++;
      let html = "<a class='right_text' href='" + options.weblink_button + "' target='__blank'>";
      html += "<img class='contact_menu_toggle_item icon_shadow contact_menu_item_" + contact_menu_items + "' src='" + options.icons_root + "web.png?2'>";
      html += "</a>";
      contact_menu.append(html);
    }

    // Add a facebook link
    if (typeof(options.facebook_button) != "undefined") {
      contact_menu_items++;
      let html = "<a class='right_text' href='" + options.facebook_button + "' target='__blank'>";
      html += "<img class='contact_menu_toggle_item icon_shadow contact_menu_item_" + contact_menu_items + "' src='" + options.icons_root + "facebook.png?2'>";
      html += "</a>";
      contact_menu.append(html);
    }

    // Add an instagram link
    if (typeof(options.instagram_button) != "undefined") {
      contact_menu_items++;
      let html = "<a class='right_text' href='" + options.instagram_button + "' target='__blank'>";
      html += "<img class='contact_menu_toggle_item icon_shadow contact_menu_item_" + contact_menu_items + "' src='" + options.icons_root + "instagram.png?2'>";
      html += "</a>";
      contact_menu.append(html);
    }

    // Draw the share menu
    if (typeof options.hide_sharing_menu === "undefined") {

      let share_menu = $("#share_menu");

      // Add a link to share on whatsapp
      let whatsapp_html = "<a class='right_text' href='https://api.whatsapp.com/send?text=" + options.title + ": " + options.share_url + "' target='__blank' title='Share on WhatsApp'>";
      whatsapp_html += "<img class='share_menu_toggle_item share_menu_item_whatsapp icon_shadow' src='" + options.icons_root + "whatsapp.png?2'>";
      whatsapp_html += "</a>";
      share_menu.append(whatsapp_html);

      // Add a link to share on facebook
      let facebook_html = "<a class='right_text' href='https://www.facebook.com/sharer.php?u=" + options.share_url + "' target='__blank' title='Share on Facebook'>";
      facebook_html += "<img class='share_menu_toggle_item share_menu_item_facebook icon_shadow' src='" + options.icons_root + "facebook.png?2'>";
      facebook_html += "</a>";
      share_menu.append(facebook_html);
      
      // Show the share menu opener
      let share_html = "<img id='share_menu_opener' class='hover_menu_opener hover_link icon_shadow' src='" + options.icons_root + "share.png?2'>";
      share_menu.prepend(share_html);
    }

    // Add a logo to the tour
    if (typeof(options.logo) != "undefined") {
      let html = "<img class='wait_for_load tour_logo' src='" + options.logo + "'>";
      $("#" + options.view).append(html);
    }
    
    // Show the contact menu opener
    if (contact_menu_items > 0) {
      let html = "<img id='contact_menu_opener' class='hover_menu_opener hover_link icon_shadow' src='" + options.icons_root + "globe.png?2'>";
      contact_menu.prepend(html);
    }

    // Draw the caption
    if (options.caption) {
      let html = "<div class='tour_caption_container wait_for_load'><div class='tour_caption'>" + options.caption + "</div></div>";
      $("#" + options.view).append(html);
    }
  }

  // Catch them leaving the page
  window.onbeforeunload = function() {
    gallery.interaction.finish();
  };

  // Catch them switching tabs
  window.onblur = function() {
    gallery.interaction.finish();
  };

  // Get the viewer position
  gallery.get_viewing_angles = function() {
    var angles = gallery.view.getPosition();
    angles.longitude = angles.longitude.toFixed(3);
    angles.latitude = angles.latitude.toFixed(3);
    return angles;
  }

  // Draw the navigation
  gallery.draw_navigation = function() {

    // Get the navigation
    gallery.navigation = $("#" + options.navigation + " .photo_navigation_slides");
    gallery.navigation_max_height = $("#" + options.navigation).height();
    gallery.navigation_setup = false;
    gallery.navigation.height(gallery.navigation_max_height);

    // Setup the click handler
    $("#" + options.navigation_toggle).click(function(event) {
      gallery.hide_information_points();
      gallery.toggle_navigation();
    });
  }

  // Toggle the navigation
  gallery.toggle_navigation = function() {
    if ($("#" + options.navigation).hasClass("photo_navigation_open")) {
      $("#" + options.navigation).removeClass("photo_navigation_open");
      $("#" + options.navigation_toggle + " .opener").html("&#9660;");
    } else {
      $("#" + options.navigation).addClass("photo_navigation_open");
      $("#" + options.navigation_toggle + " .opener").html("&#9650;");
      if (!gallery.navigation_setup) {
        gallery.setup_first_navigation();
      }
      gallery.ensure_floorplan_hidden();
      
      // Ensure the navigation is recalculated after rotation
      gallery.refresh_scrolling();
    }
  }

  // Toggle the navigation
  gallery.ensure_hidden_navigation = function() {
    if ($("#" + options.navigation).hasClass("photo_navigation_open")) {
      $("#" + options.navigation).removeClass("photo_navigation_open");
      $("#" + options.navigation_toggle + " .opener").html("&#9660;");
    }
  }

  // Setup the navigation for the first time
  gallery.setup_first_navigation = function() {

    // Draw the navigation
    var html = "<div class='vr_nav_button' data-direction='up'>&#9650</div>";
    html += "<div class='vr_nav_options_container'><div class='vr_nav_options'>";
    var names = gallery.pictures.get_names();
    for (var i=0; i<names.length; i++) {
      var classes = "vr_nav_element hover_link";
      html += "<div class='" + classes + "' data-index='" + i + "'>" + names[i] + "</div>";
    }
    html += "</div></div>";
    html += "<div class='vr_nav_button' data-direction='down'>&#9660</div>";
    gallery.navigation.html(html);
    $("#" + options.navigation + " .vr_nav_options_container").height(gallery.navigation_max_height);

    // Select the correct index
    var scene = gallery.walkthrough.current_scene;
    if (scene != -1) {
      $("#" + options.navigation + " .vr_nav_element[data-index=" + scene + "]").addClass("vr_selected_element");
      $("#" + options.navigation_toggle + " .text").html(names[scene]);
    }

    // If the navigation is too big for its boots, setup some scrolling
    gallery.setup_navigation_controls();
    gallery.navigation_setup = true;
  }

  // Capture when the screen orientation changes
  gallery.capture_window_events = function() {
    gallery.window_orientation = $(window).height() < $(window).width();
    $(window).on("resize", function() {
      gallery.height = $("#" + options.view).height();
      gallery.view._onResize();
      gallery.navigation_max_height = $("#" + options.navigation).height();
      
      if (gallery.navigation_setup) {
        gallery.refresh_scrolling();
      }

      // Ensure navigation does not drag if unnecessary
      if (gallery.navigation_fits()) {
        $("#" + options.navigation + " .vr_nav_options").css("marginTop", "0px");
        gallery.navigation_position = 0;
        gallery.refresh_navigation_buttons();
      }
    });
  };
  // Refresh the scrolling
  gallery.refresh_scrolling = function() {

    // Check if the controls need showing and resize things correctly
    if (!gallery.navigation_fits()) {
      gallery.sub_height = gallery.navigation_max_height - 2*$("#" + options.navigation + " .vr_nav_button[data-direction='up']").outerHeight();
      $("#" + options.navigation + " .vr_nav_button").show();
    } else {
      gallery.sub_height = gallery.navigation_max_height;
      $("#" + options.navigation + " .vr_nav_button").hide();
    }
    $("#" + options.navigation + " .vr_nav_options_container").height(gallery.sub_height);
    gallery.navigation.height(gallery.navigation_max_height);

    // Get the element heights
    var number_of_pictures = gallery.pictures.number_of_named_pictures();
    gallery.navigation_element_height = gallery.maximum_navigation_element_height(number_of_pictures);

    // Work out the navigation jumps
    var navigation_size = Math.floor(gallery.sub_height / gallery.navigation_element_height);
    gallery.max_navigation_jump = Math.floor(navigation_size / 3);
    if (gallery.max_navigation_jump < 2) {
      gallery.max_navigation_jump = 2;
    }

    // Setup the positioning
    gallery.max_navigation_position = number_of_pictures - navigation_size;
    if (gallery.max_navigation_position < 0) {
      gallery.max_navigation_position = 0;
    }

    gallery.refresh_navigation_buttons();
  }

  // If the navigation is too big, we want to be able to scroll up and down
  gallery.setup_navigation_controls = function() {

    // Add the controls
    gallery.set_navigation_position(0);
    gallery.refresh_scrolling();
    gallery.setup_navigation_touch_controls();
  
    // Setup the click event
    $("#" + options.navigation + " .vr_nav_button").click(function() {
      gallery.navigation_click($(this).data("direction"));
    });

    // Setup mouse events
    gallery.mouse_operation = false;
    $("#" + options.navigation + " .vr_nav_element").mousedown(function(event) {
      gallery.mouse_operation = true;
      gallery.mouse_start = event.clientY;
      gallery.mouse_item = $(this);
    });
    $(document).mousemove(function(event) {
      if (gallery.mouse_operation) {
        var position = gallery.get_navigation_from_top(gallery.navigation_position);
        position += gallery.mouse_start - event.clientY;
        $("#" + options.navigation + " .vr_nav_options").css("marginTop", -position);
      }
    });
    $(document).mouseup(function(event) {

      // Only if we are dragging the menu
      if (!gallery.mouse_operation) {
        return;
      }

      // Check if we were just clicking on an element
      gallery.mouse_operation = false;
      if (gallery.mouse_start == event.clientY) {
        gallery.mouse_click_element(gallery.mouse_item);
        return;
      }

      // If we were dragging, move the navigation
      var positions = (gallery.mouse_start - event.clientY) / gallery.navigation_element_height;
      if (gallery.mouse_start > event.clientY) {
        positions = Math.ceil(positions);
      } else {
        positions = Math.floor(positions);
      }
      var position = gallery.navigation_position + Math.floor(positions);
      if (position < 0) {
        position = 0;
      } else if (position > gallery.max_navigation_position) {
        position = gallery.max_navigation_position;
      }
      gallery.set_navigation_position(position);
    });
  }

  // Add scrollable nav controls for touch devices
  gallery.setup_navigation_touch_controls = function() {

    // Variables
    let touch_start_y = 0;
    let last_touch_y = 0;
    let velocity_y = 0;
    let momentum_scroll = null;
    let nav_container = document.querySelector("#" + options.navigation + " .vr_nav_options_container");
    let nav_options = document.querySelector("#" + options.navigation + " .vr_nav_options");

    if (!nav_container || !nav_options) return;

    // Remove previous event listeners to prevent duplicates
    nav_container.removeEventListener("touchstart", handle_touch_start);
    nav_container.removeEventListener("touchmove", handle_touch_move);
    nav_container.removeEventListener("touchend", handle_touch_end);

    // Attach new event listeners
    nav_container.addEventListener("touchstart", handle_touch_start, { passive: false });
    nav_container.addEventListener("touchmove", handle_touch_move, { passive: false });
    nav_container.addEventListener("touchend", handle_touch_end);

    function handle_touch_start(event) {
      if (event.touches && event.touches.length > 0) {
        touch_start_y = event.touches[0].clientY;
        last_touch_y = touch_start_y;
        velocity_y = 0;
        clearInterval(momentum_scroll);
      }
    }
  
    function handle_touch_move(event) {
      if (event.touches && event.touches.length > 0) {
        event.preventDefault();

        // If scrolling is NOT needed, exit early to prevent dragging
        if (gallery.navigation_fits()) {
          return;
        }

        let touch_move_y = event.touches[0].clientY;
        let delta_y = last_touch_y - touch_move_y;
        last_touch_y = touch_move_y;

        // Adjust scroll speed dynamically based on available space
        let scale_factor = Math.max(0.5, gallery.sub_height / 500);
        let adjusted_delta_y = delta_y * scale_factor;

        velocity_y = velocity_y * 0.8 + adjusted_delta_y * 0.2;

        let current_margin = parseFloat(nav_options.style.marginTop) || 0;
        let new_margin = current_margin - adjusted_delta_y;

        // Get min and max scroll bounds
        let max_scroll = gallery.max_navigation_position * gallery.navigation_element_height;

        // Prevent overscrolling
        if (new_margin > 0) {
          new_margin = 0;
        } else if (new_margin < -max_scroll) {
          new_margin = -max_scroll;
        }

        nav_options.style.marginTop = new_margin + "px";
      }
    }
  
    function handle_touch_end() {
      let final_position = parseFloat(nav_options.style.marginTop) || 0;
      let max_scroll = gallery.max_navigation_position * gallery.navigation_element_height;
  
      // Clamp the position within allowed bounds
      final_position = Math.max(-max_scroll, Math.min(0, final_position));
      nav_options.style.marginTop = final_position + "px";
      gallery.navigation_position = -final_position / gallery.navigation_element_height;
  
      // Apply smooth momentum scrolling
      let momentum = velocity_y * 5;
      let friction = 0.85;
  
      momentum_scroll = setInterval(() => {
        if (Math.abs(momentum) < 0.2) {
          clearInterval(momentum_scroll);
          gallery.refresh_navigation_buttons();
        } else {
          let current_margin = parseFloat(nav_options.style.marginTop) || 0;
          let new_margin = current_margin - momentum;

          // Apply friction
          momentum *= friction;

          // Clamp within allowed range
          new_margin = Math.max(-max_scroll, Math.min(0, new_margin));
          nav_options.style.marginTop = new_margin + "px";

          // Update position tracking
          gallery.navigation_position = -new_margin / gallery.navigation_element_height;

          // Refresh navigation buttons
          gallery.refresh_navigation_buttons();

          // Stop momentum if at the boundary
          if (new_margin === 0 || new_margin === -max_scroll) {
            clearInterval(momentum_scroll);
            gallery.refresh_navigation_buttons();
          }
        }
      }, 16);
    }  
  }

  // Set the position of the navigation
  gallery.set_navigation_position = function(position) {
    gallery.navigation_position = position;
    gallery.refresh_navigation_buttons();
    $("#" + options.navigation + " .vr_nav_options").animate({
      marginTop : -gallery.get_navigation_from_top(position)
    });
  }

  // Refresh the navigation buttons
  gallery.refresh_navigation_buttons = function() {
    gallery.enable_navigation_button("up", gallery.navigation_position > 0);
    gallery.enable_navigation_button("down", gallery.navigation_position < gallery.max_navigation_position);
  }

  // Get the position of this element from the top
  gallery.get_navigation_from_top = function(position) {
    var height = 0;
    for (var i=0; i<position; i++) {
      height += $("#" + options.navigation + " .vr_nav_element[data-index=" + i + "]").outerHeight();
    }
    return height;
  }

  // Find the smallest navigation height
  gallery.maximum_navigation_element_height = function(number_of_pictures) {
    var height = $("#" + options.navigation + " .vr_nav_element[data-index=1]").outerHeight();
    for (var i=2; i<=number_of_pictures; i++) {
      var contender = $("#" + options.navigation + " .vr_nav_element[data-index=" + i + "]").outerHeight();
      if (contender && contender > height) {
        height = contender;
      }
    }
    return height;
  }

  // Find the smallest navigation height
  gallery.navigation_fits = function() {
    var height = 0;
    $("#" + options.navigation + " .vr_nav_element").each(function() {
      height += $(this).outerHeight();
    });
    return height < gallery.navigation_max_height;
  }

  // Enable or disable this button
  gallery.enable_navigation_button = function(direction, enabled) {
    if (enabled) {
      $("#" + options.navigation + " .vr_nav_button[data-direction='" + direction + "']").addClass("vr_nav_button_active");
    } else {
      $("#" + options.navigation + " .vr_nav_button[data-direction='" + direction + "']").removeClass("vr_nav_button_active");
    }
  }

  // Enable or disable this button
  gallery.navigation_click = function(direction) {

    // Move the navigation
    var position = gallery.navigation_position;
    if (direction == "up" && position != 0) {
      var new_position = position - gallery.max_navigation_jump;
      if (new_position < 0) {
        new_position = 0;
      }
      gallery.set_navigation_position(new_position);
    } else if (direction == "down" && position != gallery.max_navigation_position) {
      var new_position = position + gallery.max_navigation_jump;
      if (new_position > gallery.max_navigation_position) {
        new_position = gallery.max_navigation_position;
      }
      gallery.set_navigation_position(new_position);
    }
  }

  // Setup the links for the navigation
  gallery.setup_links = function() {
    $("#" + options.navigation + " .vr_nav_element").click(function() {
      gallery.mouse_click_element($(this));
    });
  }

  // Get the link closest to our current longitude
  gallery.get_closest_visible_link = function() {

    // Get the current viewer longitude
    let viewer_longitude = gallery.view.prop.longitude;
    let hotspots = gallery.pictures.hotspots(gallery.walkthrough.current_scene);
    let best = null;
    let smallest_angle = Math.PI * 45 / 180;
    let smallest_latitude = Math.PI/2;

    // Go through the hotspots
    for (let hotspot of hotspots) {

      // Make sure this is not an information point
      if (hotspot.data.marker_type == "information_point"  || hotspot.data.marker_type == "tripod_logo") {
        continue;
      }

      // Check if the angles are better than the last ones
      let angle = viewer_longitude - hotspot.longitude;
      angle = Math.abs(gallery.view.hud.angleToQuadrant(angle));
      if (angle < smallest_angle && hotspot.latitude < smallest_latitude) {
        best = hotspot;
        smallest_angle = angle;
        smallest_latitude = hotspot.latitude;
      }
    }

    return best;
  }

  // Click on an element and move to the photo
  gallery.mouse_click_element = function(element) {

    // Do nothing if the gallery is locked
    if (gallery.locked) {
      return;
    }

    // If we are in lead capture mode, break out here
    if (typeof options.lead_capture !== "undefined") {

      // Stop autororating
      if (gallery.view.isAutorotateEnabled()) {
        gallery.view.stopAutorotate();
      }

      // Hide the navigation
      gallery.ensure_hidden_navigation();

      // Show lead capture
      options.lead_capture();
      return;
    }

    // Load the correct scene
    var index = element.data("index");
    gallery.load_scene(gallery.pictures.named_pictures[index]);
  }

  // Load this scene
  gallery.load_scene = function(index) {
    gallery.hide_information_points();
    let angles = gallery.internal_load_scene(index, null);
    if (gallery._linker && angles) {
      gallery._linker.load_scene(gallery, index, JSON.parse(JSON.stringify(angles)));
    }
  }

  // Load the photo id
  gallery.load_photo_id = function(photo_id) {
    gallery.load_scene(gallery.pictures.picture_index(photo_id));
  }

  // Load the scene and return the angle
  gallery.internal_load_scene = function(index, angles) {

    // Make sure there is a change
    if (gallery.walkthrough.is_current_scene(index) || gallery.locked) {
      return null;
    }
    var old_index = gallery.walkthrough.current_scene;
    gallery.walkthrough.move_scene(index);

    // Tell the experience we have changed scene
    var selected_index = gallery.experience.scene_change(index);

    // Draw the new view
    gallery.view.clearMarkers();
    gallery.waiting_hotspots = gallery.pictures.hotspots(index);
    var target = angles ? angles : gallery.pictures.get_loading_view(old_index, index);
    gallery.last_longitude = target.longitude;
    gallery.locked = true;
    let pan = 0;
    let tilt = 0;
    let roll = 0;
    if (index !== -1) {
      if (typeof options.pictures[index].pan !== "undefined") {
        pan = parseFloat(options.pictures[index].pan);
      }
      if (typeof options.pictures[index].tilt !== "undefined") {
        tilt = parseFloat(options.pictures[index].tilt);
      }
      if (typeof options.pictures[index].roll !== "undefined") {
        roll = parseFloat(options.pictures[index].roll);
      }
    }
    gallery.view.setSphereCorrection(pan, tilt, roll);
    gallery.view.setPanorama(gallery.pictures.photo_path(index), target, true);

    // Remove the selected element
    $("#" + options.navigation + " .vr_nav_element").each(function() {
      if ($(this).hasClass("vr_selected_element")) {
        $(this).removeClass("vr_selected_element");
      }
    });

    // Hide the navigation and show the opener again
    gallery.ensure_hidden_navigation();

    // Final tweaks
    if (selected_index != -1) {

      // Select the correct element in the navigation
      $("#" + options.navigation + " .vr_nav_element[data-index=" + selected_index + "]").addClass("vr_selected_element");
      var names = gallery.pictures.get_names();
      $("#" + options.navigation_toggle + " .text").html(names[selected_index]);
      if (typeof options.navigation_error !== "undefined") {
        $("#" + options.navigation_error).addClass("hidden_force");
      }

      // Play the audio
      gallery.audio.play(gallery.pictures.get_id_from_index(index));
      
    } else {
      if (typeof options.navigation_error !== "undefined") {
        $("#" + options.navigation_error).removeClass("hidden_force");
      }
    }

    // Return the angle
    return target;
  }

  // Load the hotspots after the scene has loaded
  gallery.load_waiting_hotspots = function() {
    if (gallery.waiting_hotspots) {
      for (var i=0; i<gallery.waiting_hotspots.length; i++) {
        gallery.view.addMarker(gallery.waiting_hotspots[i]);
      }
      gallery.waiting_hotspots = null;
    }
  }

  // Hide the floorplan
  gallery.ensure_floorplan_hidden = function() {
    $(".tour_floorplan").addClass("hidden");
  }

  // Rotate the floorplan pin
  gallery.floorplan_rotation = function(rotation) {
    let photo_id = gallery.pictures.get_id_from_index(gallery.walkthrough.current_scene)
    if (options.floorplans) {
      options.floorplan_angle_change(photo_id, rotation.longitude);
    }
  }

  // Draw an information point
  gallery.draw_information_point = function(marker, location) {

    // Get the position of the information
    let top = marker.position2D.y - 3;
    let left = marker.position2D.x + 30;

    // Check whether to optimise the position
    let optimise = marker.data.type == "image" || marker.data.type == "video";

    // Toggle if the point is active
    let existing_point = $("[data-information='" + marker.data.id + "']");
    if (existing_point.length != 0) {
      let shown = !existing_point.hasClass("hidden");
      gallery.hide_information_points();
      if (!shown) {
        existing_point.toggleClass("hidden");
        gallery.set_information_point_location(existing_point, left, top, optimise);
      }
      return;
    }
    gallery.hide_information_points();

    // Check if this is text
    if (marker.data.type == "text") {
      let html = "<div class='information_overlay information_text'";
      html += " data-information='" + marker.data.id + "'>";
      html += marker.data.html_text + "</div>";
      let information = $(html);
      information.css("borderColor", "rgb(" + options.information_colour + ")");
      $("#" + options.view).append(information);
      gallery.set_information_point_location(information, left, top, optimise);
    }

    // Check if this is an image
    if (marker.data.type == "image") {

      // Create the html element
      let html = "<img class='information_overlay information_image'";
      html += " data-information='" + marker.data.id + "'";
      html += " src='" + marker.data.url + "'>";
      let information = $(html);

      // Make sure the image is loaded before progressing
      information.on('load', function() {
        information.css("borderColor", "rgb(" + options.information_colour + ")");
        $("#" + options.view).append(information);
        gallery.set_information_point_location(information, left, top, optimise);
      }).on('error', function(error) {
        console.error("Error loading image info point: ", error);
      })
    }

    // Check if it's PDF
    if (marker.data.type == "pdf") {
      
      // Get a name
      var names = gallery.pictures.get_names();
      let name = names[gallery.pictures.start_index];

      // Create the HTML element for viewing in a new tab
      let html = "<div class='information_overlay information_text'";
      html += " data-information='" + marker.data.id + "'>";
      html += "<a href='" + marker.data.url + "' target='_blank' download='" + name + ".pdf' class='pdf_view_link'>" + marker.data.label + "</a>";
      html += "</div>";
      let information = $(html);
    
      // Append the PDF element to the view
      $("#" + options.view).append(information);
      information.css("borderColor", "rgb(" + options.information_colour + ")");
      gallery.set_information_point_location(information, left, top, optimise);
    }

    // Check if this is a video
    if (marker.data.type == "video") {
      let html = "<iframe class='information_overlay information_video'";
      html += " data-information='" + marker.data.id + "'";
      html += " src='" + marker.data.url + "'>";
      let information = $(html);
      information.css("borderColor", "rgb(" + options.information_colour + ")");
      $("#" + options.view).append(information);
      gallery.set_information_point_location(information, left, top, optimise);
    }

    // Check if this is a link
    if (marker.data.type == "link") {
      let html = "<div class='information_overlay information_text'";
      html += " data-information='" + marker.data.id + "'>";
      html += "<a target='__blank' href='" + marker.data.url + "'>" + marker.data.title + "</a></div>";
      let information = $(html);
      information.css("borderColor", "rgb(" + options.information_colour + ")");
      $("#" + options.view).append(information);
      gallery.set_information_point_location(information, left, top, optimise);
    }
  }

  // Set the points location
  // Adjust it to try and keep it on screen
  gallery.set_information_point_location = function(point, left, top, optimise_size) {

    // Get the image dimensions
    let available_width = $("#" + options.view).width();
    let available_height = $("#" + options.view).height();
    let width = point.width();
    let height = Math.max(point.height(), 0);

    // If there isn't enough space, move it into view
    // Then decide if there is more room above or below the point
    if (!optimise_size) {
      if (width + left > available_width) {
        left = available_width - width - 20;
        if (top < available_height / 2) {
          top += 30;
        } else {
          top -= (20 + height);
        }
      }

      // Put the point in the right place
      point.css("left", left + "px");
      point.css("top", top + "px");
    }
    
    // If we are optimising the size, maximise the image and center it
    if (optimise_size) {
      if (!gallery.center_and_scale_overlay_image(point)) {
        point.on("load", function() {
          gallery.center_and_scale_overlay_image(point);
        });
      }
    }

  }

  // Center the image
  gallery.center_and_scale_overlay_image = function(point) {

    // Get the dimensions
    let available_width = $("#" + options.view).width();
    let available_height = $("#" + options.view).height();
    let width = point.width();
    let height = point.height();
    if (height == 0) {
      return false;
    }

    // Get the available space
    let max_size = Math.min(available_width, available_height);
    max_size = Math.round(max_size * 0.75);

    // Calculate the new width and height
    let scale_factor = max_size / Math.max(width, height);
    width *= scale_factor;
    height *= scale_factor;
    point.css("width", width + "px");
    point.css("height", height + "px");

    // Center the image
    let left = (available_width - width) / 2;
    let top = (available_height - height) / 2;
    point.css("left", left + "px");
    point.css("top", top + "px");
    return true;
  }


  // Hide all the information points
  gallery.hide_information_points = function() {
    $(".information_overlay").addClass("hidden");
  }

  // Setup the gallery and return
  gallery.setup();
  return gallery;
}

// Create an object to manage the pictures
function make_pictures_object(options, gallery) {

  // Create the objects
  var pictures = new Object();
  if (typeof(options.start_index) == "undefined") {
    pictures.start_index = 0;
  } else {
    pictures.start_index = options.start_index;
  }

  // Return the path to the initial photo
  pictures.initial_photo_path = function() {
    if (gallery.walkthrough.first_scene() == -1) {
      return options.black_screen;
    }
    return pictures.photo_path(gallery.walkthrough.first_scene());
  }

  // Return the initial photo
  pictures.initial_photo = function() {
    if (gallery.walkthrough.first_scene() == -1) {
      return {longitude: 0, latitude: 0};
    }
    return options.pictures[gallery.walkthrough.first_scene()];
  }

  // Get the hotspots for the first photos
  pictures.initial_hotspots = function() {
    if (gallery.walkthrough.first_scene() == -1) {
      return [];
    }
    return pictures.hotspots(gallery.walkthrough.first_scene());
  }

  // Get all the hotspots for this image
  pictures.hotspots = function(index) {

    // Make sure we are allowed hotspots
    if (typeof(options.hotspots) != "undefined" && !options.hotspots) {
      return [];
    }

    // If we are showing a blank screne, don't do any hotspots
    if (index == -1) {
      return [];
    }

    // Prepare all the hotspots
    var array = [];
    if (options.pictures[index].links) {
      var hotspots = options.pictures[index].links;
      for (var i=0; i<hotspots.length; i++) {

        // Get the index of the image we are moving to
        var link_index = pictures.picture_index(hotspots[i].to);
        if (link_index == -1) {
          continue;
        }

        // Check we are allowed to show this hotspot
        var data = gallery.experience.hotspot_data(index, link_index);
        if (!data.allowed) {
          continue;
        }

        // Get the tooltip
        var tooltip = "";
        if (typeof(data.tooltip) !== "undefined") {
          tooltip = data.tooltip;
        } else {
          tooltip = pictures.get_tooltip(link_index);
        }

        
        // Add the hotspot
        let size = 20;
        let stroke_width = '2px';
        
        // If this hotspot is a floor link
        if (hotspots[i].floor_link) {
          stroke_width = '10px';
          size = 35;
        }

        // If floor links are on but this link is not on the floor
        if (hotspots[i].using_floor_links && !hotspots[i].floor_link) {
          stroke_width = '6px';
        }

        array.push({
          id: "#" + Math.random(),
          tooltip: tooltip,
          longitude: hotspots[i].longitude,
          latitude: hotspots[i].latitude,
          floor_link: hotspots[i].floor_link,
          using_floor_links: hotspots[i].using_floor_links,
          circle: size,
          svgStyle: {
            fill: data.fill,
            stroke: data.stroke,
            'stroke-width': stroke_width
          },
          anchor: "center center",
          data: {
            marker_type: "hotspot",
            to: hotspots[i].to,
            opening_latitude: hotspots[i].opening_latitude,
            opening_longitude: hotspots[i].opening_longitude,
          }
        });
      }
    }

    // Add a marker for the tripod logo
    if (typeof options.tripod_logo !== "undefined") {
      let latitude_size = 0.3;
      if (options.tripod_logo_size == 2) {
        latitude_size = 0.5;
      } else if (options.tripod_logo_size == 3) {
        latitude_size = 0.75;
      }
      array.push({
        id: options.view + "tripod_logo",
        longitude: 0,
        latitude: -0.5*Math.PI,
        image: options.tripod_logo,
        place_bottom: true,
        latitude_size: latitude_size,
        data: {
          marker_type: "tripod_logo"
        }
      });
    }

    // Draw the information points
    if (typeof(options.no_points) === "undefined" || !options.no_points) {
      if (options.information_links) {
        for (var i=0; i<options.information_links.length; i++) {
          if (options.information_links[i].photo == options.pictures[index].id) {
            let point = options.information_links[i];
            point.marker_type = "information_point";
            array.push({
              id: "#" + Math.random(),
              longitude: point.longitude,
              latitude: point.latitude,
              circle: 10,
              svgStyle: {
                fill: "rgba(" + options.information_colour + ")",
                stroke: "rgb(255,255,255)",
                'stroke-width': '3px'
              },
              anchor: "center center",
              data: point
            });
          }
        }
      }
    }
    return array;
  }

  // Get the tooltip for this picture
  pictures.get_tooltip = function(index) {
    var picture = options.pictures[index];
    if (typeof(picture.title) !== "undefined") {
      return picture.title;
    } else {
      return "";
    }
  }

  // Work out a picture index from the name of the link
  pictures.picture_index = function(id) {
    for (var i=0; i<options.pictures.length; i++) {
      if (options.pictures[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  // Work out a picture from the id
  pictures.picture = function(id) {
    for (var i=0; i<options.pictures.length; i++) {
      if (options.pictures[i].id == id) {
        return options.pictures[i];
      }
    }
    return null;
  }

  // Get the id of the photo from this index
  pictures.get_id_from_index = function(index) {
    return options.pictures[index].id;
  }

  // Return the path to this photo
  pictures.photo_path = function(index) {
    if (index == -1) {
      return options.black_screen;
    }
    return options.pictures[index].url;
  }

  // The initial load direction for this image
  pictures.photo_direction = function(index) {
    if (index == -1) {
      return {longitude: 0, latitude: 0};
    }
    return {
      longitude: options.pictures[index].longitude,
      latitude: options.pictures[index].latitude
    };
  }

  // Get the angle the view should load at
  pictures.get_loading_view = function(old_index, new_index) {

    // Return if this is going to a black screen
    if (new_index == -1) {
      return {longitude: 0, latitude: 0};
    }

    // If there is a link from the old view to the new view
    var new_view = options.pictures[new_index];
    if (old_index != null && old_index != -1) {
      var old_view = options.pictures[old_index];
      for (var i=0; i<old_view.links.length; i++) {
        if (old_view.links[i].to == new_view.id) {
          return {
            longitude: old_view.links[i].opening_longitude,
            latitude: old_view.links[i].opening_latitude
          }
        }
      }
    }

    // Load from the default view
    return {
      longitude: new_view.longitude,
      latitude: new_view.latitude
    };
  }

  // Return all the named pictures
  pictures.get_named_pictures = function() {
    var named_pictures = [];
    for (var i=0; i<options.pictures.length; i++) {
      if (typeof(options.pictures[i].title) !== "undefined") {
        named_pictures.push(i);
      }
    }
    return named_pictures;
  }
  pictures.named_pictures = pictures.get_named_pictures();

  // Return all the names of the pictures that have names
  pictures.get_names = function() {
    var names = [];
    for (var i=0; i<pictures.named_pictures.length; i++) {
      var index = pictures.named_pictures[i];
      names.push(options.pictures[index].title);
    }
    return names;
  }

  // The number of named pictures
  pictures.number_of_named_pictures = function() {
    return pictures.named_pictures.length;
  }

  // The index of this scene in the named list
  pictures.named_scene_index = function(index) {
    for (var i=0; i<pictures.named_pictures.length; i++) {
      if (index == pictures.named_pictures[i]) {
        return i;
      }
    }
    return -1;
  }

  // Find all the scenes that have a hotspot into this scene
  pictures.scenes_pointing_to = function(index) {
    var scenes = [];
    for (var i=0; i<options.pictures.length; i++) {
      if (options.pictures[i].hotspots) {
        var hotspots = options.pictures[i].hotspots;
        for (var j=0; j<hotspots.length; j++) {
          var link_index = pictures.picture_index(hotspots[j].to);
          if (link_index == index) {
            scenes.push(i);
            break;
          }
        }
      }
    }
    return scenes;
  }

  // Return the object
  return pictures;
}

// Create an audio object to play sounds
function make_audio_object(options, gallery) {

  // Create an audio object
  var audio = new Object();
  
  // Play a clip
  audio._current_audio = false;
  audio._brand_playing = false;
  
  audio.play = function(picture_id) {
    audio._current_audio = false;
    if (typeof options.audio !== "undefined" && typeof options.audio.links["id_" + picture_id] !== "undefined") {

      // Load the audio url as long as it is different to the brand audio or we are not already playing the brand audio
      if (audio._brand_playing != true || options.audio.links["id_" + picture_id].url != options.brand_audio) {
        $("#player").attr("src", options.audio.links["id_" + picture_id].url);
        audio._current_audio = true;
        
        if (audio._on && audio._start) {
          $("#player")[0].play();
          
          // Keep track of whether we are listening to the brand audio or not
          if (options.audio.links["id_" + picture_id].url == options.brand_audio) {
            audio._brand_playing = true;
          } else {
            audio._brand_playing = false;
          }
        }
      }
    }
  }

  // We can only start audio once someone has interacted with the tour
  // This extra function is fired to let us know we can start playing audio
  audio._start = false;
  audio.start = function() {
    if (!audio._start) {
      audio._start = true;
      if (audio._on && audio._current_audio) {

        // Keep track of whether we are listening to the brand audio or not
        if ($("#player").attr("src") == options.brand_audio) {
          audio._brand_playing = true;
        } else {
          audio._brand_playing = false;
        }

        // Different platforms allow starting with different events, so catch
        // the errors if we try when we aren't allowed
        let promise = $("#player")[0].play();
        promise.catch(error => {
          audio._start = false;
        });
      }
    }
  }

  // Only start once an interaction has been triggered
  audio._on = true;
  audio.on = function() {
    audio._on = true;
    if (audio._start && audio._current_audio) {
      $("#player")[0].play();

      // Keep track of whether we are listening to the brand audio or not
      if ($("#player").attr("src") == options.brand_audio) {
        audio._brand_playing = true;
      } else {
        audio._brand_playing = false;
      }
    }
  }

  // Stop playing audio
  audio.off = function() {
    $("#player")[0].pause();
    audio._on = false;
  }

  // Return the number of tracks
  audio.tracks = function() {
    if (typeof options.audio !== "undefined") {
      return Object.keys(options.audio.links).length;
    } else {
      return 0;
    }
  }

  // Setup an audio object
  $("#" + options.view).append("<audio id='player' hidden></audio>");

  // Check for events which allow us to start
  // iPhone has to be touchstart
  // Other mobile platforms have to be touchend
  $(document).mouseup(function() {
    audio.start();
  });
  $(document).on("touchstart", function() {
    audio.start();
  });
  $(document).on("touchend", function() {
    audio.start();
  });

  // Return the object
  return audio;
}

// Keep track of where we are in the walkthrough
function make_walkthrough_object(options) {

  // Create the object
  var walkthrough = new Object();
  walkthrough.scene_history = [];

  // Get the starting scene
  if (typeof(options.start_index) == "undefined") {
    walkthrough.current_scene = 0;
  } else {
    walkthrough.current_scene = options.start_index;
  }
  walkthrough.scene_history.push(walkthrough.current_scene);
  
  // Move to another scene
  walkthrough.move_scene = function(index) {
    walkthrough.current_scene = index;
    walkthrough.scene_history.push(index);
  }
  
  walkthrough.get_percentage = function() {
    let unique_scenes = [...new Set(walkthrough.scene_history)];
    let percentage = (unique_scenes.length / options.pictures.length) * 100;
    return Math.round(percentage);
  }

  // Check if this is the current scene
  walkthrough.is_current_scene = function(index) {
    return walkthrough.current_scene == index;
  }

  // Get the index of the first scene
  walkthrough.first_scene = function() {
    return walkthrough.scene_history[0];
  }

  // Return the object
  return walkthrough;
}

// Create a experience object to handle how things are seen
function make_experience_object(options, gallery) {
  if (typeof(options.mode) !== "undefined") {
    if (options.mode == "directions") {
      return make_directions_experience(options, gallery);
    } else if (options.mode == "multi_tour") {
      return make_multi_tour_experience(options, gallery);
    }
  }
  return make_normal_experience(options, gallery);
}

// Make a normal experience object
function make_normal_experience(options, gallery) {

  // Create the object
  var experience = new Object();

  // Get the selected index that we should start from
  experience.initial_selected_index = function() {
    var scene = gallery.walkthrough.first_scene();
    return gallery.pictures.named_scene_index(scene);
  }

  // Get all the data for this hotspot from the current scene to hotspot scene
  experience.hotspot_data = function(index, hotspot_index) {
    var data = new Object();
    data.allowed = true;
    data.fill = "rgba(" + options.navigation_colour + ",0.3)";
    data.stroke = "rgb(" + options.navigation_colour + ")";
    return data;
  }

  // Do nothing when the scene changes
  experience.scene_change = function(index) {
    return gallery.pictures.named_scene_index(index);
  }

  // Return the object
  return experience;
}

// Make a directions experience object
function make_directions_experience(options, gallery) {

  // Create the object
  var experience = new Object();
  experience.current_end_point = 0;

  // Get the selected index that we should start from
  experience.initial_selected_index = function() {
    return experience.current_end_point;
  }

  // When the scene changes, keep the current directions active
  experience.scene_change = function(index) {
    var end_index = experience.end_point_index(index);
    if (end_index != -1) {
      experience.current_end_point = end_index;
    }
    return experience.current_end_point;
  }

  // Get all the data for this hotspot from the current scene to hotspot scene
  experience.hotspot_data = function(index, hotspot_index) {

    // Find the hotspot index in our path
    var path = experience.paths[experience.current_end_point];
    for (var i=0; i<path.length; i++) {
      if (path[i] == hotspot_index) {
        var data = new Object();
        data.allowed = true;
        if (hotspot_index == path[path.length - 1]) {
          data.fill = "rgba(0,255,0,0.3)";
          data.stroke = "green";
          data.tooltip = "Destination";
        } else if (i+1 < path.length && path[i+1] == index) {
          data.fill = "rgba(255,0,0,0.3)";
          data.stroke = "red";
          data.tooltip = "Back";
        } else {
          data.fill = "rgba(0,162,232,0.3)";
          data.stroke = "rgb(0,162,232)";
        }
        return data;
      }
    }

    // It wasn't in our list, so remove this hotspot
    var data = new Object();
    data.allowed = false;
    return data;
  }

  // Create the paths to give directions
  experience.create_paths = function() {

    // Make sure we have the start and end points
    experience.identify_end_points();

    // Initialise end scene direction
    experience.calculate_scene_directions();

    // Generate the final paths
    experience.generate_final_paths();
  }

  // Go over the directions information and create a file path from start to finish
  experience.generate_final_paths = function() {
    experience.paths = [];
    for (var i=0; i<experience.starts.length; i++) {
      var start = experience.starts[i];
      var path = [];
      path.push(start);
      while (experience.scene_direction[path[path.length-1]].steps != 0) {
        path.push(experience.scene_direction[path[path.length-1]].next);
      }
      experience.paths.push(path);
    }
  }

  // Calculate all the directions
  experience.calculate_scene_directions = function() {
    experience.scene_direction = [];
    for (var i=0; i<options.pictures.length; i++) {
      experience.scene_direction.push(null);
    }
    experience.scene_direction[experience.end] = {
      next: null,
      steps: 0
    };
    var index = 0;
    while (1) {
      if (experience.update_scene_directions(index) == 0) {
        break;
      }
      index++;
    }
  }

  // Update all the directions pointing to places with this step length
  // Return the number of scenes updated
  experience.update_scene_directions = function(step_length) {
    var updated = 0;
    var scenes = experience.scenes_with_step_length(step_length);
    for (var i=0; i<scenes.length; i++) {
      var pointing_to = gallery.pictures.scenes_pointing_to(scenes[i]);
      for (var j=0; j<pointing_to.length; j++) {
        var index = pointing_to[j];
        if (experience.scene_direction[index] == null ||
            experience.scene_direction[index].steps > step_length + 1) {
          experience.scene_direction[index] = {
            next: scenes[i],
            steps: step_length + 1
          };
          updated++;
        }
      }
    }
    return updated;
  }

  // Get all the scenes with this step length
  experience.scenes_with_step_length = function(step_length) {
    var scenes = [];
    for (var i=0; i<options.pictures.length; i++) {
      if (experience.scene_direction[i] != null && experience.scene_direction[i].steps == step_length) {
        scenes.push(i);
      }
    }
    return scenes;
  }

  // Make sure we have the start and end points
  experience.identify_end_points = function() {
    experience.starts = [];
    for (var i=0; i<options.pictures.length; i++) {
      var picture = options.pictures[i];
      if (typeof(picture.type) !== "undefined") {
        if (picture.type == "end") {
          experience.end = i;
        } else if (picture.type == "start") {
          experience.starts.push(i);
        }
      }
    }
  }

  // If this is an end point, return its index, otherwise return -1
  experience.end_point_index = function(index) {
    for (var i=0; i<experience.starts.length; i++) {
      if (experience.starts[i] == index) {
        return i;
      }
    }
    return -1;
  }

  // Return the object
  experience.create_paths();
  return experience;
}

// Make an experience for multiple tours in one where the paths don't cross
function make_multi_tour_experience(options, gallery) {

  // Create the object
  var experience = new Object();
  experience.current_tour = 0;

  // Get the selected index that we should start from
  experience.initial_selected_index = function() {
    return gallery.pictures.named_scene_index(experience.current_tour);
  }

  // Get all the data for this hotspot from the current scene to hotspot scene
  experience.hotspot_data = function(index, hotspot_index) {
    var data = new Object();
    data.allowed = true;
    if (hotspot_index < index) {
      data.fill = "rgba(255,0,0,0.3)";
      data.stroke = "rgb(255,0,0)";
    } else {
      data.fill = "rgba(0,162,232,0.3)";
      data.stroke = "rgb(0,162,232)";
    }
    return data;
  }

  // Do nothing when the scene changes
  experience.scene_change = function(index) {
    var start_index = experience.start_point_index(index);
    if (start_index != -1) {
      experience.current_tour = start_index;
    }
    return experience.current_tour;
  }

  // If this is the start of a tour, return the index, otherwise return -1
  experience.start_point_index = function(index) {
    for (var i=0; i<experience.starts.length; i++) {
      if (experience.starts[i] == index) {
        return i;
      }
    }
    return -1;
  }

  // This assumes the images are ordered in tour order
  // Return the tour this image is from
  experience.tour_index = function(index) {
    for (var i=index; i>=0; i--) {
      var picture = options.pictures[i];
      if (typeof(picture.type) !== "undefined") {
        if (picture.type == "start") {
          return i;
        }
      }
    }
  }

  // Make sure we have the start points
  experience.identify_start_points = function() {
    experience.starts = [];
    for (var i=0; i<options.pictures.length; i++) {
      var picture = options.pictures[i];
      if (typeof(picture.type) !== "undefined") {
        if (picture.type == "start") {
          experience.starts.push(i);
        }
      }
    }
  }

  // Get the tour this first photo is from
  experience.get_initial_tour = function() {
    var scene = gallery.walkthrough.first_scene();
    scene = experience.tour_index(scene);
    if (scene != -1) {
      experience.current_tour = scene;
    }
  }

  // Setup the experience object
  experience.setup = function() {
    experience.get_initial_tour();
    experience.identify_start_points();
  }

  // Return the object
  experience.setup();
  return experience;
}

// Make an embedded events object
function make_embed_events(options, gallery) {

  // Make an object for embedded events
  let events = {};

  // Fire loaded
  events.loaded = function() {

    // Stripe the picture data back
    let photos = [];
    for (let i=0; i<options.pictures.length; i++) {
      let photo = {
        id: options.pictures[i].id,
        title: options.pictures[i].title
      }
      photos.push(photo);
    }

    // Send the data back
    var data = {
      type: "virtualTour.loaded",
      photos: photos,
      location: window.location.href
    }
    try {
      parent.postMessage(JSON.stringify(data), "*");
    } catch(e) {
      console.log("Error posting tour loaded");
    }
  }

  // Fire photo loaded
  events.scene_loaded = function(photo_id) {

    // Return the data
    var picture = gallery.pictures.picture(photo_id);
    var data = {
      type: "virtualTour.scene.loaded",
      photo: photo_id,
      title: picture.title,
      percentage: gallery.walkthrough.get_percentage(),
      location: window.location.href
    };
    try {
      parent.postMessage(JSON.stringify(data), "*");
    } catch(e) {
      console.log("Error posting scene loaded");
    }
  }

  // Tell it we have interacted
  events.interaction_logged = false;
  events.interacted = function() {

    // Only fire this once
    if (events.interaction_logged) {
      return;
    }
    events.interaction_logged = true;

    // Fire the interaction
    var data = {
      type: "virtualTour.interacted",
      location: window.location.href
    };
    try {
      parent.postMessage(JSON.stringify(data), "*");
    } catch(e) {
      console.log("Error posting tour interacted");
    }
  }

  // Return the object
  return events;
}

// Make an interaction object
function make_interaction() {

  // Create an interaction object
  let interaction = {};

  // Variables and callbacks for the user interacting with the viewer
  interaction._interaction = false;
  interaction._callback = null;
  interaction._time_callback = null;
  interaction._last_session = null;
  interaction._percentage_callback = null;
  interaction.set_callback = function(callback) {
    interaction._callback = callback;
  }
  interaction.set_time_callback = function(callback) {
    interaction._time_callback = callback;
  }
  interaction.set_percentage_callback = function(callback) {
    interaction._percentage_callback = callback;
  }

  // Fired when the user interacts with the screen
  interaction.check = function() {

    // Check if we have interacted with the screen
    if (!interaction._interaction) {
      if (interaction._callback) {
        interaction._callback();
      }
      interaction._interaction = true;
    }

    // Check when the latest interaction was and if it was over 10 seconds
    // ago, feedback to the calling code
    if (interaction._time_callback) {
      let current_time = (new Date()).getTime();
      if (!interaction._last_session || interaction._last_session.reported) {
        interaction._last_session = {
          time: current_time,
          start_time: current_time,
          reported: false
        };
        interaction.check_time(current_time);
      } else {
        interaction._last_session.time = current_time;
        interaction.check_time(current_time);
      }
    }
  }

  // Wait 10 seconds to see if they have stopped interacting, and fire the
  // callback if they have
  interaction.check_time = function(current_time) {
    setTimeout(function() {
      if (interaction._last_session.time == current_time) {
        interaction.finish();
      }
    }, 10000);
  }

  // Report an interaction back to the callback if there is one
  // Called by the calling page when the user escapes the window or moves scene
  interaction.finish = function() {
    if (interaction._last_session && !interaction._last_session.reported) {
      interaction._time_callback(interaction._last_session.time - interaction._last_session.start_time);
      interaction._last_session.reported = true;
    }
  }

  // Move_scene reports back the percentage of the tour viewed
  interaction.move_scene = function() {
    if (interaction._percentage_callback) {
      interaction._percentage_callback(interaction.gallery.walkthrough.get_percentage());
    }
    if (interaction._interaction) {
      interaction.finish()
    }
  }

  // Return the interaction
  return interaction;
}

// Make an interaction object
function make_linker(options_1, options_2, links) {

  // Join everything together
  let linker = {};

  // Rotate the other gallery
  linker.rotate = function(gallery, rotation) {
    let new_angle = {};
    new_angle.longitude = rotation.longitude;
    new_angle.latitude = rotation.latitude;
    let information = linker.get_information(gallery);
    let photo_index = gallery.pictures.get_id_from_index(gallery.walkthrough.current_scene);
    for (let i=0; i<links.links.length; i++) {
      if (photo_index == links.links[i][information.gallery.id]) {
        new_angle.longitude += links.links[i][information.other_gallery.angle] - links.links[i][information.gallery.angle];
      }
    }
    information.other_gallery.gallery.view.rotate(new_angle);
  }

  // Find the angle we should be at
  linker.second_starting_angle = function() {
    let photo_index = linker.gallery_1.pictures.get_id_from_index(linker.gallery_1.walkthrough.current_scene);
    let angles = linker.gallery_1.starting_angle;
    for (let i=0; i<links.links.length; i++) {
      if (photo_index == links.links[i]["photo_1"]) {
        angles.longitude = parseFloat(angles.longitude) + parseFloat(links.links[i]["angle_2"]) - parseFloat(links.links[i]["angle_1"]);
      }
    }
    return angles;
  }

  // Zoom the other gallery
  linker.zoom = function(gallery, zoom) {
    let information = linker.get_information(gallery);
    information.other_gallery.gallery.view.zoom(zoom);
  }

  // Load a scene
  linker.load_scene = function(gallery, index, angles) {

    // Try and move to the next scene
    let new_angle = {};
    new_angle.longitude = angles.longitude;
    new_angle.latitude = angles.latitude;
    let information = linker.get_information(gallery);
    let photo_index = gallery.pictures.get_id_from_index(index);
    for (let i=0; i<links.links.length; i++) {
      if (photo_index == links.links[i][information.gallery.id]) {
        let other_id = links.links[i][information.other_gallery.id];
        let other_index = information.other_gallery.gallery.pictures.picture_index(other_id);
        new_angle.longitude += links.links[i][information.other_gallery.angle] - links.links[i][information.gallery.angle];
        information.other_gallery.gallery.internal_load_scene(other_index, new_angle);
        return;
      }
    }

    // If there is no next scene for the linked gallery, show a black screen
    information.other_gallery.gallery.internal_load_scene(-1, new_angle);
  }

  // Check if the other gallery is locked
  linker.locked = function(gallery) {
    let information = linker.get_information(gallery);
    return information.other_gallery.gallery.locked;
  }

  // Organise the information for the gallery we are focussed on
  linker.get_information = function(gallery) {
    let results = {};
    results.gallery = {};
    results.other_gallery = {};
    if (gallery == gallery_1) {
      results.gallery.gallery = linker.gallery_1;
      results.gallery.id = "photo_1";
      results.gallery.angle = "angle_1";
      results.other_gallery.gallery = gallery_2;
      results.other_gallery.id = "photo_2";
      results.other_gallery.angle = "angle_2";
    } else {
      results.gallery.gallery = linker.gallery_2;
      results.gallery.id = "photo_2";
      results.gallery.angle = "angle_2";
      results.other_gallery.gallery = gallery_1;
      results.other_gallery.id = "photo_1";
      results.other_gallery.angle = "angle_1";
    }
    return results;
  }

  // Initalise the linker
  linker.gallery_1 = make_photo_gallery(options_1);
  options_2.override_starting_angle = linker.second_starting_angle();
  linker.gallery_2 = make_photo_gallery(options_2);
  linker.gallery_1.set_linker(linker);
  linker.gallery_2.set_linker(linker);
  return linker;
}
