
import React, { Component, useEffect } from "react";
import { View,WebView } from "@tarojs/components";
import { AtButton } from 'taro-ui'
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";

export default function Test() {
    console.log('here we go...');
    return (
        <WebView src="http://localhost:10086/#/pages/403/index" />
    )
}




