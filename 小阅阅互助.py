"""
@Qim出品 仅供学习交流，请在下载后的24小时内完全删除 请勿将任何内容用于商业或非法目的，否则后果自负。
小阅阅互助  入口   https://x.moonbox.site/?ytx9qKiK8410#/?recommend=HU1FIZR5BV0
阅读文章https://x.moonbox.site/api/article/read抓出cookie    填进去直接开冲
export Acookie=cookie
多账号用'===='隔开 例 账号1====账号2
cron：0 8 * * *
"""




import os
import time

import requests
# from dotenv import load_dotenv
#
# load_dotenv()
accounts = os.getenv("Acookie")
response = requests.get('https://gitee.com/shallow-a/qim9898/raw/master/label.txt').text
print(response)
if accounts is None:
    print('你没有填入Acookie，咋运行？')
    exit()
accounts_list = accounts.split('====')
num_of_accounts = len(accounts_list)
print(f"获取到 {num_of_accounts} 个账号")
for i, account in enumerate(accounts_list, start=1):
    values = account.split('@')
    Acookie = values[0]
    print(f"\n{'=' * 8}开始执行账号{i}{'=' * 8}")
    import requests

    url = "https://x.moonbox.site/api/user/info"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090621) XWEB/8391 Flue",
        "Cookie": Acookie
    }

    response = requests.get(url, headers=headers).json()
    if response['code'] == 1:
        nickname = response['data']['nickname']
        balance = response['data']['balance']
        print(f"{nickname}---余额{balance}")
        for i in range(30):
            url = "https://x.moonbox.site/api/article/read"
            data = {
                "articleId": 344,
                "articleUser": 114,
                "bigTop": 0,
                "publishId": 349,
                "viewNum": "146",
                "readType": 0,
                "channel": "0",
                "readerDate": 1695174062000,
                "seconds": 34
            }

            response = requests.post(url, headers=headers, json=data).json()
            if response['code'] == 0:
                print(f"{response['msg']}")
                break
            elif response['code'] == 1:
                print(f"阅读成功---获得{response['data']}")
                time.sleep(1)

    else:
        print(f"错误{response}")










