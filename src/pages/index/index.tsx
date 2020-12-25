import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import {
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtFab,
  AtDrawer
} from "taro-ui";
import Taro, { useDidShow } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/modal.scss";
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/drawer.scss";
import "taro-ui/dist/style/components/list.scss";
import "@styles/global.less";
import "./index.less";
import LogoImage from "@assets/images/logo.png";
import { userLogin, checkUserAuth } from "@common/index";
import useSetting from "@hooks/useSetting";
import {
  useUpdateSetting,
  getDetail,
  useUpdateFix,
  getFixData
} from "../light/index.hooks";
import { xAsixData, getCurrentIndex } from "../light/components/index";

export default function Index() {
  const [isAuth, setIsAuth] = useState<boolean>(true);

  const [mode, setMode] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [drawerShow, setDrawerShow] = useState<boolean>(false);

  useDidShow(() => {
    useSetting().then(res => {
      if (res?.data?.isSuccess) {
        if (res?.data?.content?.repeatMode === "repeat") {
          setMode("repeat");
        } else {
          getFixData().then(r => {
            if (r?.data?.content) {
              const { l1, l2, l3, l4, l5, l6, l7, l8 } = r?.data?.content;
              if (
                l1 === 100 &&
                l2 === 100 &&
                l3 === 100 &&
                l4 === 100 &&
                l5 === 100 &&
                l6 === 100 &&
                l7 === 100 &&
                l8 === 100
              ) {
                setMode("on");
              } else if (
                l1 === 0 &&
                l2 === 0 &&
                l3 === 0 &&
                l4 === 0 &&
                l5 === 0 &&
                l6 === 0 &&
                l7 === 0 &&
                l8 === 0
              ) {
                setMode("off");
              }
            }
          });
        }
      }
    });
  });

  useEffect(() => {
    if (process.env.TARO_ENV === "weapp") {
      checkUserAuth().then(res => {
        if (!res) {
          setIsAuth(false);
        }
      });
    } else {
      setIsAuth(true);
    }
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

  const onAll = (open: boolean) => {
    useUpdateSetting("fix", "production", "none").then(res => {
      if (res?.data?.isSuccess) {
        if (!open) {
          setMode("off");
          useUpdateFix(0, 0, 0, 0, 0, 0, 0, 0).then(res => {
            if (res?.data?.isSuccess) {
              setIsOpen(false);
            }
          });
        } else {
          setMode("on");
          useUpdateFix(100, 100, 100, 100, 100, 100, 100, 100).then(res => {
            if (res?.data?.isSuccess) {
              setIsOpen(true);
            }
          });
        }
      }
    });
  };

  const onDrawerClose = () => {
    setDrawerShow(false);
  };

  const onDrawerClick = index => {
    if (index === 0) {
      Taro.switchTab({ url: "/pages/light/index" });
    } else if (index === 1) {
      Taro.navigateTo({ url: "/pages/offline/frame" });
    }
  };
  return (
    <>
      <View
        className={process.env.TARO_ENV === "weapp" ? "p_index" : "p_index_h5"}
      >
        <View>
          <Image src={LogoImage} />
        </View>
        <View>
          <AtButton
            onClick={onRepeat}
            className={mode === "repeat" ? "p_selectbutton" : ""}
            type="secondary"
          >
            自动工作
          </AtButton>
        </View>
        <View>
          <View>
            <AtButton
              onClick={() => onAll(true)}
              className={mode === "on" ? "p_selectbutton" : ""}
              type="secondary"
            >
              全开
            </AtButton>
          </View>
          <View>
            <AtButton
              onClick={() => onAll(false)}
              className={mode === "off" ? "p_selectbutton" : ""}
              type="secondary"
            >
              全关
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

      <View
        className={process.env.TARO_ENV === "weapp" ? "p_fixed" : "p_fixed_h5"}
      >
        <AtFab size="small" onClick={() => setDrawerShow(true)}>
          <Text className="at-fab__icon at-icon at-icon-menu"></Text>
        </AtFab>
      </View>
      <AtDrawer
        onItemClick={onDrawerClick}
        show={drawerShow}
        mask
        onClose={onDrawerClose}
        items={["联网", "单机"]}
      ></AtDrawer>
    </>
  );
}
