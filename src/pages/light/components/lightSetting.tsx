import React, { Component, useEffect } from "react";
import { View, Text, Image, Input } from "@tarojs/components";
import { AtIcon, AtSlider, AtInput } from "taro-ui";
import Taro from "@tarojs/taro";
import "@styles/global.less";
import "./lightSetting.less";
import "taro-ui/dist/style/components/slider.scss";
import "taro-ui/dist/style/components/input.scss";

import PurplePng from "@assets/images/purple.png";
import BluePng from "@assets/images/blue.png";
import GreenPng from "@assets/images/green.png";
import RedPng from "@assets/images/red.png";
import WhitePng from "@assets/images/white.png";

import Operation from "./operation";

export default function LightSetting() {
  const onLightChanged = (index, value) => {
    console.log(`the index is: ${index} and the value is ${value}`);
  };

  return (
    <View className="p_lightsetting">
      <View>
        <AtIcon value="add-circle" size="25" color="#F68717"></AtIcon>
        <text>13:30</text>
        <AtIcon value="subtract-circle" size="25" color="#F68717"></AtIcon>
      </View>

      <Operation
        index={1}
        png={PurplePng}
        color={"#6b4e8a"}
        value={0}
        onChange={onLightChanged}
      />
      <Operation
        index={2}
        png={PurplePng}
        color={"#6b4e8a"}
        value={0}
        onChange={onLightChanged}
      />
      <Operation
        index={3}
        png={PurplePng}
        color={"#6b4e8a"}
        value={0}
        onChange={onLightChanged}
      />

      <Operation
        index={1}
        png={BluePng}
        color={"#2277a2"}
        value={0}
        onChange={onLightChanged}
      />

      <Operation
        index={2}
        png={BluePng}
        color={"#2277a2"}
        value={0}
        onChange={onLightChanged}
      />

      <Operation
        index={3}
        png={BluePng}
        color={"#2277a2"}
        value={0}
        onChange={onLightChanged}
      />

      <Operation
        index={3}
        png={GreenPng}
        color={"#63a074"}
        value={0}
        onChange={onLightChanged}
      />

      <Operation
        index={3}
        png={RedPng}
        color={"#e05d5d"}
        value={0}
        onChange={onLightChanged}
      />

      <Operation
        index={3}
        png={WhitePng}
        color={"#cfcfcf"}
        value={0}
        onChange={onLightChanged}
      />
    </View>
  );
}
