import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtList, AtListItem, AtForm, AtInput, AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "@styles/global.less";
import "./index.less";
import LogoImage from "@assets/images/logo.png";

export default function Setting() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  return (
    <View
      className={
        process.env.TARO_ENV === "weapp" ? "p_loginpage" : "p_loginpage_h5"
      }
    >
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
      <AtButton type="primary">Login</AtButton>
      <AtButton type="secondary">Sign up</AtButton>
    </View>
  );
}
