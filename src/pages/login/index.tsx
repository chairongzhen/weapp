import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtList, AtListItem, AtForm, AtInput, AtButton,AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "taro-ui/dist/style/components/message.scss";
import "@styles/global.less";
import "./index.less";
import LogoImage from "@assets/images/logo.png";
import Wechat from "@assets/images/wechat.png";
import { useAppLogin } from './index.hooks';

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const onLogin = ()=> {
    if(email === "") {
      Taro.atMessage({
        message: "请输入email地址",
        type: "error"
      });
      return;
    } else if(pass === "") {
      Taro.atMessage({
        message: "请输入密码",
        type: "error"
      });
      return;
    } 
    useAppLogin(email,pass).then(res=>{
      if(res?.data?.isSuccess) {
        const { nickname,openid } = res?.data?.content;
        Taro.setStorageSync('unionid',openid);
        Taro.setStorageSync('nickname',nickname);
        Taro.switchTab({url: '/pages/index/index'})
      } else {
        Taro.atMessage({
          message: res?.data?.message,
          type: "error"
        });
        return;
      }
    })
  } 

  const onRegister = ()=>{
    Taro.navigateTo({
      url: "/pages/login/register"
    })
  }

  const onWechatLogin = ()=> {
    window.location.replace(
      "https://open.weixin.qq.com/connect/qrconnect?" +
      "appid=" + "wx824ffce0d4f15829" + "&" +
      "redirect_uri=" + encodeURIComponent('https://www.polypite.com') + "&" +
      "scope=snsapi_login#wechat_redirect" )
  }
  return (
    <View
      className={
        process.env.TARO_ENV === "weapp" ? "p_loginpage" : "p_loginpage_h5"
      }
    >
      <AtMessage />
      <View>
        <Image src={LogoImage} />
      </View>
      <View>EMAIL ADDRESS</View>
      <View>
        <AtInput
          name="email"
          type="text"
          placeholder="请输入邮件地址"
          value={email}
          onChange={val => setEmail(val.toString())}
        ></AtInput>
      </View>
      <View>PASSWORD</View>
      <View className="p_loginpage_lastiview">
        <AtInput
          name="password"
          type="password"
          placeholder="请输入密码"
          value={pass}
          onChange={val => setPass(val.toString())}
        ></AtInput>
      </View>
      <AtButton type="primary" onClick={onLogin}>Login</AtButton>
      <AtButton type="secondary" onClick={onRegister}>Sign up</AtButton>
      {
        process.env.TARO_ENV === "h5" ? 
        <View className="p_wechatlogin" >
        <Image src={Wechat} onClick={onWechatLogin}></Image>
        </View>:null
      }
    </View>
  );
}
