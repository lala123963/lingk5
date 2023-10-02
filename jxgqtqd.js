// new Env("江西共青团签到")
// cron: 30 8 * * *
var dt = new Date()
var y = dt.getFullYear();
var m = dt.getMonth() + 1;
var d = dt.getDay() + 1
var unirest = require('unirest');
var req = unirest('GET', 'http://www.jxqingtuan.cn/pub/pub/vol/daysign/sign?uid=3970690&year=' + y + '&month=' + m + '&day='+ d)
  .headers({
    'Host': 'www.jxqingtuan.cn',
    'Accept': '*/*',
    'openid': 'oWtPk5uwtZeiEWnU87uXZUMPw4BA',
    'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/x-www-form-urlencoded',
    'requestType': 'http',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.41(0x18002930) NetType/WIFI Language/zh_CN',
    'Referer': 'http://www.jxqingtuan.cn/html/?&accessToken=oWtPk5uwtZeiEWnU87uXZUMPw4BA&openid=oWtPk5uwtZeiEWnU87uXZUMPw4BA&requestType=http',
    'Cookie': 'JSESSIONID=wQElWjgHViDN0wAGc4pqe_rzkMBRCZqUexyf7Tj_; JSESSIONID=caITHUEaaJogO2Nl4MIpIsJs7fDDv-0Rs-WZ02x_'
  })
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body);
  });
