import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import { LightSetting,RepeatSettiing,getCurrentIndex,xAsixData } from "./components/index";
import '@utils/util';


import "@styles/global.less";
import "./index.less";
import "taro-ui/dist/style/components/tabs.scss";


const yData = [0,25,50,75,100];


export default function Light() {
  const tabList = [{ title: "循环模式" }, { title: "亮度设置" }];
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [tick,setTick] = useState<number>(xAsixData.getArrayIndex(getCurrentIndex()));
  const onTabSelected = index => {
    setCurrentTab(index);
  };
  const onRepeatChange = (val) => {
    setTick(val);
  }
  
  return (
    <View className="p_light">
      <AtTabs current={currentTab} tabList={tabList} swipeable={false} onClick={onTabSelected}>
        <AtTabsPane current={currentTab} index={0}>
          <LightSetting />
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <RepeatSettiing data={yData} current={tick} onChange={onRepeatChange} />
        </AtTabsPane>
      </AtTabs>
    </View>
  );
}
