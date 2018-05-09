// console.log(advancedTypeStr, partUrlStr)
$(document).ready(function() {
	var advancedTypeStr = $('#advancedType').val(); //进修类型
	var url1 = []; //反填地址
	var url2 = []; //反填地址
	var url3 = []; //反填地址

	//获取上传提示语
	$.ajax({
		type: "POST",
		url: "/advanced/student/getConfigList.htm",
		dataType: "json",
		data: {
			"advancedType": advancedTypeStr,
			"advancedConfigType": 1,
		},
		success: function(obj) {
			if(obj.resCode == 200) {
				if(obj.model.list[0].advancedConfigValue) {
					$('#advancedConfig').text(obj.model.list[0].advancedConfigValue);
				} else {
					$('#oldMsg').html("<b class='notice doctor-show'>请上传盖章后的申请表、医师执业证书、最高学历的毕业证书，务必按照医院招生要求上传完整！！！</b><b class='notice nurse-show'>图片一共包括进修申请表、相关学历毕业证书(大专或本科直到最高学历)及护士执业证书，请注意核实。</b>");
					if(advancedTypeStr == 1) {
						$('.doctor-show').css('display', 'block');
					} else if(advancedTypeStr == 2) {
						$('.nurse-show').css('display', 'block');
					}
				};
			} else if(obj.login_status == "401") {
				window.location.href = "/web/login";
			} else {
				layer.msg(obj.resMsg);
			}
		},
		error: function(e) {},
	});

	//获取反填地址列表
	$.ajax({
		type: "POST",
		async: false,
		url: "/advanced/student/getAccessoryList.htm",
		dataType: "json",
		data: {
			"advancedType": advancedTypeStr,
		},
		success: function(obj) {
			if(obj.resCode == 200) {
				for(var i = 0; i < obj.model.advancedApplyAccessoryModels.length; i++) {
					if(obj.model.advancedApplyAccessoryModels[i].accessoryType == 0) {
						url1.push(obj.model.advancedApplyAccessoryModels[i].accessoryUrl);
					} else if(obj.model.advancedApplyAccessoryModels[i].accessoryType == 1) {
						url2.push(obj.model.advancedApplyAccessoryModels[i].accessoryUrl);
					} else if(obj.model.advancedApplyAccessoryModels[i].accessoryType == 2) {
						url3.push(obj.model.advancedApplyAccessoryModels[i].accessoryUrl);
					};
				}
				// 返填图片
                url1.forEach(function (element) {
                    $('#uploadList1').append('<li class="exptPhotoWrap"><img src="' + element + '" width="120" height="120" />'
                        +'<div class="hoverimg" onclick="$(this).prev().click()"></div><button type="button" class="picdelBtn" onclick="$(this).parent().remove();"></button></li>');
                });
				url2.forEach(function (element) {
                    $('#uploadList2').append('<li class="exptPhotoWrap"><img src="' + element + '" width="120" height="120" />'
                        +'<div class="hoverimg" onclick="$(this).prev().click()"></div><button type="button" class="picdelBtn" onclick="$(this).parent().remove();"></button></li>');
                });
                url3.forEach(function (element) {
                    $('#uploadList3').append('<li class="exptPhotoWrap"><img src="' + element + '" width="120" height="120" />'
                        +'<div class="hoverimg" onclick="$(this).prev().click()"></div><button type="button" class="picdelBtn" onclick="$(this).parent().remove();"></button></li>');
                })
			} else if(obj.login_status == "401") {
				window.location.href = "/web/login";
			} else {
				layer.msg(obj.resMsg);
			}
		},
		error: function(e) {}
	});
});

