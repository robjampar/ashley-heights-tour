//==============================================================================
//
// This contains a bunch of functions to handle javascript forms
//
//==============================================================================

// Make sure the forms are ready for action
var form_options = null;
function initialise_forms(options) {

  // Set the options
  form_options = options;

  // Hide the alerts and allow them to be closed down
  initialise_alerts();

  // Hide any forms that should only be visible after the first page of a form
  hide_forms();

  // Hijack the page leaving if a request is in progress
  hijack_page_leaving();

  // Setup all callbacks etc that need to happen to make the forms work properly
  initialise_form_events();

  // Initialise the file uploads
  initialise_file_upload();

  // Make sure passwords are updated on the fly
  update_password_controls();

  // Initialise payment cards
  initialise_cards();

  // Initialise text areas
  initialise_text_areas();
}

// Initialise capturing events occurring on the forms
function initialise_form_events() {

  // Check for any select options where we change untouched fields when selected
  $("[data-change-untouched]").each(function() {
    register_touch_watch($(this));
  });

  // Check for any dates that need syncronizing
  $("[data-date-sync-untouched]").each(function() {
    register_date_touch_watch($(this));
  });

  // Catch when form inputs change
  $("input").change(function() {

    // Register this item has changed
    register_touch($(this));

    // Check for untouched dates
    check_date_untouched($(this));
  });

  // Catch when selections change
  $("select").change(function() {

    // Check for options that override other fields values
    check_force_override($(this));

    // Check for changing untouched fields
    check_select_untouched($(this));

  });

  // Change the yes no selection
  initialise_yes_no();

  // Initialise any bespoke selections on the forms
  initialise_bespoke_selects();

  // Initialise any multi selections on the forms
  initialise_multi_selects();

  // Initialise any button selections on the forms
  initialise_button_selects();

  // Handle submitting the forms
  handle_form_submittion();

  // Make the previous buttons work on the forms
  handle_previous_buttons();


  // Make sure any visibility changes trigger the right things
  $(".form_container").on("visibility_change", function() {
    $(this).find("textarea").trigger("visibility_change");
  });

  // Make the forms work correctly when using multi part forms
  $("form .next_button").click(function() {
    let index = $(this).data("index");
    $(this).addClass("hidden");
    let form = $(".form_section[data-index=" + index + "]");
    form.removeClass("hidden");
    scroll_to(form, 1000);
  });

}

// Hide the alerts and allow them to be closed down
function initialise_alerts() {
  hide_all_alerts();
  $('.close').on('click', function(event) {
    $(event.target).closest(".alert").hide();
    var form = $(event.target).parent().parent().parent();
    if (form.is("form")) {
      $("#" + form.attr("id") + " :input").removeClass("invalid_input");
      $("#" + form.attr("id") + " .file_upload_label").children().eq(0).removeClass("invalid_input");
    }
  });
}

// Handle what happens when forms are submitted
function handle_form_submittion() {

  $("form").submit(function(event) {

    // Lock the page from other form submissions
    var form_id = $(this).attr("id");
    if (!allow_multi_submit(form_id)) {
      if (is_page_locked()) {
        return false;
      }
      lock_page();
    }

    // Don't let the page get refreshed
    event.preventDefault();

    // Check the values on the form are filled correctly
    if (!validate_form(form_id)) {
      unlock_page();
      return false;
    }

    // Call the handler for this form
    form_handler(form_id, function(handler) {
      form_handlers[form_id](handler);
    });
  });
}

// Is this form allowed multi submitting
function allow_multi_submit(form_id) {
  let multi_submit = $("#" + form_id).data("allow-multi-submit");
  return typeof(multi_submit) != "undefined" && multi_submit;
}

// Make the previous buttons work on the forms
function handle_previous_buttons() {
  $(".previous_button").click(function() {
    var form = get_form($(this));
    var form_id = form.attr("id");
    show_previous_form(form_id);
    var handler = previous_form_handlers[form_id];
    if (handler) {
      handler();
    }
  });
}

// Hijack the page leaving if a request is in progress
function hijack_page_leaving() {
  window.onbeforeunload = function() {

    // Check if the page is locked
    if (is_page_locked()) {
      return "Form submission in progress. Are you sure you want to leave?";
    }

    // Check if there are any unuploaded images
    let unuploaded = $(".check_unuploaded_images .file_upload_image").length;
    if (unuploaded != 0) {
      return "Some files have been selected but not uploaded. Are you sure you want to leave?";
    }
  }
}

// Run click events through this if it will interfere with the page
// This will check a form isn't currently being submitted before firing the event
function setup_click_handler(object, handler) {

  // Setup the handler
  object.click(function(event) {

    // Stop passing events onto parents
    event.stopPropagation();
    event.preventDefault();

    // Check the page isn't locked first
    if (is_page_locked()) {
      return;
    }

    // Call the handler
    handler($(this), event);
  });

  // Prevent dragging from overriding these clicks
  object.mousedown(function(event) {
    event.stopPropagation();
    event.preventDefault();
  });

}


//==== YesNo elements ====//

// Initialise the yesno elements
function initialise_yes_no() {
  $('.yesno_input > div input').click(function() {
    var type = $(this).attr('type');
    var item = $(this).closest(`.${type}_select_item`);
    var container = $(this).closest(`.${type}_select_container`);

    // Check if multiselect
    if (type === 'checkbox') {
      // Bespoke select has its own methods, so ignore if bespoke select
      if (!$(container).hasClass('bespoke_select')) {
        $(item).toggleClass('yesno_on');
      }
    } else {
      $(container).find('.yesno_on').removeClass('yesno_on');
      $(item).addClass('yesno_on')
    }
    var name = container.attr("name");
    var form = get_form($(this)).attr("id");
    if (typeof(yesno_handlers[form]) != "undefined" && typeof(yesno_handlers[form][name]) != "undefined") {
      yesno_handlers[form][name]($(item).data("value"));
    }
  });
}

// Handlers for yesno clicks
var yesno_handlers = new Object;
function add_yesno_handler(form, name, handler) {
  if (typeof(yesno_handlers[form]) == "undefined") {
    yesno_handlers[form] = new Object;
  }
  yesno_handlers[form][name] = handler;
}

// Set the yes no value
function set_yesno_value(form, name, value) {
  let container = $("#" + form + " .radio_select_container[name='" + name + "']");
  if (value) {
    container.find(".radio_select_item[data-value='yes']").addClass('yesno_on');
    container.find(".radio_select_item[data-value='no']").removeClass('yesno_on');
  } else {
    container.find(".radio_select_item[data-value='yes']").removeClass('yesno_on');
    container.find(".radio_select_item[data-value='no']").addClass('yesno_on');
  }
}


//==== Select elements ====//

// Register a handler function for this multi select change
var multi_select_handlers = new Object;
function add_multi_select_handler(form, name, handler) {
  if (typeof(multi_select_handlers[form]) == "undefined") {
    multi_select_handlers[form] = new Object;
  }
  multi_select_handlers[form][name] = handler;
}

// Handle multiple select options
function initialise_multi_selects() {
  $(".multiple_select_option").click(function() {
    $(this).toggleClass("multiple_select_option_selected");
    var form = get_form($(this)).attr("id");
    var container = $(this).closest('.multiple_select');
    var name = $(container).attr("name");
    if (typeof(multi_select_handlers[form]) != "undefined" && typeof(multi_select_handlers[form][name]) != "undefined") {
      multi_select_handlers[form][name]();
    }
  });
}

// Register a handler function for this bespoke select change
var bespoke_select_handlers = new Object;
function add_bespoke_select_handler(form, name, handler) {
  if (typeof(bespoke_select_handlers[form]) == "undefined") {
    bespoke_select_handlers[form] = new Object;
  }
  bespoke_select_handlers[form][name] = handler;
}

// Initialise bespoke selection
function initialise_bespoke_selects() {
  $(".bespoke_select_element").click(function() {
    var container = $(this).closest('.bespoke_select');

    if ($(container).hasClass("bespoke_select_multiple")) {
      $(this).closest(".checkbox_select_item").toggleClass("bespoke_selected_element");
    } else {
      if (!$(this).closest(".radio_select_item").hasClass("bespoke_selected_element")) {
        $(container).find(".bespoke_selected_element").removeClass("bespoke_selected_element");
        $(this).closest(".radio_select_item").addClass("bespoke_selected_element");
      }
    }

    var name = $(container).attr("name");
    var form = get_form($(this)).attr("id");
    if (typeof(bespoke_select_handlers[form]) != "undefined" && typeof(bespoke_select_handlers[form][name]) != "undefined") {
      bespoke_select_handlers[form][name]();
    }
  });
}

