import React, { Component,useState,useEffect } from "react";
import { View, Button, Image } from "@tarojs/components";
import EChart from "techarts";
import * as echarts from "@assets/libs/echarts";
import { AtIcon } from "taro-ui";
import { xAsixData } from './'
import './timeSetting.less';


export default function TimeSetting({tick,onChange}) {
 
  const [current,setCurrent] = useState<number>(tick);

    const onTickChange = (isAdd)=> {
        let result = 0;
        if(isAdd && current === 143) {
            result = 0;
        } else if ( !isAdd && current === 0) {
            result = 143;
        } else {
            result = isAdd?current + 1:current - 1
        }
        setCurrent(result);
        onChange(result);
    }
    
    useEffect(()=>{
      setCurrent(tick);
    },[tick])
    
    return (
      <View className="p_timesetting">
        <AtIcon value="add-circle" size="25" color="#F68717" onClick={()=>onTickChange(true)}></AtIcon>
        <text>{xAsixData[current]}</text>
        <AtIcon value="subtract-circle" size="25" color="#F68717" onClick={()=>onTickChange(false)}></AtIcon>
      </View>
    );
  }


