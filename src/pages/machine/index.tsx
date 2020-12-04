import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtSwipeAction,
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput
} from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/swipe-action.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/modal.scss";
import "taro-ui/dist/style/components/input.scss";
import "@styles/global.less";
import "./index.less";

import LightPng from "@assets/images/light.png";
import scanPng from "@assets/images/scan.png";
import newPng from "@assets/images/new.png";

export default function Machine() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const onScan = () => {
    Taro.scanCode({
      success: function(res) {
        console.log("the res is:", res);
      }
    });
  };
  return (
    <View className="p_machine">
      {showModal ? (
        <AtModal isOpened>
          <AtModalHeader>添加设备</AtModalHeader>
          <AtModalContent>
            <View className="p_machine_modal_input">
              <AtInput
                name="value"
                title="esp_"
                type="text"
                placeholder="请输入设备号"
                className="p_input"
              >
                <Image className="p_machine_img" src={newPng} />
              </AtInput>
            </View>
            <View className="p_scan_view" onClick={onScan}>
              <Image className="p_machine_img" src={scanPng} />
              <text>扫一扫</text>
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={() => setShowModal(false)}>关闭</Button>
          </AtModalAction>
        </AtModal>
      ) : null}
      <View
        className="p_machine_add"
        onClick={() => {
          console.log("here we go...", showModal);
          setShowModal(true);
        }}
      >
        <AtIcon value="add" size="20" color="#c56c12"></AtIcon>
        <Text>添加设备</Text>
      </View>
      <AtList>
        <AtSwipeAction
          options={[
            {
              text: "解绑",
              style: {
                backgroundColor: "#b34a4a"
              }
            },
            {
              text: "闪烁",
              style: {
                backgroundColor: "#1b5f82"
              }
            },
            {
              text: "直连",
              style: {
                backgroundColor: "#4f805d"
              }
            }
          ]}
        >
          <AtListItem thumb={LightPng} title="设备1" />
        </AtSwipeAction>
        <AtSwipeAction
          options={[
            {
              text: "解绑",
              style: {
                backgroundColor: "#b34a4a"
              }
            },
            {
              text: "闪烁",
              style: {
                backgroundColor: "#1b5f82"
              }
            },
            {
              text: "直连",
              style: {
                backgroundColor: "#4f805d"
              }
            }
          ]}
        >
          <AtListItem thumb={LightPng} title="设备2" />
        </AtSwipeAction>
        <AtSwipeAction
          options={[
            {
              text: "解绑",
              style: {
                backgroundColor: "#b34a4a"
              }
            },
            {
              text: "闪烁",
              style: {
                backgroundColor: "#1b5f82"
              }
            },
            {
              text: "直连",
              style: {
                backgroundColor: "#4f805d"
              }
            }
          ]}
        >
          <AtListItem thumb={LightPng} title="设备3" />
        </AtSwipeAction>
      </AtList>
    </View>
  );
}
