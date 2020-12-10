import { useEffect } from "react";
import { config, defaultHost } from "@config/request.config";
import Taro from "@tarojs/taro";
import { request } from "@utils/request";
import useRequest from "../../hooks/useRequest";

export const useFixSetting = () => {
  const [data, loading, run] = useRequest(
    config.apiGetFix.url,
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

export const useRepeatData = () => {
  const [data, loading, run] = useRequest(
    config.apiGetRepeats.url,
    () => {
      return {
        openid: Taro.getStorageSync("unionid")
      };
    },
    "POST",
    {
      refreshDeps: [data],
      formatResult: origin => {
        const generateData = content => {
          const { tags, l1, l2, l3, l4, l5, l6, l7, l8 } = content;
          let originTags = [...tags];
          var has0: boolean = false;
          var has143: boolean = false;
          for (let t of tags) {
            if (t === 0) has0 = true;
            else if (t === 143) has143 = true;
          }
          if (!has0) {
            tags.unshift(0);
            l1.unshift(0);
            l2.unshift(0);
            l3.unshift(0);
            l4.unshift(0);
            l5.unshift(0);
            l6.unshift(0);
            l7.unshift(0);
            l8.unshift(0);
          }
          if (!has143) {
            tags.push(0);
            l1.push(0);
            l2.push(0);
            l3.push(0);
            l4.push(0);
            l5.push(0);
            l6.push(0);
            l7.push(0);
            l8.push(0);
          }
          tags.push(144);
          l1.push(l1[0]);
          l2.push(l2[0]);
          l3.push(l3[0]);
          l4.push(l4[0]);
          l5.push(l5[0]);
          l6.push(l6[0]);
          l7.push(l7[0]);
          l8.push(l8[0]);

          let p1 = [];
          let p2 = [];
          let p3 = [];
          let p4 = [];
          let p5 = [];
          let p6 = [];
          let p7 = [];
          let p8 = [];

          for (let i = 0; i <= 144; i++) {
            let haskey = false;
            let keyval = null;
            let l1keyval = null;
            let l2keyval = null;
            let l3keyval = null;
            let l4keyval = null;
            let l5keyval = null;
            let l6keyval = null;
            let l7keyval = null;
            let l8keyval = null;

            for (let j = 0; j < tags.length; j++) {
              if (tags[j] == i) {
                haskey = true;
                l1keyval = Number(l1[j]);
                l2keyval = Number(l2[j]);
                l3keyval = Number(l3[j]);
                l4keyval = Number(l4[j]);
                l5keyval = Number(l5[j]);
                l6keyval = Number(l6[j]);
                l7keyval = Number(l7[j]);
                l8keyval = Number(l8[j]);
              }
            }
            if (haskey) {
              p1.push(l1keyval);
              p2.push(l2keyval);
              p3.push(l3keyval);
              p4.push(l4keyval);
              p5.push(l5keyval);
              p6.push(l6keyval);
              p7.push(l7keyval);
              p8.push(l8keyval);
            } else {
              p1.push(null);
              p2.push(null);
              p3.push(null);
              p4.push(null);
              p5.push(null);
              p6.push(null);
              p7.push(null);
              p8.push(null);
            }
          }
          return {
            data: {
              isSuccess: true,
              content: {
                tags: tags,
                originTags: originTags,
                l1: p1,
                l2: p2,
                l3: p3,
                l4: p4,
                l5: p5,
                l6: p6,
                l7: p7,
                l8: p8
              }
            }
          };
        };

        if (origin?.data?.isSuccess) {
          return generateData(origin?.data?.content);
        } else {
          return origin;
        }
      }
    }
  );

  return {
    results: data?.data?.content,
    message: data?.data?.message,
    isSuccess: data?.data?.isSuccess,
    loading: loading,
    run: run
  };
};

export const getDetail = tag => {
  return request(
    config.apiGetTagVal.url,
    {
      openid: Taro.getStorageSync("unionid"),
      tag: tag
    },
    "POST"
  );
};

export const useDelTag = tag => {
  return request(
    config.apiDelTag.url,
    {
      openid: Taro.getStorageSync("unionid"),
      tag: tag
    },
    "POST"
  );
};

export const useEmpty = () => {
  return request(
    config.apiEmpty.url,
    {
      openid: Taro.getStorageSync("unionid")
    },
    "POST"
  );
};

export const useUpdate = (tag, values) => {
  return request(
    config.apiUpdateTagVal.url,
    {
      openid: Taro.getStorageSync("unionid"),
      tag: tag,
      lights: values
    },
    "POST"
  );
};


export const useUpdateSetting = (showtype,testmode,updatemode) => {
  return request(
    config.apiUpdateSet.url,
    {
      openid: Taro.getStorageSync("unionid"),
      repeatmode: showtype,
      productionmode: testmode,
      updatemode:updatemode

    },
    "POST"
  ); 
}

export const useUpdateFix = (l1,l2,l3,l4,l5,l6,l7,l8) => {
  return request(
    config.apiUpdateFix.url,
    {
      openid: Taro.getStorageSync("unionid"),
      l1: l1,
      l2: l2,
      l3: l3,
      l4: l4,
      l5: l5,
      l6: l6,
      l7: l7,
      l8: l8
    },
    "POST"
  ); 
}