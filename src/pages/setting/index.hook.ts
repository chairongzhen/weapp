import { useEffect } from "react";
import useRequest from "@hooks/useRequest";
import { config } from "@config/request.config";
import Taro from "@tarojs/taro";

export default function useSetting() {
  const [data, loading] = useRequest(
    config.apiGetSet.url,
    () => {
      return {
        openid: Taro.getStorageSync("unionid")
      };
    },
    "POST",
    {}
  );

  return {
    results: data
  };
}
