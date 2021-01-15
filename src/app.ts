import { Component } from "react";
import "./app.less";
import Taro from "@tarojs/taro";
import { userLogin, checkUserAuth, wxh5Login } from "@common/index";
import compatible from '@common/compatible';
import { getQueryString } from "@utils/util";
require('promise.prototype.finally').shim();

class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      checkUserAuth().then(res => {
        if (res) {
          userLogin();
        }
      });
    } else {
      let code = getQueryString("code", window.location.href);
      if (code) {
        //http://localhost:10086/?code=071Ws500065xOK1HPX000h7TtQ3Ws50M&state=#/pages/index/index
        wxh5Login(code).then(res => {
          if (res?.data?.unionid) {
            Taro.setStorageSync("unionid", res?.data?.unionid);
            Taro.setStorageSync("nickname", res?.data?.nickname);
            Taro.switchTab({ url: "/pages/index/index" });
          } else {
            console.log("the code is wrong");
            Taro.navigateTo({
              url: "/pages/login/index"
            });
          }
        });
      } else {
        let unionid = Taro.getStorageSync("unionid");
        if (unionid && unionid !== "") {
          Taro.switchTab({
            url: "/pages/index/index"
          });
        } else {
          Taro.navigateTo({
            url: "/pages/login/index"
          });
        }
      }
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;

