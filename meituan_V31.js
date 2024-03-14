/*
美团 v3.16

美团V3仅支持青龙等nodejs环境, 不支持圈X
自动领券和完成一些活动任务
建议按推荐定时跑, 每天10点15点17点有券可以抽
默认运行每日赚钱, 抽月符
默认每日赚钱不随机提现

APP每日赚钱: 默认会每日自动随机, 要关闭随机提现的话设置变量 MT_AutoWithdraw 为 false
不想运行每日赚钱的, 设置变量 MT_MrzqTask 为 false: export MT_MrzqTask="false"
不想运行抽月符的, 设置变量 MT_CyfTask 为 false: export MT_CyfTask="false"

自行捉包把meituan.com里面的token(一般在请求头里)填到变量 MT_CK 中, 多账号换行或&或@隔开
export MT_CK="token=AgGZIgsYHyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;UUID=xxxx(如需运行小团币)"

cron: 2 0,10,15,17,21 * * *
*/
const Env = require('./basic/Env.js');
const { TYQLDG_API, base64_encode } = require('./basic/tyqldg');
const $ = new Env("美团");
const got = require("got");
const envPrefix = "MT_",
  envSplitor = ["\n", "&", "@"],
  ckNames = [envPrefix + "CK"];
let eid = 0,
env_name=ckNames[0],
MTS = null;
try {
  MTS = require('./basic/mtgsig.js');
} catch (e) {
  console.log(`本地mtgsig需要安装依赖 xhr2 青龙->依赖管理->NodeJs->新建依赖->名称：xhr2\nNodeJs 原始安装方法：npm i xhr2`);
  console.error(error);
}
$.get = function (result, name, value = "") {
  let value1 = value;
  result?.["hasOwnProperty"](name) && (value1 = result[name]);
  return value1;
}
$.wait_gap_interval = async function (_0x58be0e, _0x285f22) {
  let _0x505076 = Date.now() - _0x58be0e;
  _0x505076 < _0x285f22 && (await this.wait(_0x285f22 - _0x505076));
}
async function expireNotify(userName, index) {
  let json = { "userName": userName, "title": `${$.name}账号cookie已失效`, "message": `${$.name}账号${index} ${userName}\n请重新登录获取cookie`, "disable": true };
  if (eid) json.eid = eid; else json.env_name = env_name;
  let NotifyData = await TYQLDG_API("notify", json);
  if (NotifyData) {
      if (NotifyData.code == 200) {
        if (!eid && NotifyData.eid) eid = NotifyData.eid;
      }
      console.log(NotifyData.msg);
  }
}

const _0x28e1f2 = 15000,
  _0x3e8031 = 3,
  _0x16913c = process.env[envPrefix + "AutoWithdraw"] || "true",
  _0x128bdf = process.env[envPrefix + "MrzqTask"] || "true",
  _0x539959 = process.env[envPrefix + "CyfTask"] || "true",
  AppUuid = process.env[envPrefix + "AppUuid"] || "";

const _0x4e1816 = false,
  _0x442aac = 3.16,
  _0x5f08d3 = "meituan",
  _0x3c5cd6 = "https://leafxcy.coding.net/api/user/leafxcy/project/validcode/shared-depot/validCode/git/blob/master/code.json",
  _0x295cb0 = "https://leafxcy.coding.net/api/user/leafxcy/project/validcode/shared-depot/validCode/git/blob/master/" + _0x5f08d3 + ".json",
  _0x2ff58e = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002129) NetType/WIFI Language/zh_CN",
  _0x1980e9 = "wxde8ac0a21135c07d",
  _0x2e62d3 = "1399386702",
  _0x3e1e7d = "2.30.3",
  _0x3d626d = "iphone",
  _0x51d112 = "AwQAAABJAgAAAAEAAAAyAAAAPLgC95WH3MyqngAoyM/hf1hEoKrGdo0pJ5DI44e1wGF9AT3PH7Wes03actC2n/GVnwfURonD78PewMUppAAAADgCEZv2akitiLnGkQIH6r67N1V9EUFpKyBOQRSRKpv9Awnm6LwnygipNjcIwXXJZEv5ddnUSW8vZQ==",
  _0x49f694 = "0123456789",
  _0x57a4fd = "qwertyuiopasdfghjklzxcvbnm",
  _0x2b49ff = _0x49f694 + _0x57a4fd + _0x57a4fd.toUpperCase();
let _0x23042b = "114.07" + $.randomString(12, _0x49f694),
  _0x3b009f = "22.52" + $.randomString(13, _0x49f694),
  inviteCode = "NnOIp-QOs8SiYF1dcSlL5r8phPrCf6qkH7evMyjIoureqol0OXXaopfjjblE0yPge-nmlRKIDEgmTxF7oaoA4OfQjhGdF522KA_poICzK21VFORrK_ggku9ewgI6-qR5VCf7Blcp0wY6_CtAKvFkqFYXG42pu_6MtY7K6RDMjic",
  inviteCode2 = "NnOIp-QOs8SiYF1dcSlL5r8phPrCf6qkH7evMyjIoureqol0OXXaopfjjblE0yPgFQmJJWVFWc4CivexLwFRdcbcHaALd6__chOQeI55cEbhOmMc4oO8cWhZxYuQm9DsSt1nfKeLK2Rz8ExgU4PovBpOFx_LiHkpyxZNebiIkCE",
  _0x453d9e = [],
  _0x2d7859 = [];
const _0x5cae5c = 600,
  _0x599182 = 10,
  _0x21c87d = ["1005", "1007"];
let _0x48a517 = ["631682c504", "bb88750009", "9f90f45850", "90e9ecbe6a", "b6bfd8c1bc", "d4caf84940", "8decbc4c98", "c6026478e4", "4353a111e9", "7ceb1c14a7", "89515f0102", "63bec5af07", "1c8df37ffe", "36eedbe86c", "6ab415d70c", "3c309c7f26", "66c2938e1d", "3497a4fd05", "7f1f7ec5a4", "2fb53287b2", "2b0ada0dd7", "495070b239", "176f400a8f", "672129ff6d", "a479497fa6", "97ea404b56", "320ffa53e7", "6ccbda387f", "6f2d5f144f", "563983d5f1", "6f70050a62", "dfd9c44d7f", "6d5461c6dd", "a7331f5c94", "8d3891bef9", "eb6094dcaa", "11c95cc416", "351c3f4810", "67bd2e0988", "cdb75f714d", "3a6eba11a1", "76f9dc2980", "30644bcb35", "d1a1d62e6c", "8af63652ba", "075eb403be", "361ba45eff", "cfbb835838", "e26f305436", "ed33f82fa9", "e36bae3f8f", "6696ff7825", "b7719de06c", "2ab24bbc57", "2d98ddf8ac", "406fb78bfd", "9b84c4503a", "55ce3f059d", "cd06f8210b", "f6706f9b33", "34a718f16a", "f5e2218b18", "c7f6a889ff", "2583c8ba46", "45e325543c", "a162c96304"],
  _0x16560e = ["G_2Eu_n12fvbBgf3gBd2-A", "b24pg8jaFTeNadCXq0lb3A", "yLm-IynkBUQLt09kALFv8Q", "7e0uxWtGCDCGrdVeh2DPfQ", "Ox5_0TfqOg6b3UfkKS3rUg", "1THsbmQsYTIbi5N066B1zg", "TADnCANwheP5AKOjx3NpgA"],
  _0x200afe = ["06hFC-C1WGiAQYUGya5QJA", "5IFmI13NeO7kRPW1jUj7Lw", "ySJ2HpgexeI0TJcLkA_5Ug"],
  _0x5ebeb1 = ["rYaVHgLhYkvfvSMJFZjksA", "qokyKSW-MmD4P221MPDomg", "op3lDi8NodkRbKEwyubYQw"],
  _0x26d837 = ["cFMKbjPquEndkr9Fe64vqQ", "ZCSW0XVhcm3NZ8yeoGXeaA", "KXGjpKrk2h_43vUrIKbzDA", "l3emawQka8JjlE6LMyYT3g", "r9348AwSwnwP715csHvDqw", "XVsZc3p1O1jd-uTG4EjyXw", "9khEyiqt2tKFyZSjvqphkQ", "_p2QL78Fao6bsexHzofp-w", "jXL-9iEaRTsv-FZdpX4Z4g"],
  _0x311b08 = ["WdtEnEpZZScQjcZdnOMyRw", "oJz0wfDiwwnDN3oHgwmMcA"],
  _0x5c173f = [];
const _0x20f81a = {
  name: "APP-天天领金币",
  cubePageId: 184008,
  taskIdKeys: ["e8e72a2c8d", "ea69bee3c0", "129328922f", "15b494e7bc", "d36be8140b", "77c78d45cc"]
};
const _0x25c1e6 = {
  name: "APP-每日赚钱",
  cubePageId: 10000003,
  taskIdKeys: ["b6e6e96128", "710d92816e", "fc43b223be"]
};
const _0xe3bdf = {
  name: "WX-每日赚钱",
  cubePageId: 184008,
  taskIdKeys: ["1fff834702"]
};
const _0x302017 = {
  name: "APP-团团神券-魔法石",
  cubePageId: 88888889,
  taskIdKeys: ["a941c20450", "cdcc8a8195", "eb03206b17", "5c919dfbd8", "8f53427c39", "f749a47257", "4d609dde67", "3e5cbc8120", "532e764346", "7613d02997"]
};
const _0x5b2a19 = {
  name: "WX-天天赚钱",
  cubePageId: 123,
  taskIdKeys: _0x48a517
};
const _0x57186e = [_0x20f81a, _0x25c1e6, _0xe3bdf, _0x302017, _0x5b2a19],
  _0x47f86a = {
    NORMAL_CARD: "普通卡",
    SENIOR_CARD: "稀有卡"
  };
const _0x11bc05 = {
  EAT: "吃",
  LIVE: "住",
  WALK: "行",
  TRAVEL: "游",
  SHOP: "购",
  ENTERTAIN: "娱"
};
const _0x45963f = ["I5r2SYd5kTN1l1AkMhwCNA", "vVsmdkjkPrYHiJjVpV4PwA"],
  _0x44fc68 = [15169, 15170, 15171, 15172, 15173];
let _0x46b51d = [];

