/**
 * new Env("红旗空间-红旗智联小程序")
 * cron 5 15 * * *  hqkj_wx.js
 * Show:
 * 变量名:hqkj
 * 变量值:https://hqpp-gw.faw.cn/gimc-hongqi-webapp headers中cookie中JSESSIONID=后面的值
 * scriptVersionNow = "0.0.2";
 * 每天积分
 * 修复删除文章
 */

const $ = new Env("红旗空间-红旗智联小程序");
const ckName = "hqkj";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"]; //多账号分隔符
let strSplitor = '&'; //多变量分隔符

let scriptVersionNow = "0.0.2";


async function start() {
    await getVersion("smallfawn/QLScriptPublic@main/hqkj.js");
    await getNotice();

    console.log("\n====================================\n");
    let taskall = [];
    for (let user of $.userList) {
        if (user.ckStatus) {
            taskall.push(await user.task());
            await $.wait(5000);
        }
    }
    await Promise.all(taskall);
}

class UserInfo {
    constructor(str) {
        this.index = ++$.userIdx;
        this.ck = str.split(strSplitor)[0]; //单账号多变量分隔符
        this.ckStatus = true;
        this.postId = ""
        this.articleStatus = false
        this.userId = ""
        this.postHeaders = {
            "Host": "hqpp-gw.faw.cn",
            "Connection": "keep-alive",
            //"Content-Length": 61,
            "charset": "utf-8",
            "cookie": `JSESSIONID=${this.ck}`,
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5197 MMWEBSDK/20230405 MMWEBID/2585 MicroMessenger/8.0.35.2360(0x2800235D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "content-type": "application/json",
            "Accept-Encoding": "gzip,compress,br,deflate",
            "Referer": "https://servicewechat.com/wxf076d8670405c937/151/page-frame.html",
        }
        this.getHeaders = {
            "Host": "hqpp-gw.faw.cn",
            "Connection": "keep-alive",
            "charset": "utf-8",
            "cookie": `JSESSIONID=${this.ck}`,
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5197 MMWEBSDK/20230405 MMWEBID/2585 MicroMessenger/8.0.35.2360(0x2800235D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
            "Accept-Encoding": "gzip,compress,br,deflate",
            "Referer": "https://servicewechat.com/wxf076d8670405c937/151/page-frame.html",
        }
    }
    async task() {
        $.DoubleLog(`------第[${this.index}]个账号------`);
        await this.user_point()
        if (this.ckStatus == true) {
            await this.postArticle()
            if (this.articleStatus == true) {
                await $.wait(8000)
                await this.user_info()
                if (this.postId !== "") {
                    //await this.comment()
                    await this.forward()
                    await this.deleteArticle()
                }
            } else {
                await this.postArticle()
                if (this.articleStatus == true) {
                    await $.wait(8000)
                    await this.user_info()
                    if (this.postId !== "") {
                        //await this.comment()
                        await this.forward()
                        await this.deleteArticle()
                    }
                } else {
                    await this.postArticle()
                    await $.wait(8000)
                    await this.user_info()
                    if (this.postId !== "") {
                        //await this.comment()
                        await this.forward()
                        await this.deleteArticle()
                    }
                }

            }
        }



    }

    async hitokoto() {
        try {
            let options = {
                url: `https://v1.hitokoto.cn/`,
                headers: {},
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if ("hitokoto" in result) {
                return result.hitokoto
            } else {
                return "红旗汽车加油"
                //console.log(result);
            }
        } catch (e) {
            console.log(e);
        }
    }
    //评论
    async comment() {
        let content = await this.hitokoto()
        try {
            let options = {
                url: `https://hqpp-gw.faw.cn/gimc-hongqi-webapp/f/common/comment/?_timestamp=${Date.now()}`,
                headers: this.postHeaders,
                body: JSON.stringify({ "content": content, "subjectId": this.postId, "subjectType": "CONTENT" })
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.code == 200) {
                $.DoubleLog(`✅账号[${this.index}]  评论成功${result.data.commentId}🎉`);
            } else {
                $.DoubleLog(`❌账号[${this.index}]  评论失败`);
                //console.log(result);
            }
        } catch (e) {
            console.log(e);
        }
    }
    //转发
    async forward() {

        try {
            let options = {
                url: `https://hqpp-gw.faw.cn/gimc-hongqi-webapp/common/forward/?_timestamp=${Date.now()}`,
                headers: this.postHeaders,
                body: JSON.stringify({ "subjectId": this.postId, "subjectType": "CONTENT", "to": "CHATS" })
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.code == 200) {
                if (result.msg == "success") {
                    $.DoubleLog(`✅账号[${this.index}]  转发成功🎉`);
                }
            } else {
                $.DoubleLog(`❌账号[${this.index}]  转发失败`);
                //console.log(result);
            }
        } catch (e) {
            console.log(e);
        }
    }

    //发表文章
    async postArticle() {
        let content = await this.hitokoto()
        try {
            let options = {
                url: `https://hqpp-gw.faw.cn/gimc-hongqi-webapp/f/square/post?_timestamp=${Date.now()}`,
                headers: this.postHeaders,
                body: JSON.stringify({ "postTitle": "", "postContent": content, "postType": "TEXT_AND_IMAGE", "images": [{ "fileId": 1184931, "contentType": "image/jpeg", "fileName": "tmp_b001da7bfeeba49ae47a87307b90befb5d24b47c818ee4c1.jpg", "extension": "jpg", "fileType": "IMAGE", "width": 4032, "height": 3024, "duration": null, "fileUrl": "https://hqpp-cos.faw.cn/images/0d3fce70-5158-465b-8ada-565751e3fbd7.jpg", "fileSize": 3391, "fileSort": 0 }], "name": "", "latitude": "", "longitude": "", "address": "", "topicIdList": [], "atUserIdList": [] })
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.code == 200) {
                if (result.msg == "success") {
                    this.articleStatus = true
                    $.DoubleLog(`✅账号[${this.index}]  发表文章成功🎉`);
                }
            } else if (result.code == 10005) {
                this.articleStatus = false
                $.DoubleLog(`❌账号[${this.index}]  发表文章失败`);
                //console.log(result);
            }
        } catch (e) {
            console.log(e);
        }
    }


    //删除文章
    async deleteArticle() {
        try {
            let options = {
                url: `https://hqpp-gw.faw.cn/gimc-hongqi-webapp/f/square/post/${this.postId}?_method=DELETE&_timestamp=${Date.now()}`,
                headers: this.postHeaders,
                body: " "
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.code == 200) {
                if (result.msg == "success") {
                    $.DoubleLog(`✅账号[${this.index}]  删除文章成功🎉`);
                }
            } else {
                $.DoubleLog(`❌账号[${this.index}]  删除文章失败`);
                //console.log(result);
            }
        } catch (e) {
            console.log(e);
        }
    }
    //个人主页
    async user_point() {
        try {
            let options = {
                url: `https://hqpp-gw.faw.cn/gimc-hongqi-webapp/f/credits/userCredits/?_timestamp=${Date.now()}`,
                headers: this.getHeaders,
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.code == 200) {
                this.ckStatus = true
                this.userId = result.data.userId
                $.DoubleLog(`✅账号[${this.index}]  [${result.data.nickname}][${result.data.amount}]分🎉`);
            } else {
                this.ckStatus = false
                $.DoubleLog(`❌账号[${this.index}]  获取个人发表文章失败`);
                //console.log(result);
            }
        } catch (e) {
            console.log(e);
        }
    }
    //个人主页
    async user_info() {
        try {
            let options = {
                url: `https://hqpp-gw.faw.cn/gimc-hongqi-webapp/f/square/post/user?_timestamp=${Date.now()}&pageNo=1&pageSize=20&userId=${this.userId}`,
                headers: this.getHeaders,
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.code == 200) {
                if (result.msg == "success") {
                    if (result.data.records.length > 0) {
                        this.postId = result.data.records[0].postId
                    } else {
                        $.DoubleLog(`❌账号[${this.index}]  未找到发布的文章`);
                    }

                }
            } else {
                $.DoubleLog(`❌账号[${this.index}]  获取个人发表文章失败`);
                //console.log(result);
            }
        } catch (e) {
            console.log(e);
        }
    }


}

!(async () => {
    if (!(await checkEnv())) return;
    if ($.userList.length > 0) {
        await start();
    } await $.SendMsg($.message);
})().catch((e) => console.log(e)).finally(() => $.done());

//********************************************************
/**
 * 变量检查与处理
 * @returns
 */
async function checkEnv() {
    let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || "";
    //let userCount = 0;
    if (userCookie) {
        // console.log(userCookie);
        let e = envSplitor[0];
        for (let o of envSplitor)
            if (userCookie.indexOf(o) > -1) {
                e = o;
                break;
            }
        for (let n of userCookie.split(e)) n && $.userList.push(new UserInfo(n));
        //userCount = $.userList.length;
    } else {
        console.log("未找到CK");
        return;
    }
    return console.log(`共找到${$.userList.length}个账号`), true; //true == !0
}

/////////////////////////////////////////////////////////////////////////////////////
function httpRequest(options, method = null) {
    method = options.method ? options.method.toLowerCase() : options.body ? "post" : "get";
    return new Promise((resolve) => {
        $[method](options, (err, resp, data) => {
            if (err) {
                console.log(`${method}请求失败`);
                $.logErr(err);
            } else {
                if (data) {
                    try { data = JSON.parse(data); } catch (error) { }
                    resolve(data);
                } else {
                    console.log(`请求api返回数据为空，请检查自身原因`);
                }
            }
            resolve();
        });
    });
}
/**
 * 获取远程版本
 */
function getVersion(scriptUrl, timeout = 3 * 1000) {
    return new Promise((resolve) => {
        const options = { url: `https://originfastly.jsdelivr.net/gh/${scriptUrl}` };
        $.get(options, (err, resp, data) => {
            try {
                const regex = /scriptVersionNow\s*=\s*(["'`])([\d.]+)\1/;
                const match = data.match(regex);
                const scriptVersionLatest = match ? match[2] : "";
                $.DoubleLog(`\n====== 当前版本：${scriptVersionNow} 📌 最新版本：${scriptVersionLatest} ======`);
            } catch (e) {
                $.logErr(e, resp);
            }
            resolve();
        }, timeout);
    });
}
/**
 * 获取远程通知
 */
function getNotice(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        const options = { url: `https://originfastly.jsdelivr.net/gh/smallfawn/Note@main/Notice.json` };
        $.get(options, (err, resp, data) => {
            try {
                try {
                    data = JSON.parse(data);
                } catch (error) { }
                const notice = data.notice.replace(/\\n/g, "\n");
                $.DoubleLog(notice);
            } catch (e) {
                $.logErr(e, resp);
            }
            resolve();
        }, timeout);
    });
}
// ==================== API ==================== //
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, a) => { s.call(this, t, (t, s, r) => { t ? a(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.userList = []; this.userIdx = 0; this.message = ""; this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name},开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const a = this.getdata(t); if (a) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, a) => e(a)) }) } runScript(t, e) { return new Promise(s => { let a = this.getdata("@chavy_boxjs_userCfgs.httpapi"); a = a ? a.replace(/\n/g, "").trim() : a; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [i, o] = a.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": i, Accept: "*/*" }, timeout: r }; this.post(n, (t, e, a) => s(a)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e); if (!s && !a) return {}; { const a = s ? t : e; try { return JSON.parse(this.fs.readFileSync(a)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const a = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of a) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, a, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(a), o = a ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a) } catch (e) { const i = {}; this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: a, response: r } = t; e(a, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let a = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...i } = t; this.got[s](r, i).then(t => { const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t, n = a.decode(o, this.encoding); e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && a.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let a = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let a = t[s]; null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", a = "", r) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, a = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": a } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, a, i(r)); break; case "Quantumult X": $notify(e, s, a, i(r)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name},错误!`, t); break; case "Node.js": this.log("", `❗️${this.name},错误!`, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } DoubleLog(d) { if (this.isNode()) { if (d) { console.log(`${d}`); this.message += `\n ${d}` } } else { console.log(`${d}`); this.message += `\n ${d}` } } async SendMsg(m) { if (!m) return; if (Notify > 0) { if (this.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify(this.name, m) } else { this.msg(this.name, "", m) } } else { console.log(m) } } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name},结束!🕛${s}秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
//Env rewrite:smallfawn Update-time:23-07-26 newAdd:DoubleLog & SendMsg & ChangeMessage