// 上传图片
function uploadImg (item) {
    var partUrlStr = $('#partUrl').val();
    var fileObj = document.getElementById("uploadInput" + item).files; // js 获取文件对象
    if (!fileObj || fileObj.length <= 0) {
        alert("请选择图片");
        return;
    }
    var formFile = new FormData();
    for(var i=0;i<fileObj.length;i++){
    	// 限制图片格式以及大小
        var arr = fileObj[i].type.split('/')
        if (arr[0] && arr[0] == 'image' && arr[1]) {
            var suffix = arr[1].toLowerCase()
            if (suffix == 'jpg' || suffix == 'png' || suffix == 'jpeg') {
                if(fileObj[i].size >= 2 * Math.pow(1024,2)) {
                    alert("请上传小于2M的图片");
                    return
                } else {
                    formFile.append("file[" + i + "]", fileObj[i]);
                }
            } else {
                alert("请上传jpg或png图片");
                return
            }
        } else {
            alert("请选择图片文件");
            return
        }
    }
    $.ajax({
        type: "POST",
        async: true,
        url: partUrlStr + "/ci/upload.htm",
        dataType: "json",
        data: formFile,
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success: function (obj) {
            if(obj.resCode == 200) {
                obj.model.successList.forEach(function (element) {
                    $('#uploadList' + item).append('<li class="exptPhotoWrap"><img src="' + element.url + '" width="120" height="120" />'
                        +'<div class="hoverimg" onclick="$(this).prev().click()"></div><button type="button" class="picdelBtn" onclick="$(this).parent().remove();"></button></li>');
                });
                $("#uploadList"+item).viewer();
            } else if(obj.login_status == "401") {
                window.location.href = "/web/login";
            } else {
                layer.msg(obj.resMsg);
            }
        },
        error: function(e) {}
    })
    $('#uploadInput' + item).val("");
}


// 提交
function submitScan(id){
    var advancedTypeStr = $('#advancedType').val(); //进修类型
    var partUrlStr = $('#partUrl').val();
	if($('#uploadList1').find('li').length == 0) {
		layer.msg("请上传审核盖章后的申请表");
		return;
	};
	if($('#uploadList2').find('li').length == 0) {
		layer.msg("请上传毕业证书");
		return;
	};
	if($('#uploadList3').find('li').length == 0) {
		if(advancedTypeStr == '1'){
			layer.msg("请上传绿色封面的医师执业证书及其他证书");
		}else {
			layer.msg("请上传护士执业证书、职称证书及其他证书");
		}
		return;
	};
	var dataStr = {};
	dataStr["advancedType"] = advancedTypeStr;
	for(var i = 0; i < $('#uploadList1').find('li').length; i++) {
		dataStr["advancedApplyAccessoryModels[" + i + "].accessoryType"] = 0;
		dataStr["advancedApplyAccessoryModels[" + i + "].accessoryUrl"] = $('#uploadList1').find('li').eq(i).children("img").get(0).src;
	};
	for(var j = $('#uploadList1').find('li').length; j < ($('#uploadList1').find('li').length + $('#uploadList2').find('li').length); j++) {
		dataStr["advancedApplyAccessoryModels[" + j + "].accessoryType"] = 1;
		var index = j - $('#uploadList1').find('li').length;
		dataStr["advancedApplyAccessoryModels[" + j + "].accessoryUrl"] = $('#uploadList2').find('li').eq(index).children("img").get(0).src;
	};
	var n = $('#uploadList1').find('li').length + $('#uploadList2').find('li').length;
	for(var k = n; k < ($('#uploadList1').find('li').length + $('#uploadList2').find('li').length + $('#uploadList3').find('li').length); k++) {
		dataStr["advancedApplyAccessoryModels[" + k + "].accessoryType"] = 2;
		var index3 = k - n;
		dataStr["advancedApplyAccessoryModels[" + k + "].accessoryUrl"] = $('#uploadList3').find('li').eq(index3).children("img").get(0).src;
	};
	$(id).attr('disabled', 'disabled');
	$.ajax({
		type: "POST",
		url: partUrlStr + "/advanced/student/saveAccessory.htm",
		dataType: "json",
		data: dataStr,
		success: function(obj) {
			if(obj.resCode == 200) {
				window.location.href = partUrlStr + "/advanced/student/loginByStatus.htm?advancedType=" + advancedTypeStr;
			} else if(obj.login_status == "401") {
				window.location.href = "/web/login";
			} else {
				layer.msg(obj.resMsg);
			}
		},
		error: function(e) {},
	});
}

//上一步
function prevStep() {
    var advancedTypeStr = $('#advancedType').val(); //进修类型
    var partUrlStr = $('#partUrl').val();
    window.location.href = partUrlStr + "/advanced/student/downapplyForm.htm?advancedType=" + advancedTypeStr;
}