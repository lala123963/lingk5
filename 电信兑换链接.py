#!/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# @Author : github@limoruirui https://github.com/limoruirui
# @Time : 2022/9/12 16:10
# cron "0 9,10,14 * * *" script-path=xxx.py,tag=匹配cron用
# const $ = new Env('电信并发多账号签到');
# -------------------------------

"""
1. 电信签到 不需要抓包 脚本仅供学习交流使用, 请在下载后24h内删除
2. cron说明 默认10点14点执行一次(用于兑换话费)
2. 环境变量说明:
    必须  TELECOM1 : 电信手机号@电信服务密码@宠物喂食次数(默认0,最大10)&手机号2@密码2@喂食数2
    # TELECOM       13311111111@111111@0&13322222222@222222@10
    并发命令：task WWJqingcheng_dx/china_telecom.py conc TELECOM
             task 后边是脚本所在目录/china_telecom.py conc TELECOM
3. 必须登录过 电信营业厅 app的账号才能正常运行
"""
import calendar
import requests
import json
"""
update:
    2022.10.25 参考大佬 github@QGCliveDavis https://github.com/QGCliveDavis 的 loginAuthCipherAsymmertric 参数解密 新增app登录获取token 完成星播客系列任务 感谢大佬
    2022.11.11 增加分享任务
    2023年10月30日  添加话费兑换链接，GOLDDATA为acitivityid抓取对应金额的response中的
"""
from datetime import date, datetime
from random import shuffle, randint, choices
from time import sleep, strftime
from re import findall
import re
from requests import get, post
from base64 import b64encode
from tools.aes_encrypt import AES_Ctypt
from tools.rsa_encrypt import RSA_Encrypt
from tools.tool import timestamp, get_environ, print_now
from tools.send_msg import push
from login.telecom_login import TelecomLogin
from string import ascii_letters, digits
from tools.notify import send


