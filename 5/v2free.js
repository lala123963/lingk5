// new Env("v2free签到")
// cron: 30 7 * * *
var unirest = require('unirest');
var req = unirest('POST', 'https://v1.v2free.top/user/checkin')
  .headers({
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Length': '0',
    'Cookie': 'uid=52198; email=belugi%40qq.com; key=711d2d789115b8d42f58f57491c681c8c51f5c3525b92; ip=6d663134cd2d212f3b3f2c1fd2660eff; expire_in=1697908089; crisp-client%2Fsession%2Fa47ae3dd-53d8-4b15-afae-fb4577f7bcd0=session_9b75c87a-2b7f-49dc-9b90-eee414254f69',
    'Origin': 'https://v1.v2free.top',
    'Pragma': 'no-cache',
    'Referer': 'https://v1.v2free.top/user',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
  })
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body);
  });
