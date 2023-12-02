# !/usr/bin/env python
# -*-coding:utf-8 -*-
# -------------------------------
# @Author : 第一作者：https://yaohuo.me/bbs/userinfo.aspx?touserid=30865  github@yuanter https://github.com/yuanter  by院长修改青龙版
# @Time : 2023/11/21 16:25
# const $ = new Env('Go柄网签到');
# -------------------------------

"""
1. Go柄网签到 支持多账号执行 脚本仅供学习交流使用, 请在下载后24h内删除
2. 地址：https://www.gobing.cn/index  本脚本需要使用账号密码，请记得设置密码（注意：本脚本使用了&、#和@3个符号，更改密码无需使用这3个符号）
3. 环境变量说明:
    变量名(必须)： GobingCK  格式： 账号&密码
    单个CK塞多个账号时，以#或者换行分隔开：CK1#CK2

wxpusher推送(非必填)
青龙变量：GobingCK_WXPUSHER_TOKEN   wxpusher推送的token
青龙变量：GobingCK_WXPUSHER_TOPIC_ID   wxpusher推送的topicId
"""
import requests,re
import json, os
import time
from sys import stdout
import random




WXPUSHER_TOKEN = '' # wxpusher推送的token
WXPUSHER_TOPIC_ID = '' # wxpusher推送的topicId
WXPUSHER_CONTENT_TYPE = 2  # wxpusher推送的样式，1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签)，默认为2
# wxpusher消息推送
def wxpusher(title: str, content: str) -> None:
    """
    使用微信的wxpusher推送
    """
    if not WXPUSHER_TOKEN or not WXPUSHER_TOPIC_ID:
        print("wxpusher 服务的 token 或者 topicId 未设置!!\n取消推送")
        return
    print("wxpusher 服务启动")

    url = f"https://wxpusher.zjiecode.com/api/send/message"
    headers = {"Content-Type": "application/json;charset=utf-8"}
    contentType = 2
    if not WXPUSHER_CONTENT_TYPE:
        contentType = 2
    else:
        contentType = WXPUSHER_CONTENT_TYPE
    if contentType == 2:
        content = content.replace("\n", "<br/>")
    data = {
        "appToken":f"{WXPUSHER_TOKEN}",
        "content":f"{content}",
        "summary":f"{title}",
        "contentType":contentType,
        "topicIds":[
            f'{WXPUSHER_TOPIC_ID}'
        ],
        "verifyPay":False
    }
    response = requests.post(
        url=url, data=json.dumps(data), headers=headers, timeout=15
    ).json()

    if response["code"] == 1000:
        print("wxpusher推送成功！")
    else:
        print("wxpusher推送失败！")
        print(f"wxpusher推送出错响应内容：{response}" )


ql_auth_path = '/ql/data/config/auth.json'
ql_config_path = '/ql/data/config/config.sh'
#判断环境变量
flag = 'new'
if not os.path.exists(ql_auth_path):
    ql_auth_path = '/ql/config/auth.json'
    ql_config_path = '/ql/config/config.sh'
    if not os.path.exists(ql_config_path):
        ql_config_path = '/ql/config/config.js'
    flag = 'old'
# ql_auth_path = r'D:\Docker\ql\config\auth.json'
ql_url = 'http://localhost:5600'


def __get_token() -> str or None:
    with open(ql_auth_path, 'r', encoding='utf-8') as f:
        j_data = json.load(f)
    return j_data.get('token')


def __get__headers() -> dict:
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + __get_token()
    }
    return headers

# 封装读取环境变量的方法
def get_cookie(key, default="", output=True):
    def no_read():
        if output:
            print_now(f"未填写环境变量 {key} 请添加")
        return default
    return get_cookie_data(key) if get_cookie_data(key) else no_read()

#获取ck
def get_cookie_data(name):
    ck_list = []
    remarks_list = []
    cookie = None
    cookies = get_config_and_envs(name)
    for ck in cookies:
        data_temp = {}
        if ck["name"] != name:
            continue
        if ck.get('status') == 0:
            # ck_list.append(ck.get('value'))
            # 直接添加CK
            ck_list.append(ck)
    if len(ck_list) < 1:
        print('变量{}共配置{}条CK,请添加环境变量,或查看环境变量状态'.format(name,len(ck_list)))
    return ck_list

# 修改print方法 避免某些环境下python执行print 不会去刷新缓存区导致信息第一时间不及时输出
def print_now(content):
    print(content)
    stdout.flush()


