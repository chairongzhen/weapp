import Taro from "@tarojs/taro";

export const checkUserAuth = () => {  
  return new Promise((resolve,rerject)=>{
    Taro.getSetting({
      success:function(res) {
         let authSetting = res.authSetting;
         let isAuth = false; 
         if(Object.keys(authSetting).length === 0 || authSetting['scope.userInfo'] === false) {
           isAuth =  false;
           } else {
             isAuth =  true;
         } 
         return resolve(isAuth);
     },
     fail:function(err) {
      rerject(err)
     }
    })
  })  ;
  
}