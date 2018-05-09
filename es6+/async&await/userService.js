/*引用全局变量与常量*/
const user = require('../model/user'); //科室模块api
const insertHtml = require('../util/insertHtml');
const consuit = require('../model/consuit');
const hosId = localStorage.getItem("hospitalId");
const token = getCookie("user-token");
const config = require('../../swagger/config.json');
let isweb = "2";
let isDisplay;
let ua = navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    isweb = '4';
} else if (/iphone|ipad|ipod/.test(ua)) {
    isweb = '3';
}
/*引用全局变量与常量 end*/

/*显示患者详情*/
async function insertUserDetails(target) {
    const res = await user.getUserDetials(token);
    const resCode = res.code;
    if (resCode == 200) {
        insertHtml.doLayout(target, res.data);
    } else {
        if (resCode == 505) {
            openLogin();
        } else {
            alert("登录失效");
        }
    }
    return res;
}
/*显示患者详情 end*/

/*编辑患者头像*/
async function editUserPhoto(target, userModel) {
    const res = await user.editUserPhoto(userModel, token);
    const resCode = res.code;
    if (resCode == 200) {} else {
        if (resCode == 505) {
            openLogin();
        } else {
            alert("上传失败,稍后再试");
        }
    }
    return res;
}
/*编辑患者头像 end*/

/*发送一条短信*/
async function sendSingleMsg(phone, content) {
    const res = await user.sendSingleMsg(phone, content);
    const resCode = res.code;
    if (resCode != 200) {
        console.log("sendSingleMsg:错误代码" + resCode);
    }
    return res;
}
/*发送一条短信 end*/

/*验证登录*/
async function checkToken(token) {
    const res = await user.checkToken(token);
    const resCode = res.code;
    if (resCode != 200) {
        if (resCode == 505) {
            openLogin();
        } else {
            alert("登录失效");
        }
    }
    return res;
}
/*验证登录 end*/

/*判断用户通知*/
async function checkNotifyByToken(token) {
    const res = await user.checkNotifyByToken(token);
    const resCode = res.code;
    if (resCode != 200) {
        /*if(resCode == 505) {
        	openLogin();
        } else {
        	alert("登录失效");
        }*/
    }
    return res;
}
/*判断用户通知 end*/

/*获取患者聊天*/
async function goToConsuitByUser(consuitId, type) {
    const res = await user.getPhoneConsuitByUser(token, consuitId);
    const resCode = res.code;
    if (resCode == 200) {
        let url = JSON.parse(res.data.url);
        let str = window.location.href.split("?")[0];
        let hoststr = str.substr(0, str.lastIndexOf("/"));
        let fromUrl = str.substr(str.lastIndexOf("/") + 1, str.lastIndexOf(".html"));
        url.doctorMsg.evaluateUrl = hoststr + "/phone_evaluate.html?" + consuitId + "&" + fromUrl;
        url.doctorMsg.apiUrl = config.hlwyy + "/UpdataConsuitApi";
        url.doctorMsg.patientListUrl = hoststr + "/phone_patientCard.html?" + consuitId;
        let apiData = {
            "token": token,
            "id": url.doctorMsg.consuitId,
            "status": url.doctorMsg.satatus
        }
        url.doctorMsg.apiData = apiData;
        localStorage.setItem('consultParams', JSON.stringify(url));
        sessionStorage.setItem('token', token)
        const loginInfo = {
            'sdkAppID': url.v7,
            'appIDAt3rd': url.v7,
            'accountType': url.v8,
            'identifier': url.v1,
            'identifierNick': url.v2,
            'userSig': url.v6
        };
        const listeners = {
            "onConnNotify": function() {},
            "onMsgNotify": function() {}
        }
        const options = {
            'isAccessFormalEnv': true,
            'isLogOn': true
        };
        if (type == "1") {
            webim.login(
                loginInfo,
                listeners,
                options,
                function(res) {
                    var options = {
                        'GroupId': url.v5,
                        'Owner_Account': url.v1,
                        'Type': 'Public', //Private/Public/ChatRoom/AVChatRoom
                        'MemberList': url.doctorMsg.memberList,
                        'Name': url.v5,
                        'ApplyJoinOption': "FreeAccess"
                    };
                    webim.createGroup(
                        options,
                        function(resp) {
                            if (isweb == "4") {
                                window.location.href = 'phone_chatRoom.html';
                            } else {
                                rbk.platform.callPlugin("TextFunctionPlugins", "PluginTextArrayArgu", url, function() {
                                    sessionStorage.setItem('consuitPatient', '1')
                                })
                            }
                        },
                        function(err) {
                            if (isweb == "4") {
                                window.location.href = 'phone_chatRoom.html';
                            } else {
                                rbk.platform.callPlugin("TextFunctionPlugins", "PluginTextArrayArgu", url, function() {
                                    sessionStorage.setItem('consuitPatient', '1')
                                })
                            }
                        }
                    );
                },
                function(err) {
                    console.log(err.ErrorInfo);
                }
            );
        } else {
            if (isweb == "4") {
                window.location.href = 'phone_chatRoom.html';
            } else {
                rbk.platform.callPlugin("TextFunctionPlugins", "PluginTextArrayArgu", url, function() {})
            }
        }
        //		rbk.platform.callPlugin("NativeFunctionPlugins", "PluginVideoArrayArgu", url, function() {});
    } else {
        if (resCode == 505) {
            openLogin();
        } else {
            alert("获取聊天失败");
        }
    }
}
/*获取患者聊天 end*/

/*用户修改密码*/
async function setPasswordPost(loginName, passowrd, newPassword) {
    const res = await user.setPasswordPost(loginName, token, passowrd, newPassword);
    const resCode = res.code;
    if (resCode != 200) {
        if (resCode == 505) {
            openLogin();
        } else {
            alert("登录失效");
        }
    }
    return res;
}
/*用户修改密码 end*/

/*获取用户未读信息条数*/
async function getUserReadCountPost(token) {
    const res = await user.getUserReadCountPost(token);
    const resCode = res.code;
    if (resCode != 200) {
        if (resCode == 505) {
            openLogin();
        } else {
            alert("登录失效");
        }
    }
    return res;
}
/*获取用户未读信息条数 end*/

