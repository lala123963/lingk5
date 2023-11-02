const axios = require("axios").default;
const $ = new Env("统一快乐星球");
const CryptoJS = require("crypto-js");
const Notify = 0;

function getUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function get_sign(token, data, nonce, ts) {
  let t = {
    signKey: "SDJk@#98&sd*SDld2d",
    skey: token,
    body: JSON.stringify(data),
    nonce,
    ts,
  };
  let n = ["signKey", "skey", "body", "nonce", "ts"].map((e) => t[e]).join(";");
  return CryptoJS.SHA1(n).toString();
}

function generateSpanId(t) {
  let yt = Array(32);
  for (var e = 0; e < 2 * t; e++)
    (yt[e] = Math.floor(16 * Math.random()) + 48), yt[e] >= 58 && (yt[e] += 39);
  return String.fromCharCode.apply(null, yt.slice(0, 2 * t));
}

function init() {
  $["x-wmsdk-bc"] = `${
    Math.floor(Math.random() * 5) + 1
  } ${new Date().getTime()}`;
  $["x-apm-page-id"] = getUuid();
  $["x-apm-parent-page-id"] = getUuid();
  $["x-apm-conversation-id"] = getUuid();
  $["parentrpcid"] = generateSpanId(8);
}

async function do_task(token, sceneKey) {
  let url =
      "https://capi.weimobcloud.com/api3/api/asmmp/activity/v1/activity/join",
    nonce = getUuid(),
    ts = new Date().getTime();
  let data = {
    appid: "wx532ecb3bdaaf92f9",
    basicInfo: { bosId: 4020112618957, tcode: "weimob", cid: 176205957 },
    extendInfo: {
      wxTemplateId: 7224,
      childTemplateIds: [
        { customId: 90004, version: "crm@0.0.173" },
        { customId: 90002, version: "ec@35.4" },
        { customId: 90006, version: "hudong@0.0.185" },
        { customId: 90008, version: "cms@0.0.356" },
      ],
      analysis: [],
      quickdeliver: { enable: false },
      bosTemplateId: 1000001178,
      youshu: { enable: false },
      source: 1,
      channelsource: 5,
      mpScene: 1089,
    },
    queryParameter: null,
    i18n: { language: "zh", timezone: "8" },
    pid: "4020112618957",
    storeId: "0",
    umaData: JSON.stringify({ sceneKey: sceneKey[0] }),
  };
  let headers = {
    Host: "capi.weimobcloud.com",
    "x-nonce": nonce,
    "x-wmsdk-close-store": "v2",
    "x-ts": ts,
    "weimob-pid": 4020112618957,
    "x-apm-page-id": $["x-apm-page-id"],
    "weimob-bosId": 4020112618957,
    "x-wmsdk-bc": $["x-wmsdk-bc"],
    "x-req-from": "cloud-fe-yunsdk-platform",
    "auth-token": token[0],
    "x-apm-parent-page-id": $["x-apm-parent-page-id"],
    "cloud-app-id": "31536475456-asmxiangmu-pod",
    "cloud-bosid": 4020112618957,
    "x-page-route": "packages/wm-cloud-assam/task/index",
    "x-apm-conversation-id": $["x-apm-conversation-id"],
    "x-component-is": "packages/wm-cloud-assam/task/index",
    "x-sign": get_sign(token[0], { sceneKey: sceneKey[0] }, nonce, ts),
    "x-platform": "mpg",
    "x-biz-id": 0,
    "cloud-project-name": "tongyixiangmu",
    "X-WX-Token": token[1],
    "content-type": "application/json;charset=utf-8",
    parentrpcid: $["parentrpcid"], //
    "wos-x-channel": "0:TITAN",
    "cloud-pid": 4020112618957,
    "x-cms-sdk-request": "1.3.149",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d23) NetType/WIFI Language/zh_CN",
    Referer: "https://servicewechat.com/wx532ecb3bdaaf92f9/173/page-frame.html",
  };
  let res = await $.post(url, data, headers);

  if (res.code == "Success") {
    $.addMsg(`[${sceneKey[1]}]:success`);
  } else {
    $.addMsg(`[${sceneKey[1]}]:${res.msg}`);
  }
}
async function account(token) {
  let url =
      "https://capi.weimobcloud.com/api3/api/asmmp/activity/v1/asset/point/account",
    nonce = getUuid(),
    ts = new Date().getTime();
  let data = {
    appid: "wx532ecb3bdaaf92f9",
    basicInfo: { bosId: 4020112618957, tcode: "weimob", cid: 176205957 },
    extendInfo: {
      wxTemplateId: 7224,
      childTemplateIds: [
        { customId: 90004, version: "crm@0.0.173" },
        { customId: 90002, version: "ec@35.4" },
        { customId: 90006, version: "hudong@0.0.185" },
        { customId: 90008, version: "cms@0.0.356" },
      ],
      analysis: [],
      quickdeliver: { enable: false },
      bosTemplateId: 1000001178,
      youshu: { enable: false },
      source: 1,
      channelsource: 5,
      mpScene: 1089,
    },
    queryParameter: {
      tracePromotionId: "100045812",
      tracepromotionid: "100045812",
    },
    i18n: { language: "zh", timezone: "8" },
    pid: "4020112618957",
    storeId: "0",
    umaData: "{}",
    tracePromotionId: "100045812",
    tracepromotionid: "100045812",
  };
  let headers = {
    Host: "capi.weimobcloud.com",
    "x-nonce": nonce,
    "x-wmsdk-close-store": "v2",
    "x-ts": ts,
    "weimob-pid": 4020112618957,
    "x-apm-page-id": $["x-apm-page-id"],
    "weimob-bosId": 4020112618957,
    "x-wmsdk-bc": $["x-wmsdk-bc"],
    "x-req-from": "cloud-fe-yunsdk-platform",
    "auth-token": token[0],
    "x-apm-parent-page-id": $["x-apm-parent-page-id"],
    "cloud-app-id": "31536475456-asmxiangmu-pod",
    "cloud-bosid": 4020112618957,
    "x-page-route": "packages/wm-cloud-assam/task/index",
    "x-apm-conversation-id": $["x-apm-conversation-id"],
    "x-component-is": "packages/wm-cloud-assam/task/index",
    "x-sign": get_sign(token[0], {}, nonce, ts),
    "x-platform": "mpg",
    "x-biz-id": 0,
    "cloud-project-name": "tongyixiangmu",
    "X-WX-Token": token[1],
    "content-type": "application/json;charset=utf-8",
    parentrpcid: $["parentrpcid"],
    "wos-x-channel": "0:TITAN",
    "cloud-pid": 4020112618957,
    "x-cms-sdk-request": "1.3.149",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d23) NetType/WIFI Language/zh_CN",
    Referer: "https://servicewechat.com/wx532ecb3bdaaf92f9/173/page-frame.html",
  };
  let res = await $.post(url, data, headers);
  $.addMsg(`当前可用开心值:${res.data.assetMap.POINT}`);
  $.uid = res.data.uid;
}

(async () => {
  let arr = $.getToken("tyklxq");
  init();
  if (!arr) return await $.SendMsg("未填写token");

  for (let index = 0; index < arr.length; index++) {
    $.addMsg(`账号${index + 1}:`);
    for (const sceneKey of [["asm_mrqd",'每日签到'],['asm_mrfxyl','每日查看推广海报'],['asm_mrgklxq','逛快乐星球']]) {
        await do_task(arr[index],sceneKey)
        await $.wait(Math.floor(Math.random() * 5) + 5);
    }
    await account(arr[index]);
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
    getToken(key) {
      let tmp = process.env[key];
      if (!tmp) return "";
      if (tmp.includes("@")) {
        let arr = tmp.split("&");
        arr = arr.map((value) => {
          let tmp = value.split("@");
          return [tmp[0], tmp[1]];
        });
        return arr.length > 0 ? arr : "";
      }
      let arr = tmp.split("&");
      return arr.length > 0 ? arr : "";
    }
    done() {
      console.log(`\ud83d\udd14${this.name},\u7ed3\u675f!`);
    }
  })(name);
}
