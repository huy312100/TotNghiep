export const ConvertToTimeAgo = (timestamp) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = Date.now() - timestamp;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " giây trước";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " phút trước";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " giờ trước";
  } else if (elapsed < msPerMonth) {
    return "khoảng " + Math.round(elapsed / msPerDay) + " ngày trước";
  } else if (elapsed < msPerYear) {
    return "khoảng " + Math.round(elapsed / msPerMonth) + " tháng trước";
  } else {
    return "khoảng " + Math.round(elapsed / msPerYear) + " năm trước";
  }
};

export const ConvertToTimeAgoInComment = (timestamp) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = Date.now() - timestamp;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " giây ";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " phút ";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " giờ ";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " ngày ";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " tháng ";
  } else {
    return Math.round(elapsed / msPerYear) + " năm ";
  }
};

export const ConvertTimestamp = (timestamp) => {
  var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
      ampm = 'AM',
      time;
  if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
  } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
  } else if (hh == 0) {
      h = 12;
  }
  // ie: 2014-03-24, 3:00 PM
  time = dd + '-' + mm + '-' + yyyy + ', ' + h + ':' + min + ' ' + ampm;
  return time;
};
