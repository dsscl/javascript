/*使用Promise与ajax实现api调用*/

const config = require('../../swagger/config.json');
const postUrl = config.hlwyy;
const payUrl = config.pay;

function doPost(url, parameter) {
  let returnData = new Object();
  let res = ajax(url, parameter).then(function(data) {
    returnData.code = 200;
    returnData.data = data;
    return returnData;
  }).catch(function(error) {
    returnData.code = error.status;
    returnData.errerTxt = error.responseText;
    return returnData;
  })
  return res;
}

function ajax(url, parameter) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: "POST",
      url: postUrl + url,
      data: parameter,
      success: function(data) {
        resolve(data)
      },
      error: function(error) {
        reject(error);
      }
    })
  })
}

function doModelPost(url, parameter) {
  let returnData = new Object();
  let res = ajax2(url, parameter).then(function(data) {
    returnData.code = 200;
    returnData.data = data;
    return returnData;
  }).catch(function(error) {
    returnData.code = error.status;
    return returnData;
  })
  return res;
}

function ajax2(url, parameter) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: "POST",
      url: postUrl + url,
      data: parameter,
      contentType: "application/json",
      dataType: "json",
      success: function(data) {
        resolve(data)
      },
      error: function(error) {
        reject(error);
      }
    })
  })
}

function doPayPost(url, parameter, type) {
  let returnData = new Object();
  let res = ajax3(url, parameter, type).then(function(data) {
    returnData.code = 200;
    returnData.data = data;
    return returnData;
  }).catch(function(error) {
    returnData.code = error.status;
    return returnData;
  })
  return res;
}

function ajax3(url, parameter, type) {
  if (type == null) {
    type = "POST";
  }
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: type,
      url: payUrl + url,
      data: parameter,
      success: function(data) {
        resolve(data)
      },
      error: function(error) {
        reject(error);
      }
    })
  })
}

module.exports = {
  doPost: doPost,
  doModelPost:doModelPost,
  doPayPost: doPayPost
}
