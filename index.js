'use strict';

var regPx = /url\((.*?\d+px.*?)*\)|(\d+)\s*?(px).*?(\)?)/ig;

/**
 * 按照16px=1rem做转换
 */
var pxToRem = function(data){
    return data.replace(regPx, function(){
          var pxValue = arguments[2];
          if(pxValue === undefined) 
            return arguments[0];
          var px = arguments[3];
          var rem;
          if(px == 'px'){
              rem = (Number(pxValue)/16).toFixed(4,10);
              rem = parseIntNum(rem);
              return rem + 'rem';
          }else {
             return arguments[0];
          }          
      })
};

/**
 *  去掉浮点数的0
 */
var parseIntNum = function(num){
    var strNum = num + '';
    strNum = strNum.split('.');
    if(strNum[1]){
      strNum[1] = strNum[1].replace(/0{0,}$/ig,'');
      if(strNum[1]){
        return Number(strNum.join('.'));
      }
      return strNum[0];
    }
    return num;
};

module.exports = function(ret, conf, settings, opt) {  
    fis.util.map(ret.src, function(subpath, file) {
        if (file.isCssLike) {
            var content = file.getContent();
            if(content.indexOf('px')){
              content = pxToRem(content);
            }
            file.setContent(content);
        }
    });
};
