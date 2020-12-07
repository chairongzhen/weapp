import React, { Component, useEffect,useState } from "react";
import { View, Text, Image,Button } from "@tarojs/components";
import { AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import  Taro,{ getCurrentInstance } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/modal.scss";
import "@styles/global.less";
import "./index.less";
import LogoImage from "@assets/images/logo.png";
import { userLogin,checkUserAuth } from '@common/index';
import { config } from '@config/request.config';


export default function Index() {
  const [isAuth,setIsAuth] = useState<boolean>(true);
  useEffect(()=>{
    checkUserAuth().then(res=>{
      if(!res) {
        setIsAuth(false);
      }
    })
  },[])
  const onAuth = (e)=> {
    userLogin();
    setIsAuth(true);
  }

  // useEffect(()=>{
  //   console.log("the isautho status is:",isAuth);
  // },[isAuth])

  return (
    <>
    <View className="p_index">
      <View>
        <Image src={LogoImage} />
      </View>
      <View>
        <AtButton>工作安排</AtButton>
      </View>
      <View>
        <View>
          <AtButton>开启</AtButton>
        </View>
        <View>
          <AtButton>关闭</AtButton>
        </View>
      </View>
    </View>
    {
        !isAuth?<AtModal isOpened className="p_modal_auth">
        <AtModalHeader>获取用户信息</AtModalHeader>
        <AtModalContent>
          <View className="p_modal_auth_view">
          <View>PP Light需要获取您的用户信息</View>
          <View><Button size="default"  type="primary" open-Type="getUserInfo" onGetUserInfo={onAuth}>同意授权</Button></View>
          </View>  
        </AtModalContent>
        <AtModalAction><Button>关闭</Button></AtModalAction>
      </AtModal>:null
      }
    </>
  );
}