# 查询环境变量
def get_envs(name: str = None) -> list:
    params = {
        't': int(time.time() * 1000)
    }
    if name is not None:
        params['searchValue'] = name
    res = requests.get(ql_url + '/api/envs', headers=__get__headers(), params=params)
    j_data = res.json()
    if j_data['code'] == 200:
        return j_data['data']
    return []


# 查询环境变量+config.sh变量
def get_config_and_envs(name: str = None) -> list:
    params = {
        't': int(time.time() * 1000)
    }
    #返回的数据data
    data = []
    if name is not None:
        params['searchValue'] = name
    res = requests.get(ql_url + '/api/envs', headers=__get__headers(), params=params)
    j_data = res.json()
    if j_data['code'] == 200:
        data = j_data['data']
    with open(ql_config_path, 'r', encoding='utf-8') as f:
        while  True:
            # Get next line from file
            line  =  f.readline()
            # If line is empty then end of file reached
            if  not  line  :
                break;
            #print(line.strip())
            exportinfo = line.strip().replace("\"","").replace("\'","")
            #去除注释#行
            rm_str_list = re.findall(r'^#(.+?)', exportinfo,re.DOTALL)
            #print('rm_str_list数据：{}'.format(rm_str_list))
            exportinfolist = []
            if len(rm_str_list) == 1:
                exportinfo = ""
            #list_all = re.findall(r'export[ ](.+?)', exportinfo,re.DOTALL)
            #print('exportinfo数据：{}'.format(exportinfo))
            #以export分隔，字符前面新增标记作为数组0，数组1为后面需要的数据
            list_all = ("标记"+exportinfo.replace(" ","").replace(" ","")).split("export")
            #print('list_all数据：{}'.format(list_all))
            if len(list_all) > 1:
                #以=分割，查找需要的环境名字
                tmp = list_all[1].split("=")
                if len(tmp) > 1:

                    info = tmp[0]
                    if name in info:
                        #print('需要查询的环境数据：{}'.format(tmp))
                        data_tmp = []
                        data_json = {
                            'id': None,
                            'value': tmp[1],
                            'status': 0,
                            'name': name,
                            'remarks': "",
                            'position': None,
                            'timestamp': int(time.time()*1000),
                            'created': int(time.time()*1000)
                        }
                        if flag == 'old':
                            data_json = {
                                '_id': None,
                                'value': tmp[1],
                                'status': 0,
                                'name': name,
                                'remarks': "",
                                'position': None,
                                'timestamp': int(time.time()*1000),
                                'created': int(time.time()*1000)
                            }
                        #print('需要的数据：{}'.format(data_json))
                        data.append(data_json)
        #print('第二次配置数据：{}'.format(data))
    return data


# 新增环境变量
def post_envs(name: str, value: str, remarks: str = None) -> list:
    params = {
        't': int(time.time() * 1000)
    }
    data = [{
        'name': name,
        'value': value
    }]
    if remarks is not None:
        data[0]['remarks'] = remarks
    res = requests.post(ql_url + '/api/envs', headers=__get__headers(), params=params, json=data)
    j_data = res.json()
    if j_data['code'] == 200:
        return j_data['data']
    return []


# 修改环境变量1，青龙2.11.0以下版本（不含2.11.0）
def put_envs_old(_id: str, name: str, value: str, remarks: str = None) -> bool:
    params = {
        't': int(time.time() * 1000)
    }

    data = {
        'name': name,
        'value': value,
        '_id': _id
    }

    if remarks is not None:
        data['remarks'] = remarks
    res = requests.put(ql_url + '/api/envs', headers=__get__headers(), params=params, json=data)
    j_data = res.json()
    if j_data['code'] == 200:
        return True
    return False


# 修改环境变量2，青龙2.11.0以上版本（含2.11.0）
def put_envs_new(_id: int, name: str, value: str, remarks: str = None) -> bool:
    params = {
        't': int(time.time() * 1000)
    }

    data = {
        'name': name,
        'value': value,
        'id': _id
    }

    if remarks is not None:
        data['remarks'] = remarks
    res = requests.put(ql_url + '/api/envs', headers=__get__headers(), params=params, json=data)
    j_data = res.json()
    if j_data['code'] == 200:
        return True
    return False


# 禁用环境变量
def disable_env(_id: str) -> bool:
    params = {
        't': int(time.time() * 1000)
    }
    data = [_id]
    res = requests.put(ql_url + '/api/envs/disable', headers=__get__headers(), params=params, json=data)
    j_data = res.json()
    if j_data['code'] == 200:
        return True
    return False


# 启用环境变量
def enable_env(_id: str) -> bool:
    params = {
        't': int(time.time() * 1000)
    }
    data = [_id]
    res = requests.put(ql_url + '/api/envs/enable', headers=__get__headers(), params=params, json=data)
    j_data = res.json()
    if j_data['code'] == 200:
        return True
    return False

