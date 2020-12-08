import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Input } from "@tarojs/components";
import { AtIcon, AtSlider, AtInput } from "taro-ui";
import Taro from "@tarojs/taro";
import "@styles/global.less";
// import "./lightSetting.less";
import "taro-ui/dist/style/components/slider.scss";
import "taro-ui/dist/style/components/input.scss";

export default function Operation({ index, png, color, value, onChange }) {
  const [current, setCurrent] = useState<number>(value);
  const onSliderChanged = val => {
    setCurrent(val);
    onChange(index, val);
  };
  const onTextChanged = val => {
    let result = 0;
    result = parseInt(val?.detail?.value);
    setCurrent(result);
    onChange(index, result);
  };

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  return (
    <View>
      <View>
        <Image src={png} />
      </View>
      <View>
        <AtSlider
          blockSize={18}
          blockColor={color}
          activeColor={color}
          step={1}
          value={current}
          min={0}
          max={100}
          onChange={onSliderChanged}
        />
      </View>
      <View>
        <Input type="number" value={current} onInput={onTextChanged} />
      </View>
    </View>
  );
}
