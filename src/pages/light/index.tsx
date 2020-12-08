import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import { LightSetting,RepeatSettiing,getCurrentIndex,xAsixData } from "./components/index";
import '@utils/util';
import { useRepeatData } from './index.hooks'

import "@styles/global.less";
import "./index.less";
import "taro-ui/dist/style/components/tabs.scss";


const yData = [0,25,50,75,100,null,null,null,null,null,100,90,80,null];


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

  const onSetting = (index,tick,value)=> {
    console.log(`the index is: ${index} ;  and tick is: ${tick} ; and the value is ${value}`);
  }

  const { results,loading,run,isSuccess,message } = useRepeatData();
  const [repeatData,setRepeatdata] = useState<Array<any>>([]);

  useEffect(()=>{
    if(currentTab === 0) {
      
    }
  },[currentTab]);

  useEffect(()=>{
    if(!loading && isSuccess) {
      setRepeatdata(results);
    }
  },[loading])

  console.log('the result is:', repeatData);

  return (
    <View className="p_light">
      <AtTabs current={currentTab} tabList={tabList} swipeable={false} onClick={onTabSelected}>
        <AtTabsPane current={currentTab} index={0}>
          <RepeatSettiing data={repeatData} current={tick} onChange={onRepeatChange} />
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <LightSetting current={tick} onChange={onSetting} />
        </AtTabsPane>
      </AtTabs>
    </View>
  );
}
