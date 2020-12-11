import { Component } from "react";
import "./app.less";
import Taro from "@tarojs/taro";
import { userLogin, checkUserAuth } from "@common/index";
import "@common/compatible.ts";

class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      checkUserAuth().then(res => {
        if (res) {
          userLogin();
        }
      });
    } else {
      console.log("i am h5");
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
