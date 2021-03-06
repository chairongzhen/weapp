import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Button,Radio } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import "./step2.less";
import Taro from "@tarojs/taro";
import machine from "@assets/images/machine.png";
export default function Step2() {
  const [operated,setOperated] = useState<boolean>(false);
  const onNext = ()=> {
    Taro.navigateTo({
      url: "./step3"
    })
  }
  return (
    <View className="p_step2">
      <View className="p_step2_1">PP Light智能灯 网络版</View>
      <View className="p_step2_2">
        请使用针插入设备的重置孔，保持5秒左右，重置设备进行初始化操作。
      </View>
      <View className="p_step2_img_view">
        <Image className="p_step2_img" src={machine} />
      </View>
      <View className="p_step3">
        <Radio onClick={()=>setOperated(!operated)} checked={operated} value="operated">已确认上述操作</Radio>
      </View>
      <View>
        <AtButton disabled={operated?false:true} type="primary" size="small" onClick={onNext}>
          下一步
        </AtButton>
      </View>
    </View>
  );
}
