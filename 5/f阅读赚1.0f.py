'''
cron: 50 */30 8-22 * * *
new Env('f阅读赚阅读');
活动入口微信打开：http://5851285280.gdhwrfl.cn/?jgwq=3343619&goid=itrb
下载地址：https://www.123pan.com/s/xzeSVv-IHpfv.html
公告地址：http://175.24.153.42:8881/getmsg?type=ydz

使用方法：
1.活动入口,微信打开：http://5851285280.gdhwrfl.cn/?jgwq=3343619&goid=itrb
2.打开活动入口，抓包主页cookie中的7bfe3c8f4d51851参数,
或者getinfo或者其他接口headers请求头中的a_h_n，这个键的值中，’/‘后就是cookie
例如：http%3A%2F%2F51111129.tvyatdp.cn%2F%3Fjgwq%3D3311116%26goid%3Ditrb/d8cb0b76xxxxx
d8cb0b76xxxxx就是ck
3.青龙环境变量菜单，添加本脚本环境变量
名称 ：ydz_config
单个账户参数： ['name|ck|key|uids']
例如：['账户1|dxxxxx|xxxxx|UID_xxxx']
多个账户['name|ck|key|uids','name|ck|key|uids']
例如：['账户1|dxxxxx|xxxxx|UID_xxxx','账户2|dxxxxx|xxxxx|UID_xxxx']
参数说明与获取：
name:相当于备注随意填写，不含有’|‘就可以
ck:打开活动入口，抓包主页cookie中的7bfe3c8f4d51851参数,
或者getinfo或者其他接口headers请求头中的a_h_n，这个键的值中，’/‘后就是cookie
例如：http%3A%2F%2F51111129.tvyatdp.cn%2F%3Fjgwq%3D3311116%26goid%3Ditrb/d8cb0b76xxxxx
key:每个账号的推送标准，每个账号全阅读只需要一个key,多个账号需要多个key,key永不过期。
为了防止恶意调用key接口，限制每个ip每天只能获取一个key。手机开飞行模式10s左右可以变更ip重新获取key
通过浏览器打开链接获取:http://175.24.153.42:8882/getkey
uids:wxpusher的参数，当一个微信关注了一个wxpusher的推送应用后，会在推送管理后台(https://wxpusher.zjiecode.com/admin/main)的'用户管理-->用户列表'中显示
用户在推送页面点击’我的-->我的UID‘也可以获取

4.青龙环境变量菜单，添加本脚wxpusher环境变量(不需要重复添加)
青名称 ：push_config
参数 ：{"printf":0,"threadingf":1,"appToken":"xxxx"}
例如：{"printf":0,"threadingf":1,"appToken":"AT_r1vNXQdfgxxxxxscPyoORYg"}
参数说明：
printf 0是不打印调试日志，1是打印调试日志
threadingf:并行运行账号参数 1并行执行，0顺序执行，并行执行优点，能够并行跑所以账号，加快完成时间，缺点日志打印混乱。
appToken 这个是填wxpusher的appToken

5.提现标准默认是3000，需要修改，请在本脚本最下方，按照提示修改
'''
import time
import json
import random
import requests
import re
import os
import threading
checkDict={
'暂无':['0','0'],
}
def getmsg():
    lvsion = 'v1.0f'
    r = ''
    try:
        u = 'http://175.24.153.42:8881/getmsg'
        p = {'type': 'ydz'}
        r = requests.get(u, params=p)
        rj = r.json()
        version = rj.get('version')
        gdict = rj.get('gdict')
        gmmsg = rj.get('gmmsg')
        print('系统公告:', gmmsg)
        print(f'最新版本{version}当前版本{lvsion}')
        print(f'系统的公众号字典{len(gdict)}个:{gdict}')
        print(f'本脚本公众号字典{len(checkDict.values())}个:{list(checkDict.keys())}')
        print('=' * 50)
    except Exception as e:
        print(r.text)
        print(e)
        print('公告服务器异常')

def push(title, link, text, type1, uids, key):
    str1 = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>TITLE</title>