// Register a handler function for this button change
var button_select_handlers = new Object;
function add_button_select_handler(form, name, handler) {
  if (typeof(button_select_handlers[form]) == "undefined") {
    button_select_handlers[form] = new Object;
  }
  button_select_handlers[form][name] = handler;
}

// Initialise button selection
function initialise_button_selects() {

  // Add click handler to toggle the button and fire callbacks
  $(".button_select_element").click(function() {

    // Make any changes
    let changed = false;
    let parent = $(this).parent();
    if (parent.hasClass("button_select_multiple")) {
      let allow_change = true;
      let allow_empty = parent.data("allow-empty");
      if (typeof allow_empty != "undefined" && !allow_empty) {
        if ($(this).hasClass("small_blue_button") && parent.find(".small_blue_button").length == 1) {
          allow_change = false;
        }
      }
      if (allow_change) {
        $(this).toggleClass("small_outline_button").toggleClass("small_blue_button");
        changed = true;
      }
    } else {
      if (!$(this).hasClass("small_blue_button")) {
        parent.find(".small_blue_button").toggleClass("small_outline_button").toggleClass("small_blue_button");
        $(this).toggleClass("small_outline_button").toggleClass("small_blue_button");
        changed = true;
      }
    }

    // Check for changes
    if (changed) {
      var name = $(this).parent().attr("name");
      var form = get_form($(this)).attr("id");
      if (typeof(button_select_handlers[form][name]) != "undefined") {
        button_select_handlers[form][name]();
      }
    }
  });
}

// Return the selected text for this dropdown
function selected_text(form_id, select_name) {
  return $("#" + form_id + " [name='" + select_name + "'] option:selected").text();
}


//==============================================================================
//
// Form Navigation
//
//==============================================================================

// Keep going up until you hit the form that contains this object
function get_form(object) {
  var parent = object.parent();
  if (!parent) {
    return null;
  } else if (parent.is("form")) {
    return parent;
  } else {
    return get_form(parent);
  }
}

// Keep going up until you get to a parent with this class type
function get_parent_with_class(object, class_type) {
  var parent = object.parent();
  if (typeof(parent.get(0)) == "undefined" || parent.get(0) == document) {
    return null;
  } else if (parent.hasClass(class_type)) {
    return parent;
  } else {
    return get_parent_with_class(parent, class_type);
  }
}


//==============================================================================
//
// Form Handlers
//
//==============================================================================

// Return a form handler
function form_handler(form_id, callback) {

  // Prepare the handler data
  var handler = new Object();
  handler.form_id = form_id;
  handler.values = extract_form_values(form_id);

  // Check for google recaptcha
  if ($(this).closest(".g-recaptcha").length != 0) {
    try {
      var current_form = $("#" + form_id);
      handler.values.captcha_token = current_form.grecaptcha.getResponse();
    } catch(err) {
      unlock_page();
      show_form_error(form_id, "Please fill in the reCAPTCHA.");
      return;
    }
  }

  // Prepare the post function
  handler.post = function(url, success_message, callback, error_callback) {

    // Upload each file at a time and post the results to the server
    if (typeof(handler.multi_file_staged_progress_mode) != "undefined") {

      // Stash a copy of the values
      var fixed_values = Object.assign({}, handler.values);
      handler.file_upload_status = function(input_name, index, progress, total, name, original_name, next) {

        // Update with progress
        handler.multi_file_progress("upload", progress, index, total, name, function() {

          // If this is just a progress update, carry on
          if (progress < 1) {
            next();
            return;
          }

          // Set the values & do the post
          handler.values = Object.assign({}, fixed_values);
          handler.values[handler.multi_file_staged_progress_mode] = name;
          if (typeof handler.preserve_file_name !== "undefined") {
            handler.values[handler.preserve_file_name] = original_name;
          }

          // Do the post
          $.post(url, handler.values, function(response) {

            // Complete if this is the last file
            if (index == total - 1) {
              update_file_upload_progress(form_id, input_name, index, "post", 1);
              handler.multi_file_progress("post", 1, index, total, name, function() {
                handler.complete_form(response, success_message, callback);
              });
              return;
            }

            // Check if we need to handle an interim response
            if (typeof handler.upload_response != "undefined") {
              var data = null;
              try {
                data = JSON.parse(response);
              } catch(e) {}
              handler.upload_response(data);              
            }

            // Continue uploading
            update_file_upload_progress(form_id, input_name, index, "post", 1);
            handler.multi_file_progress("post", 1, index, total, name, next);

          }).fail(function(response) {
            unlock_page();
            show_form_error(form_id, "Uploading Failed. Try again.");
            show_finish_file_upload(form_id);
            check_common_http_responses(response, form_id);
          });
        });
      }

      // Upload the files
      show_start_file_upload(form_id);
      upload_form_files(handler, function(success, results) {
        show_finish_file_upload(form_id);
        if (!success) {
          unlock_page();
          return;
        }
      });
      return;
    }

    // Make sure file upload feedback is dealt with
    if (!handler.file_upload_status) {
      handler.file_upload_status = function(input_name, index, progress, total, name, original_name, next) {
        next();
      }
    }

    // First upload the files
    show_start_file_upload(form_id);
    upload_form_files(handler, function(success, results) {

      // Check the files uploaded correctly
      if (!success) {
        unlock_page();
        return;
      }

      // Check the file upload results
      for (var key in results) {
        results[key] = results[key].join(";");
        handler.values[key] = results[key];
      }

      // Post the request to the server
      $.post(url, handler.values, function(response) {
        unlock_page();
        show_finish_file_upload(form_id);
        handler.complete_form(response, success_message, callback);
      }).fail(function(response) {
        check_common_http_responses(response, form_id);
        unlock_page();
        show_finish_file_upload(form_id);
        if (error_callback) {
          error_callback(response);
        }
      });
    });
  };

  // Prepare the get function
  handler.load_page = function(url) {
    let variable_string = "";
    let number_of_variables = 0;
    for (var key in handler.values) {
      if (handler.values.hasOwnProperty(key)) {
        variable_string += number_of_variables == 0 ? "?" : "&";
        variable_string += key + "=" + handler.values[key];
        number_of_variables++;
      }
    }
    redirect_preserving_history(url + variable_string);
  };

  // Repost a call
  // This may be called if we had to react to an api request and recall it
  handler.repost = function(url, success_message, callback, error_callback) {
    lock_page();
    handler.post(url, success_message, callback, error_callback);
  }

  // Complete a form action
  handler.complete_form = function(response, success_message, callback) {
    show_form_success(form_id, success_message);
    if (typeof(handler.no_reset) == "undefined" || !handler.no_reset) {
      reset_form(form_id);
    }
    var data = null;
    try {
      data = JSON.parse(response);
    } catch(e) {}
    unlock_page();
    callback(data);
  }

  // Move to the next page in a form
  handler.next = function() {
    show_next_form(form_id);
    unlock_page();
  }

  // Send the handler for use
  callback(handler);
}

// Create the form handlers array
// Previous form handlers are where the user goes back on a multi page form
var form_handlers = new Object;
var previous_form_handlers = new Object;

// Register a handler function for this form
function register_form_handler(form_id, handler) {
  form_handlers[form_id] = handler;
}
function register_previous_form_handler(form_id, handler) {
  previous_form_handlers[form_id] = handler;
}


//==============================================================================
//
// Page locking
//
//==============================================================================

var page_locked = false;

// Lock the page from exiting
function lock_page() {
  page_locked = true;
  $(':input[type="submit"]').prop('disabled', true);
}

// Unlock the page from exiting
function unlock_page() {
  page_locked = false;
  $(':input[type="submit"]').prop('disabled', false);
}

// Return true if the page is locked
function is_page_locked() {
  return page_locked;
}


//==============================================================================
//
// Form Messages
//
//==============================================================================

