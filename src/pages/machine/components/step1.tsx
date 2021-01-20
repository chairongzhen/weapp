import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import "./step1.less";
import Taro from "@tarojs/taro";
import LightPng from "@assets/images/light.png";
import scanPng from "@assets/images/scan.png";
import newPng from "@assets/images/new.png";
import qrcodeDemo from "@assets/images/qrcodedemo.png";
import { bindMac } from "../index.hooks";

export default function Step1() {
  const [input, setInput] = useState<string>();
  const [qrcode,setQrcode] = useState<string>();
  const onInputChange = val => {
    setInput(val);
  };

  const addMac = mid => {
    bindMac(mid).then(res => {
      if (!res?.data?.isSuccess) {
        Taro.atMessage({
          message: res?.data?.message,
          type: "error"
        });
        return;
      }
      Taro.atMessage({
        message: "绑定成功",
        type: "success"
      });
    });
  };

  const onAdd = () => {
    if (input.length === 0) {
      Taro.atMessage({
        message: "请输入设备号",
        type: "error"
      });
    } else {
      addMac(`esp_${input}`);
      onNext();
    }
  };
  const onScan = () => {
    if(process.env.TARO_ENV === "weapp") {
      Taro.scanCode({
        success: function(res) {
          if (res.result) {
            addMac(res.result);
            onNext();
          }
        }
      });
    } else {
      window?.ppjsbridge?.scanQrCode(); 
    }

  };

  const qrcodeCallback = (content)=> {
    let reg = new RegExp('\^esp_[0-9]{12}$');
    if(reg.test(content)) {
      addMac(content);
      onNext()
    } else {
      setInput(content);
    }
  }

  window.qrcodeCallback = qrcodeCallback;

  // window.addEventListener('setItemEvent',function(e) {
  //   console.log('here is the localstorage is:',e.newvalue);
  //   setQrcode(e.newValue);
  // })

  const onNext = () => {
    Taro.navigateTo({
      url: "./step2"
    });
  };

  return (
    <View className="p_step1">
      <View className="p_qrcodedemo_view">
        <Image className="p_qrcodedemo_img" src={qrcodeDemo} />
      </View>
      <View className="p_machine_modal_input">
        <AtInput
          name="value"
          title="esp_"
          type="text"
          value={input}
          placeholder="请输入设备号"
          className="p_input"
          onChange={onInputChange}
        >
          <Image className="p_machine_img" src={newPng} onClick={onAdd} />
        </AtInput>
      </View>
      <View className="p_scan_view" onClick={onScan}>
        <Image className="p_machine_img" src={scanPng} />
        <View className="p_scan_text">扫一扫</View>
      </View>
      {/* <View>
        <AtButton type="primary" size="small" onClick={onNext}>
          下一步
        </AtButton>
      </View> */}
    </View>
  );
}
