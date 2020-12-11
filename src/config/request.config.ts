// // wechat内网服务
// export const defaultHost =
//   process.env.TARO_ENV === "weapp" ? "http://127.0.0.1:7001" : "./service";

// wechat外网服务
export const defaultHost =
  process.env.TARO_ENV === "weapp"
    ? "https://www.polypite.com/"
    : "./service";

export const config = {
  apiGetSet: {
    url: "/getset"
  },
  apiUpdateSet: {
    url: "/updateset"
  },
  apiGetBinds: {
    url: "/getbinds"
  },
  apiUnBind: {
    url: "/unbindforapp"
  },
  apiBindMid: {
    url: "/bindmid"
  },
  apiUpdateFix: {
    url: "/updatefix"
  },
  apiGetFix: {
    url: "/getfix"
  },
  apiGetRepeats: {
    url: "/getrepeats"
  },
  apiDelTag: {
    url: "/deltag"
  },
  apiEmpty: {
    url: "/emptytagsios"
  },
  apiGetTagVal: {
    url: "/gettagvalueios"
  },
  apiWxLogin: {
    url: "/wxlogin"
  },
  apiUpdateTagVal: {
    url: "/updatetags"
  },
  apiLogin: {
    url: "/minilogin"
  },
  apiApplogin: {
    url: "/applogin"
  },
  apiRegister: {
    url: "/register"
  }
};