// Make sure all the alerts on the page are hidden
function hide_all_alerts() {
  $(".alert").hide();
}

// Show an error for this form
function show_form_error(form, message) {
  if ($("#" + form).hasClass("inline_form")) {
    alert(message);
  } else {
    hide_all_alerts();
    $("#" + form + "_fail_message").html(message);
    $("#" + form + "_fail").show();
    scroll_to_if_not_in_view($("#" + form + "_fail"));
  }
}

// Show an error for this form
function show_form_item_error(form, name, message) {
  $("#" + form + " [name=" + name + "]").addClass("invalid_input");
  show_form_error(form, message);
}

// Show a success message for this form
function show_form_success(form, message) {
  hide_all_alerts();
  if (message != "") {
    $("#" + form + "_success_message").html(message);
    $("#" + form + "_success").show();
    scroll_to_if_not_in_view($("#" + form + "_success"));
  }
}

// Check this response to see if we can alert the user
function check_common_http_responses(response, form) {
  if (response.status == 500) {
    show_form_error(form, "Server Error");
  } else if (response.status == 400) {
    show_form_error(form, response.responseText);
  } else {
    // Print the message from the server
    console.log(response);
  }
}


//==============================================================================
//
// Form Values
//
//==============================================================================

// Get the form values into an array
function extract_form_values(form_id) {

  // Standard inputs
  var inputs = $("#" + form_id + " :input");
  var values = {};
  inputs.each(function() {

    // Skip if this is a google input
    if ($(this).closest(".g-recaptcha").length != 0) {
      return;
    }

    if ($(this).prop("type") == "submit" || $(this).hasClass('ignore_input')) {
      return;
    } else if ($(this).is("input")) {
      if (this.name != "") {
        if ($(this).prop("type") == "checkbox" || $(this).prop("type") == "radio") {
          values[this.name] = this.checked ? 1 : 0;
        } else {
          values[this.name] = $(this).val();
        }
      }
    } else if ($(this).is("select")) {
      let data_result = $(this).data("results");
      if (typeof(data_result) != "undefined") {
        values[this.name] = $(this).val();
      } else {
        values[this.name] = $.map(
          $(this).children("option").filter(":selected"),
          function(element) {
            return $(element).text();
          }
        ).join(",");
      }
    }
  });

  // Text areas
  $("#" + form_id + " textarea").each(function() {
    if ($(this).closest(".g-recaptcha").length != 0) {
      return;
    }
    values[this.name] = $(this).val();
  });

  // Yes no inputs
  $("#" + form_id + " .yesno_input").each(function() {
    var name = $(this).attr('name');
    let yes = $(this).find("[data-value='yes']").hasClass("yesno_on");
    let no = $(this).find("[data-value='no']").hasClass("yesno_on");
    values[name] = -1;
    values[name] += no;
    values[name] += (yes * 2);
  });
  
  // Multi select inputs
  var multi_selects = $("#" + form_id + " .multiple_select");
  multi_selects.each(function() {
    values[$(this).attr("name")] = $.map(
      $(this).children().filter(".multiple_select_option_selected"),
      function(element) {
        if (typeof($(element).data("result")) != "undefined") {
          return $(element).data("result");
        }
        return $(element).text();
      }
    ).join(",");
  });

  // Process bespoke selects
  var bespoke_selects = $("#" + form_id + " .bespoke_select");
  bespoke_selects.each(function() {
    var bespoke_values = [];
    $(this).find(".bespoke_selected_element").each(function() {
      let data_result = $(this).data("result");
      if (typeof(data_result) != "undefined") {
        bespoke_values.push(data_result);
      } else {
        bespoke_values.push($(this).data('text'));
      }
    });
    values[$(this).attr("name")] = bespoke_values.join(",");
  });

  // Process bespoke selects
  var button_selects = $("#" + form_id + " .button_select");
  button_selects.each(function() {
    if (!$(this).hasClass("button_select_multiple")) {
      let result = $(this).find(".small_blue_button");
      let data_result = result.data("result");
      if (typeof(data_result) != "undefined") {
        values[$(this).attr("name")] = data_result;
      } else {
        values[$(this).attr("name")] = data_result.text();
      }
    } else {
      values[$(this).attr("name")] = $.map(
        $(this).children().filter(".small_blue_button"),
        function(element) {
          let data_result = $(element).data("result");
          if (typeof(data_result) != "undefined") {
            return data_result;
          } else {
            return $(element).text();
          }
        }
      ).join(",");
    }
  });

  // Process checkbox select
  var checkbox_select = $('#' + form_id + ' .checkbox_select_container:not(.yesno_input)');
  checkbox_select.each(function() {
    var bespoke_values = [];
    $(this).find(".bespoke_selected_element").each(function() {
      let input = $(this).find('input');
      let value = input.attr('value');
      if (typeof(value) != "undefined") {
        bespoke_values.push(value);
      } else {
        bespoke_values.push($(this).find('.text').html());
      }
    });
    values[$(this).attr("name")] = bespoke_values.join(",");
  });
  
  // Payment cards
  var cards = $("#" + form_id + " .payment_cards");
  cards.each(function() {
    values[$(this).attr("name")] = $(this).find(".selected_card").data("id");
  });

  // Return the values
  return values;
}

