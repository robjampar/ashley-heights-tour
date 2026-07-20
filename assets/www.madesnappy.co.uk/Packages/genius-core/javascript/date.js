//==============================================================================
//
// Basic date functions
//
//==============================================================================

// Check if this is a future date
function is_future_date(date) {
  var date_object = new Date(date);
  var now = new Date(todays_date);
  return date_object > now && !is_today(date);
}

// Check if this is a past date
function is_past_date(date) {
  var date_object = new Date(date);
  var now = new Date(todays_date);
  return date_object < now && !is_today(date);
}

// Check if this is todays date
function is_today(date) {
  var date_object = new Date(date);
  var now = new Date(todays_date);
  return date_object.toDateString() == now.toDateString();
}

// Check if this is todays date
function month_date(date) {
  var date_object = new Date(date);
  return date_object.getDate();
}

// Check if date_1 is greater than date_2
function is_greater_date(date_1, date_2) {
  var date_object_1 = new Date(date_1);
  var date_object_2 = new Date(date_2);
  return date_object_1 > date_object_2;
}

// Is this a null date
function is_null_date(date) {
  return date == "0000-00-00";
}

// Add a number of months to a date
function add_months(date, months) {
  var date_object = new Date(date);
  var day = date_object.getDate();
  date_object.setDate(1);
  date_object.setMonth(date_object.getMonth() + months);
  date_object.setDate(Math.min(day, get_days_in_month(date_object)));
  return format_date_object(date_object);
}

// Add a number of days to a date
function add_days(date, days) {
  var date_object = new Date(date);
  date_object.setDate(date_object.getDate() + days);
  return format_date_object(date_object);
}

// Get the number of days in this month
function get_days_in_month(date) {
  var date_object = new Date(date);
  return new Date(date_object.getFullYear(), date_object.getMonth(), 0).getDate();
}

// Add a number of years to a date
function add_years(date, years) {
  return add_months(date, 12*years);
}

// Format date object to date
function format_date_object(date_object) {
  var day = "" + date_object.getDate();
  if (day.length < 2) {
    day = "0" + day;
  }
  var month = "" + (date_object.getMonth() + 1);
  if (month.length < 2) {
    month = "0" + month;
  }
  var year = date_object.getFullYear();
  return year + "-" + month + "-" + day;
}
