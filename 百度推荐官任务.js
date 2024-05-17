/**
 * @Time: 2024/4/15 20:23:34
 * @Author: hunyan
 * @File: 百度推荐官任务.js
 * @Software: WebStorm
 * @Description:  点一下那个任务的随机搜，抓它任务转完一圈的包se-act.baidu.com域名里有uid和cuid  变量名称：BDTJCookie 值  uid#cuid 多账号用&分隔
 * 活动地址 https://mr.baidu.com/r/1jjlAyGbKIo?f=cp&u=50666e6bb295c05d  使用百度app打开 脚本就不加密了，别改我邀请链接，辣鸡活动给我留点头吧
 * 脚本只支持node环境
 */

const $ = new ENV("百度推荐官", ["BDTJCookie"]);
const cookieArr = $.BDTJCookie.split("&");
class BDTJG{
    constructor(ck, index) {
        this.uid = ck.split("#")[0];
        this.cuid = ck.split("#")[1];
        this.index = ++index;
        this.taskList = []
    }

    async main() {
        await this.info()
        try {
            for (const taskListElement of this.taskList) {
                if (taskListElement.registerUrl){
                    await this.doTask(taskListElement)
                }
            }

        }catch (e) {
            console.log(e)
        }

    }

    async info(){
        const t = Date.now();
        const options = {
            'method': 'GET',
            'url': `https://shopping.baidu.com/api/fissionAsync?word=%E4%BC%98%E9%80%89%E6%8E%A8%E8%8D%90%E5%AE%98&srcid=60482&uid=${this.uid}&callback=jsonp_${t}_3602`,
            'headers': {
                'X-Requested-With': 'com.baidu.searchbox',
                'X-From-H3-TRNet': 'true',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 14; 22081212C Build/UKQ1.230917.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36 T7/13.54 SP-engine/2.93.0 baiduboxapp/13.54.5.10 (Baidu; P1 14) NABar/1.0',
                'Accept': '*/*',
                'Connection': 'keep-alive'
            }
        };
        const res = await $.request(options);
        // console.log(res)
        const resObj = JSON.parse(res.match(/jsonp_\d+_\d+\((.*)\)/)[1]);

        this.taskList = resObj.data.blocks[1].data.taskList
    }

    async doTask(taskListElement){
        const registerUrl = taskListElement.registerUrl
        const Title = taskListElement.title
        $.log(`开始 [${Title}] 任务`)
        let task = true
        const taskInfo = await this.getTask(registerUrl,this.uid)
        // console.log(taskInfo)
        const completeUrl = taskInfo.data.completeApi;
        if (!completeUrl){
            task = false
            $.log(`账号【${this.index}】${this.uid} 任务 [${Title}] 已完成`)
        }
        if (task){
            const query = taskInfo.data.query;
            const url = decodeURIComponent(taskInfo.data.url);
            console.log(url)
            const token = url.match(/token=(.*?),config/)[1];
            await $.wait(2000)
            await this.completeTask(completeUrl,query,token,this.uid,Title)
        }

    }

    async getTask(regurl){
        const t = Date.now();
        const options = {
            'method': 'GET',
            'url': `${regurl}&callback=jsonp_${t}_20951`,
            'headers': {
                'X-Requested-With': 'com.baidu.searchbox',
                'X-From-H3-TRNet': 'true',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 14; 22081212C Build/UKQ1.230917.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36 T7/13.54 SP-engine/2.93.0 baiduboxapp/13.54.5.10 (Baidu; P1 14) NABar/1.0',
                'Accept': '*/*',
                'Connection': 'keep-alive'
            }
        };
        const res = await $.request(options);
        // console.log(res)
        const resObj = JSON.parse(res.match(/jsonp_\d+_\d+\((.*)\)/)[1]);
        // console.log(resObj)
        return resObj;
    }

