import { Component } from "react";
import "./app.less";
import Taro from "@tarojs/taro";
import { appId } from "@config/dev.config.ts";
import WXBizDataCrypt from "@utils/WXBizDataCrypt.js";

class App extends Component {
  componentDidMount() {
    Taro.login({
      success: res => {
        if (res.code) {
          let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxd0318f0677af5a14&secret=2c4b71944744280d619fd2786979db64&js_code=${res.code}&grant_type=authorization_code`;
          Taro.request({
            url: url,
            method: "GET",
            success: function(data) {
              if (data.data) {
                let session_key = data.data.session_key;
                Taro.getUserInfo({
                  success: function(info) {
                    let encryptedData = info.encryptedData;
                    let iv = info.iv;
                    let pc = new WXBizDataCrypt(appId, session_key);
                    let result = pc.decryptData(encryptedData, iv);
                    console.log("the result is:", result?.unionId);
                  }
                });
              }
            }
          });
        }
      }
    });
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
