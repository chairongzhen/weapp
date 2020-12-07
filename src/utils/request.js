/*
 * @Author: hcluo
 * @Date: 2020-04-26 14:48:22
 * @LastEditors: jfzhang.Jeffry
 * @LastEditTime: 2020-11-11 13:59:30
 * @Description: 政府项目
 */
import { getQueryString } from '@utils/util';
import Taro from '@tarojs/taro';
import {  defaultHost } from '@config/request.config.ts';


let host = (() => {
    // 添加sessionStorage
    let _host = getQueryString('host');
    return _host ?? defaultHost;
})();



export const request = (url, params = {}, type) => {
    let opt = {
        method: type ? type : 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let newUrl = url + '?flag=taro';
    

    if (type) {
        opt.body = JSON.stringify(params);
    } else {
        for (let [key, value] of Object.entries(params))
            if (!!value) newUrl += `&${key}=${JSON.stringify(value)}`; // 若value没有值，则不添加该字段
    }

    let localHost = /mock/.test(newUrl) ? '.' : host;
    //   return fetch(encodeURI(localHost + newUrl), opt)
    return Taro.request({
        url: encodeURI(localHost + newUrl),
        method: opt.method,
        header: opt.headers,
        data: opt?.body
    }).then((res) => {
      if (res.statusCode === 200) {
            return Promise.resolve(res?.data?.content);
        } else if (res.data.resultCode === '403') {
            Taro.navigateTo({
                url: '/pages/403/403',
            });
        } else {
            console.error('服务端错误：', localHost, newUrl, res);
            return Promise.reject(res);
        }
    });
};
