import React, { Component, useEffect, useState } from "react";
import { View, Button, Image } from "@tarojs/components";
import EChart from "techarts";
import * as echarts from "@assets/libs/echarts";
import { TimeSetting, getOptions, xAsixData } from "./";
import "./repeatSetting.less";
import "@utils/util";
import { AtIcon } from "taro-ui";
import "taro-ui/dist/style/components/icon.scss";

export default function RepeatSetting({
  data,
  current,
  onChange,
  onAdd,
  onEmpty,
  onDel,
  onEdit
}) {
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
  };

  const onDelClick = () => {
    onDel();
  };

  const onEditClick = () => {
    onEdit();
  };

  const [canAdd, setCanAdd] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canDel, setCanDel] = useState<boolean>(false);
  const [canEmpty, setCanEmpty] = useState<boolean>(false);
  const [canPrevious, setCanPrevious] = useState<boolean>(true);
  const [canNext, setCanNext] = useState<boolean>(true);

  useEffect(() => {
    setOptions(getOptions(data, tick, onHandleChanged));
    if (data?.originTags) {
      if (data?.originTags?.length === 0) {
        setCanEmpty(false);
        setCanAdd(true);
        setCanDel(false);
        setCanEdit(false);
      } else {
        setCanEmpty(true);
        if (data?.tags?.indexOf(tick) > -1) {
          setCanEdit(true);
          setCanAdd(false);
          setCanDel(true);
        } else {
          setCanAdd(true);
          setCanEdit(false);
          setCanDel(false);
        }

        if (tick >= data?.originTags[data?.originTags?.length - 1]) {
          setCanNext(false);
          setCanPrevious(true);
        }
        if (tick <= data?.originTags[0]) {
          setCanPrevious(false);
          setCanNext(true);
        }

        if (data?.originTags?.length === 1 && tick === data?.originTags[0]) {
          setCanNext(false);
          setCanPrevious(false);
        }
      }
    }
  }, [data, tick]);

  const onNext = () => {
    for (let t of data?.originTags) {
      if (t > tick) {
        setTick(t);
        break;
      }
    }
  };
  const onPrvious = () => {
    for (let t of data?.originTags) {
      if (t < tick) {
        setTick(t);
        break;
      }
    }
  };

  const onDemo = () => {
    // setTick(0);
    // setInterval(() => {
    //   setTick(tick + 6);
    // }, 1000);
  };

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
          color={canAdd ? "#f79e44" : "grey"}
        ></AtIcon>
        <AtIcon
          value="subtract-circle"
          size="25"
          color={canDel ? "#f79e44" : "grey"}
          onClick={onDelClick}
        ></AtIcon>
        <AtIcon
          value="edit"
          size="25"
          color={canEdit ? "#f79e44" : "grey"}
          onClick={onEditClick}
        ></AtIcon>
        <AtIcon
          value="play"
          size="25"
          color={canEmpty ? "#f79e44" : "grey"}
          onClick={onDemo}
        ></AtIcon>
        <AtIcon
          value="chevron-left"
          size="25"
          color={canEmpty && canPrevious ? "#f79e44" : "grey"}
          onClick={onPrvious}
        ></AtIcon>
        <AtIcon
          value="chevron-right"
          size="25"
          color={canEmpty && canNext ? "#f79e44" : "grey"}
          onClick={onNext}
        ></AtIcon>
        <AtIcon
          onClick={onEmptyClick}
          value="trash"
          size="25"
          color={canEmpty ? "#f79e44" : "grey"}
        ></AtIcon>
      </View>
    </View>
  );
}