# 删除环境变量
def delete_env(_id: str) -> bool:
    params = {
        't': int(time.time() * 1000)
    }
    data = [_id]
    res = requests.delete(ql_url + '/api/envs', headers=__get__headers(), params=params, json=data)
    j_data = res.json()
    if j_data['code'] == 200:
        return True
    return False



# WXPUSHER_TOKEN
WoChangYouCK_WXPUSHER_TOKEN_temp = get_cookie("GobingCK_WXPUSHER_TOKEN")
if WoChangYouCK_WXPUSHER_TOKEN_temp != "" and len(WoChangYouCK_WXPUSHER_TOKEN_temp)>0:
    WXPUSHER_TOKEN = WoChangYouCK_WXPUSHER_TOKEN_temp[0]["value"]

# WXPUSHER_TOPIC_ID
WoChangYouCK_WXPUSHER_TOPIC_ID_temp = get_cookie("GobingCK_WXPUSHER_TOPIC_ID")
if WoChangYouCK_WXPUSHER_TOPIC_ID_temp != "" and len(WoChangYouCK_WXPUSHER_TOPIC_ID_temp)>0:
    WXPUSHER_TOPIC_ID = WoChangYouCK_WXPUSHER_TOPIC_ID_temp[0]["value"]

msg = ""


headers = {
    'Content-Type': 'application/json',
    'Host': 'api.gobing.cn',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102K1C Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.71 Mobile Safari/537.36 SearchCraft/3.9.2 (Baidu; P1 12) XiaoMi/MiuiBrowser/16.8.59 swan-mibrowser',
}

def get_token(ck):
    value = ck["value"]
    remarks = ck["remarks"]
    split = value.split("&")
    if not split or len(split)<2:
        print_now(f"提交的账号:{value}不对")
        return
    LOGIN_DATA = {
        'account': split[0],
        'password': split[1]
    }
    url = 'https://api.gobing.cn/v1/user/login'
    try:
        response = requests.post(url, headers=headers, data=json.dumps(LOGIN_DATA))
        response_data = response.json()
        TOKEN = response_data['data']['token']
        return TOKEN
    except Exception as e:
        print_now(f"【{remarks}】登录出错，Error: {e}\n")
        return None

def get_userinfo(token):
    headers['token'] = token
    url= 'https://api.gobing.cn/v1/user/getUserinfo'
    try:
        response = requests.get(url, headers=headers)
        response_data = response.json()
        data = response_data["data"]
        # print_now(f'经验：{data["info"]["exp"]}')
        return data
    except Exception as e:
        print_now(f"获取个人信息出错，Error: {e}\n")
        return

def sign_in(token):
    headers['token'] = token
    url = 'https://api.gobing.cn/v1/signin/signin'
    try:
        response = requests.post(url, headers=headers)
        response_data = response.json()
        # print_now(f"签到状态：{response_data['msg']}")
        return response_data['msg']
    except Exception as e:
        print_now(f"Error: {e}")
        return


