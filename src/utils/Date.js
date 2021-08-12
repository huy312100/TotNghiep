export const CurrentDateYYMMDD = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return today;
};

export const NextMonth = (month, year) => {
  var newMonth = month + 1;
  var newYear = year;
  if (newMonth > 12) {
    newMonth = 1;
    newYear = newYear + 1;
  }
  return [newMonth, newYear];
};

export const PreviousMonth = (month, year) => {
  var newMonth = month - 1;
  var newYear = year;
  if (newMonth <= 0) {
    newMonth = 12;
    newYear = newYear - 1;
  }
  return [newMonth, newYear];
};

export const ConvertTimestampToVNTime = (timestamp) => {
  var d;
  // Convert the passed timestamp to milliseconds
  if (timestamp.toString().length === 10) {
    d = new Date(timestamp * 1000);
  } else if (timestamp.toString().length === 13) {
    d = new Date(timestamp);
  }

  var yyyy = d.getFullYear();
  var mm = ("0" + (d.getMonth() + 1)).slice(-2); // Months are zero based. Add leading 0.
  var dd = ("0" + d.getDate()).slice(-2); // Add leading 0.
  var hh = d.getHours();
  var h = hh;
  var min = ("0" + d.getMinutes()).slice(-2); // Add leading 0.
  var time;
  if (hh < 10) {
    h = "0" + hh;
  } else {
    h = hh;
  }

  // ie: 2014-03-24, 15:00
  time = dd + "/" + mm + "/" + yyyy + " " + h + ":" + min;
  return time;
};

export const ConvertTimestampToDate = (timestamp) => {
  var d;
  // Convert the passed timestamp to milliseconds
  if (timestamp.toString().length === 10) {
    d = new Date(timestamp * 1000);
  } else if (timestamp.toString().length === 13) {
    d = new Date(timestamp);
  }

  var yyyy = d.getFullYear();
  var mm = ("0" + (d.getMonth() + 1)).slice(-2); // Months are zero based. Add leading 0.
  var dd = ("0" + d.getDate()).slice(-2); // Add leading 0.
  var hh = d.getHours();
  var h = hh;
  var min = ("0" + d.getMinutes()).slice(-2); // Add leading 0.
  var time;
  if (hh < 10) {
    h = "0" + hh;
  } else {
    h = hh;
  }

  time = yyyy + "-" + mm + "-" + dd ;
  return time;
};

export const ConvertTimestampToVNTimeWithoutTime = (timestamp) => {
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

  time = dd + '-' + mm + '-' + yyyy ;
  return time;
};

export const ParseDDMMYYYYToTimestamp = (str) =>{
  var initial = str.split(/\//);
  var yyyymmdd = [ initial[2], initial[1], initial[0] ].join('-'); //=> 'mm/dd/yyyy'

  return new Date(yyyymmdd).getTime();
};
