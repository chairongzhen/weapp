import {  getCurrentInstance } from '@tarojs/taro';


/**
 * @name: 将数字转换成千分位
 * @param val 需要转换的数字
 * @return: 千分位字符串
 */
export function toThousandSeparator(val) {
    if (val) {
      return (val + "").replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
    } else {
      return val;
    }
  }

  /**
 * 获取url查询字符串
 * @param {string} name - 需要查询的url参数
 * @param {string} url - url
 * @returns {string} - 返回字符串或null
 */
export function getQueryString(name, url) {
    if (!url) url = getCurrentInstance()?.page?.path;
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    let regexS = `[\\?&]${name}=([^&#]*)`;
    let regex = new RegExp(regexS, "i");
    let results = regex.exec(url);
    return results == null ? null : results[1];
  }

  /**
 * 比较两个简单类型数组是否相等
 * @param {array} arr1 - 数组1
 * @param {array} arr2 - 数组2
 * @returns {boolean} - 返回布尔值
 */
export function isEquals(arr1, arr2) {
    return (
      arr1.length === arr2.length &&
      arr1.sort().every((value, index) => value === arr2.sort()[index])
    );
  }

// 生成唯一标识
export function generateGUID() {
    let d = new Date().getTime();
    if (
      typeof performance !== "undefined" &&
      typeof performance.now === "function"
    ) {
      d += performance.now();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

    Array.prototype.getArrayIndex=function(obj){
        for(var i=0;i<this.length;i++){
         if(this[i]===obj){
          return i;
            }
        }
           return -1;
       }