import { Component } from "react";
import "./app.less";
import Taro from "@tarojs/taro";
import { userLogin,checkUserAuth } from '@common/index';


class App extends Component {
  componentDidMount() {
    checkUserAuth().then(res=>{
      if(res) {
        userLogin();
      }
    })    
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
