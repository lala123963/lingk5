# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2023/10/10 12:42
# @Author  : ziyou
# -------------------------------
#
# 每日一快左右
# cron "1 8,22 * * *" script-path=xxx.py,tag=匹配cron用
# const $ = new Env('点码广告')
# 抓包首次进入微信小程序时 unionId 的值，或者下载点码广告app 抓微信登录时 unionId 的值
# 点码广告
# export dianmaguanggao_token='oaZnk********&oaZnk*******',多账号使用换行或&
# https://t.me/q7q7q7q7q7q7q7_ziyou

import concurrent.futures
import datetime
import hashlib
import json
import os
import random
import sys
import time

import requests

# unionId
ck_list = []

# 设置最大线程数
MAX_WORKERS = 1
ck_signal_list = []
token_dict = {}


# 加载环境变量
def get_env():
    global ck_list

    env_str = os.getenv("dianmaguanggao_token")
    if env_str:
        ck_list += env_str.replace("&", "\n").split("\n")


# 读取token信息
def read_token_infomation():
    global token_dict
    try:
        with open('点码广告token.json', 'r', encoding="utf-8") as f:
            token_dict = json.load(f)
    except FileNotFoundError:  # 如果文件不存在
        token_dict = {}


# 写入token信息
def write_token_infomation():
    with open("点码广告token.json", "w",
              encoding="utf-8") as f:  # 如果文件不存在则会新建一个。
        json.dump(token_dict, f)


# md5加密
def md5_str(str_to_encrypt):
    # 创建 MD5 对象
    md5 = hashlib.md5()
    # 将字符串转换为二进制并添加到 MD5 对象中
    md5.update(str_to_encrypt.encode())
    # 获取加密后的字符串
    encrypted_str = md5.hexdigest()
    return encrypted_str


