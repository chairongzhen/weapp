import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "@styles/global.less";
import "./index.less";

export default function Setting() {
  const [nickName] = useState<string>(Taro.getStorageSync("nickname"));
  const [wifi, setWifi] = useState<string>("");
  const [isEsp, setIsEsp] = useState<boolean>(false);

  useEffect(() => {
    if (process.env.TARO_ENV === "weapp") {
      Taro.setNavigationBarTitle({ title: nickName });
      Taro.getConnectedWifi({
        success: function(res) {
          if (res?.wifi?.SSID) {
            setWifi(res?.wifi?.SSID);
            let reg = RegExp(/^esp_/);
            if (reg.test(res?.wifi?.SSID)) {
              setIsEsp(true);
            }
          }
        }
      });
    } else {
      let ssid = window?.ppjsbridge?.getssid();
      if(ssid) {
        setWifi(ssid);
        let reg = RegExp(/^esp_/);
        if (reg.test(ssid)) {
          setIsEsp(true);
        }
        
      }
    }
  }, [nickName, wifi]);

  const onEsp = () => {
    Taro.navigateTo({
      url: "/pages/setting/esp"
    });
  };
  const onQuit = ()=> {
    Taro.setStorageSync("unionid","");
    Taro.setStorageSync("nickname","");

    if(process.env.TARO_ENV === "weapp") {
      Taro.navigateTo({ url: "/pages/login/index" });
    } else {
      window?.ppjsbridge?.logout();
    }
  }
  return (
    <View
      className={
        process.env.TARO_ENV === "weapp" ? "p_setting" : "p_setting_h5"
      }
    >
      <View>
        <View></View>
        <AtList>
          <AtListItem title="时区" extraText="中国" />
          <AtListItem
            onClick={isEsp ? onEsp : null}
            title="网络"
            extraText={wifi}
            arrow={isEsp ? "right" : null}
          />
        </AtList>
      </View>
      <View>
        <View>设备信息</View>
        <AtList>
          <AtListItem title="固件版本" extraText="1.01" />
          <AtListItem title="使用时间 " extraText="0h" />
        </AtList>
      </View>
      <View>
        <View>用户信息</View>
        <AtList>
          <AtListItem title="用户" extraText={nickName} />
          <AtListItem title="退出登陆" onClick={onQuit} />
        </AtList>
      </View>
    </View>
  );
}
