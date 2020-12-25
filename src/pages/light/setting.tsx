import React, { Component, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { getQueryString } from '@utils/util';
import {
    LightSetting,
    getCurrentIndex,
    xAsixData
  } from "./components/index";


export default function FixSetting() { 
    const [tick,setTick] = useState<number>(0);
    useDidShow(()=>{
        let nowTick:string = "0";
        if(Taro.getEnv()==="WEAPP") {
            nowTick = Taro?.Current?.router?.params?.tick;
        } else {
            nowTick = getQueryString('tick',window.location.href);
        }
        setTick(parseInt(nowTick));
    });

    const onSetting = () => {

    };

    return (
        <LightSetting
            selected={true}
            current={tick}
            onChange={onSetting}
          />
    )
}