class DianMaGuangGao:
    def __init__(self, ck, index):
        self.ck = ck
        self.index = index
        date = token_dict.get(ck, {}).get('date')
        current_date = datetime.datetime.today().strftime("%Y-%m-%d")
        self.token = token_dict.get(ck, {}).get('token')
        self.user_id = token_dict.get(ck, {}).get('user_id')
        if (current_date != date) or not self.token:
            if not self.login():
                return
        self.token_headers = {
            'Version': 'wangcai-2.0.0v',
            'token': self.token,
            'Content-Type': 'application/json;charset=utf-8',
            'Host': 'wxsq.itaoniu.com.cn',
            'User-Agent': 'okhttp/4.9.3',
        }
        self.apptoken_headers = {
            'Host': 'wxsq.itaoniu.com.cn',
            'charset': 'utf-8',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 13; 22041211AC Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5307 MMWEBSDK/20230805 MMWEBID/5750 MicroMessenger/8.0.41.2441(0x28002951) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
            'apptoken': self.token,
            # Already added when you pass json=
            # 'content-type': 'application/json',
            'version': 'wangcai-2.0.0v',
            'Referer': 'https://servicewechat.com/wx717bc6a45ddb8367/59/page-frame.html',
        }

    # 登录
    def login(self):
        index = self.index
        ck = self.ck

        headers = {
            'Version': 'wangcai-2.0.0v',
            'Content-Type': 'application/json;charset=utf-8',
            'Host': 'wxsq.itaoniu.com.cn',
            'User-Agent': 'okhttp/4.9.3',
        }
        _json = {
            'unionId': ck,
        }
        url = 'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/yxapp/account/loginWx'
        response = requests.post(url, headers=headers, json=_json)
        response_dict = response.json()
        # print(response_dict)
        if response_dict.get('state') == 200:
            print(f'[账号{index + 1}] 登录成功')
            self.token = token = response_dict.get('body').get('token')
            self.user_id = user_id = response_dict.get('body').get('userId')
            current_date = datetime.datetime.today().strftime("%Y-%m-%d")
            token_dict[ck] = {"date": current_date,
                              "token": token, 'user_id': user_id}
            write_token_infomation()
            return True
        print(f'[账号{index + 1}] 登录失败 {response_dict}')
        ck_signal_list[index] = False

    # 获取个人信息
    def get_infomation(self):
        headers = self.apptoken_headers
        index = self.index

        _json = {}
        url = 'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/wechatapp/account/getuserinfo'
        response = requests.post(url, headers=headers, json=_json, )
        response_dict = response.json()
        # print(response_dict)
        if response_dict.get('state') == 200:
            nick_name = response_dict.get('body').get('nickName')
            income_balance = response_dict.get('body').get('incomeBalance')
            print(f'[账号{index + 1}] {nick_name} 余额：{income_balance}')
            return
        print(f'[账号{index + 1}] 获取信息失败')
        ck_signal_list[index] = False

    def sign_in(self):
        headers = self.token_headers
        index = self.index
        user_id = self.user_id

        _json = {
            'userId': user_id,
        }
        url = 'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/yxapp/ads/getSignin'
        response = requests.post(url, headers=headers, json=_json)
        response_dict = response.json()
        if response_dict.get('body').get('isFinish') == 1:
            print(f'[账号{index + 1}] 今日已签到')
            return
        timestamp = int(time.time() * 1000)
        # 定义要加密的字符串
        str_to_encrypt = f'{user_id}_AndroidadPlatform{timestamp}kaed499-28b6c504-824ed2ccb4e-3ce07a'
        sign = md5_str(str_to_encrypt)
        _json = {
            'timestamp': timestamp,
            'sign': sign,
            'adPlatform': '1',
            'adId': '660441450537816064',
            'adType': '3',
            'adReward': '1',
            'type': 'Android',
            'viewType': 1,
            'userId': user_id,
            'taskType': 1,
            'videos': 1,
            'tasks': 1,
        }
        url = 'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/yxapp/ads/addViewCount2'
        response = requests.post(url, headers=headers, json=_json, )
        response_dict = response.json()
        # print(response_dict)
        if response_dict.get('body').get('id') != 0:
            print(f'[账号{index + 1}] 签到成功')
            return
        print(f'[账号{index + 1}] 签到失败')
        ck_signal_list[index] = False

    # 观看视频广告任务
    def watch_video_ads(self):
        headers = self.token_headers
        index = self.index
        user_id = self.user_id

        response = requests.post(
            'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/yxapp/ads/getTask',
            headers=headers)
        response_dict = response.json()
        # print(response_dict)
        everyday_task = response_dict.get('body').get('everydayTask')  # 今日任务数量

        _json = {
            'userId': user_id,
        }
        response = requests.post(
            'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/yxapp/ads/getEverydayTask',
            headers=headers,
            json=_json,
        )
        response_dict = response.json()
        # print(response_dict)
        tasks = response_dict.get('body').get('tasks')  # 今日已结算任务数量

        if tasks >= everyday_task:
            print_list = [f'[账号{index + 1}] 今日看视频广告已全部完成，'
                          f'进度：{tasks}/{everyday_task}',
                          f'{"-" * 30}']
            print('\n'.join(print_list))
            return

        timestamp = int(time.time() * 1000)
        # 定义要加密的字符串
        str_to_encrypt = f'AndroidCount{timestamp}kaed499-28b6c504-824ed2ccb4e-3ce07a'
        sign = md5_str(str_to_encrypt)
        _json = {
            'userId': user_id,
            'timestamp': timestamp,
            'sign': sign,
        }
        url = 'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/yxapp/ads/getEverydayTaskCount'
        response = requests.post(url, headers=headers, json=_json, )
        response_dict = response.json()
        # print(response_dict)
        body = response_dict.get('body')
        if body is None:
            task_count = 0
        else:
            task_count = int(body)  # 今日未结算任务数量
        range_count = everyday_task - tasks - task_count

        for _ in range(range_count):
            print_list = []
            timestamp = int(time.time() * 1000)
            # 定义要加密的字符串
            str_to_encrypt = f'{user_id}_AndroidCount{timestamp}kaed499-28b6c504-824ed2ccb4e-3ce07a'
            sign = md5_str(str_to_encrypt)
            _json = {
                'userId': user_id,
                'timestamp': timestamp,
                'sign': sign,
                'adType': '1',
            }
            url = 'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/yxapp/ads/addEverydayTaskCount2'
            response = requests.post(url, headers=headers, json=_json, )
            response_dict = response.json()
            # print(response_dict)
            if response_dict.get('state') != 200:
                print(f'[账号{index + 1}] 看视频广告出错 {response_dict}')
                return
            completed_count = int(response_dict.get('body'))
            print_list.append(f'[账号{index + 1}] 看视频广告成功，'
                              f'进度：{completed_count + tasks}/{everyday_task}')
            if completed_count >= everyday_task:
                break
            _time = random.randint(20, 30)
            print_list.append(f'[账号{index + 1}] 等待{_time}秒，观看下一个视频')
            print_list.append(f'{"-" * 30}')
            print('\n'.join(print_list))
            time.sleep(_time)

        timestamp = int(time.time() * 1000)
        # 定义要加密的字符串
        str_to_encrypt = f'AndroidCount{timestamp}kaed499-28b6c504-824ed2ccb4e-3ce07a'
        sign = md5_str(str_to_encrypt)
        _json = {
            'userId': user_id,
            'timestamp': timestamp,
            'sign': sign,
        }
        url = 'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/yxapp/ads/getEverydayTaskCount'
        response = requests.post(url, headers=headers, json=_json, )
        response_dict = response.json()
        # print(response_dict)
        task_count = int(response_dict.get('body'))

        # 结算
        timestamp = int(time.time() * 1000)
        # 定义要加密的字符串
        str_to_encrypt = f'{user_id}_Android{timestamp}kaed499-28b6c504-824ed2ccb4e-3ce07a'
        sign = md5_str(str_to_encrypt)
        _json = {
            "tasks": task_count, "type": "Android",
            'userId': user_id,
            'timestamp': timestamp,
            'sign': sign,
        }
        url = 'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/yxapp/ads/addEverydayTask2'
        response = requests.post(url, headers=headers, json=_json, )
        response_dict = response.json()
        # print(response_dict)
        if response_dict.get('state') == 200:
            print_list = [f'[账号{index + 1}] 结算成功',
                          f'{"-" * 30}']
            print('\n'.join(print_list))
            return
        print_list = [f'[账号{index + 1}] 结算失败',
                      f'{"-" * 30}']
        print('\n'.join(print_list))

    # 提现
    def withdraw(self):
        headers = self.apptoken_headers
        index = self.index

        _json = {}
        url = 'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/wechatapp/account/getuserinfo'
        response = requests.post(url, headers=headers, json=_json, )
        response_dict = response.json()
        # print(response_dict)
        income_balance = response_dict.get('body').get('incomeBalance')
        balance = int(income_balance * 10)
        if balance <= 1:
            print(f'[账号{index + 1}] 当前余额为：{income_balance}，不进行提现')
            return
        _json = {
            'money': str(balance / 10),
        }
        response = requests.post(
            'https://wxsq.itaoniu.com.cn/TN_WANGCAI/api/v2/wechatapp/my/takecash',
            headers=headers, json=_json)
        response_dict = response.json()
        print(
            f'[账号{index + 1}] 提现{balance / 10}元 提现结果：{response_dict}')


