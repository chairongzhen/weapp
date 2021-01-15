import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Button,Radio } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import "./step3.less";
import Taro from "@tarojs/taro";
import wifi from "@assets/images/wifisetting.png";

export default function Step3() {
    const [operated,setOperated] = useState<boolean>(false);
    const onNext = ()=> {
        Taro.redirectTo({
            url: "./step4"
        })
  }
  return (
    <View className="p_step3">
      <View className="p_step3_1">
        <Image className="p_step3_1_img" src={wifi} />
      </View>
      <View className="p_step3_2">
          请将手机Wi-Fi连接到'esp_************'后,返回小程序
      </View>
      <View className="p_step3">
        <Radio onClick={()=>setOperated(!operated)} checked={operated} value="operated">已确认上述操作</Radio>
      </View>
      <View>
        <AtButton disabled={operated?false:true}  type="primary" size="small" onClick={onNext}>
          下一步
        </AtButton>
      </View>
    </View>
  );
}
