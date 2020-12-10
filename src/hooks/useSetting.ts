import { useEffect } from "react";
import useRequest from "@hooks/useRequest";
import { config } from "@config/request.config";
import Taro from "@tarojs/taro";
import { request } from "@utils/request";

export default function useSetting() {
    return request(
        config.apiGetSet.url,
        {
          openid: Taro.getStorageSync("unionid"),
        },
        "POST"
      );
}
