// new Env("江西共青团连续签到")
// cron: 30 8 * * *
var unirest = require('unirest');
var req = unirest('POST', 'http://www.jxqingtuan.cn/pub/pub/vol/member/addScoreInfo')
  .headers({
    'Host': 'www.jxqingtuan.cn',
    'Accept': '*/*',
    'openid': 'oWtPk5uwtZeiEWnU87uXZUMPw4BA',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'http://www.jxqingtuan.cn',
    'requestType': 'http',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.41(0x18002930) NetType/WIFI Language/zh_CN',
    'Referer': 'http://www.jxqingtuan.cn/html/?&accessToken=oWtPk5uwtZeiEWnU87uXZUMPw4BA&openid=oWtPk5uwtZeiEWnU87uXZUMPw4BA&requestType=http',
    'Content-Length': '121',
    'Connection': 'keep-alive',
    'Cookie': 'JSESSIONID=wQElWjgHViDN0wAGc4pqe_rzkMBRCZqUexyf7Tj_; JSESSIONID=sl23aBGBr9qP97u9Pjw3MusU3jlf7tHPEgyTXybN'
  })
  .send('check=1')
  .send('type=5')
  .send('title=签到打卡')
  .send('url=' + formatDateTime(new Date(), 'yyyyMMdd'))
  .send('openid=oWtPk5uwtZeiEWnU87uXZUMPw4BA')
  .send('userId=3970690')
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body);
  });


function formatDateTime(date, format) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    a: date.getHours() < 12 ? '上午' : '下午', // 上午/下午
    A: date.getHours() < 12 ? 'AM' : 'PM', // AM/PM
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return format;
}
