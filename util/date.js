// 获取本周（今天开始往后7天）日期、星期
var weekdays = [];
function formatDate(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1);
  var day = date.getDate();
	var week = date.getDay();
	switch(week) {
		case 0:
			week = '日'
			break;
		case 1:
			week = '一'
			break;
		case 2:
			week = '二'
			break;
		case 3:
			week = '三'
			break;
		case 4:
			week = '四'
			break;
		case 5:
			week = '五'
			break;
		case 6:
			week = '六'
			break;
	}
  if (day.toString().length == 1) {
    day = '0' + day
  }
  if (month.toString().length == 1) {
    month = '0' + month
  }
  return [year, month, day, week]
}
function addDate(date, n) {
  date.setDate(date.getDate() + n);
  return date;
}
function setDate(date) {
  weekdays = []
  for (var i = 0; i < 7; i++) {
    weekdays.push(formatDate(i == 0 ? date : addDate(date, 1)));
  }
  return weekdays
}