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

export const ConvertToTimeAgoGeneral = (timestamp) => {
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
  var d;
  // Convert the passed timestamp to milliseconds
  if(timestamp.toString().length === 10){
    d= new Date(timestamp * 1000);
  }  
  else if(timestamp.toString().length === 13){
    d=new Date(timestamp);
  }

  var yyyy = d.getFullYear();
  var mm = ('0' + (d.getMonth() + 1)).slice(-2);  // Months are zero based. Add leading 0.
  var dd = ('0' + d.getDate()).slice(-2);         // Add leading 0.
  var hh = d.getHours();
  var h = hh;
  var min = ('0' + d.getMinutes()).slice(-2);   // Add leading 0.
  var time;
  if (hh < 10) {
    h = '0'+hh ;
  } else  {
    h = hh;
  }

  // ie: 2014-03-24, 15:00
  time = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + min ;
  return time;
};

export const ConvertDateDDMMYY =(str) => {
  let yy = str.slice(0,4);
  let mm = str.slice(5,7);
  let dd = str.slice(8,10);

  console.log(dd,mm,yy);
  
  const date = dd + '-' + mm + '-' + yy;
  return date;
}
