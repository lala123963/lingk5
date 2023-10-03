"""
@Qim97 仅供学习交流，请在下载后的24小时内完全删除 请勿将任何内容用于商业或非法目的，否则后果自负。
农好优_V0.1  每天积分签到获得10积分 猜测100积分0.3r 满20提现
活动入口 http://wap.nonghaoyou.cn/Public/reg/recom/474120
抓http://wap.nonghaoyou.cn/取出cookie下的token参数

export nhytoken=token
多账号用'===='隔开 例 账号1====账号2
# const $ = new Env('农好优_V0.1')
cron：13 8 * * *
"""
import re
import os
import requests
import time



accounts = os.getenv('nhytoken')
response = requests.get('https://gitee.com/shallow-a/qim9898/raw/master/label.txt').text
print(response)
if accounts is None:
    print('你没有填入nhytoken，咋运行？')
    exit()
else:
    accounts_list = os.environ.get('nhytoken').split('====')
    num_of_accounts = len(accounts_list)
    print(f"获取到 {num_of_accounts} 个账号")
    for i, account in enumerate(accounts_list, start=1):
        values = account.split('@')
        token = values[0]
        print(f"\n=======开始执行账号{i}=======")
        url = "http://wap.nonghaoyou.cn/Member/index"
        headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 9; V1916A Build/PQ3B.190801.06161913; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36  XiaoMi/MiuiBrowser/10.8.1 LT-APP/45/104/YM-RT/",
            "Cookie": f"token={token}",
            "X-Requested-With": "XMLHttpRequest",
        }

        response = requests.get(url, headers=headers).text
        html_content = response
        my_number_values = re.findall(r'<div class="my-number">([\d.]+)</div>', html_content)
        user_name_match = re.search(r'<a href="info_edit" style="color:#FFF">([^<]+)</a>', html_content)
        phone_number_match = re.search(r'<p>(\d+)</p>', html_content)
        user_name = user_name_match.group(1) if user_name_match else "未找到用户名"
        phone_number = phone_number_match.group(1) if phone_number_match else "未找到手机号"
        print(f"{user_name}-{phone_number}")
        if len(my_number_values) >= 3:
            balance, points, estimated_earnings = my_number_values[:3]
            print(f"余额: {balance}")
            print(f"积分: {points}")
            print(f"预估收益: {estimated_earnings}")
            for i in range(10):
                url = "http://wap.nonghaoyou.cn/Member/ad_video_api"
                data = {"uid": "11951"}
                response = requests.post(url, data=data, headers=headers).json()
                if response['status'] == 1:
                    print(f"第{response['num']}次---积分签到成功")
                    time.sleep(1)
                elif response['status'] == 0:
                    print(f"{response['info']}")
                    break
                else:
                    print(f"❌❌❌❌❌{response}")

        else:
            print(f"获取个人信息错误")
