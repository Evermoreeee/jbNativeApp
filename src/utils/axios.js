
import {
    Platform,
    NativeModules
} from 'react-native';

//* iOS request method
// import {NativeModules} from 'react-native';
// const NetworkPlugin = NativeModules.NetworkPlugin;

// options headers
import headers from './fetch'
// server address
const baseurl = 'https://appplus.rrystv.com'
// 安卓环境 
const IsAndroidRequest = Platform.OS === 'android' 
// 开发环境
const IsDevTestRequest = true 

//* request tunnle  ios/android
const request = (method, url, data) => {
    const requestUrl = `${baseurl}${url}`
    let options =  {
      method,
      headers:headers,
      body: JSON.stringify(data)
    }
    if(method == 'POST'){
        const body = JSON.stringify(data)
        Object.assign(options,{body:body})
    }
    // options.headers = options.headers || {};
    // console.log(options)
    //! ios 开发调原生模块
    if(IsAndroidRequest || IsDevTestRequest){
        return new Promise((resolve, reject) => {
            fetch(requestUrl,options).then((response) => response.json())
              .then(res => {
                  resolve(res)
              })
        });
    }else{
        // return new Promise((resolve, reject) => {
        //     NativeModules.NetworkPlugin.findPromises(requestUrl,options).then(res =>{
        //         // NetworkPlugin.post(res)
        //         resolve(res)
        //     })
        // })
    }
    
};

export const Axios = {
    post(url, data, config) {
        return request('POST', url, data, config).then(res => res)
    },
    get(url, query, config) {
        return request('GET', url, query, config).then(res => res)
    },
};