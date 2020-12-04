import React, { Component, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { getCurrentInstance } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "@styles/global.less";
import "./index.less";
import LogoImage from "@assets/images/logo.png";

export default function Index() {
  useEffect(() => {
    const { router } = getCurrentInstance();
    console.log("the route is:", router);
  }, []);
  return (
    <View className="p_index">
      <View>
        <Image src={LogoImage} />
      </View>
      <View>
        <AtButton>工作安排</AtButton>
      </View>
      <View>
        <View>
          <AtButton>开启</AtButton>
        </View>
        <View>
          <AtButton>关闭</AtButton>
        </View>
      </View>
    </View>
  );
}
