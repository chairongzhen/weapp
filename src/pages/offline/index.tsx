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

export default function Offline() {
    const [wifi,setWifi] = useState<string>("");
    const [pass,setPass] = useState<string>("");
    const onConnect = ()=> {
        if(wifi === "") {
            Taro.atMessage({
                message: "请输入热点名",
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
        Taro.request({
            url: `http://192.168.4.1/online?ssid=${wifi}&pwd=${pass}`,
            success:function(res) {
                Taro.atMessage({
                    message: "登陆成功",
                    type: "success"
                  });
                
            }
        })
    }
  return (
    <View
      className={
        process.env.TARO_ENV === "weapp" ? "p_offline" : "p_offline_h5"
      }
    >
      <AtMessage />
      <View>
        <AtInput 
          name='wifi' 
          title='热点名' 
          type='text' 
          placeholder='请输入热点名' 
          value={wifi} 
          onChange={(val)=>setWifi(val.toString())} 
        />
        <AtInput 
          name='password' 
          title='密码' 
          type='password' 
          placeholder='请输入密码' 
          value={pass} 
          onChange={(val)=>setPass(val.toString())} 
        />
        <AtButton type="secondary" onClick={onConnect} >联网</AtButton>
      </View>
    </View>
  );
}
