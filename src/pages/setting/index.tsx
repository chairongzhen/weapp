import React, { Component, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "@styles/global.less";
import "./index.less";

export default function Setting() {
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "柴荣臻" });
  }, []);
  return (
    <View className="p_setting">
      <View>
        <View></View>
        <AtList>
          <AtListItem title="时区" extraText="上海" />
          <AtListItem title="网络" extraText="wifi" />
        </AtList>
      </View>
      <View>
        <View>设备信息</View>
        <AtList>
          <AtListItem title="用户名" extraText="chairongzhen" />
          <AtListItem title="设备名称" extraText="esp-1111" />
          <AtListItem title="固件版本" extraText="1.02" />
          <AtListItem title="使用时间 " extraText="20h" />
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
