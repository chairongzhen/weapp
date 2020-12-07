import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "@styles/global.less";
import "./index.less";
import useSetting from './index.hook';

export default function Setting() {
  const [ nickName ]= useState<string>(Taro.getStorageSync("nickname"));
  
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: nickName });
  }, [nickName]);

  

  return (
    <View className="p_setting">
      <View>
        <View></View>
        <AtList>
          <AtListItem title="时区" extraText="中国" />
          <AtListItem title="网络" extraText="wifi" />
        </AtList>
      </View>
      <View>
        <View>设备信息</View>
        <AtList>
          <AtListItem title="用户" extraText={nickName} />
          <AtListItem title="设备名称" extraText="esp-1111" />
          <AtListItem title="固件版本" extraText="1.01" />
          <AtListItem title="使用时间 " extraText="0h" />
        </AtList>
      </View>
      <View>
        <View>设置</View>
        <AtList>
          <AtListItem title="网络设置" />
          <AtListItem title="恢复出厂设置" />
        </AtList>
      </View>
    </View>
  );
}
