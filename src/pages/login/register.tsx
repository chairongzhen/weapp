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
import "./register.less";
import LogoImage from "@assets/images/logo.png";
import { useRegister } from './index.hooks';

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [pass2, setPass2] = useState<string>("");
  const [nickname,setNickName] = useState<string>("");
  const onRegister = ()=> {
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
    }else if(pass2 === "") {
        Taro.atMessage({
            message: "重复密码不能为空",
            type: "error"
          }); 
          return;
    } else if(pass !== pass2) {
        Taro.atMessage({
            message: "两次密码不一致",
            type: "error"
          }); 
          return;
    } 
    useRegister(email,pass,nickname).then(res=>{
        Taro.atMessage({
            message: res?.data?.message,
            type: res?.data?.isSuccess?"success":"error"
          }); 
          
          if(res?.data?.isSuccess) {
              Taro.navigateTo({
                  url:"/pages/index/index"});
            }
    })
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
      <View>邮件地址</View>
      <View>
        <AtInput
          name="email"
          type="text"
          placeholder="请输入邮件地址"
          value={email}
          onChange={val => setEmail(val.toString())}
        ></AtInput>
      </View>
      <View>密码</View>
      <View className="p_loginpage_lastiview">
        <AtInput
          name="password"
          type="password"
          placeholder="请输入密码"
          value={pass}
          onChange={val => setPass(val.toString())}
        ></AtInput>
      </View>
      <View>重复密码</View>
      <View className="p_loginpage_lastiview">
        <AtInput
          name="password2"
          type="password"
          placeholder="请输入密码"
          value={pass2}
          onChange={val => setPass2(val.toString())}
        ></AtInput>
      </View>
      <View>显示名</View>
      <View className="p_loginpage_lastiview">
        <AtInput
          name="password2"
          type="password"
          placeholder="请输入密码"
          value={nickname}
          onChange={val => setNickName(val.toString())}
        ></AtInput>
      </View>
      <AtButton type="primary" onClick={onRegister}>注册</AtButton>
    </View>
  );
}
