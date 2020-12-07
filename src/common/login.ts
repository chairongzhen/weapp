import Taro from "@tarojs/taro";
import WXBizDataCrypt from "@utils/WXBizDataCrypt.js";
import { appId } from "@config/dev.config.ts";
import { config,defaultHost } from '@config/request.config';

export const userLogin = ()=> {
    Taro.login({
        success: res => {
          if (res.code) {
            let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxd0318f0677af5a14&secret=2c4b71944744280d619fd2786979db64&js_code=${res.code}&grant_type=authorization_code`;
            Taro.request({
              url: url,
              method: "GET",
              success: function(data) {
                if (data.data) {
                  let session_key = data.data.session_key;
                  Taro.getUserInfo({
                    success: function(info) {
                      let encryptedData = info.encryptedData;
                      let iv = info.iv;
                      let pc = new WXBizDataCrypt(appId, session_key);
                      let result = pc.decryptData(encryptedData, iv);
                      if(result?.unionId) {
                        Taro.request({
                          url: `${defaultHost}${config.apiWxLogin.url}`,
                          method: "POST",
                          data: {
                            "openid": result?.unionId,
                            "nickname": result?.nickName
                          },
                          success: function(res) {
                            Taro.setStorage({
                              key: "unionid",
                              data: result?.unionId
                            });
                            Taro.setStorage({
                              key: "nickname",
                              data: result?.nickName
                            })
                          }
                        })
                      } else {
                        Taro.navigateTo({
                          url: '/pages/403/index',
                      });
                      }
   
                    },
                    fail:function(res) {
                      Taro.showModal({
                        title: '用户未授权',
                        content: '如需正常使用该小程序功能，请在稍后弹出的用户授权提示中同意授权。最后再重新进入小程序即可正常使用。',
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                          } 
                        }
                      })
                    }
                  });
                }
              }
            });
          }
        }
      });
    
}