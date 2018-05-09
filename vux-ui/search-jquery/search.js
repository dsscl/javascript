$(document).ready(function() {
  changeSearch();
  clearSearch();
  cancelSearch();
  searchIng();
})
// 监听搜索框实时变化
function changeSearch() {
  $('.weui-search-bar__form').bind('click change input porpertychange', function(e) {
    if(e.type === 'click') {
      $('.weui-search-bar').addClass('weui-search-bar_focusing')
      $(this).find('.weui-search-bar__input').focus()
    }
    if($('.weui-search-bar__input').val()) {
        $('.weui-search-bar__cancel-btn').hide()
        $('#searchIn').show()
        $('.weui-icon-clear').show()
    } else {
        $('.weui-search-bar__cancel-btn').hide()
        $('#cancelIn').show()
        $('.weui-icon-clear').hide()
    }
  });
}

// 清空搜索框
function clearSearch() {
$('.weui-icon-clear').bind('click', function() {
  $('#searchVal').val('')
  $('.weui-search-bar__cancel-btn').hide()
  $('#cancelIn').show()
})
}

// 取消搜索框
function cancelSearch() {
  $('#cancelIn').bind('click', function() {
      $('.weui-search-bar').removeClass('weui-search-bar_focusing');
      $('.weui-search-bar__cancel-btn').hide()
  })
}

// 搜索
function searchIng() {
  $('#searchIn').bind('click', function() {
    console.log('searching......')
  })
}