/*删除cookie*/
function delCookieFun() {
    delCookie("user-token");
    delCookie("user-phone");
    delCookie("user-loginName");
    delCookie("hospitalId");
    delCookie("user_uuid");
}
/*删除cookie end*/

/*清空input*/
function cleanResetInput(timeOut) {
    $(".inputBox").val("");
    for (let i = timeOut; i < timeOut + 1000; i++) {
        clearTimeout(i);
    }
    setTimeout("temp2(" + 0 + ")", 10);
    setTimeout("temp(" + 0 + ")", 10);
    $("#refGetcode").attr("unclick", "0");
    $("#regGetcode").attr("unclick", "0");
}
/*清空input end*/

/*查询token是否失效，如果不失效，token时间刷新 */
async function checkTokenPost(token) {
    const res = await user.checkToken(token);
    const resCode = res.code;
    var tipmsg = '';
    if (resCode == 200) {
        $("#login-p").hide();
        $("#loginin-p").show();
        var username = getCookie("user-phone");
        $("#username").html(username);
    } else {
        switch (resCode) {
            case 401:
                tipmsg = "token已失效";
                break;
            case 402:
                tipmsg = "参数异常";
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        $("#loginin-p").hide();
        $("#login-p").show();
        delCookieFun();
        //warningTip(tipmsg);//手机端提示信息
    }
    return res;
}
/*查询token是否失效，如果不失效，token时间刷新 end*/

/*退出登录并删除token */
async function logout(token) {
    const res = await user.logoutPost(token);
    const resCode = res.code;
    if (resCode == 200) {
        $("#login-p").show();
        $("#loginin-p").hide();
        $("#username").html("");
        delCookieFun();
        //退出登录以后跳回到门诊预约首页
        window.location.href = "netTreatRoom.html";
    } else {
        switch (resCode) {
            case 401:
                tipmsg = "退出登录失败";
                break;
            case 402:
                tipmsg = "参数异常";
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        $("#loginin-p").hide();
        $("#login-p").show();
        delCookieFun();
    }
    return res;
}
/*退出登录并删除token end*/

/*用户登录*/
async function login(loginName, password, loginSource, hosId) {
    const res = await user.loginPost(loginName, password, loginSource, hosId);
    const resCode = res.code;
    const data = res.data;

    //调用成功
    var tipmsg = '';
    if (resCode == 200) {
        tipmsg = "用户登录成功";
        $("#formliLoginTip").show();
        $("#formliLoginTip").removeClass("c-font-red").addClass("c-font-green");
        //信息保存到cookie
        localStorage.setItem("id", data.id);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("hospitalId", data.hospitalId);
        setCookie("user-token", data.token);
        setCookie("user-loginName", data.loginName);
        setCookie("user-phone", data.phone);
        setCookie("hospitalId", data.hospitalId);
        //页面头部设置
        $("#loginin-p").show();
        $("#login-p").hide();
        $("#username").html(data.phone);
        //所有的登录弹框隐藏 
        $(".sm-layer").hide();
        $(".sm-layer").attr("v", 0);
        if (IsPC() || hosId == 330) {
            history.go(0);
        } else {
            setTimeout(function() {
                //				if(isweb == 3){
                //					window.history.back();
                //				} else{
                //					window.history.go(-2);
                //				}
                window.location.href = "phone_mz.html?action=gohome";
            }, 2500);
        }
    } else {
        switch (resCode) {
            case 401:
                tipmsg = "密码错误";
                break;
            case 402:
                tipmsg = "登录次数过多，账号被锁定";
                break;
            case 403:
                tipmsg = "用户名或者手机号未注册";
                break;
            case 404:
                tipmsg = "登录名或者密码有误";
                break;
            case 405:
                tipmsg = "角色未注册";
                break;
            case 408:
                tipmsg = "接口异常";
                break;
            case 431:
                var resp = JSON.parse(res.text);
                tipmsg = resp.tmp1;
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        $("#formliLoginTip").removeClass("c-font-green").addClass("c-font-red");
    }
    //提示文字  
    $("#loginBtn").removeClass("c-bg-disabled");
    $("#loginBtn").html("登录");
    $("#formliLoginTip").show().html(tipmsg);
    warningTip(tipmsg); //手机端提示信息

    return res;
}
/*用户登录 end*/

/*用户登录新的*/
async function loginNew(loginName, password, loginSource, hosId) {
    const res = await user.loginNewPost(loginName, password, loginSource, hosId);
    const data = res.data.returnData;
    const resCode = res.data.returnCode;

    //调用成功
    var tipmsg = '';
    if (resCode == 200) {
        tipmsg = "用户登录成功";
        //信息保存到cookie
        localStorage.setItem("id", data.id);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("hospitalId", data.hospitalId);
        setCookie("user-token", data.token);
        setCookie("user-loginName", data.loginName);
        setCookie("user-phone", data.phone);
        setCookie("hospitalId", data.hospitalId);
        setCookie("centerId", data.centerId);
        if (IsPC()) {
            $("#formliLoginTip").show();
            $("#formliLoginTip").removeClass("c-font-red").addClass("c-font-green");
            //页面头部设置
            $("#loginin-p").show();
            $("#login-p").hide();
            $("#username").html(data.phone);
            //所有的登录弹框隐藏 
            $(".sm-layer").hide();
            $(".sm-layer").attr("v", 0);
            history.go(0);
        } else {
            TlsLogin(data.token, data.id, data.phone);
        }
    } else {
        switch (resCode) {
            case 401:
                tipmsg = "密码错误";
                break;
            case 402:
                tipmsg = "登录次数过多，账号被锁定";
                break;
            case 403:
                tipmsg = "用户名或者手机号未注册";
                break;
            case 404:
                tipmsg = "登录名或者密码有误";
                break;
            case 405:
                tipmsg = "角色未注册";
                break;
            case 408:
                tipmsg = "接口异常";
                break;
            case 431:
                var resp = JSON.parse(res.text);
                tipmsg = resp.tmp1;
                break;
            case 410:
                if (IsPC()) {
                    $('#m-login-panel').hide();
                    $('.j-tip').html("您的手机号<span class='j-loginName'>" + loginName + "</span>已经在卓健相关平台注册过，是否授权登录。");
                    $('#m-loginAccredit').show();
                } else {
                    layer.open({
                        type: 1,
                        skin: 'layui-layer-demo', //样式类名
                        closeBtn: 0, //不显示关闭按钮
                        anim: 2,
                        shadeClose: true, //开启遮罩关闭
                        content: '<div id="m-loginAccredit" class="m-loginAccredit"> <i class="u-close-btn"></i> <div class="j-tip">您的手机号<span class="j-loginName">' + loginName + '</span>已经在卓健相关平台注册过，是否授权登录。</div> <label class="m-agreeLogin"><input type="checkbox">同意授权</label> <div class="loginAccreditBtn">确定</div> </div>'
                    });
                    $('.m-agreeLogin').bind('click', function() {
                        if ($(this).children('input[type=checkbox]').hasClass('checked')) {
                            $(this).children('input[type=checkbox]').removeClass('checked');
                            $('.loginAccreditBtn').removeClass('j-yes');
                            return false;
                        } else {
                            $(this).children('input[type=checkbox]').addClass('checked');
                            $('.loginAccreditBtn').addClass('j-yes');
                            return false;
                        }
                    })
                    $('.loginAccreditBtn').bind('click', async function() {
                        if ($(this).hasClass('j-yes')) {
                            var phone1 = $(".j-loginName").eq(0).html().trim();
                            const res = await loginAccredit(hosId, phone1);
                            const code = res.data.returnCode;
                            if (code == 200) {
                                $('.layermbox').remove();
                            } else {
                                alert("授权失败");
                            }
                        }
                    })
                    $('.u-close-btn').bind('click', function() {
                        $('.layermbox').remove();
                    })
                }
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        $("#formliLoginTip").removeClass("c-font-green").addClass("c-font-red");
    }
    //提示文字  
    $("#loginBtn").removeClass("c-bg-disabled");
    $("#loginBtn").html("登录");
    $("#formliLoginTip").show().html(tipmsg);
    warningTip(tipmsg); //手机端提示信息

    return res;
}
/*用户登录新的 end*/

/*图文咨询Tls登录*/
async function TlsLogin(token, centerId, phone) {
    const res = await consuit.consuitTlsLogin(token);
    const resCode = res.code;
    if (resCode == 200) {
        const info = JSON.parse(res.data.url);
        info.identifier = "hlwhz" + centerId;
        info.identifierNick = centerId;
        info.phone = phone;
        if (isweb != "4") {
            rbk.platform.callPlugin("TextFunctionPlugins", "PluginIMLoginArrayArgu", info, function() {})
        }
        setTimeout(function() {
            window.location.href = "phone_mz.html?action=gohome"
        }, 2500);
    } else {
        console.log("TlsLogin:错误代码" + resCode);
    }
    return res;
}
/*图文咨询Tls登录 end*/

/*登录授权*/
async function loginAccredit(hosId, phone) {
    const res = await user.loginAccreditPost(hosId, phone);
    return res;
}
/*登录授权*/

//判断设备
function IsPC() {
    var flag = true;
    var mobile_bs = {
        versions: function() {
            var u = navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE kernel 
                presto: u.indexOf('Presto') > -1, //opera kernel 
                webKit: u.indexOf('AppleWebKit') > -1, // Apple 、 Google kernel 
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // Gecko 
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('QIHU') > -1 && u.indexOf('Chrome') < 0, // Is it a mobile terminal? 
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios terminal 
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android Terminal or uc Browser 
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // Whether for iPhone perhaps QQHD Browser 
                iPad: u.indexOf('iPad') > -1, // Whether iPad
                webApp: u.indexOf('Safari') == -1 // Whether web Should program ， No head and bottom 
            }
        }()
    };
    if (mobile_bs.versions.mobile) {
        if (mobile_bs.versions.android || mobile_bs.versions.iPhone || mobile_bs.versions.iPad || mobile_bs.versions.ios) {
            flag = false;
        }
    };
    return flag;
}

/*用户注册*/
async function register(loginName, password, phone, validCode, source, hosId, opts) {
    const res = await user.registerPost(loginName, password, phone, validCode, source, hosId, opts);
    const resCode = res.code;
    var tipmsg = '';
    if (resCode == 200) {
        tipmsg = "注册成功，可以去登录";
        $("#formliRegTip").show();
        $("#formliRegTip").removeClass("c-font-red").addClass("c-font-green");
        let registerTimeOut = 1000;
        if (opts != null && opts.registerTimeOut != null) {
            registerTimeOut = opts.registerTimeOut;
        }
        cleanResetInput(registerTimeOut);
        //setTimeout("gotoLogin();", 1000 );
        $("#j-toLogin").click();
    } else {
        switch (resCode) {
            case 405:
                tipmsg = "手机号不合法，请输入11位的手机号码";
                break;
            case 402:
                tipmsg = "手机已注册";
                break;
            case 403:
                tipmsg = "密码太简单 建议使用大小写字母、数字和特殊字符";
                break;
            case 404:
                tipmsg = "用户名不合法,请输入以字母开始的数字以及字母的组合";
                break;
            case 401:
                tipmsg = "用户名重名";
                break;
            case 406:
                tipmsg = "注册失败，请重新输入信息进行注册";
                break;
            case 407:
                tipmsg = "参数有误，请检查参数（参数名错误或值为空）";
                break;
            case 408:
                tipmsg = "验证码错误，请重新输入";
                break;
            case 409:
                tipmsg = "验证码不正确，请重新获取验证码";
                break;
            case 431:
                var resp = JSON.parse(res.text);
                tipmsg = resp.p1;
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        $("#formliRegTip").removeClass("c-font-green").addClass("c-font-red");
    }
    //提示文字  
    $("#registBtn").removeClass("c-bg-disabled");
    $("#registBtn").html("注册");
    $("#formliRegTip").show().html(tipmsg);
    warningTip(tipmsg); //手机端提示文字
    return res;
}
/*用户注册 end*/
//手机闪现的小弹窗
function warningTip(text) {
    if (text != "") {
        $(".phone-warningTip").html(text).fadeIn(800, function() {
            $(this).delay(500).fadeOut(800);
        });
    }
}

function callback(res, timeOut) {
    const resCode = res.code;
    //调用成功
    if (resCode == 200) {
        $("#formliRefTip").removeClass("c-font-red").addClass("c-font-green");
        $("#formliRefTip").show().html("修改成功");
        warningTip("修改密码成功") //手机端提示信息
        cleanResetInput(timeOut);
    } else {
        var tipmsg = "";
        switch (resCode) {
            case 401:
                tipmsg = "修改失败，新密码太简单，请使用大小写字母和数字";
                break;
            case 402:
                tipmsg = "短信平台无返回";
                break;
            case 403:
                tipmsg = "手机号未注册";
                break;
            case 404:
                tipmsg = "手机号或者验证码有误";
                break;
            case 405:
                tipmsg = "接口异常";
                break;
            case 409:
                tipmsg = "验证码不正确";
                break;
            case 431:
                var resp = JSON.parse(res.text);
                tipmsg = resp.tmp1;
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        $("#formliRefTip").removeClass("c-font-green").addClass("c-font-red");
        $("#formliRefTip").show().html(tipmsg);
        warningTip(tipmsg) //手机端提示信息
    }
};

/*用户重置密码  ：恩泽*/
async function resetPassword(phone, passowrd, validCode, hosId, isUser) {
    const res = await user.resetPasswordPost(phone, passowrd, validCode, hosId, isUser);
    const resCode = res.code;
    callback(res);
    return res;
}
/*用户重置密码  ：恩泽 end*/

/*患者重置密码*/
async function resetPasswordPatient(phone, passowrd, validCode, timeOut) {
    const res = await user.resetPasswordPatientPost(phone, passowrd, validCode, hosId);
    const resCode = res.code;
    callback(res, timeOut);
    return res;
}
/*患者重置密码 end*/

/*注册发送短信验证码*/
async function registerSendMsg(phone, hospitalId, verifyCodeToken, verifyCode) {
    const res = await user.registerSendMsgPost(phone, hospitalId, verifyCodeToken, verifyCode);
    const resCode = res.code;

    if (resCode == 200) {
        $("#formliRegTip").removeClass("c-font-red").addClass("c-font-green");
        $("#formliRegTip").show().html("验证码已经发送到手机，请注意查收");
        sessionStorage.removeItem("vcodeToken");
        var wait = 60;
        $("#regGetcode").html("验证码(" + wait + ")秒 ");
        $("#regGetcode").attr("onclick", "void(0)");
        setTimeout("temp(" + wait + ")", 1000)
        $("#regGetcode").css("background-color", "gray");
        if (IsPC() == false) {
            warningTip("验证码已经发送到手机，请注意查收");
        }
    } else {
        var tipmsg = "";
        switch (resCode) {
            case 401:
                tipmsg = "短信验证码生成失败";
                break;
            case 402:
                tipmsg = "短信平台无返回";
                break;
            case 404:
                tipmsg = "请不要在短时间内重复发送验证码";
                break;
            case 405:
                tipmsg = "用户已注册";
                break;
            case 408:
                tipmsg = "接口异常";
                break;
            case 409:
                tipmsg = "图形验证码失效或错误";
                break;
            case 431:
                var resp = JSON.parse(res.text);
                tipmsg = resp.p1;
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        $("#formliRegTip").removeClass("c-font-green").addClass("c-font-red");
        $("#formliRegTip").show().html(tipmsg);
        warningTip(tipmsg); //手机端提示信息
    }

    return res;
}
/*注册发送短信验证码 end*/

/*忘记密码位置的获取验证码*/
async function resetPasswordSendMsg(phone, hospitalId, verifyCodeToken, verifyCode) {
    const res = await user.resetPasswordSendMsgPost(phone, hospitalId, verifyCodeToken, verifyCode);
    const resCode = res.code;

    if (resCode == 200) {
        $("#formliRefTip").removeClass("c-font-red").addClass("c-font-green");
        $("#formliRefTip").show().html("验证码已经发送到手机，请注意查收");
        var wait = 60;
        $("#refGetcode").html("验证码(" + wait + ")秒 ");
        $("#refGetcode").attr("onclick", "void(0)");
        setTimeout("temp2(" + wait + ")", 1000)
        $("#refGetcode").css("background-color", "gray");
        if (IsPC() == false) {
            warningTip("验证码已经发送到手机，请注意查收");
        }
    } else {
        var tipmsg = "";
        switch (resCode) {
            case 401:
                tipmsg = "短信验证码生成失败";
                break;
            case 402:
                tipmsg = "短信平台无返回";
                break;
            case 408:
                tipmsg = "接口异常";
                break;
            case 431:
                var resp = JSON.parse(res.text);
                tipmsg = resp.tmp1;
                break;
            case 409:
                tipmsg = "图形验证码失效或错误";
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        $("#formliRefTip").removeClass("c-font-green").addClass("c-font-red");
        $('#formliRefTip').show().html(tipmsg);
        warningTip(tipmsg); //手机端提示信息
    }

    return res;
}
/*忘记密码位置的获取验证码 end*/

/*手机端token登录*/
async function appLoginToken(loginToken) {
    const res = await user.appLoginTokenPost(loginToken, hosId);
    const resCode = res.code;
    if (resCode != 200) {
        console.log("appLoginToken:错误代码" + resCode);
    }
    return res;
}
/*手机端token登录 end*/

/*获取图形验证码*/
async function getVerifyCode(target) {
    const res = await user.getVerifyCodePost(hosId);
    const resData = res.data;
    if (res.code == 200) {
        target.attr("src", resData.url);
    } else {
        warningTip("获取图形验证码失败");
    }
    return res;
}
/*获取图形验证码 end*/

/*app快捷登录获取验证码*/
async function quickLoginSendMsg(phone, hospitalId, verifyCodeToken, verifyCode) {
    const res = await user.quickLoginPatientSendMsgPost(phone, hospitalId, verifyCodeToken, verifyCode);
    const resCode = res.code;
    if (resCode == 200) {
        var wait = 60;
        $("#quickLoginGetCode").html("验证码(" + wait + ")秒 ");
        $("#quickLoginGetCode").attr("onclick", "void(0)");
        setTimeout("temp2(" + wait + ")", 1000)
        $("#quickLoginGetCode").addClass("unclick");
        warningTip("验证码已经发送到手机，请注意查收");
    } else {
        var tipmsg = "";
        switch (resCode) {
            case 204:
                tipmsg = "未查到该医院的配置";
                break;
            case 510:
                tipmsg = "该医院不允许快捷登录";
                break;
            case 401:
                tipmsg = "短信验证码生成失败";
                break;
            case 402:
                tipmsg = "短信平台无返回";
                break;
            case 403:
                tipmsg = "手机号不符合规则";
                break;
            case 404:
                tipmsg = "请不要在短时间内重复发送验证码";
                break;
            case 406:
                tipmsg = "用户已注册";
                break;
            case 409:
                tipmsg = "图形验证码失效或错误";
                break;
            case 500:
                tipmsg = "接口异常";
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        warningTip(tipmsg);
    }
    return res;
}
/*app快捷登录获取验证码 end*/

/*快捷登录*/
async function quickLoginByPhone(phone, msgCode, source, hosId) {
    const res = await user.quickLoginByPhonePost(phone, msgCode, source, hosId);
    const data = res.data;
    var tipmsg = '';
    var loginName;
    if (IsPC()) {
        loginName = $('#quickLogin-phone').val().trim();
    } else {
        loginName = $('#quickLoginname').val().trim();
    }

    if (res.code == 200) {
        switch (data.returnCode) {
            case 200:
                tipmsg = "登录成功";
                //信息保存到cookie
                localStorage.setItem("id", data.returnData.id);
                localStorage.setItem("phone", data.returnData.phone);
                localStorage.setItem("hospitalId", data.returnData.hospitalId);
                setCookie("user-token", data.returnData.token);
                setCookie("user-loginName", data.returnData.loginName);
                setCookie("user-phone", data.returnData.phone);
                setCookie("hospitalId", data.returnData.hospitalId);
                setCookie("centerId", data.centerId);
                if (IsPC()) {
                    $("#formliQuickLoginTip").addClass("c-font-green").removeClass("c-font-red");
                    //页面头部设置
                    $("#loginin-p").show();
                    $("#login-p").hide();
                    $("#username").html(data.returnData.phone);
                    //所有的登录弹框隐藏 
                    $(".sm-layer").hide();
                    $(".sm-layer").attr("v", 0);
                    history.go(0);
                } else {
                    setTimeout(function() {
                        window.history.go(-2);
                    }, 2500);
                }
                break;
            case 204:
                tipmsg = "未查到该医院的配置";
                break;
            case 510:
                tipmsg = "该医院不允许快捷登录";
                break;
            case 401:
                tipmsg = '登录失败，账号未注册';
                //兼容微信浏览器的layer弹窗
                window.zmyConfirm = function(m, callBack) {
                    var isjson = typeof(m) == "object" && Object.prototype.toString.call(m).toLowerCase() == "[object object]" && !m.length;
                    if (isjson) {
                        var m = JSON.stringify(m);
                    }
                    if ($.isFunction(callBack)) {
                        layer.open({
                            title: '提示',
                            btn: ['前往注册', '取消'],
                            content: m,
                            shadeClose: false,
                            yes: function() {
                                layer.closeAll();
                                callBack();
                            }
                        });
                    }
                }
                zmyConfirm('手机号尚未注册', function() {
                    $(".m-register").hide();
                    $(".m-login").show();
                });
                break;
            case 402:
                tipmsg = '账号被锁定，请联系管理员';
                break;
            case 404:
                tipmsg = '参数有误，请检查参数（参数名错误或值为空）';
                break;
            case 405:
                tipmsg = '登录失败，角色未注册';
                break;
            case 409:
                tipmsg = '验证码失效或错误';
                break;
            case 500:
                tipmsg = '用户中心无返回';
                break;
            case 410:
                if (IsPC()) {
                    $('#m-quickLogin-panel').hide();
                    $('.j-tip').html("您的手机号<span class='j-loginName'>" + loginName + "</span>已经在卓健相关平台注册过，是否授权登录。");
                    $('#m-loginAccredit').show();
                } else {
                    layer.open({
                        type: 1,
                        skin: 'layui-layer-demo', //样式类名
                        closeBtn: 0, //不显示关闭按钮
                        anim: 2,
                        shadeClose: true, //开启遮罩关闭
                        content: '<div id="m-loginAccredit" class="m-loginAccredit"> <i class="u-close-btn"></i> <div class="j-tip">您的手机号<span class="j-loginName">' + loginName + '</span>已经在卓健相关平台注册过，是否授权登录。</div> <label class="m-agreeLogin"><input type="checkbox">同意授权</label> <div class="loginAccreditBtn">确定</div> </div>'
                    });
                    $('.m-agreeLogin').bind('click', function() {
                        if ($(this).children('input[type=checkbox]').hasClass('checked')) {
                            $(this).children('input[type=checkbox]').removeClass('checked');
                            $('.loginAccreditBtn').removeClass('j-yes');
                            return false;
                        } else {
                            $(this).children('input[type=checkbox]').addClass('checked');
                            $('.loginAccreditBtn').addClass('j-yes');
                            return false;
                        }
                    })
                    $('.loginAccreditBtn').bind('click', async function() {
                        if ($(this).hasClass('j-yes')) {
                            var phone1 = $(".j-loginName").eq(0).html().trim();
                            const res = await loginAccredit(hosId, phone1);
                            const code = res.data.returnCode;
                            if (code == 200) {
                                window.location.href = 'phone_loginRegister.html';
                            } else {
                                alert("授权失败");
                            }
                        }
                    })
                    $('.u-close-btn').bind('click', function() {
                        $('.layermbox').remove();
                    })
                }
                break;
            default:
                tipmsg = '登录失败，请稍后再试';
                break;
        }
        if (IsPC()) {
            $("#quickLoginBtn").removeClass("c-bg-disabled");
            $("#quickLoginBtn").html("登录");
            $("#formliQuickLoginTip").removeClass("c-font-green").addClass("c-font-red");
            $("#formliQuickLoginTip").html(tipmsg);
        } else {
            warningTip(tipmsg);
        }
    } else {
        tipmsg = '登录失败，请稍后再试';
        if (IsPC()) {
            $("#formliQuickLoginTip").removeClass("c-font-green").addClass("c-font-red");
            $("#quickLoginBtn").removeClass("c-bg-disabled");
            $("#quickLoginBtn").html("登录");
            $("#formliQuickLoginTip").html(tipmsg);
        } else {
            warningTip(tipmsg);
        }
    }
    return res;
}
/*快捷登录 end*/

/*用户微信登录时候得到二维码地址*/
async function wechatGetQRCode(userOrDoc, loginSource, hospitalId) {
    const res = await user.wechatGetQRCodePost(userOrDoc, loginSource, hospitalId);
    const resCode = res.code;
    const resData = res.data;
    if (resCode == 200) {
        if (200 != resData.returnCode) {
            alert(resData.returnMsg);
        }
    } else {
        alert("接口调用错误");
    }
    return res;
}
/*用户微信登录时候得到二维码地址 end*/

/*用户微信登录得到用户信息*/
async function wechatGetUserInfo(userOrDoc, code, loginSource, hospitalId) {
    const res = await user.wechatGetUserInfoPost(userOrDoc, code, loginSource, hospitalId);
    const resCode = res.code;
    const resData = res.data;
    if (resCode == 200) {
        if (200 != resData.returnCode) {
            var url = window.location.href;
            var newUrl = url.split("?")[0];
            window.location.href = newUrl;
            alert(resData.returnMsg);
        }
    } else {
        alert("接口调用错误");
    }
    return res;
}
/*用户微信登录得到用户信息 end*/

/*微信登录	"haveBind"是手机端判断是不是绑定之后登录*/
async function wechatLogin(openId, loginSource, hospitalId, haveBind) {
    const res = await user.wechatLoginPost(openId, loginSource, hospitalId);
    const resCode = res.code;
    const resData = res.data;
    if (resCode == 200) {
        if (200 != resData.returnCode) {
            if (401 == resData.returnCode) {
                if (IsPC()) {
                    goToBindPhone();
                } else {
                    window.location.href = "phone_loginBindPhone.html";
                }
            } else {
                alert(resData.returnMsg);
            }
        } else {
            let user = resData.returnData;
            //信息保存到cookie
            setCookie("user-token", user.token);
            setCookie("user-loginName", user.loginName);
            setCookie("user-phone", user.phone);
            setCookie("hospitalId", user.hospitalId);
            setCookie("centerId", user.centerId);
            if (IsPC()) {
                //页面头部设置
                $("#loginin-p").show();
                $("#login-p").hide();
                $("#username").html(user.phone);
                //所有的登录弹框隐藏 
                $(".sm-layer").hide();
                $(".sm-layer").attr("v", 0);
                var url = window.location.href;
                var newUrl = url.split("?")[0];
                window.location.href = newUrl;
            } else {
                //				if(1 == haveBind) {
                setTimeout(function() {
                    window.location.href = "phone_mz.html?action=gohome"
                        //						history.go(-2);
                }, 1000);
                //				} else {
                //					setTimeout(function() {
                //						history.go(-1);
                //					}, 1000);
                //				}
            }
        }
    } else {
        alert("接口调用错误");
    }
    return res;
}
/*微信登录	"haveBind"是手机端判断是不是绑定之后登录*/

/*到微信绑定手机号界面去*/
function goToBindPhone() {
    //隐藏忘记密码
    $("#m-forgetpass-panel").attr("v", "0");
    $("#m-forgetpass-panel").hide();
    $("#m-quickLogin-panel").attr("v", "0");
    $("#m-quickLogin-panel").hide();
    //隐藏注册框
    $("#m-regist-panel").attr("v", "0");
    $("#m-regist-panel").hide();
    //隐藏登录框
    $("#m-login-panel").attr("v", "0");
    $("#m-login-panel").hide();
    //显示绑定手机号框
    $("#m-bindPhone-panel").attr("v", "1");
    $("#m-bindPhone-panel").show();

    getImgCode($(".j-bindPhoneimgcode"));
    $(".j-bindPhoneimgcode").on("click", function() {
        getImgCode($(".j-bindPhoneimgcode"));
    })

}
/*到微信绑定手机号界面去 end*/

/*绑定微信*/
async function bindWechat(loginName, openId, validCode) {
    const res = await user.bindWechatPost(loginName, openId, validCode);
    const resCode = res.code;
    const resData = res.data;
    if (resCode == 200) {

    } else {
        var tipmsg = "";
        switch (resCode) {
            case 401:
                tipmsg = "账号未注册";
                break;
            case 402:
                tipmsg = "用户中心注册接口无返回";
                break;
            case 403:
                tipmsg = "用户中心解绑原来的微信号失败";
                break;
            case 405:
                tipmsg = "用户中心绑定微信号失败";
                break;
            case 406:
                tipmsg = "验证码不正确";
                break;
            case 500:
                tipmsg = "绑定微信接口异常";
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        $("#bindPhoneBtn").removeClass("c-bg-disabled");
        $("#bindPhoneBtn").html("绑定");
        if (IsPC()) {
            //提示文字
            $("#formlibindPhoneTip").removeClass("c-font-green").addClass("c-font-red");
            $("#formlibindPhoneTip").html(tipmsg);
        } else {
            warningTip(tipmsg);
        }
    }
    return res;
}
/*绑定微信 end*/

/*绑定微信发送验证码*/
async function bindWechatMsg(phone, verifyCodeToken, verifyCode) {
    const res = await user.bindWechatMsgPost(phone, verifyCodeToken, verifyCode);
    const resCode = res.code;
    const resData = res.data;
    if (resCode == 200) {

    } else {
        var tipmsg = "";
        switch (resCode) {
            case 401:
                tipmsg = "账号未注册";
                break;
            case 402:
                tipmsg = "用户中心无返回";
                break;
            case 403:
                tipmsg = "接口异常";
                break;
            case 405:
                tipmsg = "验证码不正确";
                break;
            case 406:
                tipmsg = "用户中心接口异常";
                break;
            case 407:
                tipmsg = "手机号错误";
                break;
            case 408:
                tipmsg = "短信获取速度过快";
                break;
            case 409:
                tipmsg = "短信验证码生成失败";
                break;
            case 410:
                tipmsg = "短信平台无返回";
                break;
            default:
                tipmsg = "未知异常";
                break;
        }
        if (IsPC()) {
            $("#formlibindPhoneTip").removeClass("c-font-green").addClass("c-font-red");
            $('#formlibindPhoneTip').show().html(tipmsg);
        } else {
            warningTip(tipmsg);
        }
    }
    return res;
}
/*绑定微信发送验证码 end*/

/*获取快速问诊历史消息*/
async function getQuickRecordListByCondition(target, token, isDisplay, pageSize, process) {
    const res = await user.getQuickRecordListByCondition(token, isDisplay, pageSize);
    const resCode = res.code;
    if (resCode == 200) {
        let data = res.data.returnData;
        if (process != null) {
            data = process(data);
        }
        if (res.data.returnCode == 200) {
            console.log(res.data.returnData.list)
            target.find('div').show();
            insertHtml.doLayout(target, res.data.returnData.list);
        } else if (res.data.returnCode == 505) {
            openLogin();
        }
        return data;
    }
}
/* 获取快速问诊历史消息end*/

/*获取快速问诊历史消息待回复*/
async function getQuickRecordListByConditionRe(target) {
    const res = await user.getQuickRecordListByConditionRe(token);
    const resCode = res.code;
    if (resCode == 200) {
        if (res.data == '') {
            target.find('div').hide();
            target.append('<p class="noHis">暂无历史记录</p>')
        } else {
            console.log(res.data.returnData.list)
            target.find('div').show();
            insertHtml.doLayout(target, res.data.returnData.list);
        }


    } else {
        console.log("getQuickRecordListByCondition:错误代码" + resCode);
    }
    return res;
}
/* 获取快速问诊历史消息end*/

/*患者快速问诊记录*/
async function addQuickRecord(model) {
    const res = await user.addQuickRecord(model);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res.data)
    } else {
        console.log("addQuickRecord:错误代码" + resCode);
    }
    return res;
}
/* 患者快速问诊记录end*/

/*患者快速历史图片*/
async function getFileListByUserId(target, token) {
    const res = await user.getFileListByUserId(token);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res.data)
        insertHtml.doLayout(target, res.data);
    } else {
        console.log("getFileListByUserId:错误代码" + resCode);
    }
    return res;
}
/* 患者快速历史图片end*/

/*选择历史图片*/
async function addFilesByBelong(model) {
    model = JSON.stringify(model);
    const res = await user.addFilesByBelong(model, token);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res.data)
    } else {
        console.log("addFilesByBelong:错误代码" + resCode);
    }
    return res;
}
/*选择历史图片end*/

/*根据token获取所有用户通知*/
async function getUserNotifyByToken(target) {
    const res = await user.getUserNotifyByTokenPost(token);
    const resCode = res.code;
    if (resCode == 200) {
        const data = res.data.returnData;
        const aryData = [];
        const contAry = ['咨询消息', '处方消息', '叫号消息', '排班消息', '快速问诊', '医院动态', '用药提醒'];
        for (var key in data) {
            if (data[key] != null) {
                data[key].content = data[key].notify.content;
                data[key].imgType = data[key].notify.type;
            } else {
                data[key] = new Object();
                data[key].count = 0;
                data[key].dateStr = "";
                data[key].itemName = contAry[parseInt(key)];
                data[key].content = "暂无消息";
                data[key].imgType = parseInt(key) + 1;
            }
            aryData.push(data[key]);
        }
        insertHtml.doLayout(target, aryData);
    } else {
        console.log(resCode + ":" + res.returnMsg);
    }
    return res.data;
}
/*根据token获取所有用户通知 end*/

/*用户点击通知列表改为已点击状态*/
async function changeStatusByType(type) {
    const res = await user.changeStatusByTypePost(token, type);
    const resCode = res.code;
    if (resCode == 200) {
        //console.log(res.data);
    } else {
        console.log(resCode + ":" + res.returnMsg);
    }
    return res;
}
/*用户点击通知列表改为已点击状态 end*/

/*根据类型获取用户通知*/
async function getUserNotifyByType(type) {
    const res = await user.getUserNotifyByTypePost(token, type);
    const resCode = res.code;
    if (resCode == 200) {
        //console.log(res.data);
    } else {
        console.log(res.returnMsg);
    }
    return res;
}
/*根据类型获取用户通知 end*/

/*用户点击一条通知改为已点击状态*/
async function changeStatusById(id) {
    const res = await user.changeStatusByIdPost(token, id);
    const resCode = res.code;
    if (resCode == 200) {
        //console.log(res.data);
    } else {
        console.log(res.returnMsg);
    }
    return res;
}
/*用户点击一条通知改为已点击状态 end*/

/* 患者快速问诊记录end*/

/*政务网登录*/
async function govNetLogin(loginName, password, loginSource, hosId) {
    const res = await user.govNetLoginPost(loginName, password, loginSource, hosId);
    const data = res.data.returnData;
    const resCode = res.data.returnCode;

    //调用成功
    var tipmsg = '';
    if (resCode == 200) {
        tipmsg = "用户登录成功";
        //信息保存到cookie
        localStorage.setItem("id", data.id);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("hospitalId", data.hospitalId);
        setCookie("user-token", data.token);
        setCookie("user-loginName", data.loginName);
        setCookie("user-phone", data.phone);
        setCookie("hospitalId", data.hospitalId);
        setCookie("centerId", data.centerId);
        //		if(IsPC()) {
        $("#formligovNetLoginTip").show();
        $("#formligovNetLoginTip").removeClass("c-font-red").addClass("c-font-green");
        //页面头部设置
        $("#loginin-p").show();
        $("#login-p").hide();
        $("#username").html(data.phone);
        //所有的登录弹框隐藏 
        $(".sm-layer").hide();
        $(".sm-layer").attr("v", 0);
        history.go(0);
        //		} else {
        //			TlsLogin(data.token, data.id,data.phone);
        //		}
    } else {
        tipmsg = res.data.returnMsg;
        $("#formligovNetLoginTip").removeClass("c-font-green").addClass("c-font-red");
    }
    //提示文字  
    $("#govNetLoginBtn").removeClass("c-bg-disabled");
    $("#govNetLoginBtn").html("登录");
    $("#formligovNetLoginTip").show().html(tipmsg);
    //	warningTip(tipmsg); //手机端提示信息
    return res;
}
/*政务网登录 end*/

/*政务网地址自动登录*/
async function govNetCheckLogin(ticket) {
    const res = await user.govNetCheckLoginPost(ticket);
    const resData = res.data;
    const resCode = resData.returnCode;
    const data = resData.returnData;
    if (resCode != 200) {
        let tipmsg = '传输过程中，默认登录失败了！请使用您的账号登录吧！'
        $("#formligovNetLoginTip").show().html(tipmsg);
        openGovNet();
    } else {
        //信息保存到cookie
        localStorage.setItem("id", data.id);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("hospitalId", data.hospitalId);
        setCookie("user-token", data.token);
        setCookie("user-loginName", data.loginName);
        setCookie("user-phone", data.phone);
        setCookie("hospitalId", data.hospitalId);
        //页面头部设置
        $("#loginin-p").show();
        $("#login-p").hide();
        $("#username").html(data.phone);
    }
    return resData;
}
/* 政务网地址自动登录 end*/

/*获取结对咨询聊天参数*/
async function getJdConsuitParam(token, collectionId) {
    const res = await user.getJdConsuitParamPost(token, collectionId);
    const resCode = res.code;
    if (resCode == 200) {
        let url = JSON.parse(res.data.url);
        localStorage.setItem('consultParams', JSON.stringify(url));
    }
    return res;
}
/*获取结对咨询聊天参数 end*/

/*用户获得默认的就诊人*/
async function getDefaultPatient(target, token) {
    const res = await user.getDefaultPatient(token);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res)
        insertHtml.doLayout(target, res.data.returnData);
    }
    return res;
}
/*用户获得默认的就诊人 end*/

//用户更新医患结对选中的就诊人
async function updatePatientTwinningStatus(patientId) {
    const res = await user.updatePatientTwinningStatus(token, patientId);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res)
            // insertHtml.doLayout(target,res.data.returnData);
    }
    return res;
}
/*用户更新医患结对选中的就诊人 end*/

