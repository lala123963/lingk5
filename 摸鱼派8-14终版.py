
"""
# cron:7 13 * * *
# const $ = new Env('摸鱼派');
"""
import requests
import time
import random
import re
import os
import json
from bs4 import BeautifulSoup
# 第111行if avatar and avatar['aria-label'] == 'hanyx2002':把hanyx2002换成你自己的id，一定要换id！！！！！
#链接：https://fishpi.cn/register?r=hanyx2002
#脚本最后read是阅读，remark是回复 agree()是点赞 LQ()是领取前日活跃奖check是查看当前状态，agree即点赞是需要先发一个新人报道贴等管理员变更用户组才行，加上#是关闭，去掉是开启。例如agree前面加了#表面该功能（函数）是关闭不启用
ck = os.getenv('MYPCK')
#看贴头
header_read = {
    'authority': 'fishpi.cn',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'max-age=0',
    'cookie': ck,
    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43',
}
#获取评论id头
header_gitid = {
    'authority': 'fishpi.cn',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'max-age=0',
    'cookie': ck,
    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43',
}
#删除评论的请求头
header_cancel = {
    'authority': 'fishpi.cn',
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cookie': ck,
    'origin': 'https://fishpi.cn',
    'referer': 'https://fishpi.cn/article/1683775497629',
    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43',
    'x-requested-with': 'XMLHttpRequest',
}
def read():
    for i in range(20):
        requests.get('https://fishpi.cn/article/1630569106133', headers=header_read)
        i = i+1
        print(f"第{i}次阅读【新人手册】，你真是一个好新人😊，打搅几秒继续读😋")
        time.sleep(random.randint(2, 5))
def remark():
    response1 = requests.get('https://fishpi.cn/article/1691917519781', headers=header_gitid)
    html = response1.text
    token_pattern = r"csrfToken: '(?P<token>\w+)'" #获取token
    match = re.search(token_pattern, html)
    token = match.group('token')
    print(f'获取token成功：{token}')
    header_remark = {
        'authority': 'fishpi.cn',
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'cookie': ck,
        'csrftoken': token,
        'origin': 'https://fishpi.cn',
        'referer': 'https://fishpi.cn/article/1683775497629',
        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43',
        'x-requested-with': 'XMLHttpRequest',
    }
    #print(header_remark)
    for i in range(5): 
        data = {
            "articleId": "1691917519781",
            "commentVisible": True,
            "commentContent": "hhhh\n",
            "userCommentViewMode": 1
        }
        data = json.dumps(data, separators=(',', ':'))
        requests.post('https://fishpi.cn/comment', headers=header_remark, data=data)
        response = requests.get('https://fishpi.cn/article/1691917519781', headers=header_gitid)
        htm = response.text
        #r= BeautifulSoup(htm, 'html.parser')
        soup = BeautifulSoup(htm, 'html.parser')
        comments = soup.find_all('li')   #获取id
        for comment in comments:
            avatar = comment.find('div', class_='avatar')
            if avatar and avatar['aria-label'] == 'xiaoyue2436':
                user_id = comment['id']  #评论id
                url = f'https://fishpi.cn/comment/{user_id}/remove'
                time.sleep(random.randint(1, 3))
                requests.post(url=url, headers=header_cancel) #删除评论 
                a = i+1
                print(f'第{a}次评论&删评，顺便延迟几秒')
                time.sleep(random.randint(1, 3))
header1 = {
                'authority': 'fishpi.cn',
                'accept': '*/*',
                'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'cookie': ck,
                'origin': 'https://fishpi.cn',
                'referer': 'https://fishpi.cn/article/1683775497629',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43',
                'x-requested-with': 'XMLHttpRequest',
}
def check():
    timestamp = time.time()
    t0 = int(timestamp * 1000)
    t1 = int(timestamp * 1000)+2
    url = f'https://fishpi.cn/user/liveness?_={t1}'
    res = requests.get(url=url,headers=header1).json()
    liveness = res['liveness']
    print(f'【当前活跃度】：{liveness}%')
    ur = f'https://fishpi.cn/user/checkedIn?_={t0}'
    res1 = requests.get(url=ur,headers=header1).json()
    checkedIn = res1['checkedIn']
    print(f'【签到状态】：{checkedIn}')
def agree():
    for i in range(2):
        i = i+1
        data = '{"dataId":"1691919822878"}'
        requests.post('https://fishpi.cn/vote/up/comment', headers=header1, data=data)
        time.sleep(random.randint(1, 3))
        requests.post('https://fishpi.cn/vote/up/comment', headers=header1, data=data)
        print(f'第{i}次点赞&取赞')
def LQ():
    timestamp = time.time()
    t0 = int(timestamp * 1000)
    url = f'https://fishpi.cn/activity/yesterday-liveness-reward-api?_={t0}'
    res = requests.get(url=url,headers=header1).json()
    sum = res['sum']
    print(f'【领取积分前日活跃积分】：{sum}')




    




read()
remark()
#agree()
LQ()
check()