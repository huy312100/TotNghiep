function TimeAgo(ts) {
    var diff = Math.floor((Date.now() - ts) / 1000);
    var interval = Math.floor(diff / 31536000);
  
    if (interval >= 1) {
      return interval + " năm trước";
    }
    interval = Math.floor(diff / 2592000);
    if (interval >= 1) {
      return interval + " tháng trước";
    }
    interval = Math.floor(diff / 604800);
    if (interval >= 1) {
      return interval + " tuần trước";
    }
    interval = Math.floor(diff / 86400);
    if (interval >= 1) {
      return interval + " ngày trước";
    }
    interval = Math.floor(diff / 3600);
    if (interval >= 1) {
      return interval + " giờ trước";
    }
    interval = Math.floor(diff / 60);
    if (interval >= 1) {
      return interval + " phút trước";
    }
    return "< 1 phút trước";

}

export default TimeAgo;