def threading_task(func):
    # 创建线程池并设置最大线程数
    with concurrent.futures.ThreadPoolExecutor(
            max_workers=MAX_WORKERS) as executor:
        futures = []
        for index, ck in enumerate(ck_list):
            if not ck_signal_list[index]:
                continue
            task = DianMaGuangGao(ck, index)
            task_func = getattr(task, func)
            future = executor.submit(task_func)
            futures.append(future)
        # 等待线程池中的所有任务完成
        concurrent.futures.wait(futures)


def threading_main():
    print('')
    print("============开始获取用户信息============")
    threading_task('get_infomation')
    print('')
    print("============开始观看广告签到============")
    threading_task('sign_in')
    print('')
    print("============开始观看视频广告============")
    threading_task('watch_video_ads')
    print('')
    print("============开始提现============")
    threading_task('withdraw')
    print('')


def main():
    global ck_list
    global ck_signal_list

    get_env()
    read_token_infomation()
    ck_list = [x for x in ck_list if x.strip() != ""]
    if not ck_list:
        print('没有获取到账号！')
        return
    ck_count = len(ck_list)
    ck_signal_list = [True] * ck_count
    print(f'获取到{ck_count}个账号！')
    threading_main()


if __name__ == '__main__':
    main()
    sys.exit()