    async completeTask(completeUrl,query,token,uid,Title){
        const t = Date.now();
        const options = {
            'method': 'GET',
            'url': `${completeUrl}&cuid=${this.cuid}&query=${encodeURIComponent(query)}&token=${encodeURIComponent(token)}&uid=${uid}&callback=jsonp_${t}_97613`,
            'headers': {
                'X-Requested-With': 'com.baidu.searchbox',
                'X-From-H3-TRNet': 'true',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 14; 22081212C Build/UKQ1.230917.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36 T7/13.54 SP-engine/2.93.0 baiduboxapp/13.54.5.10 (Baidu; P1 14) NABar/1.0',
                'Accept': '*/*',
                'Connection': 'keep-alive'
            }
        };
        // console.log(options)
        const res = await $.request(options);
        // console.log(res)
        const resObj = JSON.parse(res.match(/jsonp_\d+_\d+\((.*)\)/)[1]);
        await $.wait(1000)
        const newcompleteUrl = resObj.data.dispdetail.prizedata?.taskDetail?.completeApi;
        const count = resObj.data.count;
        $.log(`账号【${this.index}】${this.uid}}任务${Title}已完成${count}次`)
        if (!newcompleteUrl){
            $.log(`账号【${this.index}】${this.uid}}任务[${Title}]已完成`)
            return
        }
        const newquery = resObj.data.dispdetail.prizedata.taskDetail.query;
        const newurl = decodeURIComponent(resObj.data.dispdetail.prizedata.taskDetail.url);
        const newtoken = newurl.match(/token=(.*?),config/)[1];
        await this.completeTask(newcompleteUrl,newquery,newtoken,uid,Title)
    }
};
(async () => {
    const bd = [];
    for (const index in cookieArr) {
        bd.push(new BDTJG(cookieArr[index], index));
    }
    $.log(`共${bd.length}个账号`)
    for (const bdElement of bd) {
        await bdElement.main();
    }
})();

function ENV(name, envNames) {
    const request = require("request");
    const cryptoJS = require("crypto-js");
    return new class {
        constructor(name, envNames = []) {
            this.name = name;
            this.envNames = envNames;
            this.startTime = Date.now();
            this.logs = [];
            if (this.envNames.length > 0) {
                for (const envName of envNames) {
                    this[envName] = process.env[envName];
                }
            }
            this.log(`🔔${this.name},开始！`)
        }

        log(...args) {
            args.length > 0 && (this.logs = [...this.logs, ...args])
            console.log(...args)
        }

        md5(str) {
            return cryptoJS.MD5(str).toString()
        }

        sha256(str) {
            return cryptoJS.SHA256(str).toString()
        }

        aesCBCEncrypt(data,key, iv) {
            const n = cryptoJS.enc.Hex.parse(key);
            const r = cryptoJS.enc.Hex.parse(iv);
            const o = cryptoJS.AES.encrypt(data, n, {
                iv: r,
                mode: cryptoJS.mode.CBC,
                padding: cryptoJS.pad.Pkcs7
            });
            return cryptoJS.enc.Base64.stringify(o.ciphertext);
        }

        aesCBCDecrypt(data,key, iv) {
            const n = cryptoJS.enc.Hex.parse(key);
            const r = cryptoJS.enc.Hex.parse(iv);
            const o = cryptoJS.AES.decrypt(data, n, {
                iv: r,
                mode: cryptoJS.mode.CBC,
                padding: cryptoJS.pad.Pkcs7
            });
            return o.toString(cryptoJS.enc.Utf8);
        }

        request(options) {
            options.gzip = true;
            return new Promise((resolve, reject) => {
                request(options, (error, response, body) => {
                    if (error) {
                        resolve(error)
                    }
                    try {
                        const objBody = JSON.parse(body);
                        resolve(objBody);
                    } catch (e) {
                        resolve(body)
                    }
                })
            })
        }

        wait(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }

    }(name, envNames)
}