/*获取列表*/
async function getSurveyQuestionList(target, id) {
    const res = await user.getSurveyQuestionList(token, id);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res)
        insertHtml.doLayout(target, res.data.returnData);
    }
    return res;
}
/*获取专科问卷列表*/

/*患者回答科室问卷*/
async function patientAnswerSurvey(token, reservationId, type, list) {
    const res = await user.patientAnswerSurvey(token, reservationId, type, list);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res)
            // insertHtml.doLayout(target,res.data.returnData);
    }
    return res;
}
/*患者回答科室问卷*/

/*获取用户回答专科问卷*/
async function getSurveyByUrId(target, urId) {
    const res = await user.getSurveyByUrId(token, urId);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res)
        insertHtml.doLayout(target, res.data.returnData);
    }
    return res;
}
/*获取用户回答专科问卷 end*/
/*获取用户回答专科问卷*/
async function getSurveyByUrIdphone(urId) {
    const res = await user.getSurveyByUrId(token, urId);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res)
            // insertHtml.doLayout(target, res.data.returnData);
    }
    return res;
}
/*获取用户回答专科问卷 end*/

/*自测量表*/
async function getLibSurveyByDeptId(target, deptId) {
    const res = await user.getLibSurveyByDeptId(token, deptId);
    const resCode = res.code;
    if (resCode == 200) {
        console.log(res)
        insertHtml.doLayout(target, res.data.returnData);
    }
    return res;
}
/*获取用户回答专科问卷 end*/


