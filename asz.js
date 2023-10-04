
项目名称：爱嵊州
//要评论的内容
const content = '爱嵊州,书写美好'
cron: 18 9,18 * * *
const $ = new Env("113-爱嵊州")
const author = '爱嵊州';
//加载推送消息模块,青龙自带的具体看sendNotify文件和配置文件config.sh
const notify = require("./sendNotify");

//通知控制,1发送, 0不发送
const get_msg = 1

//是否多号并发.true=并发,false=不并发
const Concurrency = true

//要读取的变量
const variable = "asz"

//加载各种依赖或者文件
try {
	Crypto_js = require('crypto-js');
} catch (err) {
	throw new Error("\n找不到依赖 crypto-js ,请自行安装\n");
}
try {
	axios = $.isNode() ? require('axios') : '';
} catch (err) {
	throw new Error("\n找不到依赖 axios ,请自行安装\n");
}

let = user_num = '',subTitle = ''

//类的入口,用于执行类里面函数
async function main(userInfo) {
    //执行类里面的函数
    await userInfo.channel_list()
    //await userInfo.task_list()
}
//定义一个类,传入2个参数
class UserInfo {
    constructor(num, str) {
        try {
            //设置变量序号,不设置也可以
            this.num = num + 1
            //由于我们变量中是2个参数合并的用&分割,使用要处理出来,因为我们知道是几个,使用就不要循环搞了
            this.SESSION = str.split('&')[0]
            this.ACCOUNT = str.split('&')[1]
            
        } catch (error) {
            console.log(error)
        }
    }
    
    //下列疾病都是类中的函数了
    
