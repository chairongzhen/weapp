import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Input } from "@tarojs/components";
import { AtIcon, AtSlider, AtInput, AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "@styles/global.less";
import "./lightSetting.less";
import "taro-ui/dist/style/components/slider.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";

import PurplePng from "@assets/images/purple.png";
import BluePng from "@assets/images/blue.png";
import GreenPng from "@assets/images/green.png";
import RedPng from "@assets/images/red.png";
import WhitePng from "@assets/images/white.png";

import { xAsixData, TimeSetting } from "./index";
import "@utils/util";

import Operation from "./operation";
import { getDetail } from "../index.hooks";

export default function LightSetting({ selected, current, onChange }) {
  const [currentTick, setCurrentTick] = useState<number>(current);
  const onLightChanged = (index, value) => {
    onChange(index, currentTick, value);
  };

  const onTickChanged = tick => {
    setCurrentTick(tick);
  };

  const [detailData, setDetailData] = useState<any>();

  useEffect(() => {
    setCurrentTick(current);
  }, [current]);

  useEffect(() => {
    if (selected) {
      getDetail(currentTick).then(res => {
        if (res?.data?.isSuccess) {
          setDetailData(res?.data?.content);
        }
      });
    }
  }, [selected, currentTick]);
  console.log("the detail is:", detailData);
  return (
    <View className="p_lightsetting">
      <TimeSetting tick={currentTick} onChange={onTickChanged} />
      <Operation
        index={1}
        png={PurplePng}
        color={"#6b4e8a"}
        value={detailData?.l1}
        onChange={onLightChanged}
      />
      <Operation
        index={2}
        png={PurplePng}
        color={"#9d80bc"}
        value={detailData?.l2}
        onChange={onLightChanged}
      />

      <Operation
        index={3}
        png={BluePng}
        color={"#2277a2"}
        value={detailData?.l3}
        onChange={onLightChanged}
      />

      <Operation
        index={4}
        png={BluePng}
        color={"#4d91b4"}
        value={detailData?.l4}
        onChange={onLightChanged}
      />

      <Operation
        index={5}
        png={BluePng}
        color={"#1b5f82"}
        value={detailData?.l5}
        onChange={onLightChanged}
      />

      <Operation
        index={6}
        png={GreenPng}
        color={"#63a074"}
        value={detailData?.l6}
        onChange={onLightChanged}
      />

      <Operation
        index={7}
        png={RedPng}
        color={"#e05d5d"}
        value={detailData?.l7}
        onChange={onLightChanged}
      />

      <Operation
        index={8}
        png={WhitePng}
        color={"#cfcfcf"}
        value={detailData?.l8}
        onChange={onLightChanged}
      />

      <AtButton type="primary" size="small">
        保存设置
      </AtButton>
    </View>
  );
}