def getup(ck,token):
    global msg
    value = ck["value"]
    remarks = ck["remarks"]
    split = value.split("&")
    if not split or len(split)<2:
        print_now(f"提交的账号:{value}不对")
        return
    headers['token'] = token
    old_info = get_userinfo(token)
    if old_info is None:
        print_now(f'【{remarks}】账号登录出错：执行下一个任务')
        return
    userid = str(old_info["id"])
    # print_now(f"ID:{userid}")
    print_now(f'【{remarks}】执行任务前经验：{old_info["info"]["exp"]}，金币：{old_info["info"]["coin"]}')
    # 签到
    sign_msg = sign_in(token)
    print_now(f"【{remarks}】签到状态：{sign_msg}")
    # 任务类型  拆机任务disassemble  手柄介绍gamepad
    task_type = ["disassemble","gamepad"]
    for task in task_type:
        # 任务
        tasklist = []
        url = f"https://api.gobing.cn/v1/{task}/getList?page=1&pagesize=20&sort=publish_time-asc"
        response = requests.get(url, headers=headers).json()
        data = response["data"]["data"]
        for data_info in data:
            tasklist.append(data_info["id"])
        print_now(f'【{remarks}】开始执行浏览、点赞、收藏、评论等任务，任务类别：{task}，id分别为：{tasklist}')
        # 拆机任务
        # tasklist=[5, 4, 3, 35, 31, 29, 24, 26, 21, 34, 23, 33, 27, 25, 22, 30, 28, 36, 32, 39]
        for num in tasklist:
            # 浏览
            url = f"https://www.gobing.cn/{task}/detail/{num}"
            response = requests.get(url, headers=headers)
            # 点赞、收藏参数
            data = {
                "id":num
            }
            # 点赞
            url_1 = f"https://api.gobing.cn/v1/{task}/like"
            response = requests.post(url_1, headers=headers, json=data).json()
            # print_now(f"点赞帖子id为 {num} 的状态：{response['msg']}")
            # 收藏
            url_2 = f'https://api.gobing.cn/v1/{task}/favorite'
            response = requests.post(url_2, headers=headers, json=data).json()
            # print_now(f"收藏帖子id为 {num} 的状态：{response['msg']}")
            # if sign_msg != "您今天已成功签到，明天要继续哦~":
            # print_now(f'开始评论id为 {num} 的帖子------>')
            # 评论
            url_3 = f'https://api.gobing.cn/v1/{task}/comment'
            content = ['打卡','每日打卡','拱火','火一把','加热','温习一下','看看','帮顶','顶','顶一顶','顶贴','签到']
            task_data = {
                "content":content[random.randint(0,(len(content)-1))],
                f"{task}_id":str(num)
            }
            response = requests.post(url_3, headers=headers, json=task_data).json()
            # print_now(f"评论帖子id为 {num} 的状态：{response['msg']}")
            # 获取评论
            url_4 = f'https://api.gobing.cn/v1/{task}/getComments?id={num}&page=1&pagesize=10'
            response = requests.get(url_4, headers=headers).json()
            data = response["data"]["data"]
            # print_now(data)
            for data_info in data:
                if data_info["userinfo"]["userid"] == userid:
                    # print_now(f'ID:{data_info["id"]}')
                    # print_now(f'开始删除id为 {num} 的帖子评论------>\n')
                    # 删除评论
                    url_5 = f'https://api.gobing.cn/v1/{task}/deleteComment'
                    task_data = {
                        "id":data_info["id"]
                    }
                    response = requests.post(url_5, headers=headers, json=task_data).json()
                    # print_now(f"删除帖子id为 {num} 的状态：{response['msg']}\n")

    new_info = get_userinfo(token)
    print_now(f'【{remarks}】执行任务后经验：{new_info["info"]["exp"]}，金币：{new_info["info"]["coin"]}')
    msg += f'【{time.strftime("%Y-%m-%d %H:%M:%S")}】 ---- 【{remarks}】签到前经验：{old_info["info"]["exp"]}，金币：{old_info["info"]["coin"]}----------签到后经验：{new_info["info"]["exp"]}，金币：{new_info["info"]["coin"]}\n\n'


if __name__ == "__main__":
    l = []
    ck_list = []
    cklist = get_cookie("GobingCK")
    for i in range(len(cklist)):
        #多账号以#分割开的ck
        split1 = cklist[i]['value'].split("\n")
        #多账号以@分割开的ck
        split2 = cklist[i]['value'].split("#")
        #多账号以换行\n分割开的ck
        split3 = cklist[i]['value'].split("@")
        remarks = cklist[i].get("remarks",None)
        if len(split1)>1:
            for j in range(len(split1)):
                info = {}
                info['value'] = split1[j]
                if remarks is None:
                    info['remarks'] = split1[j]
                else:
                    info['remarks'] = remarks
                ck_list.append(info)
        elif len(split2)>1:
            for j in range(len(split2)):
                info = {}
                info['value'] = split2[j]
                if remarks is None:
                    info['remarks'] = split2[j]
                else:
                    info['remarks'] = remarks
                ck_list.append(info)
        elif len(split3)>1:
            for j in range(len(split3)):
                info = {}
                info['value'] = split3[j]
                if remarks is None:
                    info['remarks'] = split3[j]
                else:
                    info['remarks'] = remarks
                ck_list.append(info)
        else:
            if remarks is None:
                cklist[i]['remarks'] = cklist[i]['value']
            ck_list.append(cklist[i])
    if len(ck_list)<1:
        print_now('未添加CK,退出程序~')
        exit(0)



    for i in range(len(ck_list)):
        ck = ck_list[i]
        print_now(f'开始执行第 {i+1} 个账号')
        if ck is None or ck["value"] is None or len(ck["value"].split("&"))<2:
            print_now("当前账号未填写 跳过\n")
            continue
        token = get_token(ck)
        # sign_in(token)
        if token is None:
            continue
        getup(ck,token)
        print_now("\n")
    if WXPUSHER_TOKEN != "" and WXPUSHER_TOPIC_ID != "" and msg != "":
        wxpusher("Go柄网签到",msg)