// Make sure all the values on this form are valid
function validate_form(form_id) {

  // Check for any stripe elements on the form
  var stripe_elements = $("#" + form_id + " .stripe_element");
  var ok = true;
  if (stripe_elements.length > 0) {
    if (StripeHandler.any_errors()) {
      StripeHandler.show_errors(form_id);
      ok = false;
    }
  }

  // Get the completed values
  let completed_values = extract_form_values(form_id);

  // Remove any currently flagged inputs
  var inputs = $("#" + form_id + " :input");
  inputs.removeClass("invalid_input");

  // Go through each of the inputs and make sure they are valid
  inputs.each(function() {
    if (ok && $(this).prop("type") != "file") {
      var value = $(this).val();

      // Skip if the value matches
      var skip_if_value = $(this).data("skip-if-value");
      if (typeof(skip_if_value) != "undefined") {
        let values = skip_if_value.split("=");
        if (typeof(completed_values[values[0]]) != "undefined" && completed_values[values[0]] == values[1]) {
          return;
        }
      }

      // Check if the field is allowed to be empty
      var allow_empty = $(this).data("allow-empty");
      if (typeof(allow_empty) != "undefined" && allow_empty == 0 && (value === null || value.length == 0)) {
        $(this).addClass("invalid_input");
        show_form_error(form_id, "Field should not be empty");
        ok = false;
      }
      if (typeof(allow_empty) != "undefined" && allow_empty == 1 && (value === null || value.length == 0)) {
        return;
      }

      // Check we haven't gone over the maximum length
      var length = $(this).data("max-length");
      if (typeof(length) != "undefined" && length > 0) {
        if (value.length > length) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Field should be no more than " + length + " characters");
          ok = false;
        }
      }

      // Check for letters only
      if (typeof($(this).data("letters-only")) != "undefined" && !/^[A-Za-z]+$/.test(value)) {
        $(this).addClass("invalid_input");
        show_form_error(form_id, "Field must contain only letters. No spaces, numbers or special characters.");
        ok = false;
      }

      // Check for text only
      if (value != "" && typeof($(this).data("text-only")) != "undefined" && !/^[A-Za-z\s]+$/.test(value)) {
        $(this).addClass("invalid_input");
        show_form_error(form_id, "Field must contain only letters and spaces");
        ok = false;
      }

      // Check for numbers only
      if (typeof($(this).data("numbers-only")) != "undefined" && !/^[0-9]+$/.test(value)) {
        $(this).addClass("invalid_input");
        show_form_error(form_id, "Field must contain only numbers");
        ok = false;
      }

      // Check for numbers only
      if (value != "" && typeof($(this).data("phone-characters-only")) != "undefined" && !/^[0-9\s\+]+$/.test(value)) {
        $(this).addClass("invalid_input");
        show_form_error(form_id, "Field must contain only numbers, spaces and +");
        ok = false;
      }

      // Exclude specific characters
      if (typeof($(this).data("exclude-chars")) != "undefined") {
        let chars = $(this).data("exclude-chars");
        for (var i=0; i<chars.length; i++) {
          let char = chars.charAt(i);
          if (value.indexOf(char) != -1) {
            $(this).addClass("invalid_input");
            show_form_error(form_id, "Field may not contain any of these characters: " + chars);
            ok = false;
          }
        }
      }

      // Exclude quotes
      if (typeof($(this).data("exclude-quotes")) != "undefined" && $(this).data("exclude-quotes") == "1") {
        if (value.indexOf("'") !== -1 || value.indexOf("\"") !== -1) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Field may not contain a ' or \"");
          ok = false;
        }
      }

      // Check for if this is a full URL
      if (typeof($(this).data("full-url")) != "undefined") {
        if (value.indexOf("http://") !== 0 && value.indexOf("https://") !== 0) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Please use the full URL. URL should start with http:// or https://");
          ok = false;
        }
      }

      // Check for the URL starting with certain characters
      if (typeof($(this).data("starts-with")) != "undefined") {
        let starts_with = $(this).data("starts-with");
        let split = starts_with.split(";");
        let matched = false;
        for (let i=0; i<split.length; i++) {
          if (value.indexOf(split[i]) === 0) {
            matched = true;
          }
        }
        if (!matched) {
          show_form_error(form_id, "The URL should start with " + split.join(" or "));
          ok = false;
        }
      }

      // Check if this is a valid date
      if ($(this).prop("type") == "date") {

        // Check non null dates
        if (value == "") {
          var not_null = $(this).data("not-null-date");
          if (typeof(not_null) != "undefined") {
            $(this).addClass("invalid_input");
            show_form_error(form_id, "Invalid Date");
            ok = false;
          }
        }

        // Check future dates
        var future = $(this).data("not-future-date");
        if (value != "" && typeof(future) != "undefined" && is_future_date(value)) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Must not be future date");
          ok = false;
        }

        // Check past dates
        var past = $(this).data("not-past-date");
        if (value != "" && typeof(past) != "undefined" && is_past_date(value)) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Must not be past date");
          ok = false;
        }

        // Check greater than other values
        var greater = $(this).data("greater-than");
        if (value != "" && typeof(greater) != "undefined") {
          var previous_value = $("#" + form_id + " :input[name='" + greater + "']").val();
          if (previous_value != "" && !is_null_date(previous_value) && !is_greater_date(value, previous_value)) {
            var text = $(this).data("greater-than-text");
            $(this).addClass("invalid_input");
            show_form_error(form_id, text);
            ok = false;
          }
        }
      }

      // Check if this is a valid date
      if ($(this).prop("type") == "password") {
        var check_strength = $(this).data("check-strength");
        if (typeof(check_strength) != "undefined" && check_strength) {
          if (password_strength(value) == "Very Weak") {
            $(this).addClass("invalid_input");
            show_form_error(form_id, "Password too weak");
            ok = false;
          }
        }
      }

      // Check if this is a checkbox
      if ($(this).prop("type") == "checkbox") {
        var must_be_checked = $(this).data("must-be-checked");
        if (!this.checked && typeof(must_be_checked) !== "undefined" && must_be_checked) {
          var text = $(this).data("must-be-checked-text");
          show_form_error(form_id, text);
          ok = false;
        }
      }

      // Check if this should be a UK number only
      var uk_number = $(this).data("uk-number");
      if (typeof(uk_number) != "undefined") {
        let number_result = check_phone_number(value);
        if (!number_result.success) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, number_result.message);
          ok = false;
        } else if (!number_result.uk_mobile) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Please use a UK mobile number");
          ok = false;
        }
      }

      // Check if this should be a phone number
      var phone_number = $(this).data("phone-number");
      if (typeof(phone_number) != "undefined") {
        let number_result = check_phone_number(value);
        if (!number_result.success) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, number_result.message);
          ok = false;
        }
      }
    }

    // Check the file
    if ($(this).prop("type") == "file") {
      $(this).next().children().eq(0).removeClass("invalid_input");
      if (ok) {
        var allow_empty = $(this).data("allow-empty");
        if (typeof($(this).data('allow-empty')) != "undefined" && allow_empty == 0) {
          var id = $(this).attr('id');
          if (upload_files[id].length == 0) {
            $(this).next().children().eq(0).addClass("invalid_input");
            show_form_error(form_id, "No file selected");
            ok = false;
          }
        }
      }
    }

  });

  // Go through each of the inputs and make sure they are valid
  var multi_selects = $("#" + form_id + " .multiple_select");
  multi_selects.removeClass("invalid_input");
  multi_selects.each(function() {
    if (ok) {
      var allow_empty = $(this).data("allow-empty");
      if (typeof(allow_empty) != "undefined" && allow_empty == 0) {
        if ($(this).children().filter(".multiple_select_option_selected").length == 0) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Field should not be empty");
          ok = false;
        }
      }
    }
  });

  // Go through each of the yesno inputs and make sure they are valid
  var yes_no_inputs = $("#" + form_id + " .yesno_input");
  yes_no_inputs.removeClass("invalid_input");
  yes_no_inputs.each(function() {
    if (ok) {
      var allow_empty = $(this).data("allow-empty");
      if (typeof(allow_empty) != "undefined" && allow_empty == 0) {
        if ($(this).children().filter(".yesno_on").length == 0) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Field should not be empty");
          ok = false;
        }
      }
    }
  });

  // Process bespoke selects
  var bespoke_selects = $("#" + form_id + " .bespoke_select");
  bespoke_selects.removeClass("invalid_input");
  bespoke_selects.each(function() {
    if (ok) {
      var allow_empty = $(this).data("allow-empty");
      if (typeof(allow_empty) != "undefined" && allow_empty == 0) {
        if ($(this).find(".bespoke_selected_element").length == 0) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Please make a selection");
          ok = false;
        }
      }
    }
  });

  // Process button selects
  var button_selects = $("#" + form_id + " .button_select");
  button_selects.removeClass("invalid_input");
  button_selects.each(function() {
    if (ok) {
      var allow_empty = $(this).data("allow-empty");
      if (typeof(allow_empty) != "undefined" && allow_empty == 0) {
        if ($(this).children().filter(".small_blue_button").length == 0) {
          $(this).addClass("invalid_input");
          show_form_error(form_id, "Please make a selection");
          ok = false;
        }
      }
    }
  });

  // Return the result
  return ok;
}

// Validate the phone number
function check_phone_number(number) {

  // Remove any white spaces
  let value = number.replace(/\s+/g, '');

  // Check for a starting +
  let plus = false;
  if (value.length > 0 && value[0] == "+") {
    plus = true;
    value = value.substring(1);
  }

  // Check for any non numbers
  let result = {};
  result.success = true;
  if (!/^\d+$/.test(value)) {
    result.success = false;
    result.message = "Bad characters in number";
    return result;
  }

  // Add back the plus
  if (plus) {
    if (value.substring(0, 2) == "44") {
      result.number = "0" + value.substring(2);
    } else {
      result.number = "+" + value;
    }
  } else {
    result.number = value;
  }

  // Check the length
  if (result.number.length < 10 || result.number.length > 13) {
    result.success = false;
    result.message = "Incorrect number of characters in number";
    return result;
  }

  // Check for UK mobile number
  result.uk_mobile = result.number.substring(0, 2) == "07";
  return result;
}

// Clear all the values in the form, and if it is part of a multi form, clear
// all previous pages and hide the secondary ones
function reset_form(form_id) {
  reset_individual_form(form_id);
  var form = $("#" + form_id);
  var previous_page = form.data("previous");
  if (typeof(previous_page) != "undefined" && typeof(form.data("first-form")) == "undefined") {
    form.parent().hide();
    $("#" + previous_page).parent().show();
    reset_form(previous_page);
  }
}

