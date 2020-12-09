import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane,AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";
import {
  LightSetting,
  RepeatSettiing,
  getCurrentIndex,
  xAsixData
} from "./components/index";
import "@utils/util";
import { useRepeatData,useEmpty } from "./index.hooks";

import "@styles/global.less";
import "./index.less";
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/message.scss";

export default function Light() {
  const tabList = [{ title: "循环模式" }, { title: "亮度设置" }];
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [tick, setTick] = useState<number>(
    xAsixData.getArrayIndex(getCurrentIndex())
  );
  const { results, loading, isSuccess,run } = useRepeatData();
  const [repeatData, setRepeatdata] = useState<Array<any>>([]);
  //   const [detailData, setDetailData] = useState<any>();
  const onTabSelected = index => {
    console.log('the tab index is:', index);
    setCurrentTab(index);
  };
  const onRepeatChange = val => {
    setTick(val);
  };

  const onSetting = () => {
    run();
  };

  const onAdd = () => {
    setCurrentTab(1);
  };

  const onEmpty = () => {
    useEmpty().then(res=>{
      if(res?.data?.isSuccess) {
          Taro.atMessage({
            message: "已清空亮度设置",
            type: "success"
          });
          run();
        }
    });
  }

  //   const {
  //     detail,
  //     detail_message,
  //     detail_isSuccess,
  //     detail_loading,
  //     run
  //   } = useDetail(tick);

  useEffect(() => {
    if (currentTab === 1) {
    }
    
  }, [currentTab]);

  useEffect(() => {
    if (!loading && isSuccess) {
      setRepeatdata(results);
    }
  }, [loading]);

  //   useEffect(() => {
  //     if (!detail_loading && detail_isSuccess) {
  //       setDetailData(detail);
  //     }
  //   }, [detail_loading]);
  return (
    <View className="p_light">
      <AtMessage />
      <AtTabs
        current={currentTab}
        tabList={tabList}
        swipeable={false}
        onClick={onTabSelected}

      >
        <AtTabsPane current={currentTab} index={0}>
          <RepeatSettiing
            data={repeatData}
            current={tick}
            onChange={onRepeatChange}
            onAdd={onAdd}
            onEmpty={onEmpty}
          />
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <LightSetting
            selected={currentTab === 1 ? true : false}
            current={tick}
            onChange={onSetting}
          />
        </AtTabsPane>

      </AtTabs>
    </View>
  );
}
