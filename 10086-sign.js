const cookieName = "10086-cookie";
const cookie = $prefs.valueForKey(cookieName);
if (typeof (cookie) == "undefined" || cookie === null) {
    $notify("中国移动", "签到失败", "获取不到cookie，请先手动签到一次");
    $done();
}

const url = "https://wx.10086.cn/qwhdhub/api/mark/mark31/domark";
const method = "POST";
const headers = {
    "Cookie": cookie
};
const body = {
    "date": today()
};

const request = {
    url: url,
    method: method,
    headers: headers,
    body: JSON.stringify(body)
};

$task.fetch(request).then(response => {
    const rspBody = JSON.parse(response.body);
    if (rspBody.success == true) {
        $notify("中国移动", "签到成功", "");
    } else {
        $notify("中国移动", "签到失败", rspBody.msg);
    }

    $done();
}, reason => {
    // reason.error
    $notify("中国移动", "签到失败", reason.error); // Error!
    $done();
});

function today() {
    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }

    return date.getFullYear() + month + day;
}