// Reset all the values on this form
function reset_individual_form(form_id) {

  // Reset inputs
  var inputs = $("#" + form_id + " :input");
  inputs.each(function() {
    var type = $(this).prop("type");
    if (type == "submit") {
      return;
    } else if (type == "file") {
      clear_upload_files($(this).next());
    } else if ($(this).is("input")) {
      $(this).val($(this).prop("defaultValue"));
    } else if ($(this).is("textarea")) {
      $(this).val($(this).prop("defaultValue"));
    } else if ($(this).prop("nodeName") == "SELECT") {
      if (typeof($(this).attr('multiple')) == "undefined") {
        $(this).children().eq(0).attr("selected", "selected");
      } else {
        $(this).children().filter("option:selected").each(function() {
          $(this).prop("selected", false);
        });
      }
    }
  });

  // Reset multiple selection
  var multi_selects = $("#" + form_id + " .multiple_select");
  multi_selects.each(function() {
    $(this).children().filter(".multiple_select_option_selected").removeClass("multiple_select_option_selected");
  });

  // Process bespoke selects
  var bespoke_selects = $("#" + form_id + " .bespoke_select");
  bespoke_selects.each(function() {
    $(this).children().filter(".bespoke_selected_element").removeClass("bespoke_selected_element");
  });

  // Process bespoke selects
  var button_selects = $("#" + form_id + " .button_select");
  button_selects.each(function() {
    $(this).children().filter(".small_blue_button").toggleClass("small_blue_button").toggleClass("small_outline_button");
  });

  // Clear the stripe handler if there is one
  var stripe_elements = $("#" + form_id + " .stripe_element");
  if (stripe_elements.length > 0) {
    StripeHandler.clear();
  }
}


//==============================================================================
//
// Inline forms
//
//==============================================================================

// Connect up the trigger to replace the text with the inline form
function connect_inline_form(trigger_id, text_id, form_id) {
  $("#" + trigger_id).click(function() {
    let open = $(this).data("open");
    if (typeof open === "undefined" || open == "0") {
      hide_inline_forms();
      $(this).data("open", "1");
      $("#" + text_id).hide();
      $("#" + form_id + " input").val($("#" + text_id).text());
      $("#" + text_id).after($("#" + form_id));
      $("#" + form_id).show();
      $("#" + form_id + " input").focus();
      $("#" + trigger_id).children().eq(0).addClass("hidden");
      $("#" + trigger_id).children().eq(1).removeClass("hidden");
    } else {
      $("#" + form_id).submit();
    }
  });
}

// Replace the trigger with a spinning icon
function set_inline_trigger_spinning(trigger_id, image) {
  let height = $("#" + trigger_id).height();
  $("#" + trigger_id).hide();
  $("#" + trigger_id).after("<img class='inline_form_loading' src='" + image + "' style='height:" + height + "px;vertical-align: middle'>");
}

// Exit the inline form
function finish_inline_form(text_id, text) {
  hide_inline_forms();
  $("#" + text_id).html(text);
}

// Hide all the inline forms
function hide_inline_forms() {
  $(".inline_form_text").show();
  $(".inline_form_trigger").show();
  $(".inline_form_trigger").each(function() {
    $(this).children().eq(0).removeClass("hidden");
    $(this).children().eq(1).addClass("hidden");
  });
  $(".inline_form_trigger").data("open", "0");
  $(".inline_form_loading").remove();
  $(".inline_form").hide();
}

//==============================================================================
//
// Passwords
//
//==============================================================================

// Check this password for the correct strength
function check_password(password) {

  // Award points for each unique letter until 5 repetitions
  var score = 0;
  var letters = new Object();
  for (var i=0; i<password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;
    score += 5.0 / letters[password[i]];
  }

  // Variations on types
  var variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    non_words: /\W/.test(password)
  }
  var variation_count = 0;
  for (var check in variations) {
      variation_count += (variations[check] == true) ? 1 : 0;
  }
  score += (variation_count - 1) * 10;
  return parseInt(score);
}

// Update the password controls as users type into them
function update_password_controls() {

  // Update the strength on the fly
  $("input[type=password][data-check-strength=1]").on("input", function(event) {
    update_password_strength($(this));
  });

  // Set the initial strength
  $("input[type=password][data-check-strength=1]").each(function() {
    update_password_strength($(this));
  });

}

// Update the password strength on the input
function update_password_strength(input) {
  var strength = password_strength(input.val());
  if (strength == "Very Weak") {
    input.next().next().css("background-color", "rgb(221,0,0)");
    input.next().css("color", "rgb(221,0,0)");
  } else if (strength == "Weak") {
    input.next().next().css("background-color", "rgb(249,124,0)");
    input.next().css("color", "rgb(249,124,0)");
  } else if (strength == "Strong") {
    input.next().next().css("background-color", "rgb(0,149,0)");
    input.next().css("color", "rgb(0,149,0)");
  } else if (strength == "Very Strong") {
    input.next().next().css("background-color", "rgb(0,128,192)");
    input.next().css("color", "rgb(0,128,192)");
  }
  input.next().text(strength);
}

// Get a string for this password strength
function password_strength(password) {
  var strength = check_password(password);
  if (strength <= 30) {
    return "Very Weak";
  } else if (strength > 30 && strength <= 60) {
    return "Weak";
  } else if (strength > 60 && strength <= 80) {
    return "Strong";
  } else if (strength > 80) {
    return "Very Strong";
  }
}


//==============================================================================
//
// Multi Page Forms
//
//==============================================================================

// Hide all the forms that shouldn't be seen
function hide_forms() {
  $("form").each(function() {
    var next_page = $(this).data("next");
    if (typeof(next_page) != "undefined") {
      if (typeof($("#" + next_page).data("first-form")) == "undefined") {
        $("#" + next_page).parent().hide();
      }
    }
  });
}

// Show the next page of form
function show_next_form(form_id) {

  // Show or hide the next page
  var current_form = $("#" + form_id);
  var next_page = current_form.data("next");
  if (typeof(next_page) == "undefined") {
    return;
  }
  var next_form = $("#" + next_page);
  current_form.parent().hide();
  next_form.parent().show();

  // Check if this form is repeating
  if (typeof(next_form.data("repeating")) != "undefined") {
    var current_index = next_form.data("current-index");
    var max_index = next_form.data("repeating") - 1;
    if (current_index < max_index) {
      current_form.data("current-index", current_index + 1);
      check_repeating_form_buttons(next_page);
    }
  }
}

// Make sure the buttons on the repeating form are correct as they are dynamic
function check_repeating_form_buttons(form_id) {

  // Sort the form out
  var form = $("#" + form_id);
  var current_index = form.data("current-index");
  var max_index = form.data("repeating") - 1;
  var first_form = typeof(form.data("first-form")) != "undefined";
  var next_form_id = form.data("next");
  var next_first_form = typeof($("#" + next_form_id).data("first-form")) != "undefined";

  // Sort the previous button out
  if (current_index == 0 && first_form) {
    form.find(".form_button[data-type=previous]").hide();
  } else {
    form.find(".form_button[data-type=previous]").show();
  }

  // Get the next and submit buttons working correctly
  if (current_index == max_index && next_first_form) {
    form.find(".form_button[data-type=next]").text("Submit");
  } else {
    form.find(".form_button[data-type=next]").text("Next");
  }
}

// Show the last page of form
function show_previous_form(form_id) {

  // Show or hide the next page
  var current_form = $("#" + form_id);
  var previous_page = current_form.data("previous");
  if (typeof(previous_page) == "undefined") {
    return;
  }
  var previous_form = $("#" + previous_page);
  current_form.parent().hide();
  previous_form.parent().show();

  // Check if this form is repeating
  if (typeof(previous_form.data("repeating")) != "undefined") {
    var current_index = previous_form.data("current-index");
    if (current_index > 0) {
      previous_form.data("current-index", current_index - 1);
      check_repeating_form_buttons(previous_page);
    }
  }
}

// Get the first form in this chain of forms
function first_form_in_chain(form_id) {
  var form = $("#" + form_id);
  while (1) {
    var previous_page = form.data("previous");
    if (typeof(previous_page) == "undefined") {
      return form;
    } else {
      form = $("#" + previous_page);
    }
  }
}


//==============================================================================
//
// Changing Untouched Fields
//
//==============================================================================

// Check this select object to see if it has moved to a change-untouched option
function check_select_untouched(select_object) {

  // Get the untouched data variable
  var data = select_object.find(":selected").data("change-untouched");
  if (typeof(data) == "undefined") {
    return;
  }

  // Make any changes that need doing
  var form = get_form(select_object);
  var changes = data.split(";");
  $("#" + form.attr("id") + " :input").each(function() {
    for (var i=0; i<changes.length; i++) {
      var change = changes[i].split("=");
      if (change[0] == this.name) {
        if (is_touched($(this))) {
          break;
        }
        $(this).val(change[1]);
      }
    }
  });
}

