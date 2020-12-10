import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import logo from "@assets/images/qrcode.png";
import "./esp.less";
export default function Esp() {
  return (
    <View className="p_esp">
      <View>
        <Image src={logo}></Image>
      </View>
      <View>请长按识别二维码，将跳转到智能灯配置页面！</View>
    </View>
  );
}
