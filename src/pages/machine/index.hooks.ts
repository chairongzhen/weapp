import { useEffect } from "react";
import useRequest from "@hooks/useRequest";
import { config, defaultHost } from "@config/request.config";
import Taro from "@tarojs/taro";
import { request } from "@utils/request";

export const useMachines = () => {
  const [data, loading, run] = useRequest(
    config.apiGetBinds.url,
    () => {
      return {
        openid: Taro.getStorageSync("unionid")
      };
    },
    "POST",
    {}
  );
  return {
    results: data?.data?.content,
    message: data?.data?.message,
    isSuccess: data?.data?.isSuccess,
    loading: loading,
    run: run
  };
};

export const unBind = mid => {
  return request(
    config.apiUnBind.url,
    {
      openid: Taro.getStorageSync("unionid"),
      mid: mid
    },
    "POST"
  );
};

export const bindMac = mid => {
  return request(
    config.apiBindMid.url,
    {
      openid: Taro.getStorageSync("unionid"),
      mid: mid
    },
    "POST"
  );
};
