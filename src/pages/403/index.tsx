
import React, { Component, useEffect } from "react";
import { View } from "@tarojs/components";
import { AtButton } from 'taro-ui'
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";

export default function Error() {
    
    return (
        <View>
            <AtButton type='primary' size='normal' onGetUserInfo>用户信息授权</AtButton>
        </View>
    )
}