module.exports = {
    insertUserDetails: insertUserDetails, //显示患者详情
    editUserPhoto: editUserPhoto, //编辑患者头像
    sendSingleMsg: sendSingleMsg, //发送一条短信
    setPasswordPost: setPasswordPost, //用户修改密码
    getUserReadCountPost: getUserReadCountPost, //获取用户左侧导航栏未读信息
    checkToken: checkToken,
    goToConsuitByUser: goToConsuitByUser,
    checkTokenPost: checkTokenPost, //查询token是否失效，如果不失效，token时间刷新 
    logout: logout, //退出登录并删除token
    resetPassword: resetPassword, //用户重置密码  ：恩泽
    resetPasswordPatient: resetPasswordPatient, //患者重置密码
    register: register, //用户注册
    login: login, //用户登录
    getVerifyCode: getVerifyCode, //获取图形验证码
    appLoginToken: appLoginToken, //手机端token登录
    registerSendMsg: registerSendMsg, //注册发送短信验证码
    resetPasswordSendMsg: resetPasswordSendMsg, //忘记密码位置的获取验证码
    quickLoginSendMsg: quickLoginSendMsg, //app快捷登录获取验证码
    quickLoginByPhone: quickLoginByPhone, //app快捷登录
    loginNew: loginNew, //用户登录新的
    loginAccredit: loginAccredit, //登录授权
    wechatGetQRCode: wechatGetQRCode, //用户微信登录时候得到二维码地址
    wechatGetUserInfo: wechatGetUserInfo, //用户微信登录得到用户信息
    wechatLogin: wechatLogin, //微信登录
    bindWechat: bindWechat, //绑定微信
    bindWechatMsg: bindWechatMsg, //绑定微信发送验证码
    checkNotifyByToken: checkNotifyByToken, //判断用户通知
    getQuickRecordListByCondition: getQuickRecordListByCondition, //获得快速问诊列表
    addQuickRecord: addQuickRecord, //患者快速问诊记录
    getFileListByUserId: getFileListByUserId, //患者快速图片
    addFilesByBelong: addFilesByBelong,
    getQuickRecordListByConditionRe: getQuickRecordListByConditionRe,
    getUserNotifyByToken: getUserNotifyByToken, //根据token获取所有用户通知
    changeStatusByType: changeStatusByType, //用户点击通知列表改为已点击状态
    getUserNotifyByType: getUserNotifyByType, //根据类型获取用户通知
    changeStatusById: changeStatusById, //用户点击一条通知改为已点击状态
    govNetLogin: govNetLogin, //政务网登录
    govNetCheckLogin: govNetCheckLogin, //政务网地址自动登录
    getJdConsuitParam: getJdConsuitParam, //获取结对咨询聊天参数
    getDefaultPatient: getDefaultPatient,
    /*用户获得默认的就诊人*/
    updatePatientTwinningStatus: updatePatientTwinningStatus,
    /*用户更新医患结对选中的就诊人 end*/
    getSurveyQuestionList: getSurveyQuestionList,
    patientAnswerSurvey: patientAnswerSurvey,
    getSurveyByUrId: getSurveyByUrId,
    /*获取用户回答专科问卷 end*/
    getLibSurveyByDeptId: getLibSurveyByDeptId,
    getSurveyByUrIdphone: getSurveyByUrIdphone
}