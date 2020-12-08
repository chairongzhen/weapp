import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Input } from "@tarojs/components";
import { AtIcon, AtSlider, AtInput, AtButton, AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";
import "@styles/global.less";
import "./lightSetting.less";
import "taro-ui/dist/style/components/slider.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "taro-ui/dist/style/components/message.scss";

import PurplePng from "@assets/images/purple.png";
import BluePng from "@assets/images/blue.png";
import GreenPng from "@assets/images/green.png";
import RedPng from "@assets/images/red.png";
import WhitePng from "@assets/images/white.png";

import { xAsixData, TimeSetting } from "./index";
import "@utils/util";

import Operation from "./operation";
import { getDetail, useUpdate } from "../index.hooks";

export default function LightSetting({ selected, current, onChange }) {
  const [currentTick, setCurrentTick] = useState<number>(current);


  const [l1, setl1] = useState<number>(0);
  const [l2, setl2] = useState<number>(0);
  const [l3, setl3] = useState<number>(0);
  const [l4, setl4] = useState<number>(0);
  const [l5, setl5] = useState<number>(0);
  const [l6, setl6] = useState<number>(0);
  const [l7, setl7] = useState<number>(0);
  const [l8, setl8] = useState<number>(0);

  const onTickChanged = tick => {
    setCurrentTick(tick);
  };

  const onLightChanged = (index, value) => {
    //onChange(index, currentTick, value);
    switch (index) {
      case 1:
        setl1(value);
        break;
      case 2:
        setl2(value);
        break;
      case 3:
        setl3(value);
        break;
      case 4:
        setl4(value);
        break;
      case 5:
        setl5(value);
        break;
      case 6:
        setl6(value);
        break;
      case 7:
        setl7(value);
        break;
      case 8:
        setl8(value);
        break;
      default:
        break;

    }
  };

  // const [detailData, setDetailData] = useState<any>();

  const onSave = () => {
    useUpdate(currentTick, [l1, l2, l3, l4, l5, l6, l7, l8].join(',')).then(res => {
      console.log('the res is:', res);
      if (res?.data?.isSuccess) {
        onChange();
        Taro.atMessage({
          message: "保存成功",
          type: "success"
        });
      } else {
        Taro.atMessage({
          message: res?.data?.message,
          type: "error"
        });

      }
    })
  }

  useEffect(() => {
    setCurrentTick(current);
  }, [current]);

  useEffect(() => {
    if (selected) {
      getDetail(currentTick).then(res => {
        if (res?.data?.isSuccess) {
          // setDetailData(res?.data?.content);
          setl1(res?.data?.content?.l1),
            setl2(res?.data?.content?.l2),
            setl3(res?.data?.content?.l3),
            setl4(res?.data?.content?.l4),
            setl5(res?.data?.content?.l5);
          setl6(res?.data?.content?.l6);
          setl7(res?.data?.content?.l7);
          setl8(res?.data?.content?.l8);
        }
      });
    }
  }, [selected, currentTick]);

  
  return (
    <View className="p_lightsetting">
      <TimeSetting tick={currentTick} onChange={onTickChanged} />
      <Operation
        index={1}
        png={PurplePng}
        color={"#6b4e8a"}
        value={l1}
        onChange={onLightChanged}
      />
      <Operation
        index={2}
        png={PurplePng}
        color={"#9d80bc"}
        value={l2}
        onChange={onLightChanged}
      />

      <Operation
        index={3}
        png={BluePng}
        color={"#2277a2"}
        value={l3}
        onChange={onLightChanged}
      />

      <Operation
        index={4}
        png={BluePng}
        color={"#4d91b4"}
        value={l4}
        onChange={onLightChanged}
      />

      <Operation
        index={5}
        png={BluePng}
        color={"#1b5f82"}
        value={l5}
        onChange={onLightChanged}
      />

      <Operation
        index={6}
        png={GreenPng}
        color={"#63a074"}
        value={l6}
        onChange={onLightChanged}
      />

      <Operation
        index={7}
        png={RedPng}
        color={"#e05d5d"}
        value={l7}
        onChange={onLightChanged}
      />

      <Operation
        index={8}
        png={WhitePng}
        color={"#cfcfcf"}
        value={l8}
        onChange={onLightChanged}
      />

      <AtButton type="primary" size="small" onClick={onSave}>
        保存设置
      </AtButton>
    </View>
  );
}
