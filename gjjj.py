 # *
 # * 项目类型：微信小程序
 # * 项目名称：顾家家居会员俱乐部
 # * 项目抓包：'phone&unionid#phone&unionid'填入变量
 # * 项目变量：gjjjhyjlb

import requests,os

def automaticLogin():
    url = 'https://mc.kukahome.com/club-server/member/automaticLogin'

    headers = {
        'Host': 'mc.kukahome.com',
        'Connection': 'keep-alive',
        'Content-Length': '216',
        'AccessToken': '',
        'E-Opera': '',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/8447',
        'Content-Type': 'application/json',
        'timestamp': '1704250957555',
        'xweb_xhr': '1',
        'brandCode': 'K001',
        'X-Customer': '',
        'appid': '667516',
        'sign': '68776c9ee9796c20b8240c0b6f94326f',
        'Accept': '*/*',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://servicewechat.com/wx0770280d160f09fe/161/page-frame.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }

    data = {"identityType":"mobile","identityValue":member,"type2":"wechat-unionid","value2":"","source":"顾家小程序","contentName":"","openid":"","unionid":unionid}

    response = requests.post(url, headers=headers, json=data).json()
    return response['data']['AccessToken'],response['data']['membership']['id'],response['data']['membership']['phone']

def sign():
    url = 'https://mc.kukahome.com/club-server/front/member/signIn'

    headers = {
        'Host': 'mc.kukahome.com',
        'Connection': 'keep-alive',
        'Content-Length': '78',
        'AccessToken': token,
        'E-Opera': '',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/8447',
        'Content-Type': 'application/json',
        'timestamp': '1704252084361',
        'xweb_xhr': '1',
        'brandCode': 'K001',
        'X-Customer': str(userId),
        'appid': '667516',
        'sign': '5e0d8b77942218e32b7aeb5ed5c1501a',
        'Accept': '*/*',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://servicewechat.com/wx0770280d160f09fe/161/page-frame.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }

    data = {"identityType":"mobile","identityValue":phone,"membershipId":userId}

    response = requests.post(url, headers=headers, json=data).json()
    if response['data'] != None:
        print('签到成功')
    else:
        print(response['message'])


if __name__ == '__main__':
    print('没能力')
    if os.environ.get("gjjjhyjlb"):
        tokenString = os.environ["gjjjhyjlb"]
        if tokenString != '':
            apitokenList = tokenString.split("#")
        else:
            print('没有配置gjjjhyjlb')
            exit()
    else:
        print('没有配置gjjjhyjlb')
        exit()

    for acc in apitokenList:
        member,unionid  = acc.split('&')
        token,userId,phone = automaticLogin()
        sign()