    //任务列表
    async task_list() {
        await Sleep_time(1,3)
        //设置类里面变量url值
        this.url = '/api/user_mumber/numberCenter?is_new=1'
        //调用类里面req_data函数
        let req = this.req_data(0)
        //网络请求数据(get方式)
        return new Promise((resolve) => {
            $.get(req, async (err, resp, data) => {
                try {
                    //调试打印返回数据,方便自己,可以不调试
                    //console.log(data)
                    if(err){
                        //请求失败
                        console.log(`账号 ${this.num} 任务列表:返回 ${err}`)
                        subTitle+=`\n账号 ${this.num} 任务列表: 返回 ${err}`
                    }else{
                        //请求成功
                        //json编码返回数据data
                        var result = JSON.parse(data)
                        //判断返回数据中的code值,如果是0
                        if(result.code == 0){
                            for(let a in result.data.rst['user_task_list']){
                                if(result.data.rst['user_task_list'][a].completed==0){
                                    for(let b in this.news_list){
                                        this.new_id = this.news_list[b]
                                        if(result.data.rst['user_task_list'][a].id==248){
                                            await this.detail()
                                        }else if(result.data.rst['user_task_list'][a].id==249){
                                            this.task_id = 3
                                            await this.dotask()
                                        }else if(result.data.rst['user_task_list'][a].id==250){
                                            await this.create() 
                                        }else if(result.data.rst['user_task_list'][a].id==251){
                                            await this.like() 
                                        }
                                    }
                                }
                            }
                        }else {
                            //判断返回数据中的code值,如果不是是0,打印他结果
                            console.log(`账号 ${this.num} 任务列表:${result.message}`)
                            
                            subTitle+=`\n账号 ${this.num} 任务列表:${result.message}`
                        }
                        
                    }
                    
                } catch (e) {} finally {
                    resolve();
                };
            });
        });
    }
    //新闻列表
    async channel_list() {
        await Sleep_time(1,3)
        //设置类里面变量url值
        this.url = '/api/article/channel_list?channel_id=60b581eeb40eef1d9d6eccb6&isDiFangHao=false&is_new=true&list_count=0&size=20'
        
        //调用类里面req_data函数
        let req = this.req_data(0)
        //网络请求数据(get方式)
        return new Promise((resolve) => {
            $.get(req, async (err, resp, data) => {
                try {
                    //调试打印返回数据,方便自己,可以不调试
                    //console.log(data)
                    if(err){
                        //请求失败
                        console.log(`账号 ${this.num} 新闻列表:返回 ${err}`)
                        subTitle+=`\n账号 ${this.num} 新闻列表: 返回 ${err}`
                    }else{
                        //请求成功
                        //json编码返回数据data
                        var result = JSON.parse(data)
                        //判断返回数据中的code值,如果是0
                        if(result.code == 0){
                            this.news_list = []
                            for(let a in result.data.article_list){
                                this.news_list.push(result.data.article_list[a].id)
                            }
                            if(this.news_list.length>0){
                                await this.task_list()
                            }else{
                                console.log(`账号 ${this.num} 新闻列表:没有获取到新闻数据`)
                                subTitle+=`\n账号 ${this.num} 新闻列表:没有获取到新闻数据`
                            }
                            
                            
                        }else {
                            //判断返回数据中的code值,如果不是是0,打印他结果
                            console.log(`账号 ${this.num} 新闻列表:${result.message}`)
                            subTitle+=`\n账号 ${this.num} 新闻列表:${result.message}`
                            
                        }
                        
                    }
                    
                } catch (e) {} finally {
                    resolve();
                };
            });
        });
    }
    //阅读新闻
    async detail() {
        await Sleep_time(1,3)
        //设置类里面变量url值
        this.url = `/api/article/detail?id=${this.new_id}`
        
        //调用类里面req_data函数
        let req = this.req_data(0)
        //网络请求数据(get方式)
        return new Promise((resolve) => {
            $.get(req, async (err, resp, data) => {
                try {
                    //调试打印返回数据,方便自己,可以不调试
                    //console.log(data)
                    if(err){
                        //请求失败
                        console.log(`账号 ${this.num} 阅读新闻:返回 ${err}`)
                    }else{
                        //请求成功
                        //json编码返回数据data
                        var result = JSON.parse(data)
                        //判断返回数据中的code值,如果是0
                        if(result.code == 0){
                            console.log(`账号 ${this.num} 阅读新闻:成功`)
                            
                            
                        }else {
                            //判断返回数据中的code值,如果不是是0,打印他结果
                            console.log(`账号 ${this.num} 新闻列表:${result.message}`)
                            
                        }
                        
                    }
                    
                } catch (e) {} finally {
                    resolve();
                };
            });
        });
    }
    //分享新闻
    async dotask() {
        await Sleep_time(1,3)
        //设置类里面变量url值
        this.url = `/api/user_mumber/doTask`
        this.body = `memberType=${this.task_id}&member_type=${this.task_id}&target_id=${this.new_id}`
        //调用类里面req_data函数
        let req = this.req_data(1)
        //网络请求数据(post方式)
        return new Promise((resolve) => {
            $.post(req, async (err, resp, data) => {
                try {
                    //调试打印返回数据,方便自己,可以不调试
                    //console.log(data)
                    if(err){
                        //请求失败
                        console.log(`账号 ${this.num} 分享:返回 ${err}`)
                    }else{
                        //请求成功
                        //json编码返回数据data
                        var result = JSON.parse(data)
                        //判断返回数据中的code值,如果是0
                        if(result.code == 0){
                            console.log(`账号 ${this.num} 分享:成功`)
                            
                            
                        }else {
                            //判断返回数据中的code值,如果不是是0,打印他结果
                            console.log(`账号 ${this.num} 分享:${result.message}`)
                            
                        }
                        
                    }
                    
                } catch (e) {} finally {
                    resolve();
                };
            });
        });
    }
    //评论新闻
    async create() {
        await Sleep_time(1,3)
        //设置类里面变量url值
        this.url = `/api/comment/create`
        this.body = `channel_article_id=${this.new_id}&content=${content}&sort_type=0`
        //调用类里面req_data函数
        let req = this.req_data(1)
        //网络请求数据(post方式)
        return new Promise((resolve) => {
            $.post(req, async (err, resp, data) => {
                try {
                    //调试打印返回数据,方便自己,可以不调试
                    //console.log(data)
                    if(err){
                        //请求失败
                        console.log(`账号 ${this.num} 评论:返回 ${err}`)
                    }else{
                        //请求成功
                        //json编码返回数据data
                        var result = JSON.parse(data)
                        //判断返回数据中的code值,如果是0
                        if(result.code == 0){
                            console.log(`账号 ${this.num} 评论:成功`)
                            
                            
                        }else {
                            //判断返回数据中的code值,如果不是是0,打印他结果
                            console.log(`账号 ${this.num} 评论:${result.message}`)
                            
                        }
                        
                    }
                    
                } catch (e) {} finally {
                    resolve();
                };
            });
        });
    }
    //评论新闻
    async like() {
        await Sleep_time(1,3)
        //设置类里面变量url值
        this.url = `/api/favorite/like`
        this.body = `action=true&id=${this.new_id}`
        //调用类里面req_data函数
        let req = this.req_data(1)
        //网络请求数据(post方式)
        return new Promise((resolve) => {
            $.post(req, async (err, resp, data) => {
                try {
                    //调试打印返回数据,方便自己,可以不调试
                    //console.log(data)
                    if(err){
                        //请求失败
                        console.log(`账号 ${this.num} 点赞:返回 ${err}`)
                    }else{
                        //请求成功
                        //json编码返回数据data
                        var result = JSON.parse(data)
                        //判断返回数据中的code值,如果是0
                        if(result.code == 0){
                            console.log(`账号 ${this.num} 点赞:成功`)
                            
                            
                        }else {
                            //判断返回数据中的code值,如果不是是0,打印他结果
                            console.log(`账号 ${this.num} 点赞:${result.message}`)
                            
                        }
                        
                    }
                    
                } catch (e) {} finally {
                    resolve();
                };
            });
        });
    }
    
    
    //用于处理返回提交数据的
    req_data(mode) {
        //获取10位数的时间戳
        //let time = Math.round(new Date().getTime() / 1000).toString()
        //获取13位数的时间戳
        let time = new Date().getTime()
        let req_id = `${getstr(8)}-${getstr(4)}-${getstr(4)}-${getstr(4)}-${getstr(12)}`
        let s_d = this.url.indexOf('?')>=0?this.url.match(/(\S*)\?/)[1]:this.url
        let sign = Crypto_js.SHA256(`${s_d}&&${this.SESSION}&&${req_id}&&${time}&&FR*r!isE5W&&25`).toString()
        if(mode==0){
            return {
                url: `https://vapp.tmuyun.com${this.url}`,
                headers: {"X-SESSION-ID":this.SESSION,"X-REQUEST-ID":req_id,"X-TIMESTAMP":time,"X-SIGNATURE":sign,"X-TENANT-ID":"25","User-Agent":"2.2.40;00000000-0000-0000-0000-000000000000;;Android;10;Release","X-ACCOUNT-ID":this.ACCOUNT,"Cache-Control":"no-cache","Host":"vapp.tmuyun.com","Connection":"Keep-Alive","Accept-Encoding":"gzip"},
            }
        }else if(mode==1){
            return {
                url: `https://vapp.tmuyun.com${this.url}`,
                headers: {"X-SESSION-ID":this.SESSION,"X-REQUEST-ID":req_id,"X-TIMESTAMP":time,"X-SIGNATURE":sign,"X-TENANT-ID":"25","User-Agent":"2.2.40;00000000-0000-0000-0000-000000000000;;Android;10;Release","X-ACCOUNT-ID":this.ACCOUNT,"Cache-Control":"no-cache","Host":"vapp.tmuyun.com","Connection":"Keep-Alive","Accept-Encoding":"gzip","Content-Type":"application/x-www-form-urlencoded","Content-Length":this.body.length},
                body:this.body
            }
        }
        
    }
    
    
}

