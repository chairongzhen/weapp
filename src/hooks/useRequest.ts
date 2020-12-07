

import { useRequest as useARequest } from 'ahooks';
import { request as req } from '@utils/request';

import { config } from '@config/request.config.ts';
/**
 * @param {*} url url
 * @param {object | function} params 请求参数
 * @param {*} options ahooks useRequest配置选项
 *
 *    onData : (oldData, loadingPtr) => newData 网络请求成功后返回的数据处理; loadingPtr 引用，用于修改 loading 状态（例如onData时处理出错，可以通过loadingPtr.loading 修改loading 的值，控制最后的现实结果）
 *    onError : (err, loadingPtr) => newData
 *  @return [data, loading, run, error ]
 */
export default function useRequest(url, params, type, options) {
    let response = useARequest(() => {
        // 请求前拦截处理
        let _params;
        if (typeof params === 'function') {
            _params = params();
        } else {
            _params = params;
        }
        return req(url, _params,type).catch((err) => {
            let newData = options?.onError?.(err, response) ?? [];
            console.warn(
                '%c 🌽 返回数据错误，兼容处理，请排查问题: ',
                'font-size:20px;background-color: #3F7CFF;color:#fff;',
                err
            );
            return Promise.resolve(newData);
        });
    }, options);
    return [response.data, response.loading, response.run, response.error];
}
