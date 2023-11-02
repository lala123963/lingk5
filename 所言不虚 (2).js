/**
 * 应用商店搜 所言不虚
 * 变量sybx
 * 账号@密码 多号换行分割
 * qq653773687
 */
const axios = require("axios").default;
const CryptoJS = require("crypto-js")
const $ = new Env("所言不虚");
const Notify = 0;
const split = "\n"

async function login(account) {
    let url = "http://api.buxu.net/app/login/getTimestamps";
    let data = { "client": "ios" };
    let headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'sybx_ios/1.3 (iPhone; iOS 16.6; Scale/2.00)'
    };
    let res = await $.post(url, data, headers);
    let { timeId, timeStamps } = res.data;

    url = "http://api.buxu.net/app/login/doLogin";
    data = { "client": "ios", "data": { "phone": account[0], "loginType": "pwd", "token": $._getToken(account[0], $.getEncryptPwd(account[1]), timeId, timeStamps), "timeId": timeId } };
    res = await $.post(url, data, headers);
    if (res.code == 200) {
        $.key = res.data.key, $.iv = res.data.iv, $.token = res.data.token;
        $.addMsg("登录成功")
    } else {
        $.addMsg(res.msg);
    }

}
async function getList() {
    let url = "http://api.buxu.net/app/video/list";
    let data = {
        "data": $.AES_Encrypt('{ "longitude" : "118.721336", "latitude" : "32.226424" }', $.key, $.iv), "client": "ios", "isAes": "1", "token": $.token
    }
    let headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'sybx_ios/1.3 (iPhone; iOS 16.6; Scale/2.00)'
    };
    let res = await $.post(url, data, headers);
    return eval($.AES_Decrypt(res.data, $.key, $.iv))
}
async function overVideo(videoId, title) {
    let url = "http://api.buxu.net/app/video/overVideo";
    let data = {
        "data": $.AES_Encrypt(`{ "videoId" : "${videoId}", "longitude" : "118.721336", "latitude" : "32.226424" }`, $.key, $.iv), "client": "ios", "isAes": "1", "token": $.token
    }
    let headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'sybx_ios/1.3 (iPhone; iOS 16.6; Scale/2.00)'
    };
    let res = await $.post(url, data, headers);
    $.AES_Decrypt(res.data, $.key, $.iv) == "1" ? $.addMsg(`${title}:刷视频成功`) : $.addMsg(res.msg);
}
async function doTask() {
    for (const item of await getList()) {
        await $.wait(20);
        overVideo(item.videoId, item.title);
    }
}

(async () => {
    let arr = $.getToken("sybx");
    arr = [['15651899832', 'qq122999']]
    if (!arr) return await $.SendMsg("未填写token");

    for (let index = 0; index < arr.length; index++) {
        $.addMsg(`账号${index + 1}:`);
        await login(arr[index]);
        await doTask();
    }
    await $.SendMsg($._msg);
    $.done();
})();

function Env(name) {
    return new (class {
        constructor(name) {
            this.name = name;
            console.log(`\ud83d\udd14${this.name},\u5f00\u59cb!`);
        }
        async get(url, headers) {
            try {
                this.result = await axios.get(url, { headers });
                return this.result.data;
            } catch (err) {
                console.log(`error:${err.message}`);
            }
        }
        async post(url, data, headers) {
            try {
                this.result = await axios.post(url, data, { headers: headers });
                return this.result.data;
            } catch (err) {
                console.log(`error:${err.message}`);
            }
        }
        async SendMsg(message) {
            if (!message) return;
            if (Notify > 0) {
                var notify = require("./sendNotify");
                await notify.sendNotify(this.name, message);
            }
        }
        addMsg(msg) {
            if (!this._msg) this._msg = "";
            console.log(msg);
            this._msg += msg + "\n";
        }
        wait(delay) {
            return new Promise((res) => {
                setTimeout(res, delay * 1000);
            });
        }
        MD5_encrypt(data) {
            return CryptoJS.MD5(data).toString();
        }
        getEncryptPwd(str) {
            return this.MD5_encrypt(
                (this.MD5_encrypt(str).substring(0, 18) + this.MD5_encrypt(str).substring(this.MD5_encrypt(str).length - 10, this.MD5_encrypt(str).length))
                    .toUpperCase())
                .substring(4, 25).toUpperCase();
        }
        _getToken(str, str2, str3, str4) {
            let substring = this.MD5_encrypt(str + str3).substring(0, 30),
                md5 = this.MD5_encrypt(str2 + str4),
                substring2 = md5.substring(this.MD5_encrypt(str2 + str4).length - 30);
            return (substring + substring2).toUpperCase();
        }
        getToken(key) {
            let tmp = process.env[key];
            if (!tmp) return "";
            if (tmp.includes("@")) {
                let arr = tmp.split(split);
                arr = arr.map((value) => {
                    let tmp = value.split("@");
                    return [tmp[0], tmp[1]];
                });
                return arr.length > 0 ? arr : "";
            }
            let arr = tmp.split(split);
            return arr.length > 0 ? arr : "";
        }
        AES_Encrypt(word, key, iv, mode = "CBC", padding = "Pkcs7") {
            var key = CryptoJS.enc.Utf8.parse(key);
            var iv = CryptoJS.enc.Utf8.parse(iv);
            var srcs = word;
            var encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode[mode],
                padding: CryptoJS.pad[padding],
            });
            return encrypted.toString();
        }
        AES_Decrypt(word, key, iv, mode = "CBC", padding = "Pkcs7") {
            var key = CryptoJS.enc.Utf8.parse(key);
            var iv = CryptoJS.enc.Utf8.parse(iv);
            var srcs = word;
            var decrypt = CryptoJS.AES.decrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode[mode],
                padding: CryptoJS.pad[padding]
            });
            return decrypt.toString(CryptoJS.enc.Utf8);
        }
        done() {
            console.log(`\ud83d\udd14${this.name},\u7ed3\u675f!`);
        }
    })(name);
}
