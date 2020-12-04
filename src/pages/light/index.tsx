import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import { LightSetting } from "./components/index";

import "@styles/global.less";
import "./index.less";
import "taro-ui/dist/style/components/tabs.scss";

export default function Light() {
  const tabList = [{ title: "工作模式" }, { title: "亮度设置" }];
  const [current, setCurrent] = useState<number>(0);
  const onTabSelected = index => {
    setCurrent(index);
  };
  return (
    <View className="p_light">
      <AtTabs current={current} tabList={tabList} onClick={onTabSelected}>
        <AtTabsPane current={current} index={0}>
          <LightSetting />
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页二的内容
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
}
