import React, { Component, useEffect, useState } from "react";
import { View, WebView } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";

export default function WebviewPage() {
  const [url,setUrl] = useState<string>("");

  useEffect(()=>{
    console.log(Taro?.Current)  
    let parmas = Taro?.Current?.router?.params?.weburl;
      if(parmas) {
          setUrl(`${parmas}`)
      }
  })


  return (
    <WebView src={url} />
  );
}
