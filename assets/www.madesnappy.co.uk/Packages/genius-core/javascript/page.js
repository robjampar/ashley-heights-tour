//==============================================================================
//
// This contains basic functions to utilise dom objects and other things
// relating to the page
//
//==============================================================================

// Make sure the page is setup correctly
function initialise_page() {

  // Initialise the property links
  initialise_property_links();
}

// Initialise all the links to the properties page
function initialise_property_links() {
  $("*[data-property-link]").click(function() {
    redirect_preserving_history("property?property=" + $(this).data("property-link"));
  });
}


//==============================================================================
//
// Page URLs
//
//==============================================================================

// Redirect the page, but keep the current page in the browser history
function redirect_preserving_history(url) {
  window.location.href = url;
}

// Redirect the page, but don't keep this page in the history
function replace_url_page(url) {
  history.replaceState(null, null, url);
}

// Refresh the page
function refresh_page() {
  location.reload(true);
}


//==============================================================================
//
// Query Variables
//
//==============================================================================

// Get the value of a query variable
function get_query_variable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return decodeURIComponent(pair[1]);
      }
  }
  return false;
}

// Convert the query to a json object
function get_query_json() {
  var query = window.location.search.substring(1);
  var result = {};
  var vars = query.split("&");
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
    result[pair[0]] = pair[1];
  }
  return result;
}


//==============================================================================
//
// Page operations
//
//==============================================================================

// Scroll to this element
// Make sure if we are on a fixed overlay, it scrolls the overlay, not the
// document behind
function scroll_to(element, speed) {

  // Make sure there is an element
  if (element.length == 0) {
    return;
  }

  // Get the speed
  speed = typeof speed == "undefined" ? 500 : speed;

  // Scroll to the element
  let scroll_element = lowest_fixed_parent(element);
  $(scroll_element).animate({
    scrollTop: element.offset().top
  }, speed);
}

// The back end doesn't seem to scroll in the same way as the front
// I've not got to the bottom of why.
// I've added this function so we can handle scrolling on the back end
// This won't work in an overlay
function back_end_scroll_to(element, speed) {

  // Make sure there is an element
  if (element.length == 0) {
    return;
  }

  // Get the speed
  speed = typeof speed == "undefined" ? 500 : speed;

  // Scroll the body
  $("body").animate({
    scrollTop: element.offset().top
  }, speed);
}

// Scroll to this element only if it isn't in view
function scroll_to_if_not_in_view(element) {

  // Make sure there is an element
  if (element.length == 0) {
    return;
  }

  // Check it is in view
  if (is_in_view(element)) {
    return;
  }

  // Scroll to the element
  scroll_to(element);
}

// Check if this item is in the viewport
function is_in_view(element) {
  let top_of_element = element.offset().top;
  let bottom_of_element = top_of_element + element.outerHeight();
  let bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  let top_of_screen = $(window).scrollTop();
  return bottom_of_element <= bottom_of_screen && top_of_element >= top_of_screen;
}

// Find the lowest fixed parent
function lowest_fixed_parent(element) {
  while (1) {
    element = element.parent();
    if (element.length == 0 || element[0] === document) {
      return document.documentElement;
    }
    if (element.css("position") == "fixed") {
      return element;
    }
  }
}

// Set the page title
function set_page_title(title) {
  $('head title', window.parent.document).text(title);
}


//==============================================================================
//
// Page operations
//
//==============================================================================

// Show a dropdown confirmation
function show_confirmation_message(message) {

  // Append confirmation_box to body if not exists
  var confirmation_box = document.querySelector('.confirmation_box');
  if (!confirmation_box) {
    $("body").append($("<div class='confirmation_box'></div>"));
  }

  // Set the message
  let element = $("<div class='confirmation_message'><p>" + message + "</p></div>");
  $('.confirmation_box').append(element);

  // Make it disappear
  setTimeout(function() {
    element.fadeOut(3000, function() {
      element.remove();
      if ($('.confirmation_box').children().length < 1) {
        $('.confirmation_box').remove();
      }
    });
  }, 5000);
}

// The element must be a javascript DOM element
function make_full_screen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}


//==============================================================================
//
// Printing
//
//==============================================================================

// Print the object without the object being changed
function print_object(object) {
  console.log(JSON.parse(JSON.stringify(object)));
}



//==============================================================================
//
// Misc
//
//==============================================================================

// Print the object without the object being changed
function copy_object(object) {
  return JSON.parse(JSON.stringify(object));
}
