/*
北京汽车
邀请注册：http://wx.smartservice.bjev.com.cn/register.html?id=8a8d81eb82f6b73601830d1ef3967c02
已内置邀请码

积分换实物
自动完成签到、转发以及分享任务，其他任务不会做

https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-member/userCustomer/getUserInfo
捉包把header里的Authorization(去掉Bearer)填到bjqcCookie里

重写：打开APP获取
[task_local]
#北京汽车
58 0,9-22/4 * * * https://raw.githubusercontent.com/zhacha222/NoteJS/main/bjqc.js, tag=北京汽车, enabled=true
[rewrite_local]
https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-member/userCustomer/getUserInfo url script-request-header https://raw.githubusercontent.com/zhacha222/NoteJS/main/bjqc.js
[MITM]
hostname = beijing-gateway-customer.app-prod.bjev.com.cn

定时：一天一次
cron: 5 7 * * *
const $ = new Env("北京汽车")
*/
//cron: 5 7 * * *

//===============通知设置=================//
//0为关闭通知，1为打开通知,默认为1
const Notify = 1;

//===============debug模式=================//
const debug=0; //0为关闭debug模式，1为打开debug模式,默认为1

//===============脚本版本=================//
let scriptVersion = "1.0.0";
let update_data = "1.0.0 日常任务签到、转发分享、点赞";

const $ = new Env('北京汽车');
const notify = $.isNode() ? require('./sendNotify') : '';
const {log} = console;

//////////////////////
let scriptVersionLatest = "";
//北京汽车账号数据
let bjqcCookie = ($.isNode() ? process.env.bjqcCookie : $.getdata("bjqcCookie")) || "";
let bjqcCookieArr = [];
let status_code =0;
let Authorization =``;
let phone =``;
let name =``;
let Task =``;
let yyUserId =``;
let growth =``;
let availableIntegral =``;
let TaskForMemberCenter =``;
let UserInfo =``;
let msg =``;
let messageid =``;
let sharestatus =0;
let siginstatus =0;
let likestatus =0;
let okstatus =0;


!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite();
    } else {
        if (!(await Envs()))
            return;
        else {

            log(`\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000).toLocaleString()} \n=============================================\n`);

            await poem();
            await getVersion();
            log(`\n============ 当前版本：${scriptVersion}  最新版本：${scriptVersionLatest} ============`)

            if (scriptVersionLatest !== scriptVersion) {
                log(`\n发现新版本,请拉库更新！\n${update_data}`)
            }

            log(`\n=================== 共找到 ${bjqcCookieArr.length} 个账号 ===================`)


            for (let index = 0; index < bjqcCookieArr.length; index++) {


                let num = index + 1
                if (num >1){
                    log('**********休息3s，防止黑IP**********');
                    await $.wait(3 * 1000);
                }
                log(`\n========= 开始【第 ${num} 个账号】=========\n`)

                Authorization = `Bearer `+bjqcCookieArr[index];
                //log(Authorization)
                if(Authorization==`Bearer `){ //未填参数
                    log('未填变量bjqcCookie');
                    return
                }else {
                    UserInfo=``//循环空值
                    log(`\n==============个人信息==============\n`)

                    await getUserInfo()
                    if (status_code === 1) {
                        await $.wait(2 * 1000);
                        await getPersonalCenter()
                        log(UserInfo) //个人信息
                        await $.wait(2 * 1000);
                        Task =``//循环空值

                        log(`\n==============日常任务==============`)
                        siginstatus=0
                        likestatus=0
                        sharestatus=0
                        okstatus=0
                        TaskForMemberCenter =``//循环空值
                        await selectTaskForMemberCenter() //任务中心
                        log(TaskForMemberCenter)
                        await $.wait(2 * 1000);
                        if (siginstatus==1||likestatus==1 || sharestatus==1) {
                            log(`\n==============做任务==============\n`)
                        }
                        if(siginstatus==1){
                            await addSign() //签到
                            await $.wait(2 * 1000);
                        }
                        if(likestatus==1 || sharestatus==1){
                            for (let i = 0; i < 5; i++) {
                                await add() //发文章同时点赞分享，最后删除
                                await $.wait(2 * 1000);
                            }
                            okstatus=1
                        }
                        if (okstatus==1){
                            log(`\n==============去领积分==============\n`)
                            log(`开始领取点赞积分`)
                            await likereceiveAward() //领取积分
                            await $.wait(2 * 1000);
                            log(`开始领取转发分享积分`)
                            await sharereceiveAward() //领取积分
                            await $.wait(2 * 1000);
                        }
                        await fillCode()
                        await $.wait(2 * 1000);
                        await getPersonalCenter()
                        msg += `账号[${num}]：${name}\n积分：${availableIntegral}\n\n`
                    }
                }
            }

            // log(msg);
            await SendMsg(msg);
        }
    }

})()
    .catch((e) => log(e))
    .finally(() => $.done())