// Check this date object to see if any others need updating
function check_date_untouched(input) {

  // Get the untouched data variable
  var data = input.data("date-sync-untouched");
  if (typeof(data) == "undefined") {
    return;
  }

  // Make any changes that need doing
  var form = get_form(input);
  var changes = data.split(";");
  $("#" + form.attr("id") + " :input").each(function() {
    for (var i=0; i<changes.length; i++) {
      var change = changes[i].split(",");
      if (change[0] == this.name) {
        if (is_touched($(this))) {
          break;
        }
        if (change[2] == "year") {
          $(this).val(add_years(input.val(), change[1]));
        }
      }
    }
  });
}

// Register all the fields on this select option we want to change if they
// haven't been touched
function register_touch_watch(option) {

  // Get the form for this option
  var form = get_form(option);
  if (!form) {
    return false;
  }

  // Go through the data and register that we want to know if this object has
  // changed
  var data = option.data("change-untouched");
  var changes = data.split(";");
  $("#" + form.attr("id") + " :input").each(function() {
    for (var i=0; i<changes.length; i++) {
      var change = changes[i].split("=");
      if (change[0] == this.name) {
        register_touch_object($(this));
      }
    }
  });
}

// Register all the dates we want to change if they haven't been touched
function register_date_touch_watch(input) {

  // Get the form for this option
  var form = get_form(input);
  if (!form) {
    return false;
  }

  // Go through the data and register that we want to know if this object has
  // changed
  var data = input.data("date-sync-untouched");
  var changes = data.split(";");
  $("#" + form.attr("id") + " :input").each(function() {
    for (var i=0; i<changes.length; i++) {
      var change = changes[i].split(",");
      if (change[0] == this.name) {
        register_touch_object($(this));
      }
    }
  });
}

// Make a list of objects that we want to know about whether they have been
// changed by a user
var registered_touch_objects = new Array();

// Register this object as something we want to know about being changed
function register_touch_object(object) {
  if (!is_touch_registered(object)) {
    registered_touch_objects.push({
      object: object,
      touched: false
    });
  }
}

// Register than an input has been touched
function register_touch(object) {
  for (var i=0; i<registered_touch_objects.length; i++) {
    if (registered_touch_objects[i].object.is(object)) {
      registered_touch_objects[i].touched = true;
      return;
    }
  }
}

// Check if this is registered already
function is_touch_registered(object) {
  for (var i=0; i<registered_touch_objects.length; i++) {
    if (registered_touch_objects[i].object.is(object)) {
      return true;
    }
  }
  return false;
}

// Has this object been touched
function is_touched(object) {
  for (var i=0; i<registered_touch_objects.length; i++) {
    if (registered_touch_objects[i].object.is(object)) {
      return registered_touch_objects[i].touched;
    }
  }
  return false;
}


//==============================================================================
//
// Form Overriding
//
//==============================================================================

// The list of fields and variables that have been overriden
var form_override_variables = new Array();

// Check for options that override other fields values
function check_force_override(select_object) {

  // Check if this form already has overrides in place
  check_unwind_override(select_object);

  // Get the untouched data variable
  var data = select_object.find(":selected").data("force-override");
  if (typeof(data) == "undefined") {
    return;
  }

  // Make any changes that need doing
  var form = get_form(select_object);
  var changes = data.split(";");
  var cache = new Array();
  $("#" + form.attr("id") + " :input").each(function() {
    for (var i=0; i<changes.length; i++) {
      var change = changes[i].split("=");
      if (change[0] == this.name) {
        cache.push({
          object: $(this),
          value: $(this).val()
        });
        $(this).val(change[1]);
        $(this).prop("disabled", true);
      }
    }
  });

  // Stash the overrides
  form_override_variables.push({
    select: select_object,
    data: cache
  });
}

// Check if this form already has overrides in place
function check_unwind_override(select_object) {

  // Check if this form has overrides
  for (var i=0; i<form_override_variables.length; i++) {
    if (form_override_variables[i].select.is(select_object)) {
      var original = form_override_variables[i].data;
      for (var j=0; j<original.length; j++) {
        original[j].object.val(original[j].value);
        original[j].object.prop("disabled", false);
      }
      form_override_variables.splice(i, 1);
      return;
    }
  }
}


//==============================================================================
//
// File Uploading
//
//==============================================================================

// Store a list of files for each file upload
var upload_files = [];

