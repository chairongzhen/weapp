import React, { Component, useEffect, useState } from "react";
import { View, Button, Image } from "@tarojs/components";
import EChart from "techarts";
import * as echarts from "@assets/libs/echarts";
import { TimeSetting, getOptions, xAsixData } from "./";
import "./repeatSetting.less";
import "@utils/util";
import { AtIcon } from "taro-ui";
import "taro-ui/dist/style/components/icon.scss";

export default function RepeatSetting({ data, current, onChange, onAdd,onEmpty }) {
  const [options, setOptions] = useState<any>(null);
  const [tick, setTick] = useState<number>(current);
  const onCurrrentChanged = val => {
    setTick(val);
    onChange(val);
  };

  const onHandleChanged = val => {
    setTick(xAsixData.getArrayIndex(val));
    onChange(xAsixData.getArrayIndex(val));
  };

  const onAddClick = () => {
    onAdd();
  };

  const onEmptyClick = () => {
    onEmpty();
  }
  
  const [canAdd,setCanAdd] = useState<boolean>(false);
  const [canEdit,setCanEdit] = useState<boolean>(false);
  const [canDel,setCanDel] = useState<boolean>(false);
  const [canEmpty,setCanEmpty] = useState<boolean>(false);


  useEffect(() => {
    setOptions(getOptions(data, tick, onHandleChanged));
    if(data?.tags?.indexOf(tick) > -1 ) {
      setCanEdit(true);
      setCanAdd(false);
    } else {
      setCanAdd(true);
      setCanEdit(false);
    }
    if(data?.tags?.lenght===0) {
      setCanEmpty(true);
      setCanAdd(true);
    }
  }, [data, tick]);



  return (
    <View className="p_repeatsetting">
      <TimeSetting tick={tick} onChange={onCurrrentChanged} />
      <View className="line-chart">
        <EChart echarts={echarts} option={options} />
      </View>
      <View className="p_repeat_buttons">
        <AtIcon
          onClick={onAddClick}
          value="add-circle"
          size="25"
          color="#f79e44"
        ></AtIcon>
        <AtIcon value="subtract-circle" size="25" color="#f79e44"></AtIcon>
        <AtIcon value="edit" size="25" color="#f79e44"></AtIcon>
        <AtIcon value="play" size="25" color="#f79e44"></AtIcon>
        <AtIcon value="prev" size="25" color="#f79e44"></AtIcon>
        <AtIcon value="next" size="25" color="#f79e44"></AtIcon>
        <AtIcon onClick={onEmptyClick} value="trash" size="25" color="#f79e44"></AtIcon>
      </View>
    </View>
  );
}
