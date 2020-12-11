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
  AtInput,
  AtMessage
} from "taro-ui";
import "taro-ui/dist/style/components/swipe-action.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/toast.scss";
import "taro-ui/dist/style/components/modal.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/message.scss";
import "@styles/global.less";
import "./index.less";
import Taro from "@tarojs/taro";
import LightPng from "@assets/images/light.png";
import scanPng from "@assets/images/scan.png";
import newPng from "@assets/images/new.png";

import { useMachines, unBind, bindMac } from "./index.hooks";

export default function Machine() {
  const { results, loading, message, isSuccess, run } = useMachines();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [macs, setMacs] = useState<Array<any>>([]);
  const [input, setInput] = useState<string>();

  const onInputChange = val => {
    setInput(val);
  };

  const onScan = () => {
    Taro.scanCode({
      success: function(res) {
        if (res.result) {
          addMac(res.result);
        }
      }
    });
  };

  useEffect(() => {
    if (!loading) {
      setMacs(results);
    }
  }, [loading]);

  const onOperation = val => {
    const { text, mid } = val;
    switch (text) {
      case "解绑":
        unBind(mid).then(res => {
          if (res?.data?.isSuccess) {
            Taro.atMessage({
              message: "已解绑",
              type: "success"
            });
            run();
          } else {
            Taro.atMessage({
              message: res?.data?.message,
              type: "error"
            });
          }
        });
        break;
      case "关闭":
        console.log("close");
        break;
    }
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
      run();
      setShowModal(false);
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
    }
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
          </AtModalContent>
          <AtModalAction>
            <Button onClick={() => setShowModal(false)}>关闭</Button>
          </AtModalAction>
        </AtModal>
      ) : null}
      <AtMessage />
      <View
        className="p_machine_add"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <AtIcon value="add" size="20" color="#c56c12"></AtIcon>
        <View className="p_machine_add_text">添加设备</View>
      </View>
      <AtList>
        {macs?.map((item, index) => {
          return (
            <AtSwipeAction
              autoClose
              key={index}
              onClick={onOperation}
              options={[
                {
                  text: "解绑",
                  mid: item.mid,
                  style: {
                    backgroundColor: "#b34a4a"
                  }
                },
                {
                  text: "关闭",
                  style: {
                    backgroundColor: "#1b5f82"
                  }
                }
              ]}
            >
              <AtListItem
                thumb={LightPng}
                title={item.mname}
                note={`IP:${item.ip} [${
                  item.online === "online" ? "在线" : "离线"
                }]`}
              />
            </AtSwipeAction>
          );
        })}
      </AtList>
    </View>
  );
}