class ChinaTelecom:
    def __init__(self, account, pwd, checkin=True):
        self.phone = account
        self.ticket = ""
        self.token = ""
        if pwd != "" and checkin:
            userLoginInfo = TelecomLogin(account, pwd).main()
            self.ticket = userLoginInfo[0]
            self.token = userLoginInfo[1]

    def init(self):
        self.msg = ""
        self.ua = f"CtClient;9.6.1;Android;12;SM-G9860;{b64encode(self.phone[5:11].encode()).decode().strip('=+')}!#!{b64encode(self.phone[0:5].encode()).decode().strip('=+')}"
        self.headers = {
            "Host": "wapside.189.cn:9001",
            "Referer": "https://wapside.189.cn:9001/resources/dist/signInActivity.html",
            "User-Agent": self.ua
        }
        self.key = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+ugG5A8cZ3FqUKDwM57GM4io6\nJGcStivT8UdGt67PEOihLZTw3P7371+N47PrmsCpnTRzbTgcupKtUv8ImZalYk65\ndU8rjC/ridwhw9ffW2LBwvkEnDkkKKRi2liWIItDftJVBiWOh17o6gfbPoNrWORc\nAdcbpk2L+udld5kZNwIDAQAB\n-----END PUBLIC KEY-----"

    def req(self, url, method, data=None):
        if method == "GET":
            data = get(url, headers=self.headers)
            print(data.headers.get('Referer'))
            return data.json()
        elif method.upper() == "POST":
            data = post(url, headers=self.headers, json=data)
            print(data.headers.get('Referer'))
            return data.json()
        else:
            print_now("您当前使用的请求方式有误,请检查")

    # 长明文分段rsa加密
    def telecom_encrypt(self, text):
        if len(text) <= 32:
            return RSA_Encrypt(self.key).encrypt(text)
        else:
            encrypt_text = ""
            for i in range(int(len(text) / 32) + 1):
                split_text = text[(32 * i):(32 * (i + 1))]
                encrypt_text += RSA_Encrypt(self.key).encrypt(split_text)
            return encrypt_text

    @staticmethod
    def geneRandomToken():
        randomList = choices(ascii_letters + digits, k=129)
        token = f"V1.0{''.join(x for x in randomList)}"
        return token

    # 查询宠物等级
    def get_level(self):
        url = "https://wapside.189.cn:9001/jt-sign/paradise/getParadiseInfo"
        body = {
            "para": self.telecom_encrypt(f'{{"phone":{self.phone}}}')
        }
        data = self.req(url, "POST", body)
        self.level = int(data["userInfo"]["paradiseDressup"]["level"])
        if self.level < 5:
            print_now("当前等级小于5级 不领取等级权益")
            return
        url = "https://wapside.189.cn:9001/jt-sign/paradise/getLevelRightsList"
        right_list = self.req(url, "POST", body)[f"V{self.level}"]
        for data in right_list:
            # print(dumps(data, indent=2, ensure_ascii=0))
            if "00金豆" in data["righstName"] or "话费" in data["righstName"]:
                rightsId = data["id"]
                self.level_ex(rightsId)
                continue
        # print(self.rightsId)

    # 每月领取等级金豆
    def level_ex(self, rightsId):
        # self.get_level()
        url = "https://wapside.189.cn:9001/jt-sign/paradise/conversionRights"
        data = {
            "para": self.telecom_encrypt(f'{{"phone":{self.phone},"rightsId":"{rightsId}"}},"receiveCount":1')
        }
        resp = self.req(url, "POST", data)
        # print(type(resp))
        print_now(resp)

    def author(self):
        """
        通过usercode 获取 authorization
        :return:
        """
        self.get_usercode()
        url = "https://xbk.189.cn/xbkapi/api/auth/userinfo/codeToken"
        data = {
            "usercode": self.usercode
        }
        data = post(url, headers=self.headers_live, json=data).json()
        self.authorization = f"Bearer {data['data']['token']}"
        self.headers_live["Authorization"] = self.authorization

    def get_userid(self):
        url = "https://wapside.189.cn:9001/jt-sign/api/home/homeInfo"
        body = {
            "para": self.telecom_encrypt(
                f'{{"phone":"{self.phone}","signDate":"{datetime.now().__format__("%Y-%m")}"}}')
        }
        userid = post(url, json=body).json()["data"]["userInfo"]["userThirdId"]
        return userid

    # @staticmethod
    def referer(self):
        currentday = calendar.weekday(datetime.now().year, datetime.now().month, datetime.now().day)
        data = get_environ("GOLDDATA")
        # data = '649bd981a663945652d78b7d&649bda03fe92b845afbac20e&649be392c2fec95cb995cafb&649be3d831788756a708f3ea'
        mondata =[]
        data2 = data.split("&")
        for i in range(len(data2)):
            mondata.append(data2[i])
        msg_str = ''
        if currentday != '4' and datetime.now().hour > 0 and datetime.now().hour < 11:
            print('+++++++' + self.phone + '+++++++')
            print(
                f'上午场二十元抢购连接：https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html?ticket={self.ticket}&activitieId={mondata[0]}')
            print(
                f'上午场十元抢购连接：https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html?ticket={self.ticket}&activitieId={mondata[1]}')
            msg_str += f'{self.phone}\n上午场二十元抢购连接：https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html?ticket={self.ticket}&activitieId={mondata[0]}' + f'\n上午场十元抢购连接：https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html?ticket={self.ticket}&activitieId={mondata[1]}'
        elif currentday != '4' and datetime.now().hour >= 11:
            print('+++++++' + self.phone + '+++++++')
            print(
                f'下午场一元抢购连接：https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html?ticket={self.ticket}&activitieId={mondata[2]}')
            print(
                f'下午场两元抢购连接：https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html?ticket={self.ticket}&activitieId={mondata[3]}')
            msg_str += f'{self.phone}\n下午场一元抢购连接：https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html?ticket={self.ticket}&activitieId={mondata[2]}' + f'\n下午场两元抢购连接：https://wapact.189.cn:9001/JinDouMall/JinDouMall_independentDetails.html?ticket={self.ticket}&activitieId={mondata[3]}'
        elif currentday == '4':
            print_now('周五场,自己抓~~~,')
        print('链接获取成功')
        send('获取兑换链接通知', msg_str)

    def change_type(byte):
        if isinstance(byte, bytes):
            return str(byte, encoding="utf-8")
        return json.JSONEncoder.default(byte)


    def testGetID(self):
        url = 'https://wapact.189.cn:9001/jdscBaiWanLua/queryTurntableBaiWan.do'

        res = requests.get(url,"GET")
        print(res.json())

    def main(self):
        try:
            self.referer()
        except Exception as e:
            print(f"请求失败：" + str(e))
        print('========================================================')
        print('============================分隔符=======================')
        print('========================================================')


# 主方法与源文件不同；增加了多账号的判断；变量格式如下
# TELECOM       13311111111@111111@10&13322222222@222222@10
if __name__ == "__main__":
    TELECOM = get_environ("TELECOM1")
    
    users = TELECOM.split("&")
    for i in range(len(users)):
        user = users[i].split("@")
        phone = user[0]
        password = user[1]
        foods = int(float(user[2]))
        print(phone, password, foods)
        if phone == "":
            exit(0)
        if password == "":
            print_now("电信服务密码未提供 只执行部分任务")

        if datetime.now().hour + (8 - int(strftime("%z")[2])) == 12:
            telecom = ChinaTelecom(phone, password, False)
            telecom.init()
            telecom.convert_reward()
        else:
            telecom = ChinaTelecom(phone, password)
            telecom.main()


