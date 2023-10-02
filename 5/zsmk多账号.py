'''
new Env("知识米库")
by苞谷麻薯
1广告 ＝1积分 1积分＝分洪0.2-0.6 金币 1金币＝1米 1米提支宝  签到每天可以签到两次多获取1积分，共2积分
多账号版
抓包：tocken即可
变量名：zsmkck
cron:20 7,8 * * *
v1.0
'''



import requests
import os


cookie= os.getenv("zsmkck")
token_list = cookie.split('\n')

def sign(token):
   url = "https://230.yyyy.run/api/sign/userSignIn"

   payload='%7B%7D='
   headers = {
      'xweb_xhr': '1',
      'appid': 'wxef3001aa9940ba6e',
      'os': 'windows',
      'token': token,
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*',
      'Host': '230.yyyy.run',
      'Connection': 'keep-alive'
   }

   response = requests.request("POST", url, headers=headers, data=payload)

   print(response.text)

for index, token in enumerate(token_list):
    print(f'===============账号{index + 1}===============')
    sign(token)

