import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import logo from "@assets/images/qrcode.png";
import "./esp.less";
import { checkSaveImageAuth } from "@common/checkAuth";
import { AtMessage } from "taro-ui";
import "taro-ui/dist/style/components/message.scss";
export default function Esp() {
  const onLongPress = () => {
    if (checkSaveImageAuth) {
      Taro.saveImageToPhotosAlbum({
        filePath: logo
      }).then(r => {
        Taro.atMessage({
          message: "已保存到相册,请打开微信扫一扫识别图片进入设备配置页面",
          type: "success"
        });
      });
    } else {
      Taro.authorize({
        scope: "scope.writePhotosAlbum"
      }).then(() => {
        Taro.saveImageToPhotosAlbum({
          filePath: logo
        }).then(r => {
          Taro.atMessage({
            message: "已保存到相册,请打开微信扫一扫识别图片进入设备配置页面",
            type: "success"
          });
        });
      });
    }
  };
  return (
    <View className={process.env.TARO_ENV === "weapp" ?"p_esp":"p_esp_h5"}>
      <AtMessage />
      <View>
        <Image onLongPress={onLongPress} src={logo}></Image>
      </View>
      <View>
        因小程序限制无法长按识别，请长按图片保存到相册后，通过微信扫一扫识别二维码！
      </View>
    </View>
  );
}