/**
 * 获取个人信息 手机号 id 昵称
 */
function getUserInfo(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-member/userCustomer/getUserInfo?buildVersion=2023092510164900`,
            headers: {
                "Authorization": `${Authorization}`,
                "Host": "beijing-gateway-customer.app-prod.bjev.com.cn",
                "Accept-Language": "zh-Hans-CN;q=1",
                "Accept-Encoding": "gzip, deflate, br",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                //"User-Agent": "deviceName/iPhone%20deviceModel/iPhone14,5%20sysVersion/16.5.1",
                "Connection": "keep-alive"
            },
            data: ``,
        }

        $.get(url, async (error, response, data) => {
            try {
                let result = data === "undefined" ? await getUserInfo() : JSON.parse(data);

                if (debug==1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(result))}

                if (result.code === 0 ) {

                    name = result.data.name //昵称
                    yyUserId = result.data.yyUserId //id
                    phone = result.data.phone //手机号
                    UserInfo += `昵称`+`  ---  `+name+ `\n手机号`+`  ---  `+phone+ `\nid`+`  ---  `+yyUserId
                    status_code=1
                }else if (result.code === 401 ) {
                    log(`❌ `+result.msg)
                    status_code=0
                }else {
                    log(`❌ 发生未知错误:`+JSON.stringify(result))
                    status_code=0
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**
 * 获取个人信息 京汽值 积分
 */
function getPersonalCenter(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-member/userCustomer/getPersonalCenter`,
            headers: {
                "Authorization": `${Authorization}`
            },
            data: ``,
        }
        $.get(url, async (error, response, data) => {
            try {
                let result = data === "undefined" ? await getPersonalCenter() : JSON.parse(data);
                if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(result))}
                if (result.code === 0 ) {
                    availableIntegral = result.data.availableIntegral //积分
                    growth = result.data.growth //京汽值
                    // name = result.data.name
                    UserInfo += `\n京汽值`+`  ---  `+growth+ `\n积分`+`  ---  `+availableIntegral

                }else {
                    log(`❌ 发生未知错误:`+JSON.stringify(result))
                    return
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**
 * 任务中心
 */
function selectTaskForMemberCenter(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-asset/exterior/userTaskProgress/selectTaskForMemberCenter`,
            headers: {
                "Authorization": `${Authorization}`

            },
            data: ``,
        }
        $.get(url, async (error, response, data) => {
            try {
                let result = data === "undefined" ? await selectTaskForMemberCenter() : JSON.parse(data);
                if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(result))}
                if (result.code === 0 ) {
                    for (let i = 0; i < result.data.length; i++) {
                        if (result.data[i].groupName === `日常任务` ) {
                            for (let n = 0; n < result.data[i].items.length; n++) {
                                Task += `\n`+result.data[i].items[n].name +`  ---  `+ result.data[i].items[n].progressDes
                                if (result.data[i].items[n].name == `点赞`&& result.data[i].items[n].status != 2){likestatus=1}
                                if (result.data[i].items[n].name == `日常签到`&& result.data[i].items[n].status != 2 ){siginstatus=1}
                                if (result.data[i].items[n].name == `转发分享`&& result.data[i].items[n].status != 2){sharestatus=1}

                            }
                            TaskForMemberCenter =Task

                        }

                    }


                }else {
                    log(`❌ 发生未知错误:`+JSON.stringify(result))
                    return
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}


/**
 * 签到
 */
function addSign(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-asset/exterior/userSignRecord/addSign`,
            headers: {
                "Authorization": `${Authorization}`,
                'Connection' : `keep-alive`,
                'Accept-Encoding' : `gzip, deflate`,
                'Content-Type' : `application/json;charset=utf-8`,
                'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0`,
                'Accept-Language' : `zh-cn`,
                'Accept' : `application/json, text/plain, */*`

            },
            body: `{"signType": 0}`
        }
        $.post(url, async (error, response, data) => {
            if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(data))}
            try {
                let result = data === "undefined" ? await addSign() : JSON.parse(data);

                if (result.code === 0){
                    log("签到成功，获取10积分")
                }else if(result.code===208204){
                    log(result.msg)
                }else {
                    log(`❌ 签到失败，原因：`+JSON.stringify(result))
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**
 * 发文章
 */
function add(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-dynamic/exterior/dynamic/add`,
            headers: {
                "Authorization": `${Authorization}`,
                'Connection' : `keep-alive`,
                'Accept-Encoding' : `gzip, deflate`,
                'Content-Type' : `application/json;charset=utf-8`,
                'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0`,
                'Accept-Language' : `zh-cn`,
                'Accept' : `application/json, text/plain, */*`

            },
            body: `{
                "latitude": 0,
                "longitude": 0,
                "type": 2,
                "dynamicWords": "哈哈哈，好开心"
            }`
        }

        $.post(url, async (error, response, data) => {
            if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(data))}
            try {
                let result = data === "undefined" ? await add() : JSON.parse(data);
                if (result.code === 0){
                    log("文章发表成功")
                    messageid= result.data
                    await like(messageid) //点赞
                    await $.wait(2 * 1000);
                    await share(messageid) //分享
                    await $.wait(2 * 1000);
                    await deletemessage(messageid) //删除文章
                    await $.wait(2 * 1000);

                }else {
                    log(`❌ 文章发表失败，原因：`+JSON.stringify(result))
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**
 * 点赞 5次
 */
function like(messageid,timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-dynamic/exterior/interact/like`,
            headers: {
                "Authorization": `${Authorization}`,
                'Connection' : `keep-alive`,
                'Accept-Encoding' : `gzip, deflate`,
                'Content-Type' : `application/json;charset=utf-8`,
                'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0`,
                'Accept-Language' : `zh-cn`,
                'Accept' : `application/json, text/plain, */*`

            },
            body: `{
                "type": 2,
                "commentId": "",
                "entityId": ${messageid}
            }`
        }

        $.post(url, async (error, response, data) => {
            if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(data))}
            try {
                let result = data === "undefined" ? await like() : JSON.parse(data);
                if (result.code === 0){
                    log("点赞成功")

                }else {
                    log(`❌ 点赞失败，原因：`+JSON.stringify(result))
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**
 * 分享文章 2次
 */
function share(messageid,timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-dynamic/exterior/interact/dynamic/share`,
            headers: {
                "Authorization": `${Authorization}`,
                'Connection' : `keep-alive`,
                'Accept-Encoding' : `gzip, deflate`,
                'Content-Type' : `application/json;charset=utf-8`,
                'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0`,
                'Accept-Language' : `zh-cn`,
                'Accept' : `application/json, text/plain, */*`

            },
            body: `{
                "entityType": 2,
                "entityId": ${messageid}
            }`
        }

        $.post(url, async (error, response, data) => {
            if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(data))}
            try {
                let result = data === "undefined" ? await share() : JSON.parse(data);
                if (result.code === 0){
                    log("分享成功")

                }else {
                    log(`❌ 分享失败，原因：`+JSON.stringify(result))
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**
 * 删除文章
 */
function deletemessage(messageid,timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-dynamic/exterior/dynamic/delete/`+messageid,
            headers: {
                "Authorization": `${Authorization}`,
                'Connection' : `keep-alive`,
                'Accept-Encoding' : `gzip, deflate`,
                'Content-Type' : `application/json;charset=utf-8`,
                'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0`,
                'Accept-Language' : `zh-cn`,
                'Accept' : `application/json, text/plain, */*`

            },
            body: ``
        }

        $.post(url, async (error, response, data) => {
            if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(data))}
            try {
                let result = data === "undefined" ? await deletemessage() : JSON.parse(data);
                if (result.code === 0){
                    log("删除成功")

                }else {
                    log(`❌ 删除失败，原因：`+JSON.stringify(result))
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**
 * 点赞领取积分
 */
function likereceiveAward(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-asset/exterior/userTaskProgress/receiveAward`,
            headers: {
                "Authorization": `${Authorization}`,
                'Connection' : `keep-alive`,
                'Accept-Encoding' : `gzip, deflate`,
                'Content-Type' : `application/json;charset=utf-8`,
                'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0`,
                'Accept-Language' : `zh-cn`,
                'Accept' : `application/json, text/plain, */*`

            },
            body: `{
    "taskGroupCode": "ENTITY_LIKE"
}`
        }

        $.post(url, async (error, response, data) => {
            if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(data))}
            try {
                let result = data === "undefined" ? await likereceiveAward() : JSON.parse(data);
                if (result.code === 0){
                    log(`领取成功，获得${result.data}积分`)
                }else {
                    log(`❌ 领取失败，原因：`+JSON.stringify(result))
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**
 * 分享领取积分
 */
function sharereceiveAward(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-asset/exterior/userTaskProgress/receiveAward`,
            headers: {
                "Authorization": `${Authorization}`,
                'Connection' : `keep-alive`,
                'Accept-Encoding' : `gzip, deflate`,
                'Content-Type' : `application/json;charset=utf-8`,
                'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0`,
                'Accept-Language' : `zh-cn`,
                'Accept' : `application/json, text/plain, */*`

            },
            body: `{
    "taskGroupCode": "ENTITY_SHARE"
}`
        }

        $.post(url, async (error, response, data) => {
            if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(data))}
            try {
                let result = data === "undefined" ? await sharereceiveAward() : JSON.parse(data);
                if (result.code === 0){
                    log(`领取成功，获得${result.data}积分`)
                }else {
                    log(`❌ 领取失败，原因：`+JSON.stringify(result))
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**
 * fillCode
 */
function fillCode(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://beijing-gateway-customer.app-prod.bjev.com.cn/beijing-zone-opt/exterior/invite/fillCode`,
            headers: {
                "Authorization": `${Authorization}`,
                'Connection' : `keep-alive`,
                'Accept-Encoding' : `gzip, deflate`,
                'Content-Type' : `application/json;charset=utf-8`,
                'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0`,
                'Accept-Language' : `zh-cn`,
                'Accept' : `application/json, text/plain, */*`

            },
            body: `{"invitationCode":"35NBYP"}`
        }

        $.post(url, async (error, response, data) => {
            if (debug===1){log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(data))}
            // log(`这是url\n`+JSON.stringify(url)+`\n这是result\n`+JSON.stringify(data))
            try {
                let result = data === "undefined" ? await fillCode() : JSON.parse(data);
                if (result.code === 0){
                    //log(`邀请码填写成功`)
                }else {
                    //log(`❌ 领取失败，原因：`+JSON.stringify(result))
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}



// ============================================重写============================================ \\
async function GetRewrite() {
    if ($request.url.indexOf("/getUserInfo") > -1) {
        const ck = $request.headers.Authorization;
        if (bjqcCookie) {
            if (bjqcCookie.indexOf(ck) === -1) {
                bjqcCookie = bjqcCookie + "\n" + ck;
                $.setdata(bjqcCookie, "bjqcCookie");
                let List = bjqcCookie.split("\n");
                $.msg(`【${$.name}】` + ` 获取第${List.length}个 ck 成功：${ck}`);
            }
        } else {
            $.setdata(ck, "bjqcCookie");
            $.msg(`【${$.name}】` + ` 获取第1个 ck 成功：${ck}`);
        }
    }
}

// ============================================变量检查============================================ \\
async function Envs() {
    if (bjqcCookie) {
        if (bjqcCookie.indexOf("@") !== -1 || bjqcCookie.indexOf("&") !== -1) {
            bjqcCookie.split("@"&&"&").forEach((item) => {
                bjqcCookieArr.push(item);
            });
        }
        else if (bjqcCookie.indexOf("\n") !== -1) {
            bjqcCookie.split("\n").forEach((item) => {
                bjqcCookieArr.push(item);
            });
        }
        else {
            bjqcCookieArr.push(bjqcCookie);
        }
    } else {
        log(`\n 未填写变量 bjqcCookie`)
        return;
    }

    return true;
}
// ============================================发送消息============================================ \\
async function SendMsg(msg) {
    if (!msg)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, msg+ `\n运行时间：${t()}\n`);
        } else {
            $.msg(msg);
        }
    } else {
        log(msg);
    }
}



/**
 * 获取当前小时数
 */
function local_hours() {
    let myDate = new Date();
    let h = myDate.getHours();
    return h;
}

/**
 * 获取当前分钟数
 */
function local_minutes() {
    let myDate = new Date();
    let m = myDate.getMinutes();
    return m;
}

/**
 * 随机数生成
 */
function randomString(e) {
    e = e || 32;
    var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

/**
 * 获取毫秒时间戳
 */
function timestampMs(){
    return new Date().getTime();
}

/**
 *
 * 获取秒时间戳
 */
function timestampS(){
    return Date.parse(new Date())/1000;
}

/**
 * 获取随机诗词
 */
function poem(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://v1.jinrishici.com/all.json`
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                log(`${data.content}  \n————《${data.origin}》${data.author}`);
            } catch (e) {
                log(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

/**
 * 修改配置文件
 */
function modify() {

    fs.readFile('/ql/data/config/config.sh','utf8',function(err,dataStr){
        if(err){
            return log('读取文件失败！'+err)
        }
        else {
            var result = dataStr.replace(/regular/g,string);
            fs.writeFile('/ql/data/config/config.sh', result, 'utf8', function (err) {
                if (err) {return log(err);}
            });
        }
    })
}

/**
 * 获取远程版本
 */
function getVersion(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://ghproxy.com/https://raw.githubusercontent.com/zhacha222/NoteJS/main/bjqc.js`,
        }
        $.get(url, async (err, resp, data) => {
            try {
                scriptVersionLatest = data.match(/scriptVersion = "([\d\.]+)"/)[1]
                update_data = data.match(/update_data = "(.*?)"/)[1]
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

/**
 * time 输出格式：1970-01-01 00:00:00
 */
function t() {
    var date = new Date();
    // 获取当前月份
    var nowMonth = date.getMonth() + 1;
    // 获取当前是几号
    var strDate = date.getDate();
    //获取当前小时（0-23）
    var nowhour = date.getHours()
    //获取当前分钟（0-59）
    var nowMinute = date.getMinutes()
    //获取当前秒数(0-59)
    var nowSecond = date.getSeconds();
    // 添加分隔符“-”
    var seperator = "-";
    // 添加分隔符“:”
    var seperator1 = ":";

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }
    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    // 对小时进行处理，0-9号在前面添加一个“0”
    if (nowhour >= 0 && nowhour <= 9) {
        nowhour = "0" + nowhour;
    }
    // 对分钟进行处理，0-9号在前面添加一个“0”
    if (nowMinute >= 0 && nowMinute <= 9) {
        nowMinute = "0" + nowMinute;
    }
    // 对秒数进行处理，0-9号在前面添加一个“0”
    if (nowSecond >= 0 && nowSecond <= 9) {
        nowSecond = "0" + nowSecond;
    }

    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate + ` ` + nowhour + seperator1 + nowMinute + seperator1 + nowSecond
    return nowDate
}

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
