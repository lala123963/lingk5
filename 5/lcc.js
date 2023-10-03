// new Env("驴充充签到")
// cron: 30 8 * * *
var unirest = require('unirest');
var req = unirest('POST', 'https://appapi.lvcchong.com/scoreUser/sign/userSign')
  .headers({
    'Host': 'appapi.lvcchong.com',
    'Connection': 'keep-alive',
    'token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmYmE3ZjNkZGQ3YTRlMmI4NjJjZDIyMGY3NWZhMWI5In0.eyJqdGkiOiJCNWNPa21LakJwS0hJS2tvSXNaeEJRIiwiaWF0IjoxNjk2MTc4MzE3LCJleHAiOjE2OTYxNzgzNDcsIm5iZiI6MTY5NjE3ODI1Nywic3ViIjoiMiIsImF1ZCI6IklfRE9OT1RfQ0FSRSIsInVzZXJJZCI6IjI4ODQxMDYzIn0.jAUnVegMFbf7fHHvKZkLG0y-dxPCBC7MmhRDmI8ZHFo2iU3AeYEOw7YQ0LkzxphjWyJXCDWQyjRpVSwbJpI0VmS8cvauTzuKLZ6JNcWhueNca-sv-YgyqIUXxHGnGrXihhoSXKlDHQLGEhwFJ1warDOhlc3vObUo7wQFfEh7z291ot6UJD37jiJrvsb67lYEF8aOw7WdnPQClHfHMZKMD1_W1DUVUblfa8LRoBKJr7WwLOTEF6FCEQD9SIU1WT5BOFsiEopkFCUkDp0ueKpTMI4PXj5rYFolo0VKwpB98LLxp-sdL5sAr6lc4S1YqlVBiPe6mKJ_NDEH9DE0qbBWlg',
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'gzip,compress,br,deflate',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.41(0x18002930) NetType/WIFI Language/zh_CN',
    'Referer': 'https://servicewechat.com/wx0132aa93a8b214ae/152/page-frame.html',
    'Cookie': 'JSESSIONID=801FC21FBDE58F51D0A0EFA1278C0098; acw_tc=0bc5049216961797012917763e2e1837148e829ba5d90e7bbf6b8d2661d3c6; aliyungf_tc=56691d537efc99f853af7f2b693e28b2ebaaa8cdaf1d2ae6b6ef442b91e730a6'
  })
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body);
  });
