# coding:utf-8
"""
项目:时刻新闻APP
抓包a.rednet.cn里的userid，环境变量skxw，多账号换行分开
cron:43 */12 * * *
const $ = new Env('时刻新闻');
作者：cason
"""
import json
import os
import requests


def login():
    url = 'https://a.rednet.cn/dispatch'
    headers = {
        'bizOp': 'userPassportLogin',
        'userid': '1FASX0vdWIcLLCIp6InZlw==',
        'bizType': 'user',
        'version': '10.5',
        'crc': '43bf0bbf36833f8b0becf6d91a292097',
        'Content-Type': 'application/json',
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 7.1.2; M2012K11AC Build/N6F26Q)'
    }
    data = json.dumps({
        "password": "VdhrHCCNIEQuo58GUlKg3g==",
        "imei": "816818250415626",
        "userName": "cnTw5JsoaSnyxsOFXkd4ng==",
        "siteId": 6,
    })
    r = requests.post(url, data=data, headers=headers)
    print(r.text)


def get_point(userid):
    url = 'https://a.rednet.cn/dispatch'
    headers = {
        "bizOp": "completeUserTask",
        "userid": userid,
        "bizType": "userPoint",
        "version": "10.5",
        'Content-Type': 'application/json',
        'User-Agent': 'PostmanRuntime-ApipostRuntime/1.1.0'
    }
    for i in range(1, 8):
        data = json.dumps({
            "pointType": i, "serialVersionUID": -2274761546514303065, "siteId": 6
        })
        if i == 1 or i == 2:
            r = requests.post(url, data=data, headers=headers)
            if r.json().get('data').get('pointFlag') == 0:
                print('今日次数已达上限')
            else:
                print(r.json().get('data').get('pointName'), '获得', r.json().get('data').get('pointNum'), '积分')
        elif i == 3 or i == 6:
            for j in range(5):
                r = requests.post(url, data=data, headers=headers)
                if r.json().get('data').get('pointFlag') == 0:
                    print('今日次数已达上限')
                else:
                    print(r.json().get('data').get('pointName'), '获得', r.json().get('data').get('pointNum'), '积分')
        elif i == 4 or i == 5:
            for j in range(10):
                r = requests.post(url, data=data, headers=headers)
                if r.json().get('data').get('pointFlag') == 0:
                    print('今日次数已达上限')
                else:
                    print(r.json().get('data').get('pointName'), '获得', r.json().get('data').get('pointNum'), '积分')
        else:
            for j in range(4):
                r = requests.post(url, data=data, headers=headers)
                if r.json().get('data').get('pointFlag') == 0:
                    print('今日次数已达上限')
                else:
                    print(r.json().get('data').get('pointName'), '获得', r.json().get('data').get('pointNum'), '积分')


def main():
    userid_list = os.getenv('skxw').split('\n')
    print('=====检测到' + str(len(userid_list)) + '个账号======')
    for num, userid in enumerate(userid_list):
        num = num + 1
        print(f'\n=======开始账号【{num}】========\n')
        # login()
        get_point(userid)


if __name__ == '__main__':
    main()