//开始入口
!(async () => {
    //执行getUsers函数,返回一个函数,函数返回有2个参数第一个是第几个变量,第二个是该变量的数据
    let users = await getUsers(async (num, user_data) => {
        //..执行定义的类,把etUsers函数返回的参数给类使用
        let userInfo = new UserInfo(num, user_data);
        return userInfo;
    });
    //判断是否并发
    if(Concurrency){
        //并发执行
        list = [];
        users.forEach(async user_data => {
            //console.log(users)
            list.push(main(user_data));
        });
        await Promise.all(list);
    }else{
        //非并发执行
        for(let a in users){
            await main(users[a])
        }
    }
    //执行发送消息函数
    //notify判断是否加载发送消息模块
    if(notify){
        //是否有要发送的信息
        if(subTitle){
            //$.name脚本名,subTitle要发送的内容
            await notify.sendNotify($.name, subTitle)
        }
    }

})().catch((e) => console.log(e)).finally(() => $.done());

async function getUsers(fnUserInfo) {
    //读取需要的变量
    if(process.env[variable]){
        let userList = [];
        let user_data = process.env[variable]
        //设置分割符,分别是换行,@,#3种可能性,当然你也可以设置其他的,就的和变量填的分割一致
        let envsplit = ["\n","@","#"];
        //设置一个默认多号分割符,因为考虑到是有可能出现单号问题
        let b = envsplit[2]
        for (let a of envsplit){
            //你不知道这里循环的是什么,那就打印结果出来看了
            //console.log(a)
            //寻找并判断变量中是使用什么符合作为分割
            if (user_data.indexOf(a) > -1) {
                b = a
                //渠道分割符后就跳出循环
                break;
            }
        }
        
        //多号分割符已取到,进行分割多号变量
        let user_list = user_data.split(b);
        //console.log(user_list)
        //循环执行变量
        for (let a = 0; a < user_list.length; a++) {
            let list = user_list[a];
            list && userList.push(await fnUserInfo(a, list));
        }
        user_num = userList.length;
        console.log(`\n=== 脚本执行 - 北京时间：${new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString()} ===`);
        console.log(`\n===【共 ${user_num} 个账号】===`), !0;
        return userList;
        
    }else{
        console.log('\n没有查找到需要的变量')
    }
}