<style type=text/css>
   body {
   	background-image: linear-gradient(120deg, #fdfbfb 0%, #a5d0e5 100%);
    background-size: 300%;
    animation: bgAnimation 6s linear infinite;
}
@keyframes bgAnimation {
    0% {background-position: 0% 50%;}
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;}
}
</style>
</head>
<body>
<p>TEXT</p><br>
<p><a href="http://175.24.153.42:8882/lookstatus?key=KEY&type=TYPE">查看状态</a></p><br>
<p><a href="http://175.24.153.42:8882/lookwxarticle?key=KEY&type=TYPE&wxurl=LINK">点击阅读检测文章</a></p><br>
</body>
</html>
    '''
    content = str1.replace('TITTLE', title).replace('LINK', link).replace('TEXT', text).replace('TYPE', type1).replace(
        'KEY', key)
    datapust = {
        "appToken": appToken,
        "content": content,
        "summary": title,
        "contentType": 2,
        "uids": [uids]
    }
    urlpust = 'http://wxpusher.zjiecode.com/api/send/message'
    try:
        p = requests.post(url=urlpust, json=datapust).text
        print(p)
        return True
    except:
        print('推送失败！')
        return False

def getinfo(link):
    try:
        r=requests.get(link)
        #print(r.text)
        html = re.sub('\s', '', r.text)
        biz=re.findall('varbiz="(.*?)"\|\|', html)
        if biz!=[]:
            biz=biz[0]
        if biz=='' or biz==[]:
            if '__biz' in link:
                biz = re.findall('__biz=(.*?)&', link)
                if biz != []:
                    biz = biz[0]
        nickname = re.findall('varnickname=htmlDecode\("(.*?)"\);', html)
        if nickname!=[]:
            nickname=nickname[0]
        user_name = re.findall('varuser_name="(.*?)";', html)
        if user_name!=[]:
            user_name=user_name[0]
        msg_title = re.findall("varmsg_title='(.*?)'\.html\(", html)
        if msg_title!=[]:
            msg_title=msg_title[0]
        text=f'公众号唯一标识：{biz}|文章:{msg_title}|作者:{nickname}|账号:{user_name}'
        print(text)
        return nickname,user_name,msg_title,text,biz
    except Exception as e:
        print(e)
        print('异常')
        return False
class WXYD:
    def __init__(self, cg):
        #print(cg)
        self.name = cg[0]
        self.a_h_n=cg[1]
        self.key=cg[2]
        self.tsuids=cg[3]
        self.headers = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090719) XWEB/8391 Flue',
            'a_h_n': f'http%3A%2F%2F5851546129.tvyatdp.cn%2F%3Fgoid%3Ditrb/{self.a_h_n}',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://5851546869.tvyatdp.cn',
            'Referer': f'http://5851546869.tvyatdp.cn/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh',
        }
    def setstatus(self):
        try:
            u = 'http://175.24.153.42:8882/setstatus'
            p = {'key': self.key, 'type': 'ydz', 'val': '1'}
            r = requests.get(u, params=p, timeout=10)
            print(self.name, r.text)
        except Exception as e:
            print(self.name,'设置状态异常')
            print(self.name,e)

    def getstatus(self):
        try:
            u = 'http://175.24.153.42:8882/getstatus'
            p = {'key': self.key, 'type': 'ydz'}
            r = requests.get(u, params=p, timeout=3)
            return r.text
        except Exception as e:
            print(self.name,'查询状态异常', e)
            return False

    def printjson(self, text):
        if printf == 0:
            return
        print(self.name, text)
    # 请求个人信息
    def getinfo(self):
        u = "http://wxr.jjyii.com/user/getinfo?v=3 "
        r = requests.post(u, headers=self.headers)
        rj = r.json()
        if rj.get('code')==-4001:
            print(self.name,'ck失效，请检测你的ck是否填写正确，或者手动打开活动查看活动是否正常')
            print(self.name,r.text)
            return False
        userinfo=rj.get('data')
        self.balance = userinfo['balance']
        count = userinfo['count']
        income = userinfo['income']
        price = userinfo['price']
        print(self.name,f'当前金币：{self.balance}，累计金币：{income}，累计已读：{count}，每篇价格：{price}')

    def read(self):
        r1=random.randint(5851712718,6851712718)
        r2=random.randint(3890,5890)
        for i in range(100):
            print(self.name,'-'*30)
            u = f"http://wxr.jjyii.com/r/get?v=10"
            p = f'o=http%3A%2F%2F{r1}.jifweti.cn%2F%3Fa%3Dgt%26goid%3Ditrb%26_v%3D{r2}&t=quick'
            r = requests.post(u, headers=self.headers, data=p)
            rj = r.json()
            #print(rj)
            url=rj.get('data').get('url')
            if url!=None:
                #print(url)
                a=getinfo(url)
                if self.testCheck(a, url) == False:
                    return False
                tsm = random.randint(10, 15)
                print(self.name,f'本次模拟读{tsm}秒')
                time.sleep(tsm)
                self.submit()
            else:
                print(self.name,'当前暂无文章可读')
                print(self.name,rj)
                return False

    def testCheck(self,a,url):
        if a == False:
            print(self.name, '解析文章链接失败')
            return True
        if a[4] == []:
            print(self.name,'这个链接没有获取到微信号id', url)
            return True
        if checkDict.get(a[4]) != None:
            self.setstatus()
            for i in range(60):
                if i % 30 == 0:
                    push('阅读赚过检测', url, a[3], 'ydz',self.tsuids,self.key)
                getstatusinfo = self.getstatus()
                if getstatusinfo == '0':
                    print(self.name,'过检测文章已经阅读')
                    return True
                elif getstatusinfo == '1':
                    print(self.name,f'正在等待过检测文章阅读结果{i}秒。。。')
                    time.sleep(1)
                else:
                    print(self.name,f'服务器异常{i}秒。。。')
                    time.sleep(1)
            print(self.name,'过检测超时中止脚本防止黑号')
            return False
        else:return True
    def submit(self):
        u = 'http://wxr.jjyii.com/r/ck'
        p = 't=quick'
        r = requests.post(u, headers=self.headers, data=p)
        #self.printjson(r.text)
        rj = r.json()
        if rj.get('ret') == True:
            userinfo = rj.get('data')
            self.balance = userinfo['balance']
            count = userinfo['count']
            income = userinfo['income']
            print(self.name,f'当前金币：{self.balance}，累计金币：{income}，累计已读：{count}')
            return True
        else:
            print(self.name, r.text)
            print(self.name,'异常,尝试继续阅读')

    # 提现
    def cash(self):
        if self.balance < txbz:
            print(self.name,'提现结果','没有达到提现标准')
            return False
        u = f"http://wxr.jjyii.com/mine/cash"
        r = requests.post(u, headers=self.headers)
        print(self.name,'提现结果',r.text)

    def run(self):
        self.getinfo()
        time.sleep(2)
        self.read()
        print(self.name,'-'*30)
        time.sleep(5)
        self.cash()
if __name__ == '__main__':
    pushconfig =os.getenv('push_config')
    if pushconfig == None:
        print('请检查你的推送变量名称是否填写')
        exit(0)
    try:
        pushconfig = json.loads(pushconfig.replace("'", '"'))
    except Exception as e:
        print(e)
        print(pushconfig)
        print('请检查你的推送变量参数是否填写正确')
        exit(0)
    ydzconfig = os.getenv('ydz_config')
    if ydzconfig == None:
        print('请检查你的阅读赚脚本变量名称是否填写')
        exit(0)
    try:
        ydzconfig = json.loads(ydzconfig.replace("'", '"'))
    except Exception as e:
        print(e)
        print(ydzconfig)
        print('请检查你的阅读赚脚本脚本变量参数是否填写正确')
        exit(0)
    printf = pushconfig['printf']
    appToken = pushconfig['appToken']
    threadingf = pushconfig['threadingf']
    getmsg()
    txbz = 3000  # 这里是提现标志3000代表3毛
    tl = []
    if threadingf == 1:
        for i in ydzconfig:
            cg = i.split('|')
            print('*' * 50)
            print(f'开始执行{i[0]}')
            api = WXYD(cg)
            t = threading.Thread(target=api.run, args=())
            tl.append(t)
            t.start()
            time.sleep(0.5)
        for t in tl:
            t.join()
    elif threadingf == 0:
        for i in ydzconfig:
            cg = i.split('|')
            print('*' * 50)
            print(f'开始执行{cg[0]}')
            api = WXYD(cg)
            api.run()
            print(f'{cg[0]}执行完毕')
            time.sleep(3)
    else:
        print('请确定推送变量中threadingf参数是否正确')
    print('全部账号执行完成')