class _0x53c152 {
  constructor() {
    this.index = $.userIdx++;
    this.name = "";
    this.valid = false;
    const _0x4b8c02 = {
      limit: 0
    };
    const _0x216235 = {
      Connection: "keep-alive"
    };
    const _0x3cc8a6 = {
      retry: _0x4b8c02,
      timeout: _0x28e1f2,
      followRedirect: false,
      headers: _0x216235
    };
    this.got = got.extend(_0x3cc8a6);
  }
  log(_0x1fddf, _0x49a913 = {}) {
    var _0x300dbb = "",
      _0x54addd = $.userCount.toString().length;
    if (this.index) {
      _0x300dbb += "账号[" + $.padStr(this.index, _0x54addd) + "]";
    }
    if (this.name) {
      _0x300dbb += "[" + this.name + "]";
    }
    $.log(_0x300dbb + _0x1fddf, _0x49a913);
  }
  async request(_0xb1fed3) {
    const _0x2cb91e = ["ECONNRESET", "EADDRINUSE", "ENOTFOUND", "EAI_AGAIN"],
      _0x22765b = ["TimeoutError"];
    var _0x18d8ee = null,
      _0xa0a226 = 0,
      _0x5d0bc7 = _0xb1fed3.fn || _0xb1fed3.url;
    _0xb1fed3.method = _0xb1fed3?.["method"]?.["toUpperCase"]() || "GET";
    let _0x478687;
    while (_0xa0a226 < _0x3e8031) {
      try {
        _0xa0a226++;
        _0x478687 = null;
        let _0x19b6f2 = null,
          _0x5a1d85 = _0xb1fed3?.["timeout"] || this.got?.["defaults"]?.["options"]?.["timeout"]?.["request"] || _0x28e1f2,
          _0x282ae9 = false;
        await new Promise(async _0x173d14 => {
          setTimeout(() => {
            _0x282ae9 = true;
            _0x173d14();
          }, _0x5a1d85);
          await this.got(_0xb1fed3).then(_0x29af96 => {
            _0x18d8ee = _0x29af96;
          }, _0x40dc5c => {
            _0x19b6f2 = _0x40dc5c;
            _0x18d8ee = _0x40dc5c.response;
            _0x478687 = _0x19b6f2?.["code"];
          });
          _0x173d14();
        });
        if (_0x282ae9) {
          this.log("[" + _0x5d0bc7 + "]请求超时(" + _0x5a1d85 / 1000 + "秒)，重试第" + _0xa0a226 + "次");
        } else {
          if (_0x22765b.includes(_0x19b6f2?.["name"])) {
            this.log("[" + _0x5d0bc7 + "]请求超时(" + _0x19b6f2.code + ")，重试第" + _0xa0a226 + "次");
          } else {
            if (_0x2cb91e.includes(_0x19b6f2?.["code"])) {
              this.log("[" + _0x5d0bc7 + "]请求错误(" + _0x19b6f2.code + ")，重试第" + _0xa0a226 + "次");
            } else {
              let _0x52a788 = _0x18d8ee?.["statusCode"] || 999,
                _0x301a03 = _0x52a788 / 100 | 0;
              if (_0x301a03 > 3) {
                this.log("请求[" + _0x5d0bc7 + "]返回[" + _0x52a788 + "]");
              }
              if (_0x301a03 <= 4) {
                break;
              }
            }
          }
        }
      } catch (_0xa00eda) {
        _0xa00eda.name == "TimeoutError" ? this.log("[" + _0x5d0bc7 + "]请求超时，重试第" + _0xa0a226 + "次") : this.log("[" + _0x5d0bc7 + "]请求错误(" + _0xa00eda.message + ")，重试第" + _0xa0a226 + "次");
      }
    }
    if (_0x18d8ee == null) {
      return Promise.resolve({
        statusCode: _0x478687 || -1,
        headers: null,
        result: null
      });
    }
    let {
      statusCode: _0x543099,
      headers: _0x16b7f0,
      body: _0x3507be
    } = _0x18d8ee;
    if (_0x3507be) {
      try {
        _0x3507be = JSON.parse(_0x3507be);
      } catch {}
    }
    const _0x584c69 = {
      statusCode: _0x543099,
      headers: _0x16b7f0,
      result: _0x3507be
    };
    return Promise.resolve(_0x584c69);
  }
}
let _0x1f9788 = new _0x53c152();
class UserClass extends _0x53c152 {
  constructor(ck) {
    super();
    Object.assign(this, $.CkToJson(ck));
    //uuid
    //this.specified_app_uuid = _0x472d33?.[1];
    this.t_earnDaily = 0;
    this.init_xtb_coin = 0;
    this.xtb_coin = 0;
    this.run_xtb = false;
    this.uuid = $.randomPattern("186ebxxxxxxxx-22e49fxxxxxxxx-0-0-186ebxxxxxxxx");
    this.app_uuid = "00000000000009CA00" + $.randomString(46).toUpperCase();
    this.openid = $.randomString(7, _0x2b49ff) + "-" + $.randomString(20, _0x2b49ff);
    this.cookie = "token=" + this.token + "; mt_c_token=" + this.token + "; openid=" + this.openid + ";";
    this.valid_fp = false;
    this.fp = "H5dfp_1.8.2_tttt_CziTmz1LjARvHzKKzoDtmdBgc6Df5b+sgrXDtVBPjiCayshtLKt1gh8PjGGT";
    //MTS && (this.h5guard = new MTS(this.cookie, _0x2ff58e));
    MTS && (this.h5guard = MTS);
    this.got = this.got.extend({
      headers: {
        "User-Agent": _0x2ff58e,
        token: this.token,
        mtoken: this.token,
        openid: this.openid,
        uuid: this.uuid,
        "M-APPKEY": "wxmp_mt-weapp",
        clientversion: _0x3e1e7d,
        utm_medium: _0x3d626d,
        openIdCipher: _0x51d112,
        cookie: this.cookie
      }
    });
  }
  notify_coupon(_0x3003c1, _0x2180e2 = "领券", _0x1e24b5 = {}) {
    const _0x2b3496 = {
      notify: true
    };
    let _0x2e5438 = Object.assign(_0x2b3496, _0x1e24b5);
    for (let _0xf96e70 of _0x3003c1) {
      this.log(_0x2180e2 + ": " + _0xf96e70, _0x2e5438);
    }
  }
  async get_mtgsig(url, data) {
    const _0xe0b92d = {
      a1: "1.1",
      a2: 1700365130585,
      a3: "1vyxz7555u245u5x11v5790z818348w9813323332u797958u759zuy9",
      a5: "6feqh9xQjtiJ3UHNHIFs",
      a6: "hs1.4a4gsvX1s4RLQYqBR3sFhAetGq48eVYBW6Cn/alJLXhKJmvseSxVGkCW67PIGmh1ll21TL1+x/WxxCGvlTdlaUpb5NxEMCD7bPltS8KSHdzc=",
      x0: 4,
      d1: "b6d3aab11db3c6cd661a8221ab606c78"
    };
    let Req = {
      headers: {
        mtgsig: JSON.stringify(_0xe0b92d)
      }
    };
    if (this.h5guard) {
      Req = await this.h5guard.sign(url, data);
      Req=MTS.callMtgsig({
        "url": url,
        "method": "POST",
        "headers": this.got.defaults.options.headers,
        'data': data
      })
    }
    return Req;
  }
  async getfp(_0x4000b8 = false) {
    if (!this.valid_fp) {
      if (this.h5guard && _0x4000b8) {
        //this.fp = this.h5guard.getfp();
        this.fp = MTS.mtFingerprint();
        this.valid_fp = true;
      } else {}
    }
    return this.fp;
  }
  async get_app_riskForm(_0x3cf150 = false) {
    let _0x407ae1 = await this.getfp(_0x3cf150);
    const _0x3d216b = {
      ip: "",
      fingerprint: _0x407ae1,
      cityId: "30",
      platform: 5,
      app: 0,
      version: "12.8.202",
      uuid: ""
    };
    return _0x3d216b;
  }
  async get_riskParams(_0x35e36c = true) {
    let _0xf1ada8 = await this.getfp(_0x35e36c);
    const _0x5de0a0 = {
      uuid: this.uuid || AppUuid || this.app_uuid,
      platform: 5,
      fingerprint: _0xf1ada8,
      version: "12.15.404",
      app: 0,
      cityid: "30"
    };
    return _0x5de0a0;
  }
  async get_riskForm(_0x121ae9 = false) {
    let _0x5dedb7 = await this.getfp(_0x121ae9);
    const _0x35b597 = {
      openid: this.openid,
      appid: _0x1980e9,
      mchid: _0x2e62d3
    };
    let _0x425162 = {
      uuid: this.uuid,
      userid: this.userId,
      openid: this.openid,
      expoId: _0x51d112,
      ip: "",
      partner: 0,
      wxRiskLevel: JSON.stringify(_0x35b597),
      platform: 13,
      appletsFingerprint: _0x5dedb7,
      wechatFingerprint: _0x5dedb7
    };
    return _0x425162;
  }
  async encode_riskForm(_0x3bd177 = false) {
    let _0x2d9d62 = await this.get_riskForm(_0x3bd177);
    return base64_encode(JSON.stringify(_0x2d9d62));
  }
  async getLoginedUserInfo(_0x2aa41d = {}) {
    let _0x3dde4c = false;
    try {
      const _0x13160e = {
        token: this.token
      };
      const _0x1c5e18 = {
        fn: "getLoginedUserInfo",
        method: "get",
        url: "https://i.meituan.com/wrapapi/getLoginedUserInfo",
        searchParams: _0x13160e
      };
      let {
        result: _0x49bcbc
      } = await this.request(_0x1c5e18);
      if (_0x49bcbc?.["mobile"]) {
        _0x3dde4c = true;
        this.valid = true;
        this.name = _0x49bcbc.nickName;
        this.userId = Number(_0x49bcbc.userId);
        this.log("登录成功");
      } else {
        this.log("获取账号信息失败, ck可能失效");//, {"notify": true}
        await expireNotify(this.userId, this.index);
      }
    } catch (_0x51239b) {
      console.log(_0x51239b);
    } finally {
      return _0x3dde4c;
    }
  }
  async inviteFetchcoupon(_0x23d557 = {}) {
    try {
      const _0x24591e = {
        ctype: "wxapp",
        fpPlatform: 13,
        isMini: 1,
        token: this.token,
        inviteCode: this.name!="nyqty" ? inviteCode :  inviteCode2
      };
      const _0x1bd205 = {
        fn: "inviteFetchcoupon",
        method: "get",
        url: "https://promotion-waimai.meituan.com/invite/fetchcoupon",
        searchParams: _0x24591e
      };
      let {
          result: _0x28fc4c
        } = await this.request(_0x1bd205),
        _0x10c223 = $.get(_0x28fc4c, "code", -1),
        _0x118a10 = $.get(_0x28fc4c, "subcode", -1);
      if ((_0x10c223 == 0 || _0x10c223 == 1) && (_0x118a10 == 0 || _0x118a10 == 2)) {
        let _0x416873 = _0x28fc4c?.["data"]?.["couponList"]?.["map"](_0x586db6 => "[" + _0x586db6.couponTitle + "]" + (_0x586db6.priceLimit || "无门槛") + "减" + _0x586db6.couponValue);
        this.notify_coupon(_0x416873);
      } else {
        let _0x77911a = _0x28fc4c?.["msg"] || _0x28fc4c?.["message"] || "";
        this.log("领券失败[" + _0x10c223 + "]: " + _0x77911a);
      }
    } catch (_0x51f6e5) {
      console.log(_0x51f6e5);
    }
  }
  async gundamGrabV4(_0x44d147, _0x4494aa = {}) {
    try {
      const _0x3772da = {
        fn: "gundamGrabV4",
        method: "post",
        url: "https://mediacps.meituan.com/gundam/gundamGrabV4?" + _0x44d147.param,
        json: _0x44d147.body,
        headers: {}
      };
      _0x3772da.headers.Origin = "https://market.waimai.meituan.com";
      _0x3772da.headers.Referer = "https://market.waimai.meituan.com/";
      let {
          result: _0x481c27
        } = await this.request(_0x3772da),
        _0xeec91e = $.get(_0x481c27, "code", -1);
      if (_0xeec91e == 0) {
        let _0xb2fb8b = _0x481c27?.["data"]?.["allCoupons"]?.["map"](_0x3c544b => "[" + _0x3c544b.couponName + "]" + (_0x3c544b.amountLimit || "无门槛") + "减" + _0x3c544b.couponAmount);
        this.notify_coupon(_0xb2fb8b);
      } else {
        let _0x23d5fe = _0x481c27?.["msg"] || _0x481c27?.["message"] || "";
        this.log("领券失败[" + _0xeec91e + "]: " + _0x23d5fe);
      }
    } catch (_0x1533ba) {
      console.log(_0x1533ba);
    }
  }
  async turntableInfo(_0x32d674, _0x2c45f3 = {}) {
    try {
      let _0x42c54a = {
          fn: "turntableInfo",
          method: "get",
          url: "https://promotion.waimai.meituan.com/lottery/turntable/info",
          searchParams: {
            activityViewId: _0x32d674,
            gdPageId: $.get(_0x2c45f3, "gdPageId", "0"),
            instanceId: $.get(_0x2c45f3, "instanceId", ""),
            appType: 0,
            deviceType: 2,
            token: this.token,
            userId: this.userId,
            uuid: this.uuid
          }
        },
        {
          result: _0x108031
        } = await this.request(_0x42c54a),
        _0xd04196 = $.get(_0x108031, "code", -1);
      if (_0xd04196 == 0) {
        let {
          canDrawCount: _0x5d3c0a,
          drawStatus: _0x2f7c73
        } = _0x108031?.["data"];
        if (_0x2f7c73 == 1) {
          const _0x389146 = {
            act: _0x32d674
          };
          this.log("社群抽奖可以抽" + _0x5d3c0a + "次", _0x389146);
          while (_0x5d3c0a-- > 0) {
            await this.turntableDraw(_0x32d674, _0x2c45f3);
          }
        } else {
          const _0x36bff1 = {
            act: _0x32d674
          };
          this.log("社群抽奖没有抽奖次数或未到时间", _0x36bff1);
        }
      } else {
        let _0x3aadf5 = _0x108031?.["msg"] || _0x108031?.["message"] || "";
        const _0x492227 = {
          act: _0x32d674
        };
        this.log("查询社群抽奖次数失败[" + _0xd04196 + "]: " + _0x3aadf5, _0x492227);
      }
    } catch (_0x275c55) {
      console.log(_0x275c55);
    }
  }
  async turntableDraw(_0x12fbc9, _0x1e60d3 = {}) {
    try {
      let _0x40f242 = {
          fn: "turntableDraw",
          method: "post",
          url: "https://promotion.waimai.meituan.com/lottery/turntable/draw",
          searchParams: {
            actualLat: _0x3b009f,
            actualLng: _0x23042b,
            initialLat: _0x3b009f,
            initialLng: _0x23042b,
            cType: $.get(_0x1e60d3, "cType", "wm_wxapp"),
            wm_appversion: $.get(_0x1e60d3, "wm_appversion", "9.19.6"),
            gdPageId: $.get(_0x1e60d3, "gdPageId", "460584"),
            token: this.token,
            userId: this.userId,
            uuid: this.uuid
          },
          json: {
            activityViewId: _0x12fbc9,
            appType: 0,
            deviceType: 2,
            wxOpenId: this.openid,
            fpPlatform: 5,
            mtFingerprint: ""
          }
        },
        {
          result: _0x44fd5d
        } = await this.request(_0x40f242),
        _0x169b72 = $.get(_0x44fd5d, "code", -1);
      if (_0x169b72 == 0) {
        let _0x4ad2fe = [];
        for (let _0x10fc15 of _0x44fd5d?.["data"]?.["awards"]) {
          _0x10fc15.couponType == 1 ? _0x4ad2fe.push("[" + _0x10fc15.name + "]" + (_0x10fc15.orderAmountLimit || "无门槛") + "减" + _0x10fc15.amount) : _0x4ad2fe.push(_0x10fc15.desc);
        }
        const _0x59f8ca = {
          act: _0x12fbc9
        };
        this.notify_coupon(_0x4ad2fe, "社群抽奖", _0x59f8ca);
      } else {
        let _0x372cd3 = _0x44fd5d?.["msg"] || _0x44fd5d?.["message"] || "";
        if (!_0x372cd3?.["includes"]("系统异常") && !_0x372cd3?.["includes"]("可抽奖次数不足") || _0x4e1816) {
          const _0x1c87ed = {
            act: _0x12fbc9
          };
          this.log("社群抽奖失败[" + _0x169b72 + "]: " + _0x372cd3, _0x1c87ed);
        }
      }
    } catch (_0x3082a1) {
      console.log(_0x3082a1);
    }
  }
  async signupRecord(_0x11b295, _0x18f443 = {}) {
    try {
      let _0x1509b9 = {
          fn: "signupRecord",
          method: "get",
          url: "https://promotion.waimai.meituan.com/playcenter/common/v1/treasurebox/signup/circle/record",
          searchParams: {
            activityViewId: _0x11b295,
            isInDpEnv: 0,
            isMini: 1,
            cType: $.get(_0x18f443, "cType", "wm_wxapp")
          }
        },
        {
          result: _0x2509ea
        } = await this.request(_0x1509b9),
        _0x4c1369 = $.get(_0x2509ea, "code", -1);
      if (_0x4c1369 == 0) {
        const _0x41783e = {
          act: _0x11b295
        };
        this.log("已连续签到" + (_0x2509ea?.["data"]?.["signUpNum"] || 0) + "天", _0x41783e);
        for (let _0x162557 of _0x2509ea?.["data"]?.["rewardStatus"]?.["filter"](_0xe6570c => _0xe6570c.status == 1)) {
          await this.signupGetBox(_0x11b295, _0x162557.stageDayNum);
        }
      } else {
        let _0x35f7db = _0x2509ea?.["msg"] || _0x2509ea?.["message"] || "";
        if (!_0x35f7db?.["includes"]("活动失效") || _0x4e1816) {
          const _0x6c3b85 = {
            act: _0x11b295
          };
          this.log("查询签到失败[" + _0x4c1369 + "]: " + _0x35f7db, _0x6c3b85);
        }
      }
    } catch (_0x16c4b3) {
      console.log(_0x16c4b3);
    }
  }
  async signupGetBox(_0x57e738, _0x6b759c, _0x45e7a4 = {}) {
    try {
      const _0x5a394a = {
        signUpDayNum: _0x6b759c
      };
      let _0x592245 = {
          fn: "signupGetBox",
          method: "post",
          url: "https://promotion.waimai.meituan.com/playcenter/common/v1/treasurebox/signup/stage/reward/get",
          searchParams: {
            isInDpEnv: 0,
            isMini: 1,
            cType: $.get(_0x45e7a4, "cType", "wm_wxapp")
          },
          json: {
            activityViewId: _0x57e738,
            actionCode: 1000,
            lat: _0x3b009f,
            lng: _0x23042b,
            fpPlatform: 13,
            bizParams: JSON.stringify(_0x5a394a),
            utmSource: "",
            utmCampaign: "",
            gdId: 421412,
            codeVersion: 1,
            mtFingerprint: ""
          }
        },
        {
          result: _0x4c207f
        } = await this.request(_0x592245),
        _0x424da6 = $.get(_0x4c207f, "code", -1);
      if (_0x424da6 == 0) {
        let _0x582788 = _0x4c207f?.["data"]?.["prizeInfoList"]?.["map"](_0x1803fe => "[" + _0x1803fe.couponInfo.couponTitle + "]" + (_0x1803fe.couponInfo.priceLimit || "无门槛") + "减" + _0x1803fe.couponInfo.couponValue);
        const _0x54debe = {
          act: _0x57e738
        };
        this.notify_coupon(_0x582788, "开签到宝箱", _0x54debe);
      } else {
        let _0x1c7fb0 = _0x4c207f?.["msg"] || _0x4c207f?.["message"] || "";
        if (!_0x1c7fb0?.["includes"]("预发失败") && !_0x1c7fb0?.["includes"]("动作不满足执行条件") && !_0x1c7fb0?.["includes"]("发奖失败") || _0x4e1816) {
          const _0x7cf26e = {
            act: _0x57e738
          };
          this.log("开签到宝箱失败[" + _0x424da6 + "]: " + _0x1c7fb0, _0x7cf26e);
        }
      }
    } catch (_0x507187) {
      console.log(_0x507187);
    }
  }
  async ttsqEntry(_0x505507, _0x23a004 = {}) {
    try {
      const _0x988ae = {
        activityViewId: _0x505507,
        actionCodes: 1000,
        querySignupConfig: 1,
        lat: _0x3b009f,
        lng: _0x23042b
      };
      const _0x22dcd1 = {
        fn: "signupRecord",
        method: "get",
        url: "https://promotion.waimai.meituan.com/playcenter/common/v1/entry",
        searchParams: _0x988ae
      };
      let {
          result: _0x429bae
        } = await this.request(_0x22dcd1),
        _0x5cc730 = $.get(_0x429bae, "code", -1);
      if (_0x5cc730 == 0) {
        if (_0x429bae.data.actionInfoList) {
          for (let _0xdc251a of _0x429bae.data.actionInfoList) {
            await this.ttsqDoAction(_0x505507, _0xdc251a.actionCode || 1000);
          }
        }
      } else {
        let _0x3da0b4 = _0x429bae?.["msg"] || _0x429bae?.["message"] || "";
        const _0x2c6dbd = {
          act: _0x505507
        };
        this.log("查询天天神券宝箱失败[" + _0x5cc730 + "]: " + _0x3da0b4, _0x2c6dbd);
      }
    } catch (_0x2998ba) {
      console.log(_0x2998ba);
    }
  }
  async ttsqDoAction(_0x1e6499, _0x27654a, _0x119f71 = {}) {
    try {
      let _0x1fc0e3 = {
          fn: "ttsqDoAction",
          method: "post",
          url: "https://promotion.waimai.meituan.com/playcenter/common/v1/doaction",
          json: {
            activityViewId: _0x1e6499,
            actionCode: parseInt(_0x27654a || 1000),
            lat: _0x3b009f,
            lng: _0x23042b,
            gdId: 26403,
            fpPlatform: 13,
            utmSource: "",
            utmCampaign: "",
            mtFingerprint: ""
          }
        },
        {
          result: _0x19a197
        } = await this.request(_0x1fc0e3),
        _0x1fed91 = $.get(_0x19a197, "code", -1);
      if (_0x1fed91 == 0) {
        let _0x2fd6e2 = _0x19a197?.["data"]?.["prizeInfoList"]?.["map"](_0x6ce76f => _0x6ce76f.awardType >= 0 ? "[" + _0x6ce76f.couponInfo.couponTitle + "]" + (_0x6ce76f.couponInfo.priceLimit || "无门槛") + "减" + _0x6ce76f.couponInfo.couponValue : "")?.["filter"](_0x550a58 => _0x550a58);
        const _0x7dda58 = {
          act: _0x1e6499
        };
        this.notify_coupon(_0x2fd6e2, "开天天神券宝箱", _0x7dda58);
      } else {
        let _0x16488c = _0x19a197?.["msg"] || _0x19a197?.["message"] || "";
        if (!_0x16488c?.["includes"]("预发失败") && !_0x16488c?.["includes"]("动作不满足执行条件") && !_0x16488c?.["includes"]("发奖失败") || _0x4e1816) {
          const _0x541822 = {
            act: _0x1e6499
          };
          this.log("开天天神券宝箱失败[" + _0x1fed91 + "]: " + _0x16488c, _0x541822);
        }
      }
    } catch (_0x3ec6d6) {
      console.log(_0x3ec6d6);
    }
  }
  async ttsqEntryLottery(_0x22c1ff, _0x4ba395 = {}) {
    try {
      const _0x2f19db = {
        fn: "signupRecord",
        method: "get",
        url: "https://promotion.waimai.meituan.com/playcenter/common/v1/entry",
        searchParams: {}
      };
      _0x2f19db.searchParams.isMini = 1;
      _0x2f19db.searchParams.ctype = "wm_wxapp";
      _0x2f19db.searchParams.isInDpEnv = 0;
      _0x2f19db.searchParams.activityViewId = _0x22c1ff;
      _0x2f19db.searchParams.actionCodes = 1001;
      _0x2f19db.searchParams.lat = _0x3b009f;
      _0x2f19db.searchParams.lng = _0x23042b;
      let {
          result: _0x4fc654
        } = await this.request(_0x2f19db),
        _0x3da06f = $.get(_0x4fc654, "code", -1);
      if (_0x3da06f == 0) {
        if (_0x4fc654.data.actionInfoList) {
          for (let _0x31f5d0 of _0x4fc654.data.actionInfoList) {
            await this.ttsqDoActionLottery(_0x22c1ff, _0x31f5d0.actionCode || 1001);
          }
        }
      } else {
        let _0x1af83a = _0x4fc654?.["msg"] || _0x4fc654?.["message"] || "";
        const _0x55871c = {
          act: _0x22c1ff
        };
        this.log("查询天天神券抽奖失败[" + _0x3da06f + "]: " + _0x1af83a, _0x55871c);
      }
    } catch (_0x4fd978) {
      console.log(_0x4fd978);
    }
  }
  async ttsqDoActionLottery(_0x4d8e8e, _0x43760e, _0x2a72b0 = {}) {
    try {
      let _0x15f62f = {
          fn: "ttsqDoAction",
          method: "post",
          url: "https://promotion.waimai.meituan.com/playcenter/common/v1/doaction",
          json: {
            activityViewId: _0x4d8e8e,
            actionCode: parseInt(_0x43760e || 1001),
            lat: _0x3b009f,
            lng: _0x23042b,
            gdId: 436181,
            instanceId: "16703954295670.59854316222808620"
          }
        },
        {
          result: _0x5b970f
        } = await this.request(_0x15f62f),
        _0x133bc0 = $.get(_0x5b970f, "code", -1);
      if (_0x133bc0 == 0) {
        let _0x2e0bb6 = _0x5b970f?.["data"]?.["prizeInfoList"]?.["map"](_0x1316d7 => _0x1316d7.awardType >= 0 ? "[" + (_0x1316d7?.["couponInfo"]?.["couponTitle"] || "") + "]" + (_0x1316d7?.["couponInfo"]?.["priceLimit"] || "无门槛") + "减" + (_0x1316d7?.["couponInfo"]?.["couponValue"] || "") : "")?.["filter"](_0xf55178 => _0xf55178);
        const _0x50c924 = {
          act: _0x4d8e8e
        };
        this.notify_coupon(_0x2e0bb6, "天天神券抽奖", _0x50c924);
      } else {
        let _0xffc68e = _0x5b970f?.["msg"] || _0x5b970f?.["message"] || "";
        if (!_0xffc68e?.["includes"]("预发失败") && !_0xffc68e?.["includes"]("动作不满足执行条件") && !_0xffc68e?.["includes"]("发奖失败") || _0x4e1816) {
          const _0x1128cc = {
            act: _0x4d8e8e
          };
          this.log("天天神券抽奖失败[" + _0x133bc0 + "]: " + _0xffc68e, _0x1128cc);
        }
      }
    } catch (_0x395270) {
      console.log(_0x395270);
    }
  }
  async clockInStatus(_0x4f5c71, _0x139dc8 = {}) {
    try {
      let _0x4b5686 = {
          fn: "clockInStatus",
          method: "get",
          url: "https://promotion.waimai.meituan.com/playcenter/common/v1/clock-in/status",
          searchParams: {
            activityViewId: _0x4f5c71,
            ctype: $.get(_0x139dc8, "ctype", "wm_wxapp"),
            isInDpEnv: 0
          }
        },
        {
          result: _0x371767
        } = await this.request(_0x4b5686),
        _0x597f0c = $.get(_0x371767, "code", -1);
      if (_0x597f0c == 0) {
        let _0xce0ace = new Date().getDay();
        for (let _0x5e2fdd of _0x371767.data.clockInStatus) {
          if (_0x5e2fdd.dayOfWeek % 7 == _0xce0ace) {
            const _0x36489b = {
              act: _0x4f5c71
            };
            this.log("今天社群" + (_0x5e2fdd.status ? "已" : "未") + "签到, 本周已签到" + _0x371767.data.clockInNum + "天", _0x36489b);
            if (!_0x5e2fdd.status) {
              await this.clockInSign(_0x4f5c71);
            }
            break;
          }
        }
        _0x371767.data.lotteryStatus == 1 && (await this.ttsqDoAction(_0x4f5c71, 1001));
      } else {
        let _0x36119a = _0x371767?.["msg"] || _0x371767?.["message"] || "";
        const _0x243723 = {
          act: _0x4f5c71
        };
        this.log("查询社群签到失败[" + _0x597f0c + "]: " + _0x36119a, _0x243723);
      }
    } catch (_0x57d8d4) {
      console.log(_0x57d8d4);
    }
  }
  async clockInSign(_0x1efae6, _0x25308f = {}) {
    try {
      const _0x5c36a8 = {
        activityViewId: _0x1efae6,
        actionCode: 1001,
        lat: _0x3b009f,
        lng: _0x23042b
      };
      let _0x4bd76e = {
          fn: "clockInSign",
          method: "post",
          url: "https://promotion.waimai.meituan.com/playcenter/common/v1/clock-in",
          searchParams: {
            isMini: 1,
            ctype: $.get(_0x25308f, "ctype", "wm_wxapp"),
            isInDpEnv: 0
          },
          json: _0x5c36a8
        },
        {
          result: _0xbcbc3d
        } = await this.request(_0x4bd76e),
        _0xa649d6 = $.get(_0xbcbc3d, "code", -1);
      if (_0xa649d6 == 0) {
        let _0x4b44a1 = _0xbcbc3d?.["data"]?.["prizeInfoList"]?.["map"](_0x273757 => "[" + _0x273757.couponInfo.couponTitle + "]" + (_0x273757.couponInfo.priceLimit || "无门槛") + "减" + _0x273757.couponInfo.couponValue);
        const _0x5aa027 = {
          act: _0x1efae6
        };
        this.notify_coupon(_0x4b44a1, "社群签到领券", _0x5aa027);
      } else {
        let _0x10823c = _0xbcbc3d?.["msg"] || _0xbcbc3d?.["message"] || "";
        if (!_0x10823c?.["includes"]("预发失败") && !_0x10823c?.["includes"]("动作不满足执行条件") && !_0x10823c?.["includes"]("发奖失败") || _0x4e1816) {
          const _0x134323 = {
            act: _0x1efae6
          };
          this.log("社群签到失败[" + _0xa649d6 + "]: " + _0x10823c, _0x134323);
        }
      }
    } catch (_0x4f9c64) {
      console.log(_0x4f9c64);
    }
  }
  async cardLotteryNum(_0x2cfdbd = {}) {
    try {
      const _0xe5be02 = {
        fn: "cardLotteryNum",
        method: "post",
        url: "https://mgm.meituan.com/marketing/cardsCollect/api/cardLotteryNum",
        json: {}
      };
      _0xe5be02.json.activityId = "1116";
      _0xe5be02.json.topicIdList = ["1380101169187258449", "1380101260094521416", "1412292930126868547"];
      let {
        result: _0x55442d
      } = await this.request(_0xe5be02);
      if (_0x55442d?.["lotteryNum"] >= 0) {
        let _0xaa1ac5 = _0x55442d.lotteryNum;
        this.log("有" + _0xaa1ac5 + "次抽月符机会");
        while (_0xaa1ac5-- > 0) {
          await this.lotteryfrompool(_0x55442d.poolIdList);
        }
      } else {
        let _0x147e74 = _0x55442d?.["msg"] || _0x55442d?.["message"] || "";
        this.log("查询抽月符次数失败: " + _0x147e74);
      }
    } catch (_0x194eed) {
      console.log(_0x194eed);
    }
  }
  async cardSaveAccess(_0x1e708e = {}) {
    try {
      const _0xd749c = {
        playerId: 1
      };
      const _0x5130e0 = {
        fn: "cardSaveAccess",
        method: "post",
        url: "https://mgm.meituan.com/marketing/cardsCollect/api/saveAccess",
        json: _0xd749c
      };
      await this.request(_0x5130e0);
    } catch (_0x57094b) {
      console.log(_0x57094b);
    }
  }
  async cardSaveShare(_0x1bac06 = {}) {
    try {
      const _0x38bc0c = {
        playerId: 1,
        shareWay: 1,
        shareContentType: 1,
        shareContentId: "29"
      };
      const _0x197bfb = {
        fn: "cyfSaveShare",
        method: "post",
        url: "https://mgm.meituan.com/marketing/cardsCollect/api/saveShare",
        json: _0x38bc0c
      };
      await this.request(_0x197bfb);
    } catch (_0x4c5395) {
      console.log(_0x4c5395);
    }
  }
  async lotteryfrompool(_0x235739, _0x2014b7 = {}) {
    try {
      const _0x4ac08b = {
        poolList: _0x235739
      };
      const _0x385ec5 = {
        fn: "lotteryfrompool",
        method: "post",
        url: "https://mgm.meituan.com/marketing/cardsCollect/api/lotteryfrompool",
        json: _0x4ac08b
      };
      let {
        result: _0x154363
      } = await this.request(_0x385ec5);
      if (_0x154363?.["prizeInfo"]?.["name"]) {
        this.log("抽到月符: [" + _0x154363?.["prizeInfo"]?.["name"] + "]");
        await this.getCardInfo(_0x154363?.["lotteryAwardSerialNo"]?.["value"]);
      } else {
        let _0x561671 = _0x154363?.["msg"] || _0x154363?.["message"] || "";
        this.log("抽月符失败: " + _0x561671);
      }
    } catch (_0x44ab67) {
      console.log(_0x44ab67);
    }
  }
  async getCardInfo(_0x2b046e, _0x361eaa = {}) {
    try {
      const _0x4287ec = {
        lotteryAwardSerialNo: _0x2b046e
      };
      const _0x799a5c = {
        fn: "getCardInfo",
        method: "get",
        url: "https://mgm.meituan.com/marketing/cardsCollect/api/getCardInfo",
        searchParams: _0x4287ec
      };
      let {
          result: _0x31babc
        } = await this.request(_0x799a5c),
        _0x300749 = $.get(_0x31babc, "code", -1);
      if (_0x300749 == 0) {
        await this.getCardDraw(_0x31babc?.["userCardInfo"]?.["cardId"]);
      } else {
        let _0x1b0740 = _0x31babc?.["msg"] || _0x31babc?.["message"] || "";
        this.log("查询月符抽奖卡号失败[" + _0x300749 + "]: " + _0x1b0740);
      }
    } catch (_0x1009ad) {
      console.log(_0x1009ad);
    }
  }
  async getCardDraw(_0x304769, _0x2f4238 = {}) {
    try {
      const _0x33c37e = {
        cardId: _0x304769
      };
      const _0x52bcaf = {
        fn: "getCardDraw",
        method: "get",
        url: "https://mgm.meituan.com/marketing/cardsCollect/api/draw",
        searchParams: _0x33c37e
      };
      let {
        result: _0x3b8937
      } = await this.request(_0x52bcaf);
      if (_0x3b8937?.["bingo"]?.["value"]) {
        this.log("月符抽奖: " + _0x3b8937?.["prizeInfo"]?.["name"]);
      } else {
        let _0x3339fd = _0x3b8937?.["msg"] || _0x3b8937?.["message"] || "";
        this.log("查询月符抽奖结果失败: " + _0x3339fd);
      }
    } catch (_0x242ed1) {
      console.log(_0x242ed1);
    }
  }
  async getUserTasks(_0x38675b, _0x3abb92 = {}) {
    try {
      const _0x497761 = {
        fn: "getUserTasks",
        method: "post",
        url: "https://cube.meituan.com/topcube/api/toc/task/getUserTasks",
        json: {}
      };
      _0x497761.json.uuid = this.uuid;
      _0x497761.json.userId = this.userId;
      _0x497761.json.browseAreaTrue = true;
      _0x497761.json.cityId = 30;
      _0x497761.json.taskIdKeys = _0x38675b.taskIdKeys;
      _0x497761.json.userType = "MEI_TUAN";
      _0x497761.json.sourceType = "MEI_TUAN";
      _0x497761.json.mini_program_token = this.token;
      _0x497761.json.inviter = "";
      _0x497761.json.inviterTaskIdKey = "";
      let {
        result: _0x5c6210
      } = await this.request(_0x497761);
      if (_0x5c6210?.["code"] == 0) {
        for (let _0x5a3f71 of _0x5c6210.data) {
          if (!_0x21c87d.includes(_0x5a3f71?.["code"]?.["toString"]())) {
            if (!_0x5a3f71?.["taskRuleVos"]?.["length"]) {
              $.log("任务[" + _0x5a3f71.title + "] -- " + _0x5a3f71.msg);
              continue;
            }
            if (_0x5a3f71?.["title"]?.["includes"]("小程序下单")) {
              continue;
            }
            let _0x12d442 = _0x5a3f71?.["extend"] ? true : false;
            if (_0x12d442 && _0x5a3f71?.["extend"]?.["isSignInToday"] == 1) {
              $.log("任务[" + _0x5a3f71.title + "] -- 已完成");
              continue;
            }
            let _0xa28e7b = false;
            if (_0x5a3f71.taskConf) {
              let _0xca6fa3 = JSON.parse(_0x5a3f71.taskConf);
              _0xca6fa3.isCheckNgSignature && (_0xa28e7b = true);
            }
            for (let _0x1956e0 of _0x5a3f71.taskRuleVos) {
              if (_0x1956e0.status == "PRIZE_SUCC" || _0x1956e0.status == "DELETE") {
                !_0x12d442 && $.log("任务[" + _0x5a3f71.title + "] -- 已完成");
              } else {
                if (_0x1956e0?.["status"] == "CAN_RECEIVE") {
                  $.log("任务[" + _0x5a3f71.title + "] -- 可领取奖励");
                  const _0x128294 = {
                    need_sign: _0xa28e7b
                  };
                  await this.sendTaskPrize(_0x38675b, _0x5a3f71, _0x1956e0, {}, _0x128294);
                  if (_0x12d442) {
                    break;
                  }
                } else {
                  $.log("任务[" + _0x5a3f71.title + "] -- 未完成");
                  let _0x1863c8 = true,
                    _0x4e5f0c = JSON.parse(_0x1956e0.ruleConfig);
                  if (_0x4e5f0c.limitTime) {
                    let _0x5badcf = (_0x1956e0.preCompleteTime || 0) + _0x4e5f0c.limitTime * 1000;
                    Date.now() < _0x5badcf && (_0x1863c8 = false, $.log("任务[" + _0x5a3f71.title + "]冷却中, [" + $.time("hh:mm:ss", _0x5badcf) + "]后可完成"));
                  } else {
                    if (_0x4e5f0c?.["timeLimits"]?.["length"]) {
                      let _0x249df2 = new Date($.time("yyyy-MM-dd 00:00:00")).getTime(),
                        _0x4c553e = Date.now();
                      for (let _0x56092a of _0x4e5f0c.timeLimits) {
                        let {
                          startTime: _0x41fc28,
                          endTime: _0x423185
                        } = _0x56092a;
                        _0x41fc28 += _0x249df2;
                        _0x423185 += _0x249df2;
                        (_0x4c553e < _0x41fc28 || _0x4c553e >= _0x423185) && (_0x1863c8 = false, $.log("任务[" + _0x5a3f71.title + "]不在时间段中: " + $.time("hh:mm:ss", _0x41fc28) + "到" + $.time("hh:mm:ss", _0x423185)));
                      }
                    }
                  }
                  if (_0x1863c8) {
                    const _0x34697a = {
                      need_sign: _0xa28e7b
                    };
                    await this.startUserTask(_0x38675b, _0x5a3f71, _0x1956e0, _0x34697a);
                  }
                  if (_0x12d442) {
                    break;
                  }
                }
              }
            }
          }
        }
      } else {
        let _0x245d03 = _0x5c6210?.["msg"] || _0x5c6210?.["desc"] || "";
        this.log("查询任务列表失败: " + _0x245d03);
      }
    } catch (_0x1476c4) {
      console.log(_0x1476c4);
    }
  }
  async startUserTask(_0x354b8d, _0x46d86b, _0x20b5da, _0x3a284a = {}) {
    try {
      let _0x293afa = _0x3a284a?.["need_sign"],
        _0xb2cd81 = "https://cube.meituan.com/topcube/api/toc/task/startUserTask",
        _0x4e941e = {
          uuid: this.uuid,
          userId: this.userId,
          cityId: 30,
          riskForm: await this.encode_riskForm(_0x293afa),
          taskIdKey: _0x46d86b.taskIdKey,
          taskRuleIdKey: _0x20b5da.taskRuleIdKey,
          cubePageId: _0x354b8d.cubePageId,
          userType: "MEI_TUAN",
          sourceType: "MEI_TUAN",
          mini_program_token: this.token
        };
      const _0x10a9ed = {
        fn: "startUserTask",
        method: "post",
        url: _0xb2cd81,
        json: _0x4e941e
      };
      if (_0x293afa) {
        let {
          headers: _0x362048
        } = await this.get_mtgsig(_0xb2cd81, _0x4e941e);
        const _0xd957df = {
          mtgsig: _0x362048.mtgsig
        };
        _0x10a9ed.headers = _0xd957df;
      }
      let {
        result: _0x127cbe
      } = await this.request(_0x10a9ed);
      if (_0x127cbe?.["code"] == 0) {
        let _0x2aa7ae = JSON.parse(_0x20b5da.ruleConfig);
        if (_0x2aa7ae.staySeconds) {
          let _0x429a60 = _0x2aa7ae.staySeconds * 1000;
          this.log("等待" + _0x2aa7ae.staySeconds + "秒后完成任务..");
          await $.wait(_0x429a60);
        } else {
          this.log("完成任务[" + _0x46d86b.title + "]成功");
        }
        const _0x15a96b = {
          need_sign: _0x293afa
        };
        await this.updateUserTask(_0x354b8d, _0x46d86b, _0x20b5da, _0x127cbe, _0x15a96b);
      } else {
        let _0x24c069 = _0x127cbe?.["msg"] || _0x127cbe?.["desc"] || "";
        this.log("完成任务[" + _0x46d86b.title + "]失败: " + _0x24c069);
        if (_0x24c069?.["includes"]("活动已完成")) {
          const _0x366e4a = {
            need_sign: _0x293afa
          };
          await this.updateUserTask(_0x354b8d, _0x46d86b, _0x20b5da, {}, _0x366e4a);
        }
      }
    } catch (_0x250064) {
      console.log(_0x250064);
    }
  }
  async process_task_prize(_0x50070a) {
    let _0xfba337 = [];
    for (let _0x4c98e7 of _0x50070a) {
      if (_0x4c98e7.number) {
        _0xfba337.push(_0x4c98e7.number + "金币");
      } else {
        if (_0x4c98e7?.["sendMagicCardResult"]?.["cardList"]?.["length"]) {
          for (let _0x454f09 of _0x4c98e7.sendMagicCardResult.cardList) {
            _0xfba337.push("[" + (_0x47f86a[_0x454f09.type] || _0x454f09.type) + "]x" + _0x454f09.amount);
          }
        } else {
          if (_0x4c98e7?.["sendMagicStoneResult"]?.["stoneList"]?.["length"]) {
            for (let _0x5deea0 of _0x4c98e7.sendMagicStoneResult.stoneList) {
              _0xfba337.push("[" + (_0x11bc05[_0x5deea0.magicStonePrizeType] || _0x5deea0.magicStonePrizeType) + "]x" + _0x5deea0.amount);
            }
          } else {
            if (_0x4c98e7?.["sendCouponResultList"]?.["length"]) {
              for (let _0x5c59ec of _0x4c98e7.sendCouponResultList) {
                _0xfba337.push((_0x5c59ec.useCondition || "无门槛") + "减" + _0x5c59ec.couponValue + _0x5c59ec.couponTypeDesc + "券");
              }
            }
          }
        }
      }
    }
    return _0xfba337;
  }
  async updateUserTask(_0x4ebb1e, _0x3370a5, _0x5f418f, _0x3ed439 = {}, _0x593b92 = {}) {
    try {
      let _0x242062 = _0x593b92?.["need_sign"],
        {
          actionNo = "",
          taskNo = "",
          taskRuleNo = ""
        } = _0x3ed439;
      taskNo = taskNo || _0x3370a5?.["taskNo"] || "";
      taskRuleNo = taskRuleNo || _0x5f418f?.["taskRuleNo"] || "";
      let _0x3c1dcf = "https://cube.meituan.com/topcube/api/toc/task/updateUserTask",
        _0xc7e8d7 = {
          uuid: this.uuid,
          userId: this.userId,
          cityId: 30,
          taskNo: taskNo,
          actionNo: actionNo,
          riskForm: await this.encode_riskForm(_0x242062),
          taskIdKey: _0x3370a5.taskIdKey,
          taskRuleNo: taskRuleNo,
          taskRuleIdKey: _0x5f418f.taskRuleIdKey,
          cubePageId: _0x4ebb1e.cubePageId,
          userType: "MEI_TUAN",
          sourceType: "MEI_TUAN",
          mini_program_token: this.token
        };
      const _0x3b3625 = {
        fn: "updateUserTask",
        method: "post",
        url: _0x3c1dcf,
        json: _0xc7e8d7
      };
      if (_0x242062) {
        let {
          headers: _0x553524
        } = await this.get_mtgsig(_0x3c1dcf, _0xc7e8d7);
        const _0x2b209a = {
          mtgsig: _0x553524.mtgsig
        };
        _0x3b3625.headers = _0x2b209a;
      }
      let {
        result: _0x21ec84
      } = await this.request(_0x3b3625);
      if (_0x21ec84?.["code"] == 0) {
        if (_0x21ec84?.["prizeList"]?.["length"]) {
          let _0x2d9c31 = await this.process_task_prize(_0x21ec84.prizeList);
          this.log("领取任务[" + _0x3370a5.title + "]奖励获得: " + _0x2d9c31.join(","));
        } else {
          this.log("更新任务[" + _0x3370a5.title + "]状态成功");
          const _0x911864 = {
            need_sign: _0x242062
          };
          await this.sendTaskPrize(_0x4ebb1e, _0x3370a5, _0x5f418f, _0x3ed439, _0x911864);
        }
      } else {
        let _0x17f1c1 = _0x21ec84?.["msg"] || _0x21ec84?.["desc"] || "";
        this.log("更新任务[" + _0x3370a5.title + "]状态失败: " + _0x17f1c1);
      }
    } catch (_0x450c13) {
      console.log(_0x450c13);
    }
  }
  async sendTaskPrize(_0x5bf3b9, _0x194f51, _0x40bd00, _0x2361a8 = {}, _0x5de907 = {}) {
    try {
      let _0x3edf38 = _0x5de907?.["need_sign"],
        {
          actionNo = "",
          taskNo = "",
          taskRuleNo = ""
        } = _0x2361a8;
      taskNo = taskNo || _0x194f51?.["taskNo"] || "";
      taskRuleNo = taskRuleNo || _0x40bd00?.["taskRuleNo"] || "";
      let _0x50e1c2 = "https://cube.meituan.com/topcube/api/toc/task/sendTaskPrize",
        _0x3559ba = {
          uuid: this.uuid,
          userId: this.userId,
          cityId: 30,
          taskNo: taskNo,
          actionNo: actionNo,
          riskForm: await this.encode_riskForm(_0x3edf38),
          taskIdKey: _0x194f51.taskIdKey,
          taskRuleNo: taskRuleNo,
          taskRuleIdKey: _0x40bd00.taskRuleIdKey,
          cubePageId: _0x5bf3b9.cubePageId,
          userType: "MEI_TUAN",
          sourceType: "MEI_TUAN",
          mini_program_token: this.token
        };
      const _0x480b88 = {
        fn: "sendTaskPrize",
        method: "post",
        url: _0x50e1c2,
        json: _0x3559ba
      };
      if (_0x3edf38) {
        let {
          headers: _0x52a818
        } = await this.get_mtgsig(_0x50e1c2, _0x3559ba);
        const _0x568611 = {
          mtgsig: _0x52a818.mtgsig
        };
        _0x480b88.headers = _0x568611;
      }
      let {
        result: _0xea68ac
      } = await this.request(_0x480b88);
      if (_0xea68ac?.["code"] == 0) {
        if (_0xea68ac?.["prizeList"]?.["length"]) {
          let _0x35683d = await this.process_task_prize(_0xea68ac.prizeList);
          this.log("领取任务[" + _0x194f51.title + "]奖励获得: " + _0x35683d.join(","));
        } else {
          this.log("没有领取到任务[" + _0x194f51.title + "]奖励");
        }
      } else {
        let _0x1a903c = _0xea68ac?.["msg"] || _0xea68ac?.["desc"] || "";
        this.log("领取任务[" + _0x194f51.title + "]奖励失败: " + _0x1a903c);
      }
    } catch (_0x4b3f22) {
      console.log(_0x4b3f22);
    }
  }
  async goldHomePage(_0x4913ac, _0xdbd5e3 = {}) {
    try {
      let _0x4312f3 = "https://cube.meituan.com/topcube/api/toc/gold/homePage";
      const _0x41012e = {
        activitySecretKey: _0x4913ac,
        sourceType: "MEI_TUAN",
        userId: this.userId,
        mini_program_token: this.token,
        uuid: this.uuid
      };
      const _0x4df4e8 = {
        fn: "goldHomePage",
        method: "post",
        url: _0x4312f3,
        json: _0x41012e
      };
      let {
        result: _0x5889b1
      } = await this.request(_0x4df4e8);
      if (_0x5889b1?.["code"] == 0) {
        for (let _0x32b1d4 of _0x5889b1?.["data"]?.["redPackets"]?.["filter"](_0x57957d => _0x57957d.status == "LOCK_UNRECEIVED")) {
          await this.receiveRedPacket(_0x4913ac, _0x32b1d4);
        }
      } else {
        let _0x284cc6 = _0x5889b1?.["msg"] || _0x5889b1?.["desc"] || "";
        this.log("查询开红包次数失败: " + _0x284cc6);
      }
    } catch (_0xd904a5) {
      console.log(_0xd904a5);
    }
  }
  async receiveRedPacket(_0x44714c, _0x5e85d7, _0x5027a6 = {}) {
    try {
      let _0x55cc57 = "https://cube.meituan.com/topcube/api/toc/gold/receiveRedPacket",
        _0x24acda = {
          activitySecretKey: _0x44714c,
          id: _0x5e85d7.id,
          sourceType: "MEI_TUAN",
          userId: this.userId,
          mini_program_token: this.token,
          uuid: this.uuid,
          riskForm: await this.encode_riskForm()
        },
        {
          headers: _0xc53fb5
        } = await this.get_mtgsig(_0x55cc57, _0x24acda);
      const _0x1dc6f8 = {
        mtgsig: _0xc53fb5.mtgsig
      };
      const _0x4695d1 = {
        fn: "receiveRedPacket",
        method: "post",
        url: _0x55cc57,
        json: _0x24acda,
        headers: _0x1dc6f8
      };
      let {
        result: _0x11c26e
      } = await this.request(_0x4695d1);
      if (_0x11c26e?.["code"] == 0) {
        this.log("开红包获得" + _0x5e85d7.amount + "金币");
      } else {
        let _0x521f04 = _0x11c26e?.["msg"] || _0x11c26e?.["desc"] || "";
        this.log("开红包[" + _0x5e85d7.id + "]失败: " + _0x521f04);
      }
    } catch (_0x497431) {
      console.log(_0x497431);
    }
  }
  async earnDailyLogin(_0x34ce46 = {}) {
    try {
      let _0x281fb8 = _0x34ce46.gameType || 10402;
      const _0x1bd6f3 = {
        cityId: "30"
      };
      let _0x31f9ab = {
          fn: "earnDailyLogin",
          method: "get",
          url: "https://game.meituan.com/earn-daily/login/loginMgc",
          searchParams: {
            gameType: _0x281fb8,
            mtToken: this.token,
            mtUserId: this.userId,
            mtDeviceId: this.uuid,
            nonceStr: $.randomString(16),
            externalStr: JSON.stringify(_0x1bd6f3)
          }
        },
        {
          result: _0x1b3b2e
        } = await this.request(_0x31f9ab),
        _0x3001dd = $.get(_0x1b3b2e, "code", -1);
      if (_0x3001dd == 0) {
        this.acToken = _0x1b3b2e?.["response"]?.["accessToken"];
      } else {
        let _0x5c69a7 = _0x1b3b2e?.["msg"] || _0x1b3b2e?.["desc"] || "";
        this.log("登录游戏[" + _0x281fb8 + "]失败[" + _0x3001dd + "]: " + _0x5c69a7);
      }
    } catch (_0xd2ee4c) {
      console.log(_0xd2ee4c);
    }
  }
  async earnDailyPost(_0x21954b = {}) {
    let _0x245873 = {};
    try {
      let _0x55d4d0 = _0x21954b.protocolId,
        _0x54104e = _0x21954b.data || {};
      const _0x3d2976 = {
        yodaReady: "h5",
        csecplatform: 4,
        csecversion: "2.1.1"
      };
      let _0x53a0c6 = {
        fn: "earnDailyPost",
        method: "post",
        url: "https://game.meituan.com/earn-daily/msg/post",
        headers: {
          Origin: "https://awp.meituan.com",
          Referer: "https://awp.meituan.com/"
        },
        searchParams: _0x3d2976,
        json: {
          acToken: this.acToken,
          riskParams: await this.get_app_riskForm(),
          protocolId: _0x55d4d0,
          data: _0x54104e
        }
      };
      await $.wait_gap_interval(this.t_earnDaily, _0x5cae5c);
      _0x245873 = await this.request(_0x53a0c6);
      this.t_earnDaily = Date.now();
    } catch (_0x14a3cf) {
      console.log(_0x14a3cf);
    } finally {
      return _0x245873;
    }
  }
  async earnDaily_task_list(_0x401e09 = {}) {
    try {
      const _0x21231b = {
        acToken: this.acToken
      };
      const _0x3a5b4f = {
        protocolId: 1001,
        data: _0x21231b
      };
      {
        let {
            result: _0x1d442b
          } = await this.earnDailyPost(_0x3a5b4f),
          _0x49ce85 = $.get(_0x1d442b, "code", -1);
        if (_0x49ce85 == 200) {
          for (let _0x114c9f of _0x1d442b?.["data"]?.["signInPopModel"]?.["rewardModelList"] || []) {
            _0x114c9f.current && _0x114c9f.state == 1 && (await this.earnDaily_sign());
          }
          for (let _0x5a3999 of _0x1d442b?.["data"]?.["taskInfoList"] || []) {
            switch (_0x5a3999.id) {
              case 780:
              case 15099:
              case 15278:
                break;
              default:
                _0x5a3999.dailyRewardTimes < _0x5a3999.dailyFinishTimes && (await this.earnDaily_get_reward(_0x5a3999));
                for (let _0xebefe5 = _0x5a3999.dailyFinishTimes; _0xebefe5 < _0x5a3999.mgcTaskBaseInfo.curPeriodMaxFinishTimes; _0xebefe5++) {
                  await this.earnDaily_do_task(_0x5a3999);
                }
                break;
            }
          }
        } else {
          let _0x7b7e58 = _0x1d442b?.["msg"] || _0x1d442b?.["desc"] || "";
          this.log("查询任务失败[" + _0x49ce85 + "]: " + _0x7b7e58);
        }
      }
      {
        let {
            result: _0x7e5e64
          } = await this.earnDailyPost(_0x3a5b4f),
          _0x3f6b7f = $.get(_0x7e5e64, "code", -1);
        if (_0x3f6b7f == 200) {
          let _0x5e79ed = _0x7e5e64?.["data"]?.["playerBaseModel"]?.["redPacketInfo"]?.["leftRedPacketAmount"] || 0;
          this.log("可以开" + _0x5e79ed + "次红包");
          while (_0x5e79ed-- > 0) {
            await this.earnDaily_redbag();
          }
        } else {
          let _0x4de64e = _0x7e5e64?.["msg"] || _0x7e5e64?.["desc"] || "";
          this.log("查询红包次数失败[" + _0x3f6b7f + "]: " + _0x4de64e);
        }
      }
      {
        let {
            result: _0x5ac856
          } = await this.earnDailyPost(_0x3a5b4f),
          _0x1864ed = $.get(_0x5ac856, "code", -1);
        if (_0x1864ed == 200) {
          this.cash = _0x5ac856?.["data"]?.["playerBaseModel"]?.["activityCycleInfo"]?.["cashToken"] || 0;
          this.coin = _0x5ac856?.["data"]?.["playerBaseModel"]?.["activityCycleInfo"]?.["coinToken"] || 0;
          this.coin > 0 && (await this.earnDaily_coinInfo());
          const _0x4fc5d2 = {
            notify: true
          };
          this.log("每日赚钱余额: " + (this.cash / 100).toFixed(2) + "元, " + this.coin + "金币", _0x4fc5d2);
        } else {
          let _0x4f4f4f = _0x5ac856?.["msg"] || _0x5ac856?.["desc"] || "";
          this.log("查询每日赚钱余额失败[" + _0x1864ed + "]: " + _0x4f4f4f);
        }
      }
      await this.earnDaily_get_withdraw_list();
    } catch (_0x3deda0) {
      console.log(_0x3deda0);
    }
  }
  async earnDaily_coinInfo(_0xe26df9 = {}) {
    try {
      const _0x73589 = {
        protocolId: 1015
      };
      let {
          result: _0x436ee4
        } = await this.earnDailyPost(_0x73589),
        _0x2d87f0 = $.get(_0x436ee4, "code", -1);
      if (_0x2d87f0 == 200) {
        let _0x20964d = _0x436ee4?.["data"]?.["exchangeInfoList"]?.["filter"](_0x3b0028 => _0x3b0028.name == "翻红包现金");
        if (!_0x20964d.length) {
          return;
        }
        let _0x5a4d15 = _0x20964d[0];
        this.coin >= _0x5a4d15.price && (await this.earnDaily_coinExchange(_0x5a4d15));
      } else {
        let _0x153f72 = _0x436ee4?.["msg"] || _0x436ee4?.["desc"] || "";
        this.log("查询金币兑换失败[" + _0x2d87f0 + "]: " + _0x153f72);
      }
    } catch (_0x1236f5) {
      console.log(_0x1236f5);
    }
  }
  async earnDaily_coinExchange(_0x428012, _0x368b8b = {}) {
    try {
      const _0x1cf842 = {
        skuId: _0x428012.skuId
      };
      const _0x45c477 = {
        protocolId: 1016,
        data: _0x1cf842
      };
      let {
          result: _0x527705
        } = await this.earnDailyPost(_0x45c477),
        _0x19e5d4 = $.get(_0x527705, "code", -1);
      if (_0x19e5d4 == 200) {
        this.cash = _0x527705?.["data"]?.["activityCycleInfo"]?.["cashToken"] || 0;
        this.coin = _0x527705?.["data"]?.["activityCycleInfo"]?.["coinToken"] || 0;
        this.log("使用" + _0x428012.price + "金币兑换余额成功: 剩余" + this.coin + "金币");
        let _0x34c60c = _0x527705?.["data"]?.["exchangeInfoList"]?.["filter"](_0x36a8ec => _0x36a8ec.name == "翻红包现金");
        if (!_0x34c60c.length) {
          return;
        }
        let _0x3b9997 = _0x34c60c[0];
        this.coin >= _0x3b9997.price && (await this.earnDaily_coinExchange(_0x3b9997));
      } else {
        let _0xf174fa = _0x527705?.["msg"] || _0x527705?.["desc"] || "";
        this.log("使用" + _0x428012.price + "金币兑换余额失败[" + _0x19e5d4 + "]: " + _0xf174fa);
      }
    } catch (_0x2aaa1c) {
      console.log(_0x2aaa1c);
    }
  }
  async earnDaily_sign(_0x53f31b = {}) {
    try {
      const _0x15a40e = {
        protocolId: 1007
      };
      let {
          result: _0x47dca9
        } = await this.earnDailyPost(_0x15a40e),
        _0x564510 = $.get(_0x47dca9, "code", -1);
      if (_0x564510 == 200) {
        this.log("签到成功: " + (_0x47dca9?.["data"]?.["remitNotificationModelList"]?.["map"](_0x4a3590 => _0x4a3590.content)?.["join"](",") || ""));
      } else {
        let _0x57e0a6 = _0x47dca9?.["msg"] || _0x47dca9?.["desc"] || "";
        this.log("签到失败[" + _0x564510 + "]: " + _0x57e0a6);
      }
    } catch (_0x59444c) {
      console.log(_0x59444c);
    }
  }
  async earnDaily_do_task(_0x50c6db, _0x593bb4 = {}) {
    try {
      const _0x2609c1 = {
        taskId: _0x50c6db.id
      };
      const _0x413a48 = {
        protocolId: 1004,
        data: _0x2609c1
      };
      let {
          result: _0x3d5575
        } = await this.earnDailyPost(_0x413a48),
        _0x18c47f = $.get(_0x3d5575, "code", -1);
      if (_0x18c47f == 200) {
        this.log("完成任务[" + (_0x50c6db?.["mgcTaskBaseInfo"]?.["viewTitle"] || _0x50c6db?.["id"]) + "]成功");
        await this.earnDaily_get_reward(_0x50c6db);
      } else {
        let _0x8f00df = _0x3d5575?.["msg"] || _0x3d5575?.["desc"] || "";
        this.log("完成任务[" + (_0x50c6db?.["mgcTaskBaseInfo"]?.["viewTitle"] || _0x50c6db?.["id"]) + "]失败[" + _0x18c47f + "]: " + _0x8f00df);
      }
    } catch (_0x296176) {
      console.log(_0x296176);
    }
  }
  async earnDaily_get_reward(_0x171fed, _0x24c45c = {}) {
    try {
      const _0x53334a = {
        taskId: _0x171fed.id
      };
      const _0x13ef03 = {
        protocolId: 1005,
        data: _0x53334a
      };
      let {
          result: _0x225b3a
        } = await this.earnDailyPost(_0x13ef03),
        _0x5d376f = $.get(_0x225b3a, "code", -1);
      if (_0x5d376f == 200) {
        this.log("领取任务[" + _0x171fed.mgcTaskBaseInfo.viewTitle + "]奖励成功");
      } else {
        let _0xe26101 = _0x225b3a?.["msg"] || _0x225b3a?.["desc"] || "";
        this.log("领取任务[" + _0x171fed.mgcTaskBaseInfo.viewTitle + "]奖励失败[" + _0x5d376f + "]: " + _0xe26101);
      }
    } catch (_0x292bef) {
      console.log(_0x292bef);
    }
  }
  async earnDaily_redbag(_0x3e1ef9 = {}) {
    try {
      const _0x1fe8ac = {
        protocolId: 1008
      };
      let {
          result: _0x437b86
        } = await this.earnDailyPost(_0x1fe8ac),
        _0x37fe12 = $.get(_0x437b86, "code", -1);
      if (_0x37fe12 == 200) {
        let _0x25677b = _0x437b86?.["data"]?.["rewardModelList"]?.["filter"](_0x186015 => _0x186015.rewarded) || [];
        if (_0x25677b.length) {
          let _0x3b6abe = _0x25677b[0];
          if (_0x3b6abe.resourceType == 1) {
            this.log("开红包获得: " + (_0x3b6abe.amount / 100).toFixed(2) + "元");
          } else {
            _0x3b6abe.resourceType == 2 ? this.log("开红包获得: " + _0x3b6abe.amount + "金币") : this.log("开红包获得: " + JSON.stringify(_0x3b6abe));
          }
        }
      } else {
        let _0x24c2c5 = _0x437b86?.["msg"] || _0x437b86?.["desc"] || "";
        this.log("开红包失败[" + _0x37fe12 + "]: " + _0x24c2c5);
      }
    } catch (_0xb56aa4) {
      console.log(_0xb56aa4);
    }
  }
  async earnDaily_draw(_0x531294 = {}) {
    try {
      const _0x49ce54 = {
        protocolId: 1010
      };
      let {
          result: _0x353bbe
        } = await this.earnDailyPost(_0x49ce54),
        _0x375c8b = $.get(_0x353bbe, "code", -1);
      if (_0x375c8b == 200) {
        let _0x33ddd9 = _0x353bbe?.["data"]?.["currentReward"];
        if (_0x33ddd9?.["rewardedCouponModel"]) {
          this.log("转盘抽奖: " + _0x33ddd9.rewardedCouponModel?.["useRule"] + _0x33ddd9.rewardedCouponModel?.["name"]);
          return;
        }
        switch (_0x33ddd9?.["resourceType"]) {
          case 1:
            let _0x5d9cb5 = ((_0x33ddd9?.["amount"] || 0) / 100).toFixed(2);
            this.log("转盘抽奖: " + _0x5d9cb5 + "元余额");
            break;
          case 2:
            this.log("转盘抽奖: " + _0x33ddd9?.["amount"] + "金币");
            break;
          case 3:
            this.log("转盘抽奖: 随机提现机会");
            break;
          default:
            this.log("转盘抽奖: " + JSON.stringify(_0x353bbe));
            break;
        }
      } else {
        let _0x197a13 = _0x353bbe?.["msg"] || _0x353bbe?.["desc"] || "";
        this.log("转盘抽奖失败[" + _0x375c8b + "]: " + _0x197a13);
      }
    } catch (_0x2916c2) {
      console.log(_0x2916c2);
    }
  }
  async earnDaily_get_withdraw_list(_0x2f2491 = {}) {
    try {
      const _0x11afa6 = {
        protocolId: 1012
      };
      let {
          result: _0x432b9a
        } = await this.earnDailyPost(_0x11afa6),
        _0x1ed18c = $.get(_0x432b9a, "code", -1);
      if (_0x1ed18c == 200) {
        let _0x3e6c68 = _0x432b9a?.["data"]?.["activityCycleInfo"]?.["cashToken"] || 0,
          _0x43d73a = (_0x3e6c68 / 100).toFixed(2);
        this.log("红包余额: " + _0x43d73a + "元");
        let _0x47160c = (_0x432b9a?.["data"]?.["cashList"] || []).sort(function (_0x139043, _0x180708) {
          return _0x180708.amount - _0x139043.amount;
        });
        if (_0x16913c == "false" || !_0x16913c) {
          _0x47160c = _0x47160c.filter(_0x59a915 => _0x59a915.amount == 5000);
        }
        for (let _0x4d694a of _0x47160c) {
          if (_0x4d694a.amount > _0x3e6c68) {
            continue;
          }
          if (await this.earnDaily_withdraw(_0x4d694a)) {
            break;
          }
        }
      } else {
        let _0x1fddf1 = _0x432b9a?.["msg"] || _0x432b9a?.["desc"] || "";
        this.log("查询提现列表失败[" + _0x1ed18c + "]: " + _0x1fddf1);
      }
    } catch (_0x20e318) {
      console.log(_0x20e318);
    }
  }
  async earnDaily_withdraw(_0x76f94a, _0x21cf4d = {}) {
    let _0x1bd093 = false;
    try {
      let _0x211b8c = (_0x76f94a.amount / 100).toFixed(2);
      const _0x4791bf = {
        id: _0x76f94a.id,
        amount: _0x76f94a.amount
      };
      const _0x24f0f8 = {
        protocolId: 1013,
        data: _0x4791bf
      };
      let {
          result: _0xa95d61
        } = await this.earnDailyPost(_0x24f0f8),
        _0x4c72f4 = $.get(_0xa95d61, "code", -1);
      if (_0x4c72f4 == 200) {
        _0x1bd093 = true;
        const _0x4dea8f = {
          notify: true
        };
        this.log("提现[" + _0x211b8c + "元]到钱包成功", _0x4dea8f);
      } else {
        let _0x4cd301 = _0xa95d61?.["msg"] || _0xa95d61?.["desc"] || "";
        _0x4c72f4 == 1017 ? (_0x1bd093 = true, this.log("提现[" + _0x211b8c + "元]失败[" + _0x4c72f4 + "]: 可能今天已提现过")) : this.log("提现[" + _0x211b8c + "元]失败[" + _0x4c72f4 + "]: " + _0x4cd301);
      }
    } catch (_0x29b858) {
      console.log(_0x29b858);
    } finally {
      return _0x1bd093;
    }
  }
  async c_task(_0x3dd1c8, _0x139247 = {}) {
    try {
      let _0x48bc52 = Math.random() * 100 + 2400 | 0;
      const _0x5ea322 = {
        Referer: "https://click.meituan.com/t?t=1&c=2&p=" + _0x3dd1c8
      };
      let _0x598c36 = {
        fn: "get_task",
        method: "post",
        url: "https://click.meituan.com/cps/clickReferralLink",
        headers: _0x5ea322,
        json: {
          p: _0x3dd1c8,
          t: "1",
          c: "2",
          sessionId: "187a" + $.randomPattern("xxxxxxx-xxx-xxx-xxx"),
          referrer: "",
          fingerprintFromH5: "eJxVV" + $.randomString(_0x48bc52, _0x2b49ff)
        }
      };
      await this.request(_0x598c36);
    } catch (_0x99146e) {
      console.log(_0x99146e);
    }
  }
  async walletMainpage(_0x48bbe9 = {}) {
    try {
      const _0x33dddc = {
        fn: "walletMainpage",
        method: "post",
        url: "https://npay.meituan.com/conch/walletV5/mainpage",
        form: {}
      };
      _0x33dddc.form.token = this.token;
      _0x33dddc.form.nb_app = "group";
      _0x33dddc.form.nb_appversion = "12.9.203";
      _0x33dddc.form.nb_channel = "common";
      _0x33dddc.form.nb_ci = "30";
      _0x33dddc.form.nb_location = "0_0";
      _0x33dddc.form.nb_osversion = "16.1.2";
      _0x33dddc.form.nb_platform = "iOS";
      _0x33dddc.form.utmSource = "AppStore";
      _0x33dddc.form.from = "mine_qianbaorukou_qianbao";
      _0x33dddc.form.popWindowOldChain = "false";
      let {
          result: _0xe4136f
        } = await this.request(_0x33dddc),
        _0x2e2445 = $.get(_0xe4136f, "status", -1);
      if (_0x2e2445 == "success") {
        let _0x108f39 = [];
        for (let _0x1bf176 of _0xe4136f?.["data"]?.["AssetArea"]?.["otherAssetAreaDTOList"] || []) {
          switch (_0x1bf176.title) {
            case "余额":
              _0x108f39.push("钱包余额: " + (_0x1bf176?.["subTitle"] || 0) + "元");
              break;
            case "立减金":
              _0x108f39.push("立减金: " + (_0x1bf176?.["subTitle"] || 0) + "元");
              break;
          }
        }
        if (_0x108f39.length) {
          const _0x4bb933 = {
            notify: true
          };
          this.log(_0x108f39.join(", "), _0x4bb933);
        }
      } else {
        let _0x44e3bd = _0xe4136f?.["error"]?.["message"] || "";
        this.log("查询钱包失败[" + _0x2e2445 + "]: " + _0x44e3bd);
      }
    } catch (_0x122d85) {
      console.log(_0x122d85);
    }
  }
  async refTask() {
    if (!_0x46b51d?.["length"]) {
      return;
    }
    let _0xe8ed11 = _0x46b51d.sort(function () {
        return Math.random() - 0.5;
      }),
      _0x446a45 = _0xe8ed11.length,
      _0x2d4a3d = Math.min(3, _0x446a45);
    _0xe8ed11 = _0xe8ed11.slice(0, _0x2d4a3d);
    for (let _0x414fe6 of _0xe8ed11) {
      await this.c_task(_0x414fe6);
    }
  }
  async batchfetchcomponentcouponV2(_0x3bc861) {
    try {
      let {
        refIds: _0x471aeb,
        instanceId: _0x1b326e,
        gdPageId: _0x13c058,
        pageId: _0x439ae9
      } = _0x3bc861;
      const _0x1af991 = {
        cType: "wm_wxapp",
        fpPlatform: 13,
        wxOpenId: "",
        appVersion: "12.9.206",
        mtFingerprint: this.fp
      };
      let _0x49224e = {
          couponReferIds: _0x471aeb.join(","),
          geoType: 2,
          actualLng: _0x23042b,
          actualLat: _0x3b009f,
          isInDpEnv: 0,
          gdPageId: _0x13c058,
          pageId: _0x439ae9,
          version: 1,
          instanceId: _0x1b326e,
          componentId: _0x1b326e,
          utmSource: "",
          utmCampaign: "",
          needFetchedByUUID: 1
        },
        _0x7ce831 = new URL("https://promotion.waimai.meituan.com/lottery/couponcomponent/batchfetchcomponentcoupon/v2");
      for (let _0x1b3095 in _0x49224e) {
        _0x7ce831.searchParams.append(_0x1b3095, _0x49224e[_0x1b3095]);
      }
      let {
        headers: _0x396721
      } = await this.get_mtgsig(_0x7ce831.toString(), _0x1af991);
      const _0x30ee27 = {
        mtgsig: _0x396721.mtgsig
      };
      const _0x46923a = {
        fn: "batchfetchcomponentcouponV2",
        method: "post",
        url: _0x7ce831,
        json: _0x1af991,
        headers: _0x30ee27
      };
      let {
        result: _0xf50e4c
      } = await this.request(_0x46923a);
      if (_0xf50e4c?.["code"] == 0) {
        let _0x4341db = _0xf50e4c?.["data"]?.["filter"](_0x4aafe2 => _0x4aafe2.code == 0)?.["map"](_0x403e2f => "[" + _0x403e2f.data.couponName + "]" + (_0x403e2f.data.priceLimit || "无门槛") + "减" + _0x403e2f.data.couponValue);
        if (_0x4341db.length) {
          this.notify_coupon(_0x4341db);
        }
      } else {
        let _0x2cbb8e = _0xf50e4c?.["msg"] || _0xf50e4c?.["desc"] || "";
        this.log("集合领券失败: " + _0x2cbb8e);
      }
    } catch (_0x29acdf) {
      console.log(_0x29acdf);
    }
  }
  async popupcomponent_popup(_0x36bd60, _0x5d15b3 = {}) {
    try {
      const _0x4fabfd = {
        recordId: _0x36bd60,
        geoType: 2
      };
      const _0x3c345d = {
        fn: "popupcomponent_popup",
        method: "post",
        url: "https://promotion.waimai.meituan.com/popupcomponent/popup",
        form: _0x4fabfd
      };
      let {
          result: _0x4c3941
        } = await this.request(_0x3c345d),
        _0x1e5766 = $.get(_0x4c3941, "code", -1);
      if (_0x1e5766 == 0) {
        let _0xa0aac5 = _0x4c3941?.["data"]?.["couponList"]?.["map"](_0x53d28e => _0x53d28e.couponValue ? "[" + (_0x53d28e?.["couponTitle"] || "") + "]" + (_0x53d28e?.["priceLimit"] || "无门槛") + "减" + (_0x53d28e?.["couponValue"] || "") : "")?.["filter"](_0x568023 => _0x568023);
        const _0x193f8e = {
          act: _0x36bd60
        };
        this.notify_coupon(_0xa0aac5, "弹窗领券", _0x193f8e);
      } else {
        let _0x22e71e = _0x4c3941?.["msg"] || _0x4c3941?.["message"] || "";
        const _0x52ca06 = {
          act: _0x36bd60
        };
        this.log("弹窗领券失败[" + _0x1e5766 + "]: " + _0x22e71e, _0x52ca06);
      }
    } catch (_0x1ad5ce) {
      console.log(_0x1ad5ce);
    }
  }
  async xtb_login(_0x251e3 = {}) {
    let _0x3ebc23 = false;
    try {
      let _0x25f0f9 = {
          fn: "xtb_login",
          method: "post",
          url: "https://game.meituan.com/mgc/gamecenter/front/api/v1/login",
          json: {
            mtToken: this.token,
            deviceUUID: this.uuid || AppUuid,
            mtUserId: this.userId,
            idempotentString: $.randomString(16, _0x49f694 + _0x57a4fd)
          }
        },
        {
          result: _0x34549a
        } = await this.request($.copy(_0x25f0f9));
      if (_0x34549a?.["data"]?.["loginInfo"]?.["accessToken"]) {
        const _0x3d4b6c = {
          actoken: _0x34549a?.["data"]?.["loginInfo"]?.["accessToken"]
        };
        const _0x4f1aee = {
          headers: _0x3d4b6c
        };
        this.got = this.got.extend(_0x4f1aee);
        _0x3ebc23 = true;
      } else {
        this.log("小团币游戏中心登录失败");
      }
    } catch (_0xa49eda) {
      console.log(_0xa49eda);
    } finally {
      return _0x3ebc23;
    }
  }
  async xtb_queryXtbCount(_0x403030 = {}) {
    const _0x269c5e = {
      succ: false,
      previous: 0,
      coin: 0
    };
    let _0x12f5e3 = _0x269c5e;
    try {
      const _0x23cfee = {
        fn: "xtb_queryMgcTaskInfo",
        method: "get",
        url: "https://game.meituan.com/mgc/gamecenter/skuExchange/resource/counts",
        searchParams: {}
      };
      _0x23cfee.searchParams.sceneId = 3;
      _0x23cfee.searchParams.gameId = 10102;
      _0x23cfee.searchParams.yodaReady = "h5";
      _0x23cfee.searchParams.csecplatform = 4;
      _0x23cfee.searchParams.csecversion = "2.1.0";
      let {
          statusCode: _0x19f74c,
          result: _0x436499
        } = await this.request($.copy(_0x23cfee)),
        _0x5eefff = $.get(_0x436499, "code", _0x19f74c);
      if (_0x5eefff == 0) {
        let _0x5cca49 = (_0x436499?.["data"] || []).filter(_0x3649fd => _0x3649fd.resourceName == "小团币")?.[0];
        if (_0x5cca49) {
          this.first_get_xtb_count && (this.init_xtb_coin = _0x5cca49.count);
          const _0x23d445 = {
            succ: true,
            previous: this.xtb_coin,
            coin: _0x5cca49.count
          };
          _0x12f5e3 = _0x23d445;
          this.xtb_coin = _0x5cca49.count;
        }
      } else {
        let _0x477763 = _0x436499?.["msg"] || _0x436499?.["message"] || "";
        this.log("查询小团币失败[" + _0x5eefff + "]: " + _0x477763);
      }
    } catch (_0x25aab5) {
      console.log(_0x25aab5);
    } finally {
      return _0x12f5e3;
    }
  }
  async xtb_queryMgcTaskInfo(_0x58da9c = {}) {
    try {
      const _0x3ccc05 = {
        yodaReady: "h5",
        csecplatform: 4,
        csecversion: "2.3.1"
      };
      let _0x2de5b6 = "https://game.meituan.com/mgc/gamecenter/front/api/v1/mgcUser/task/queryMgcTaskInfo",
        _0x208c13 = new URL(_0x2de5b6);
      for (let _0x501911 in _0x3ccc05) {
        _0x208c13.searchParams.append(_0x501911, _0x3ccc05[_0x501911]);
      }
      _0x208c13 = _0x208c13.toString();
      let _0x39d94d = {
          externalStr: "",
          riskParams: await this.get_riskParams()
        },
        {
          headers: _0xb94b0e
        } = await this.get_mtgsig(_0x208c13, _0x39d94d),
        _0x4e9536 = _0xb94b0e?.["mtgsig"];
      const _0x4d58f4 = {
        ..._0x3ccc05,
        mtgsig: _0x4e9536
      };
      const _0x45559f = {
        fn: "xtb_queryMgcTaskInfo",
        method: "post",
        url: _0x208c13,
        searchParams: _0x4d58f4,
        json: _0x39d94d
      };
      let {
          statusCode: _0x5df26e,
          result: _0x55268c
        } = await this.request($.copy(_0x45559f)),
        _0x31768e = $.get(_0x55268c, "code", _0x5df26e);
      if (_0x31768e == 0) {
        let _0x263568 = _0x55268c?.["data"]?.["taskList"] || [];
        !_0x263568?.["length"] && this.log("此账号没有获取到任务, 可能黑号");
        for (let _0x3957d2 of _0x263568) {
          if (_0x44fc68.includes(_0x3957d2.id)) {
            continue;
          }
          let _0x528b07 = _0x3957d2?.["mgcTaskBaseInfo"]?.["maxLimit"];
          if (_0x528b07 > 100) {
            continue;
          }
          let _0x474b5c = false;
          switch (_0x3957d2.status) {
            case 2:
              {
                _0x474b5c = await this.xtb_finishAndReceiveReward(_0x3957d2);
                break;
              }
            case 3:
              {
                _0x474b5c = await this.xtb_receiveMgcTaskReward(_0x3957d2);
                break;
              }
          }
          if (_0x474b5c) {
            let _0x4c40f8 = Math.floor(Math.random() * 3000) + 2000;
            await $.wait(_0x4c40f8);
          }
        }
      } else {
        let _0x2b912a = _0x55268c?.["msg"] || _0x55268c?.["message"] || "";
        this.log("查询小团币任务失败[" + _0x31768e + "]: " + _0x2b912a);
      }
    } catch (_0x4abda9) {
      console.log(_0x4abda9);
    }
  }
  async xtb_finishV2(_0x10bcb5, _0x3e7a24 = {}) {
    try {
      let _0x13d989 = JSON.parse(_0x10bcb5?.["mgcTaskBaseInfo"]?.["viewExtraJson"]),
        _0x62406f = {
          yodaReady: "h5",
          csecplatform: 4,
          csecversion: "2.3.1",
          externalStr: "",
          riskParams: "",
          mgcId: "347102775203384",
          gameid: _0x13d989?.["gameid"],
          taskTag: _0x13d989?.["taskTag"],
          taskId: base64_encode("mgc-gamecenter" + _0x10bcb5.id)
        },
        _0x576266 = "https://game.meituan.com/mgc/gamecenter/common/mtUser/mgcUser/task/finishV2",
        _0x296375 = new URL(_0x576266);
      for (let _0x3dfaed in _0x62406f) {
        _0x296375.searchParams.append(_0x3dfaed, _0x62406f[_0x3dfaed]);
      }
      _0x296375 = _0x296375.toString();
      let _0x1bf880 = {},
        {
          headers: _0x5ef299
        } = await this.get_mtgsig(_0x296375, _0x1bf880),
        _0x31590b = _0x5ef299?.["mtgsig"];
      const _0x2e29c4 = {
        ..._0x62406f,
        mtgsig: _0x31590b
      };
      const _0x5305c4 = {
        fn: "xtb_finishV2",
        method: "get",
        url: _0x296375,
        searchParams: _0x2e29c4
      };
      let {
          statusCode: _0x4c6703,
          result: _0x4db091
        } = await this.request($.copy(_0x5305c4)),
        _0x4d310d = $.get(_0x4db091, "code", _0x4c6703);
      if (_0x4d310d == 0) {
        this.log("完成任务[" + _0x10bcb5.id + "]成功");
      } else {
        let _0x320424 = _0x4db091?.["msg"] || _0x4db091?.["message"] || "";
        this.log("完成任务[" + _0x10bcb5.id + "]失败[" + _0x4d310d + "]: " + _0x320424);
      }
    } catch (_0x4737aa) {
      console.log(_0x4737aa);
    }
  }
  async xtb_receiveMgcTaskReward(_0xec3f3b, _0x2ca23b = {}) {
    let _0x3084af = false;
    try {
      const _0x35492c = {
        yodaReady: "h5",
        csecplatform: 4,
        csecversion: "2.3.1"
      };
      let _0x481cd3 = "https://game.meituan.com/mgc/gamecenter/front/api/v1/mgcUser/task/receiveMgcTaskReward",
        _0x36baf8 = new URL(_0x481cd3);
      for (let _0x137ec2 in _0x35492c) {
        _0x36baf8.searchParams.append(_0x137ec2, _0x35492c[_0x137ec2]);
      }
      _0x36baf8 = _0x36baf8.toString();
      let _0x2c6d66 = {
          taskId: _0xec3f3b.id,
          externalStr: "",
          riskParams: await this.get_riskParams()
        },
        {
          headers: _0x53f5f6
        } = await this.get_mtgsig(_0x36baf8, _0x2c6d66),
        _0x477f3c = _0x53f5f6?.["mtgsig"];
      const _0x187059 = {
        ..._0x35492c,
        mtgsig: _0x477f3c
      };
      const _0x55f221 = {
        fn: "xtb_receiveMgcTaskReward",
        method: "post",
        url: _0x36baf8,
        json: _0x2c6d66,
        searchParams: _0x187059
      };
      let {
          statusCode: _0x46a9bf,
          result: _0x3ef218
        } = await this.request($.copy(_0x55f221)),
        _0x364dbd = $.get(_0x3ef218, "code", _0x46a9bf);
      if (_0x364dbd == 0) {
        _0x3084af = true;
        let {
          succ: _0x183560,
          previous: _0x3d5523,
          coin: _0x1d81b2
        } = await this.xtb_queryXtbCount();
        if (_0x183560) {
          let _0x55e35f = _0x1d81b2 - _0x3d5523;
          this.log("完成任务[" + _0xec3f3b.id + "]: " + _0x55e35f + "小团币");
        } else {
          this.log("完成任务[" + _0xec3f3b.id + "]成功");
        }
      } else {
        let _0x3e161f = _0x3ef218?.["msg"] || _0x3ef218?.["message"] || "";
        !_0x3e161f?.["includes"]("状态异常") && this.log("完成任务[" + _0xec3f3b.id + "]失败[" + _0x364dbd + "]: " + _0x3e161f);
      }
    } catch (_0x140226) {
      console.log(_0x140226);
    } finally {
      return _0x3084af;
    }
  }
  async xtb_finishAndReceiveReward(_0x4a3630, _0x334e13 = {}) {
    let _0x505090 = false;
    try {
      const _0x2a9cbb = {
        yodaReady: "h5",
        csecplatform: 4,
        csecversion: "2.3.1"
      };
      let _0x3d9a8f = "https://game.meituan.com/mgc/gamecenter/front/api/v1/mgcUser/task/finishAndReceiveReward",
        _0x52e767 = new URL(_0x3d9a8f);
      for (let _0x5c2cc6 in _0x2a9cbb) {
        _0x52e767.searchParams.append(_0x5c2cc6, _0x2a9cbb[_0x5c2cc6]);
      }
      _0x52e767 = _0x52e767.toString();
      let _0xe4a94c = {
          taskId: base64_encode("mgc-gamecenter" + _0x4a3630.id),
          externalStr: "",
          riskParams: await this.get_riskParams()
        },
        {
          headers: _0x30d9cf
        } = await this.get_mtgsig(_0x52e767, _0xe4a94c),
        _0x2672bd = _0x30d9cf?.["mtgsig"];
      const _0x5512c7 = {
        ..._0x2a9cbb,
        mtgsig: _0x2672bd
      };
      const _0x59683a = {
        fn: "xtb_finishAndReceiveReward",
        method: "post",
        url: _0x52e767,
        json: _0xe4a94c,
        searchParams: _0x5512c7
      };
      let {
          statusCode: _0xdcc96e,
          result: _0x361d85
        } = await this.request($.copy(_0x59683a)),
        _0x3b0d53 = $.get(_0x361d85, "code", _0xdcc96e);
      if (_0x3b0d53 == 0) {
        _0x505090 = true;
        let {
          succ: _0x11fb45,
          previous: _0x1541aa,
          coin: _0x2ee3dd
        } = await this.xtb_queryXtbCount();
        if (_0x11fb45) {
          let _0x4fe422 = _0x2ee3dd - _0x1541aa;
          this.log("完成任务[" + _0x4a3630.id + "]: " + _0x4fe422 + "小团币");
        } else {
          this.log("完成任务[" + _0x4a3630.id + "]成功");
        }
      } else {
        let _0x14ac46 = _0x361d85?.["msg"] || _0x361d85?.["message"] || "";
        !_0x14ac46?.["includes"]("状态异常") && !_0x14ac46?.["includes"]("任务已经完成过") && this.log("完成任务[" + _0x4a3630.id + "]失败[" + _0x3b0d53 + "]: " + _0x14ac46);
      }
    } catch (_0x4e05a4) {
      console.log(_0x4e05a4);
    } finally {
      return _0x505090;
    }
  }
  async signlottery_info(_0x58632c, _0x1ffd73 = {}) {
    try {
      const _0x5d35b5 = {
        activityViewId: _0x58632c
      };
      const _0x340cc5 = {
        fn: "signlottery_info",
        method: "get",
        url: "https://promotion.waimai.meituan.com/playcenter/signlottery/info",
        searchParams: _0x5d35b5
      };
      let {
          result: _0xdedbc3
        } = await this.request(_0x340cc5),
        _0x5a2f1d = $.get(_0xdedbc3, "code", -1),
        _0x193497 = $.get(_0xdedbc3, "subcode", -1);
      if (_0x5a2f1d == 0 && _0x193497 == 0) {
        for (let _0x5c31c5 of _0xdedbc3?.["data"]?.["signRecord"] || []) {
          switch (_0x5c31c5.statusCode) {
            case 1:
              {
                const _0x332df3 = {
                  act: _0x58632c
                };
                this.log("社群未签到", _0x332df3);
                await this.signlottery_signIn(_0x58632c);
                break;
              }
            case 2:
              {
                const _0x5de2c7 = {
                  act: _0x58632c
                };
                this.log("社群已签到", _0x5de2c7);
                break;
              }
          }
        }
      } else {
        let _0x5052c3 = _0xdedbc3?.["msg"] || _0xdedbc3?.["message"] || "";
        const _0x362c62 = {
          act: _0x58632c
        };
        this.log("查询社群签到失败[" + _0x5a2f1d + "]: " + _0x5052c3, _0x362c62);
      }
    } catch (_0xb71528) {
      console.log(_0xb71528);
    }
  }
  async signlottery_signIn(_0x557ee7, _0x47e87f = {}) {
    try {
      const _0x55dc0c = {
        activityViewId: _0x557ee7,
        actualLat: _0x3b009f,
        actualLng: _0x23042b,
        mtFingerprint: ""
      };
      const _0x5274c4 = {
        fn: "signlottery_signIn",
        method: "post",
        url: "https://promotion.waimai.meituan.com/playcenter/signlottery/signIn",
        json: _0x55dc0c
      };
      let {
          result: _0xac276b
        } = await this.request(_0x5274c4),
        _0x52defb = $.get(_0xac276b, "code", -1),
        _0x5c36d4 = $.get(_0xac276b, "subcode", -1);
      if (_0x52defb == 0 && _0x5c36d4 == 0) {
        let {
          signCount: _0xadf2cd,
          signInPrizeInfoList: _0x21411f
        } = _0xac276b?.["data"];
        const _0x4a7a26 = {
          act: _0x557ee7
        };
        this.log("社群签到成功, 已签到" + _0xadf2cd + "天", _0x4a7a26);
        let _0x58330e = _0x21411f?.["map"](_0x461171 => "[" + _0x461171.rightsCouponInfoVO.couponTitle + "]" + (_0x461171.rightsCouponInfoVO.priceLimit || "无门槛") + "减" + _0x461171.rightsCouponInfoVO.couponValue);
        if (_0x58330e?.["length"]) {
          const _0x1ee38b = {
            act: _0x557ee7
          };
          this.notify_coupon(_0x58330e, "签到抽奖", _0x1ee38b);
        }
      } else {
        let _0x33a045 = _0xac276b?.["msg"] || _0xac276b?.["message"] || "";
        if (!_0x33a045?.["includes"]("预发失败") && !_0x33a045?.["includes"]("动作不满足执行条件") && !_0x33a045?.["includes"]("发奖失败") || _0x4e1816) {
          const _0x1e147d = {
            act: _0x557ee7
          };
          this.log("社群签到失败[" + _0x52defb + "]: " + _0x33a045, _0x1e147d);
        }
      }
    } catch (_0x3cd15d) {
      console.log(_0x3cd15d);
    }
  }
  async generalcoupon_info(_0x173f54, _0x6a94d0 = {}) {
    try {
      const _0x360e32 = {
        activityViewId: _0x173f54
      };
      const _0x302c46 = {
        fn: "generalcoupon_info",
        method: "get",
        url: "https://promotion.waimai.meituan.com/playcenter/generalcoupon/info",
        searchParams: _0x360e32
      };
      let {
          result: _0xd0b867
        } = await this.request(_0x302c46),
        _0x539bc4 = $.get(_0xd0b867, "code", -1),
        _0x158d73 = $.get(_0xd0b867, "subcode", -1);
      if (_0x539bc4 == 0 && _0x158d73 == 0) {
        let _0x509d76 = [],
          _0x58fca0 = false;
        for (let _0x111586 of _0xd0b867?.["data"]?.["config"]?.["tabs"] || []) {
          const _0x33cf83 = {
            planCode: _0x111586.rightsToken,
            rightCodes: []
          };
          for (let _0x2fee89 of (_0xd0b867?.["data"]?.["couponList"] || []).filter(_0x47465d => _0x47465d.planCode == _0x111586.rightsToken)) {
            _0x2fee89.status == 0 ? _0x33cf83.rightCodes.push(_0x2fee89.rightCode) : _0x58fca0 = true;
          }
          _0x33cf83.rightCodes.length && _0x509d76.push(_0x33cf83);
        }
        if (_0x509d76.length) {
          await this.generalcoupon_fetch(_0x173f54, _0x509d76);
        } else {
          if (_0x58fca0) {
            const _0x1447c5 = {
              act: _0x173f54
            };
            this.log("今天已领过券", _0x1447c5);
          } else {
            const _0x6b59f7 = {
              act: _0x173f54
            };
            this.log("没有可以领的券", _0x6b59f7);
          }
        }
      } else {
        let _0x51d9a9 = _0xd0b867?.["msg"] || _0xd0b867?.["message"] || "";
        const _0x587e22 = {
          act: _0x173f54
        };
        this.log("查询社群可领取的券失败[" + _0x539bc4 + "]: " + _0x51d9a9, _0x587e22);
      }
    } catch (_0x14d2e6) {
      console.log(_0x14d2e6);
    }
  }
  async generalcoupon_fetch(_0x4420cc, _0x4fb02a, _0x364e0c = {}) {
    try {
      const _0x24ba8a = {
        fn: "generalcoupon_fetch",
        method: "post",
        url: "https://promotion.waimai.meituan.com/playcenter/generalcoupon/fetch",
        json: {}
      };
      _0x24ba8a.json.ctype = "wm_wxapp";
      _0x24ba8a.json.fpPlatform = 13;
      _0x24ba8a.json.wxOpenId = this.openid;
      _0x24ba8a.json.appVersion = "";
      _0x24ba8a.json.activityViewId = _0x4420cc;
      _0x24ba8a.json.tabs = _0x4fb02a;
      _0x24ba8a.json.gdId = 0;
      _0x24ba8a.json.pageId = 0;
      _0x24ba8a.json.instanceId = "";
      _0x24ba8a.json.mtFingerprint = "";
      let {
          result: _0x1600dc
        } = await this.request(_0x24ba8a),
        _0x4bb21b = $.get(_0x1600dc, "code", -1),
        _0x521413 = $.get(_0x1600dc, "subcode", -1);
      if (_0x4bb21b == 0 && _0x521413 == 0) {
        let _0x9d938e = _0x1600dc?.["data"]?.["couponList"]?.["map"](_0x335ccc => "[" + _0x335ccc.couponName + "]" + (_0x335ccc.priceLimit || "无门槛") + "减" + _0x335ccc.couponValue);
        this.notify_coupon(_0x9d938e, "社群领券");
      } else {
        let _0x48288d = _0x1600dc?.["msg"] || _0x1600dc?.["message"] || "";
        if (!_0x48288d?.["includes"]("领券失败") || _0x4e1816) {
          const _0x238ed1 = {
            act: _0x4420cc
          };
          this.log("社群领券失败[" + _0x4bb21b + "]: " + _0x48288d, _0x238ed1);
        }
      }
    } catch (_0x40a5ab) {
      console.log(_0x40a5ab);
    }
  }
  async appMrzqTask() {
    $.log("---------------- APP-每日赚钱 ----------------");
    await this.earnDailyLogin();
    await this.earnDaily_task_list();
  }
  async ttsqTask() {
    $.log("---------------- 天天神券 ----------------");
    await this.inviteFetchcoupon();
    for (let _0x3bb8c2 of _0x5c173f) {
      await this.popupcomponent_popup(_0x3bb8c2);
    }
    for (let _0x5ea4ad of _0x453d9e) {
      await this.gundamGrabV4(_0x5ea4ad);
    }
    for (let _0x23c98f of _0x2d7859) {
      await this.batchfetchcomponentcouponV2(_0x23c98f);
    }
    for (let _0xf0c969 of _0x26d837) {
      await this.signupRecord(_0xf0c969);
      await this.ttsqEntry(_0xf0c969);
    }
    for (let _0x2b4e5c of _0x311b08) {
      await this.ttsqEntryLottery(_0x2b4e5c);
    }
  }
  async wxSqsqTask() {
    $.log("---------------- WX-社群神券 ----------------");
    for (let _0x4738ff of _0x16560e) {
      await this.turntableInfo(_0x4738ff);
    }
  }
  async wxSqlqTask() {
    $.log("---------------- WX-社群领券 ----------------");
    for (let _0x56b95a of _0x45963f) {
      await this.generalcoupon_info(_0x56b95a);
    }
  }
  async wxSqSignTask() {
    $.log("---------------- WX-社群签到 ----------------");
    for (let _0x179cb1 of _0x200afe) {
      await this.clockInStatus(_0x179cb1);
    }
  }
  async wxSqSignlotteryTask() {
    $.log("---------------- WX-社群签到抽奖 ----------------");
    for (let _0x3f20b1 of _0x5ebeb1) {
      await this.signlottery_info(_0x3f20b1);
    }
  }
  async appCyfTask() {
    $.log("---------------- APP-抽月符 ----------------");
    await this.cardSaveAccess();
    await this.cardSaveShare();
    await this.cardLotteryNum();
  }
  async appXtbTask() {
    if (!this.run_xtb) {
      this.log("没有设置UUID, 不运行小团币");
      return;
    }
    if (!(await this.xtb_login())) {
      return;
    }
    await this.xtb_queryXtbCount();
    await this.xtb_queryMgcTaskInfo();
  }
  async commonTask() {
    $.log("---------------- 集合任务 ----------------");
    for (let _0x5b46df of _0x57186e) {
      $.log("============== " + _0x5b46df.name + " ==============");
      if (_0x5b46df.taskIdKeys.length > _0x599182) {
        const _0x36ea8a = {
          cubePageId: _0x5b46df.cubePageId,
          taskIdKeys: []
        };
        for (let _0x3bf04e of _0x5b46df.taskIdKeys) {
          _0x36ea8a.taskIdKeys.push(_0x3bf04e);
          _0x36ea8a.taskIdKeys.length >= _0x599182 && (await this.getUserTasks(_0x36ea8a), _0x36ea8a.taskIdKeys = []);
        }
        if (_0x36ea8a.taskIdKeys.length > 0) {
          await this.getUserTasks(_0x36ea8a);
        }
      } else {
        await this.getUserTasks(_0x5b46df);
      }
    }
    await this.goldHomePage("9587270bb85c");
  }
  async notifyTask() {
    if (this.run_xtb) {
      let {
        succ: _0x22e531,
        coin: _0x10c805
      } = await this.xtb_queryXtbCount();
      if (_0x22e531) {
        const _0x44b4ad = {
          notify: true
        };
        this.log("小团币: " + _0x10c805, _0x44b4ad);
      }
    }
    await this.walletMainpage();
  }
  async userTask() {
    const _0xa8b1db = {
      notify: true
    };
    $.log("\n---------------- 账号[" + this.index + "] ----------------", _0xa8b1db);
    if (!(await this.getLoginedUserInfo())) {
      return;
    }
    await this.refTask();
    await this.ttsqTask();
    await this.wxSqSignTask();
    await this.wxSqSignlotteryTask();
    await this.wxSqsqTask();
    await this.wxSqlqTask();
    _0x128bdf != "false" && (await this.appMrzqTask());
    _0x539959 != "false" && (await this.appCyfTask());
  }
}
!(async () => {
  if (!(await _0x160878())) {
    return;
  }
  await _0x40de8e();
  $.read_env(UserClass, ckNames, envSplitor);
  $.log("\n-------------------------------------");
  let _0x3da026 = _0x128bdf == "false" ? "关闭" : "开启";
  $.log("APP每日赚钱任务开关设置为: " + _0x3da026);
  let _0x2867ac = _0x16913c == "false" ? "不随机提现" : "每日随机提现";
  $.log("APP每日赚钱设置为: " + _0x2867ac);
  let _0x26c84b = _0x539959 == "false" ? "关闭" : "开启";
  $.log("抽月符任务开关设置为: " + _0x26c84b);
  $.log("-------------------------------------");
  for (let _0x2f4f31 of $.userList) {
    await _0x2f4f31.userTask();
  }
  let _0x32a111 = $.userList.filter(_0x428966 => _0x428966.valid);
  if (_0x32a111.length) {
    const _0x4992d7 = {
      notify: true
    };
    $.log("\n---------------- 汇总推送 ----------------", _0x4992d7);
    for (let _0x4952f0 of _0x32a111) {
      await _0x4952f0.notifyTask();
    }
  }
})().catch(_0x229918 => $.log(_0x229918)).finally(() => $.exitNow());
async function _0x160878() {
  let _0x33f2db = false;
  try {
    const _0x1717a9 = {
      fn: "auth",
      method: "get",
      url: _0x3c5cd6
    };
    let {
      statusCode: _0x246e85,
      result: _0x2e87b9
    } = await _0x1f9788.request(_0x1717a9);
    if (_0x246e85 != 200) {
      return Promise.resolve();
    }
    if (_0x2e87b9?.["code"] == 0) {
      _0x2e87b9 = JSON.parse(_0x2e87b9.data.file.data);
      /*if (_0x2e87b9?.["commonNotify"] && _0x2e87b9.commonNotify.length > 0) {
        const _0xd8e94e = {
          notify: true
        };
        $.log(_0x2e87b9.commonNotify.join("\n") + "\n", _0xd8e94e);
      }*/
      _0x2e87b9?.["commonMsg"] && _0x2e87b9.commonMsg.length > 0 && $.log(_0x2e87b9.commonMsg.join("\n") + "\n");
      if (_0x2e87b9[_0x5f08d3]) {
        let _0x12d8ae = _0x2e87b9[_0x5f08d3];
        _0x12d8ae.status == 0 ? _0x442aac >= _0x12d8ae.version ? (_0x33f2db = true, /*$.log(_0x12d8ae.msg[_0x12d8ae.status]),*/ $.log(_0x12d8ae.updateMsg), $.log("现在运行的脚本版本是：" + _0x442aac.toFixed(2) + "，最新脚本版本：" + _0x12d8ae.latestVersion.toFixed(2))) : $.log(_0x12d8ae.versionMsg) : $.log(_0x12d8ae.msg[_0x12d8ae.status]);
      } else {
        $.log(_0x2e87b9.errorMsg);
      }
    }
  } catch (_0x381542) {
    $.log(_0x381542);
  } finally {
    return _0x33f2db;
  }
}
async function _0x40de8e() {
  let _0x193227 = false;
  try {
    const _0x44e001 = {
      fn: "auth",
      method: "get",
      url: _0x295cb0
    };
    let {
      statusCode: _0x5119c5,
      result: _0x31bc2a
    } = await _0x1f9788.request(_0x44e001);
    if (_0x5119c5 != 200) {
      return Promise.resolve();
    }
    if (_0x31bc2a?.["code"] == 0) {
      _0x31bc2a = JSON.parse(_0x31bc2a.data.file.data);
      //inviteCode = _0x31bc2a?.["inviteCode"] || inviteCode;
      for (let _0x376b63 of _0x31bc2a?.["mrzqTaskId_all"] || []) {
        !_0x48a517.includes(_0x376b63) && _0x48a517.push(_0x376b63);
      }
      for (let _0x2d4143 of _0x31bc2a?.["commonTaskConf"] || []) {
        _0x57186e.filter(_0x2ed21c => _0x2ed21c.name == _0x2d4143.name)?.["length"] == 0 && _0x57186e.push(_0x2d4143);
      }
      if (_0x31bc2a?.["gundomConfV4_full"]?.["length"]) {
        _0x453d9e = _0x31bc2a.gundomConfV4_full;
      }
      if (_0x31bc2a?.["batchConf"]?.["length"]) {
        _0x2d7859 = _0x31bc2a.batchConf;
      }
      if (_0x31bc2a?.["pid_list"]?.["length"]) {
        _0x46b51d = _0x31bc2a.pid_list;
      }
      for (let _0x3bb92c of _0x31bc2a?.["sqsqIdList"] || []) {
        !_0x16560e.includes(_0x3bb92c) && _0x16560e.push(_0x3bb92c);
      }
      for (let _0x23a90e of _0x31bc2a?.["sqSignIdList"] || []) {
        !_0x200afe.includes(_0x23a90e) && _0x200afe.push(_0x23a90e);
      }
      for (let _0x27355f of _0x31bc2a?.["ttsqSignIdList"] || []) {
        !_0x26d837.includes(_0x27355f) && _0x26d837.push(_0x27355f);
      }
    }
  } catch (_0x3a425a) {
    $.log(_0x3a425a);
  } finally {
    return _0x193227;
  }
}
