import React, { Component, useEffect, useState } from "react";
import { View, Text, Image,WebView } from "@tarojs/components";
import { AtList, AtListItem, AtForm, AtInput, AtButton,AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "taro-ui/dist/style/components/message.scss";
import "@styles/global.less";
import "./index.less";

export default function Frame() {
    return(
        <WebView src="https://www.polypite.com/#/pages/offline/index"></WebView>
    )
}