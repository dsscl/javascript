//添加分页
function pagination(pageNo,pageCount,url) {
	let htmlstr = "";
	let pagebar = "";
	//添加分页的数据 首页
	pagebar += '<nav><ul class="pagination"><li ';
	if(pageNo == 1) {
		pagebar += ' class="disabled" ><a href="javascript:;"';
	} else {
		pagebar += '><a href="'+url+'?pageNo=1"';
	}
	pagebar += ' aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
	//中间页面
	let stpage, endpage;
	if(pageCount <= 5) {
		endpage = pageCount;
		stpage = 1;
	} else {
		endpage = 5;
		if((pageNo >= 3) && (pageNo < (pageCount - 1))) {
			stpage = pageNo - 2;
		} else if(pageNo >= (pageCount - 1)) {
			stpage = pageCount - 4;
		} else {
			stpage = 1;
		}
	}
	for(let j = 1; j <= endpage; j++) {
		pagebar += '<li ';
		//页数为当前页的时候 
		if(stpage == pageNo) {
			pagebar += ' class="active"';
		}
		pagebar += '><a href="'+url+'pageNo=' + stpage + '">' + stpage + ' <span class="sr-only">(current)</span></a></li>';
		stpage += 1;
	}
	//尾页
	pagebar += '<li';
	if(pageNo == pageCount) {
		pagebar += ' class="disabled" ><a href="javascript:;"';
	} else {
		pagebar += '><a href="'+url+'pageNo=' + pageCount + '"';
	}
	pagebar += ' aria-label="Next"><span aria-hidden="true">»</span></a></li></nav>';

	$("#m-pagebar").html(pagebar);
}

module.exports = {
  pagination: pagination
}