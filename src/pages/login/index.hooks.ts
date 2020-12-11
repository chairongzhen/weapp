import { useEffect } from "react";
import { config, defaultHost } from "@config/request.config";
import Taro from "@tarojs/taro";
import { request } from "@utils/request";

// let username = ctx.request.body.username;
// let pwd = ctx.request.body.pwd;
// let nickname = ctx.request.body.nickname;

export const useAppLogin = (username,pwd) => {
    return  request(
        config.apiApplogin.url,
        {
            username:username,
            pwd:pwd
        },
        "POST"
    );
};

export const useRegister = (username,pwd,nickname) => {
    return  request(
        config.apiRegister.url,
        {
            username:username,
            pwd:pwd,
            nickname:nickname
        },
        "POST"
    );
}