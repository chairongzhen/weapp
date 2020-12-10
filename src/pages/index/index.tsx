import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import {
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/modal.scss";
import "@styles/global.less";
import "./index.less";
import LogoImage from "@assets/images/logo.png";
import { userLogin, checkUserAuth } from "@common/index";
import useSetting from "@hooks/useSetting";
import {
  useUpdateSetting,
  getDetail,
  useUpdateFix
} from "../light/index.hooks";
import { xAsixData, getCurrentIndex } from "../light/components/index";

export default function Index() {
  const [isAuth, setIsAuth] = useState<boolean>(true);

  const [mode, setMode] = useState<string>("repeat");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    useSetting().then(res => {
      if (res?.data?.isSuccess) {
        setMode(res?.data?.content?.repeatMode);
      }
    });
  }, []);

  useEffect(() => {
    checkUserAuth().then(res => {
      if (!res) {
        setIsAuth(false);
      }
    });
  }, []);

  const onAuth = e => {
    userLogin();
    setIsAuth(true);
  };

  const onRepeat = () => {
    if (mode !== "repeat") {
      useUpdateSetting("repeat", "production", "none").then(res => {
        if (res?.data?.isSuccess) {
          setMode("repeat");
        }
      });
    }
  };

  const onFix = () => {
    if (mode !== "fix") {
      useUpdateSetting("fix", "production", "none").then(res => {
        if (res?.data?.isSuccess) {
          setMode("fix");
          getDetail(xAsixData.getArrayIndex(getCurrentIndex())).then(res => {
            if (res?.data?.isSuccess) {
              const { l1, l2, l3, l4, l5, l6, l7, l8 } = res?.data?.content;
              useUpdateFix(l1, l2, l3, l4, l5, l6, l7, l8);
            }
          });
        }
      });
    }
  };

  const onAll = () => {
    setMode("all");

    useUpdateSetting("fix", "production", "none").then(res => {
      if (res?.data?.isSuccess) {
        setMode("all");
        if (isOpen) {
          useUpdateFix(0, 0, 0, 0, 0, 0, 0, 0).then(res => {
            if (res?.data?.isSuccess) {
              setIsOpen(false);
            }
          });
        } else {
          useUpdateFix(100, 100, 100, 100, 100, 100, 100, 100).then(res => {
            if (res?.data?.isSuccess) {
              setIsOpen(true);
            }
          });
        }
      }
    });
  };
  console.log("the auth is:", isAuth);
  return (
    <>
      <View className="p_index">
        <View>
          <Image src={LogoImage} />
        </View>
        <View>
          <AtButton
            onClick={onRepeat}
            className={mode === "repeat" ? "p_selectbutton" : ""}
            type="secondary"
          >
            循环工作
          </AtButton>
        </View>
        <View>
          <View>
            <AtButton
              onClick={onFix}
              className={mode === "fix" ? "p_selectbutton" : ""}
              type="secondary"
            >
              固定
            </AtButton>
          </View>
          <View>
            <AtButton
              onClick={onAll}
              className={mode === "all" ? "p_selectbutton" : ""}
              type="secondary"
            >
              {isOpen ? "全关" : "全开"}
            </AtButton>
          </View>
        </View>
      </View>
      {!isAuth ? (
        <AtModal isOpened className="p_modal_auth">
          <AtModalHeader>获取用户信息</AtModalHeader>
          <AtModalContent>
            <View className="p_modal_auth_view">
              <View>PP Light需要获取您的用户信息</View>
              <View>
                <Button
                  size="default"
                  type="primary"
                  open-Type="getUserInfo"
                  onGetUserInfo={onAuth}
                >
                  同意授权
                </Button>
              </View>
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button>关闭</Button>
          </AtModalAction>
        </AtModal>
      ) : null}
    </>
  );
}
