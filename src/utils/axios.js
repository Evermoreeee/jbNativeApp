
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
    const options =  {
      method,
      body: JSON.stringify(data),
      headers:headers
    }
    // options.headers = options.headers || {};
    // console.log(options)
    if(IsAndroidRequest || IsDevTestRequest){
        return new Promise((resolve, reject) => {
            fetch(requestUrl,options).then((response) => response.json())
              .then(res => {
                  resolve(res)
              })
        });
    }else{
        // return new Promise((resolve, reject) => {
        //     NetworkPlugin.findPromises().then(res =>{
        //         NetworkPlugin.post(res)
        //         resolve(res)
        //     })
        // })
    }
    
};

export const Axios = {
    post(url, data, config) {
        return request('POST', url, data, config).then(res => res)
    },
};