//用于延时 单位秒,min开始,max结束
async function Sleep_time(min, max) {
  //await wait(Math.floor(Math.random() * (max * 1000 - min * 1000 + 1)) + min * 1000)
  return new Promise(e => setTimeout(e, Math.floor(Math.random() * (max * 1000 - min * 1000 + 1)) + min * 1000))
}
/*
async function wait(t) {
    return new Promise(e => setTimeout(e, t))
}*/
//取随机字符串
function getstr(n) {
    let chars = 'qwertyuiopasdfghjklzxcvb1234567890';
    let v = "";
    for(let R = 0; R < n ; R ++) {
        let R_id = Math.ceil(Math.random()*chars.length-1);
        v += chars[R_id];
    }
    return v;
}




// ============================================================================================================================
//下面不用理。你懂的话可以在里面添加或者删除不要函数
// ============================================================================================================================

function Env(t, e) {
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
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
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
        const [o, h] = i.split("@"), a = {
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
        this.post(a, (t, e, i) => s(i))
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
            this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
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
    time(t) {
      let e = {
        "M+": (new Date).getMonth() + 1,
        "d+": (new Date).getDate(),
        "H+": (new Date).getHours(),
        "m+": (new Date).getMinutes(),
        "s+": (new Date).getSeconds(),
        "q+": Math.floor(((new Date).getMonth() + 3) / 3),
        S: (new Date).getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
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
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
      let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
      h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    done(t = {}) {
      const e = (new Date).getTime(),
        s = (e - this.startTime) / 1e3;
      this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  }(t, e)
}