// Add drag and drop if it is available
function initialise_file_upload() {

  // Check drag and drop availability
  if ($(".file_upload_input").length > 0) {
    var div = document.createElement('div');
    if (('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window && 'FileReader' in window) {

      // Change the onscreen styles
      $(".drag_drop_available").show();
      $(".file_upload_label").addClass("has_drag_drop");

      // Create a file upload list
      $(".file_upload_label").each(function() {
        var id = $(this).attr('for');
        upload_files[id] = [];
      });

      // Prevent dragging onto the page from opening the file
      $(".file_upload_label").on('drag dragstart dragend dragover dragenter dragleave drop', function(event) {
        event.preventDefault();
        event.stopPropagation();
      })
      .on('dragover dragenter', function() {
        $(this).addClass("dragover_start");
      })
      .on('dragleave dragend drop', function() {
        $(this).removeClass("dragover_start");
      })
      .on('drop', function(event) {
        add_upload_files($(this), event.originalEvent.dataTransfer.files);
      });

      // Catch when files are selected in the input
      $(".file_upload_input").change(function(event) {
        add_upload_files($(this).next(), event.target.files);
      });
    }
  }
}

// Manually add the mimetype
function check_content_type(file) {

  // Get the extension of the file
  var file_parts = file.name.split(".");
  var extension = "." + file_parts[file_parts.length - 1];

  // Check for an nef extension
  if(extension == ".nef" || extension == ".NEF") {
    return "image/x-nikon-nef";
  }

  return file.type;
}

// Add files to this file upload box
function add_upload_files(upload_label, files) {

  // Check for file extensions first
  var id = upload_label.attr('for');
  var input = upload_label.prev();
  if (typeof(input.attr('accept')) != "undefined") {
    var extensions = input.attr('accept');
    for (var i=0; i<files.length; i++) {
      files[i].type = "";
      if (!check_file_extension(files[i].name, extensions)) {
        var form = get_form(upload_label);
        show_form_error(form.attr("id"), input.data("restrict-file-type-message"));
        return;
      }
    }
  }

  // Check if we are doing a multiple file or single
  if (typeof(input.attr('multiple')) == "undefined") {
    clear_existing_files(upload_label);
    upload_files[id] = [];
    files[0].uploaded = false;
    upload_files[id].push(files[0]);
    show_new_upload_files(input, upload_label, upload_files[id]);
  } else {
    for (var i=0; i<files.length; i++) {
      files[i].uploaded = false;
      upload_files[id].push(files[i]);
    }
    show_new_upload_files(input, upload_label, files);
  }
}

// Return true if this matches the allowed file extension
function check_file_extension(file, extensions) {

  // Get the extension of the file
  var file_parts = file.split(".");
  var extension = "." + file_parts[file_parts.length - 1];

  // Check the extensions
  extensions = extensions.split(",");
  for (var i=0;  i<extensions.length; i++) {
    if (extension == extensions[i]) {
      return true;
    }
  }

  // The extension wasn't found
  return false;
}

// Clear the files for this file upload box
function clear_upload_files(upload_label) {
  var id = upload_label.attr('for');
  upload_files[id] = [];
  upload_label.prev().val("");
  upload_label.find(".file_upload_image").remove();
  upload_label.find(".files_unselected").css('display', 'table-cell');
  upload_label.find(".files_selected").addClass("hidden");
}

// Clear the files for this file upload box
function clear_existing_files(upload_label) {
  var id = upload_label.attr('for');
  upload_files[id] = [];
  upload_label.find(".file_upload_image").remove();
  upload_label.find(".files_unselected").css('display', 'table-cell');
  upload_label.find(".files_selected").addClass("hidden");
}

// Clear this index file
function remove_file_index(upload_label, index) {
  var id = upload_label.attr('for');
  upload_files[id].splice(index, 1);
  upload_label.find(".file_upload_image").eq(index).remove();
  if (upload_label.find(".file_upload_image").length == 0) {
    upload_label.find(".files_unselected").css('display', 'table-cell');
    upload_label.find(".files_selected").addClass("hidden");
  }
}

// Show a summary of the files we wish to upload
function show_new_upload_files(input, upload_label, files) {

  // Show the right parts of the upload form
  var id = upload_label.attr('for');
  upload_label.find(".files_unselected").hide();
  upload_label.find(".files_selected").removeClass("hidden");

  // Draw the new files
  let html = "";
  var number_of_files = files.length;
  for (var i=0; i<number_of_files; i++) {
    let url = "";
    let standard_image = check_file_extension(files[i].name, ".jpg,.jpeg,.JPG,.JPEG,.png,.PNG");
    if (typeof(input.data("sound-file")) !== "undefined") {
      url = form_options.upload_audio;
    } else if (standard_image) {
      url = window.URL.createObjectURL(files[i]);
    } else {
      url = form_options.upload_image;
    }
    html += "<div class='file_upload_image' data-uploaded='0'>";
    html += "<img src='" + url + "'>";
    html += "<div class='file_upload_remove'>×</div></div>";
  }
  upload_label.find(".files_selected").append(html);

  // Make sure images can't be clicked through
  upload_label.find("img").each(function() {
    if (typeof $(this).data("setup") === "undefined") {
      $(this).click(function(event) {
        $(this).data("setup", "1");
        event.preventDefault();
        event.stopPropagation();
      });
    }
  });

  // Set the delete buttons
  upload_label.find(".file_upload_remove").each(function() {
    if (typeof $(this).data("setup") === "undefined") {
      $(this).click(function(event) {

        // Prevent default and propogation
        event.preventDefault();
        event.stopPropagation();
        
        // Make sure the index is valid
        let index = $(this).parent().index();
        if (index == -1) {
          return;
        }
        
        // Remove the file
        $(this).data("setup", "1");
        remove_file_index(upload_label, $(this).parent().index());
      });
    }
  })
}

// Update the upload progress
function update_file_upload_progress(form_id, name, index, stage, progress) {

  // Check if there is already an overlay
  let image = $("#" + form_id + " [for='" + name + "'] .file_upload_image").eq(index);
  let overlay = image.find(".file_upload_progress_overlay");
  if (overlay.length == 0) {
    let html = "<div class='file_upload_progress_overlay'>";
    html += "<div class='file_upload_progress_bar'><p></p></div></div>";
    image.append(html);
    overlay = image.find(".file_upload_progress_overlay");
  }

  // Show the progress
  let percent = Math.round(progress * 100);
  overlay.find(".file_upload_progress_bar").css("width", percent + "%");
  let text_progress = percent + "%";
  if (stage == "upload" && progress == 1) {
    text_progress = "Processing";
  } else if (stage == "post") {
    text_progress = "Uploaded";
    image.data("uploaded", 1);
    image.find(".file_upload_remove").remove();
  }
  overlay.find("p").html(text_progress);
}

// Hide the crosses for deleting files while we are uploading
function show_start_file_upload(form_id) {
  $("#" + form_id + " .file_upload_remove").hide();
}

// Show them again at the end
function show_finish_file_upload(form_id) {
  $("#" + form_id + " .file_upload_remove").show();
  let removes = $("#" + form_id + " .file_upload_remove");
  for (let i=0; i<removes.length; i++) {
    removes.eq(i).parent().find(".file_upload_progress_overlay").remove();
  }
}

// Directly upload a file (.jpg)
function direct_data_upload(input_data) {
  var json_data = {};
  json_data.data = input_data.file_data;
  json_data.name = input_data.file_name;
  
  // Send the request
  $.ajax({
    type: "POST",
    url: input_data.upload_end_point,
    processData: false,
    contentType: 'application/json',
    data: JSON.stringify(json_data),
    
    success: function(data, result) {
      input_data.success(data);
    },
    error: function(request, message, error) {
      input_data.error(message, error);
    }
  });
}

// Read a file that has been selected
function read_file_from_uploader(input_id, callback) {
  var reader = new FileReader();
  reader.onload = function(event) {
    callback(event.target.result);
  }
  reader.readAsText(upload_files[input_id][0]);
}

// Upload these files to the server
// Iterate over each file input, and each file, upload them and return file names
function upload_form_files(handler, callback) {

  // Prepare the results
  var uploader = {};
  uploader.results = {};

  // Upload all of the files
  form_id = handler.form_id;
  uploader.upload = function() {
    uploader.file_uploads = [];
    $("#" + form_id + " .file_upload_input").each(function() {
      uploader.file_uploads.push($(this));
    });
    if (!uploader.check_sizes()) {
      callback(false);
      return;
    }
    uploader.upload_batch(0);
    handler.filenames = uploader.results;
  }

  // Check the file sizes
  uploader.check_sizes = function() {
    
    // No small files at start
    let small_file = 0;
    let message = "";

    // Go through each of the inputs
    for (var i=0; i<uploader.file_uploads.length; i++) {
      var input = uploader.file_uploads[i];

      // Returns form error if a file is too large
      if (typeof(input.data("max-file-size-mb")) !== "undefined") {
        var id = input.attr('id');
        var max_size = input.data("max-file-size-mb");
        for (var j=0; j<upload_files[id].length; j++) {
          if (upload_files[id][j].size > max_size*1024*1024) {
            show_form_error(form_id, "Files should be smaller than " + max_size + "Mb");
            return false;
          }
        }
      }

      // Returns form error if a file is too large
      // This is if we have specific types of files with different limits
      if (typeof(input.data("max-size-file-type-one")) !== "undefined") {
        var id = input.attr('id');
        var types = input.data("file-type-one").split(",");
        var max_size = input.data("max-size-file-type-one");
        for (var j=0; j<upload_files[id].length; j++) {
          let extension = "." + upload_files[id][j].name.split(".").pop();
          if (types.indexOf(extension) !== -1 && upload_files[id][j].size > max_size*1024*1024) {
            show_form_error(form_id, input.data("file-type-message-one") + " should be smaller than " + max_size + "Mb");
            return false;
          }
        }
      }

      // Returns form error if a file is too large
      // This is if we have specific types of files with different limits
      if (typeof(input.data("max-size-file-type-two")) !== "undefined") {
        var id = input.attr('id');
        var types = input.data("file-type-two").split(",");
        var max_size = input.data("max-size-file-type-two");
        for (var j=0; j<upload_files[id].length; j++) {
          let extension = "." + upload_files[id][j].name.split(".").pop();
          if (types.indexOf(extension) !== -1 && upload_files[id][j].size > max_size*1024*1024) {
            show_form_error(form_id, input.data("file-type-message-two") + " should be smaller than " + max_size + "Mb");
            return false;
          }
        }
      }

      // If any files are smaller than expected, flag it
      if (typeof(input.data("min-expected-file-size-mb")) != "undefined" 
        && typeof(input.data("min-expected-file-size-message")) != "undefined" ) {
        var id = input.attr('id');
        var expected_size = input.data("min-expected-file-size-mb");
        for (var j=0; j<upload_files[id].length; j++) {
          if (upload_files[id][j].size < expected_size*1024*1024) {
            small_file += 1;    
          }
        }

        // Start the message and include the size
        message = input.data("min-expected-file-size-message");
        message = message.replace("<size>", input.data("min-expected-file-size-mb"));
      }
    }
    
    // If there was a smaller than expected file, 
    if (small_file) {
      
      // Fix the grammar and insert the number of affected files
      let files = small_file == 1 ? "1 file" : small_file + " files";
      message = message.replace("<files>", files);
      
      // Prompt the user to confirm it is correct before proceeding
      if (!confirm(message)) {
        return false;
      }
    };

    return true;
  }

  // Upload a whole batch of files
  uploader.upload_batch = function(index) {

    // Check if we have completed all the batches
    uploader.current_batch = index;
    if (uploader.file_uploads.length == index) {
      callback(true, uploader.results);
      return;
    }

    // Extract the data for the upload
    var input = uploader.file_uploads[index];
    var id = input.attr('id');
    var name = input.attr('name');
    uploader.current_files = upload_files[id];
    uploader.results[name] = [];
    uploader.current_name = name;
    uploader.current_id = id;

    // Upload the file
    uploader.upload_file(input, 0);
  }

  // Upload an individual file
  uploader.upload_file = function(input, index) {

    // Check if we have completed this batch or not
    if (uploader.current_files.length == index) {
      uploader.upload_batch(uploader.current_batch + 1);
      return;
    }

    // Skip this file if it is already uploaded
    if (uploader.current_files[index].uploaded) {
      uploader.upload_file(input, index + 1);
      return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
      if (reader.single_file) {
        if (typeof handler.upload_end_point !== "undefined") {
          uploader.send_whole_file(event.target.result, input, index);
        } else if (typeof handler.upload_url_generator !== "undefined") {
          uploader.send_put_file(event.target.result, input, index);
        }
      } else {
        uploader.send_file_in_chunks(event.target.result, input, index);
      }
    }

    // If there is an error uploading
    reader.onerror = function(event) {
      show_form_error(form_id, "Error uploading file");
      callback(false);
    }

    // If it is a small file upload in one go
    reader.single_file = true;
    if (typeof handler.upload_end_point !== "undefined") {
      reader.readAsDataURL(uploader.current_files[index]);
    } else if (typeof handler.upload_url_generator !== "undefined") {
      reader.readAsArrayBuffer(uploader.current_files[index]);
    }
  }

  // Send the whole file to the server
  uploader.send_whole_file = function(file_data, input, index) {

    // Prepare the data to send to the server
    var json_data = {};
    json_data.data = file_data;
    json_data.name = uploader.current_files[index].name;
    if (typeof(input.attr('accept')) != "undefined") {
      json_data.type = input.attr('accept');
    }

    // Send the request
    $.ajax({
      type: "POST",
      url: handler.upload_end_point,
      processData: false,
      contentType: 'application/json',
      data: JSON.stringify(json_data),
      xhr: function() {
        var request = new window.XMLHttpRequest();
        request.upload.addEventListener("progress", function(event) {
          if (event.lengthComputable) {
            let progress = event.loaded / event.total;
            update_file_upload_progress(form_id, uploader.current_id, index, "upload", progress.toFixed(2));
          }
        }, false);
        return request;
      },
      success: function(data, result) {
        uploader.results[uploader.current_name].push(data);
        handler.file_upload_status(uploader.current_id, index, 1, uploader.current_files.length, data, json_data.name, function() {
          if (typeof handler.preserve_file_name !== "undefined") {
            handler.values[handler.preserve_file_name] = json_data.name;
          }
          uploader.current_files[index].uploaded = true;
          uploader.upload_file(input, index + 1);
        });
      },
      error: function(request, message, error) {
        let display_message = request.responseText.length > 0 ? request.responseText : message;
        show_form_error(form_id, "Error uploading file: " + display_message);
        callback(false);
      }
    });
  }

  // Send the file up using a put request
  uploader.send_put_file = function(file_data, input, index) {
    
    // Get the content type
    let content_type = check_content_type(uploader.current_files[index]);
    handler.upload_url_generator(content_type, function(url_data) {
      uploader.send_put_file_attempt(file_data, input, index, url_data, 1);
    });
  }

  // Attempt to upload a file using a put request
  uploader.send_put_file_attempt = function(file_data, input, index, url_data, attempt) {

    // Create a request
    const request = new XMLHttpRequest();
    request.open("PUT", url_data.upload_url);
    request.setRequestHeader('Content-Type', url_data.content_type);

    // Send progress updates off
    request.upload.addEventListener("progress", function(event) {
      if (event.lengthComputable) {
        let progress = event.loaded / event.total;
        update_file_upload_progress(form_id, uploader.current_id, index, "upload", progress.toFixed(2));
      }
    }, false);

    // Check if the upload has finished
    let retried = false;
    request.onreadystatechange = function() {

      // Skip if we have already started the retry process
      if (retried) {
        return;
      }

      // Skip if the response isn't finished
      if (request.readyState != 4) {
        return;
      }

      // If there was no response, there was an internet issue
      if (request.status == 0) {

        // Only try a few times
        if (attempt == 5) {
          show_form_error(form_id, "No response from server. Check your internet.");
          callback(false);
          return;
        }

        // Try again after 2 seconds
        retried = true;
        setTimeout(function() {
          uploader.send_put_file_attempt(file_data, input, index, url_data, attempt + 1);
        }, 2000);
        return;
      }

      // There was an error
      if (request.status != 200) {
        show_form_error(form_id, request.responseText);
        callback(false);
        return;
      }

      // Success
      let name = uploader.current_files[index].name;
      uploader.results[uploader.current_name].push(url_data.filename);
      handler.file_upload_status(uploader.current_id, index, 1, uploader.current_files.length, url_data.filename, name, function() {
        uploader.current_files[index].uploaded = true;
        uploader.upload_file(input, index + 1);
      });
    };

    // Send the data
    request.send(file_data);
  }

  // Send the whole file to the server
  uploader.send_file_in_chunks = function(file_data, input, index) {
    var number_of_chunks = Math.ceil(file_data.length / (1024*1024));
    var json_data = {};
    json_data.name = uploader.current_files[index].name;
    if (typeof(input.attr('accept')) != "undefined") {
      json_data.type = input.attr('accept');
    }
    uploader.send_chunk(json_data, file_data, 0, number_of_chunks, index, function(data, result) {
      uploader.results[uploader.current_name].push(data);
      handler.file_upload_status(uploader.current_id, index, 1, uploader.current_files.length, data, "", function() {
        uploader.current_files[index].uploaded = true;
        uploader.upload_file(input, index + 1);
      });
    }, function() {
      show_form_error(form_id, "Error uploading file");
      callback(false);
    });
  }

  // Send a single chunk
  uploader.send_chunk = function(base_json, original_data, index, number_of_chunks, file_index, success, failure) {

    // Prepare the data to send to the server
    var json_data = $.extend({}, base_json);
    var last_chunk = index == number_of_chunks - 1;
    if (last_chunk) {
      json_data.data = original_data.slice(index*1024*1024);
    } else {
      json_data.data = original_data.slice(index*1024*1024, (index+1)*1024*1024);
    }
    json_data.data = btoa(json_data.data);
    json_data.index = index;
    json_data.last_file = last_chunk;

    // Send the request
    $.ajax({
      type: "POST",
      url: handler.upload_end_point,
      processData: false,
      contentType: 'application/json',
      data: JSON.stringify(json_data),
      success: function(data, result) {
        if (!last_chunk) {
          base_json.filename = data;
          handler.file_upload_status(uploader.current_id, file_index, (index + 1) / number_of_chunks, uploader.current_files.length, data, "", function() {
            uploader.send_chunk(base_json, original_data, index + 1, number_of_chunks, file_index, success, failure);
          });
        } else {
          success(data, result);
        }
      },
      error: function() {
        failure();
      }
    });
  }

  uploader.upload();
}


//==============================================================================
//
// Card payments
//
//==============================================================================

// Initialise the cards
function initialise_cards() {
  $(".payment_card").click(function() {
    if (!$(this).hasClass("selected_card")) {
      $(this).parent().find(".selected_card").removeClass("selected_card");
      $(this).addClass("selected_card");
    }
  })
}


//==============================================================================
//
// Text areas
//
//==============================================================================

// Initialise all the text areas so they auto expand
function initialise_text_areas() {

  // Make sure we resize on changes
  $(".textarea_input[data-auto-expand=1]").on("input", function() {
    resize_text_height(this);
  });
  $(".textarea_input[data-auto-expand=1]").each(function() {
    resize_text_height(this);
  });

  // Make sure we update the count if we input a character
  $(".textarea_input").each(function() {
    if (typeof($(this).data("show-count")) != "undefined") {
      $(this).next().html($(this).val().length);
      $(this).keyup(function() {
        $(this).next().html($(this).val().length);
      });
    }
  });

  // Make sure any visibility changes trigger the right things
  $(".textarea_input[data-auto-expand=1]").on("visibility_change", function(event) {
    resize_text_height(this);
    event.stopPropagation();
  });
}

// Resize the height
function resize_text_height(area) {
  $(area).css("height", "auto");
  let height = area.scrollHeight + 10;
  if (typeof($(area).data("show-count")) != "undefined") {
    height += 20;
  }
  if (height < 100) {
    height = 100;
  }
  $(area).css("height", height + "px");
}
