import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Button,Radio,Picker,WebView } from "@tarojs/components";
import { AtInput, AtButton,AtList, AtListItem } from "taro-ui";
import "./step4.less";
import Taro from "@tarojs/taro";
import wifi from "@assets/images/wifisetting.png";
import "taro-ui/dist/style/components/list.scss";

export default function Step4() {
    const [wifi,setWifi] = useState<string>("");
    const [pass,setPass] = useState<string>("");
    const onSave = ()=> {

  }
  return (
    <WebView src="http://192.168.1.11:5000/wifi"></WebView>
  );
}
