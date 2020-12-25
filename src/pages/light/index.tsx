import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtMessage } from "taro-ui";
import Taro, { useDidShow } from "@tarojs/taro";
import {
  LightSetting,
  RepeatSettiing,
  getCurrentIndex,
  xAsixData
} from "./components/index";
import "@utils/util";
import { useRepeatData, useEmpty, useDelTag } from "./index.hooks";

import "@styles/global.less";
import "./index.less";
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/message.scss";

export default function Light() {
  const tabList = [{ title: "自动模式" }, { title: "手动模式" }];
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [tick, setTick] = useState<number>(
    xAsixData.getArrayIndex(getCurrentIndex())
  );
  const { results, loading, isSuccess, run } = useRepeatData();
  const [repeatData, setRepeatdata] = useState<Array<any>>([]);

  const onTabSelected = index => {
    setCurrentTab(index);
  };
  const onRepeatChange = val => {
    setTick(val);
  };

  const onSetting = () => {
    run();
    setCurrentTab(0);
  };

  const onAdd = () => {
    Taro.navigateTo({
      url: `./setting?tick=${tick}`
    });
  };

  const onDel = () => {
    useDelTag(tick).then(res => {
      if (res?.data?.isSuccess) {
        Taro.atMessage({
          message: "已清空亮度设置",
          type: "success"
        });
        run();
      }
    });
  };

  const onEdit = () => {
    Taro.navigateTo({
      url: `./setting?tick=${tick}`
    });
  };

  const onEmpty = () => {
    useEmpty().then(res => {
      if (res?.data?.isSuccess) {
        Taro.atMessage({
          message: "已清空亮度设置",
          type: "success"
        });
        run();
      }
    });
  };

  useEffect(() => {
    if (currentTab === 1) {
    }
  }, [currentTab]);

  useEffect(() => {
    if (!loading && isSuccess) {
      setRepeatdata(results);
    }
  }, [loading]);

  useDidShow(() => {
    let pages = Taro.getCurrentPages();
    let currPage = pages[pages.length - 1]; // 获取当前页面
    if (currPage?.__data__?.update) {
      run();
    }
  });

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
            onDel={onDel}
            onEdit={onEdit}
          />
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <LightSetting isFix={true} current={tick} onChange={onSetting} />
        </AtTabsPane>
      </AtTabs>
    </View>
  );
}
