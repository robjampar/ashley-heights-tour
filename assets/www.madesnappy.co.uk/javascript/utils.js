//==============================================================================
//
// Javascript utils
//
//==============================================================================


//==============================================================================
//
// Cookies
//
//==============================================================================

// Set a cookie
function set_cookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Get a cookie
function get_cookie(name) {
  let name_string = name + "=";
  let cookie_array = document.cookie.split(';');
  for (var i=0; i<cookie_array.length; i++) {
    var cookie = cookie_array[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(name_string) == 0) {
      return cookie.substring(name_string.length, cookie.length);
    }
  }
  return null;
}


//==============================================================================
//
// Waiting
//
//==============================================================================

// Start waiting
function start_waiting() {
  let waiting = $("#waiting_overlay");
  if (waiting.length == 0) {
    let html = "<div id='waiting_overlay' class='full_screen_overlay transparent_white_background center_text no_scroll'><img class='vertical_center' src='"
    html += pictures_root + "circle_loading.gif";
    html += "'><p class='hidden waiting_overlay_text vertical_center bold'></p></div>";
    $("body").append(html);
    waiting = $("#waiting_overlay");
  }
  waiting.show();
}

// Set the text on the waiting overlay
function set_waiting_text(text) {
  $("#waiting_overlay .waiting_overlay_text").html(text);
  $("#waiting_overlay .waiting_overlay_text").removeClass("hidden");
}

// Stop waiting
function stop_waiting() {
  $("#waiting_overlay").hide();
  $("#waiting_overlay .waiting_overlay_text").addClass("hidden");
}


//==============================================================================
//
// String operations
//
//==============================================================================

// Convert the text to have first letter capital
function capitalise_first_letter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//==============================================================================
//
// Date operations
//
//==============================================================================

// Convert the text to have first letter capital
function check_contract_start_and_end(start, end) {
  
  // Check the start date is the start of the month or 15th
  let start_date = month_date(start);
  if (start_date != 1 && start_date != 15) {
    return "Must start from 1st or 15th of the month";
  }

  // Check the end date is the end of the month or the 14th
  let end_date = add_days(end, 1);
  end_date = month_date(end_date);
  if (end_date != 1 && end_date != 15) {
    return "Must end on the 14th or the last day of the month";
  }

  // Return no errors
  return null;
}
