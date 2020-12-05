import React, { Component,useEffect,useState } from "react";
import { View, Button, Image } from "@tarojs/components";
import EChart from "techarts";
import * as echarts from "@assets/libs/echarts";
import { TimeSetting,getOptions,xAsixData } from './';
import "./repeatSetting.less";
import '@utils/util';



export default function RepeatSetting({data,current,onChange}) {
  
    const [options,setOptions] = useState<any>(null);
    const [tick,setTick] = useState<number>(current);
    const onCurrrentChanged = (val)=> {
      setTick(val);
      onChange(val);
    }

    const onHandleChanged = (val) => {
      setTick(xAsixData.getArrayIndex(val))
    }
    
    useEffect(()=>{
      setOptions(getOptions(data,tick,onHandleChanged));
    },[data,tick])


    return (
      <View className="p_repeatsetting">
        <TimeSetting tick={tick} onChange={onCurrrentChanged} />
        <View className="line-chart">
          <EChart echarts={echarts} option={options} />
        </View>
      </View>
    );
  }


