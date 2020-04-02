// uuid
import MD5 from "react-native-md5"

export const randomString = ()=>{var _0x8a4ec={'OyOkL':'4|3|0|2|5|1','GmurW':'abcdefhijkmnprstwxyz2345678','yCLfA':function(_0xfc04b8,_0x47134f){return _0xfc04b8<_0x47134f;},'idlWH':function(_0xb44c85,_0x1dfac2){return _0xb44c85*_0x1dfac2;}};var _0x2b0657=_0x8a4ec['OyOkL']['split']('|'),_0x2b8e24=0x0;while(!![]){switch(_0x2b0657[_0x2b8e24++]){case'0':var _0x4788ea=_0x4b48f0['length'];continue;case'1':return _0x48550e;case'2':var _0x48550e='';continue;case'3':var _0x4b48f0=_0x8a4ec['GmurW'];continue;case'4':var _0x11ea42=0xb;continue;case'5':for(var _0x37b8c1=0x0;_0x8a4ec['yCLfA'](_0x37b8c1,_0x11ea42);_0x37b8c1++){_0x48550e+=_0x4b48f0['charAt'](Math['floor'](_0x8a4ec['idlWH'](Math['random'](),_0x4788ea)));}continue;}break;}}

// export const qm = (k) => {
//   window._gb_ts = parseInt(new Date().getTime() / 1000);
//   window._gb_ns = randomString()
//   let  qsk  = `k=${k}&ns=${window._gb_ns}&ts=${window._gb_ts}`
//   const md5key = md5(qsk.toLocaleLowerCase());
//   window._gb_k = md5key
// }
// export const qm=_0x2c5678=>{var _0x1845fe={'TZRcT':function(_0x5a150a,_0x3ae1fe){return _0x5a150a(_0x3ae1fe);},'OEDzY':function(_0x20662a,_0x3c259a){return _0x20662a/_0x3c259a;},'SChbi':function(_0x429516){return _0x429516();}};window['_gb_ts']=_0x1845fe['TZRcT'](parseInt,_0x1845fe['OEDzY'](new Date()['getTime'](),0x3e8));window['_gb_ns']=_0x1845fe['SChbi'](randomString);let _0x4f074f='k='+_0x2c5678+'&ns='+window['_gb_ns']+'&ts='+window['_gb_ts'];const _0xbefaa0=_0x1845fe['TZRcT'](md5,_0x4f074f['toLocaleLowerCase']());window['_gb_k']=_0xbefaa0;};


const k = '9b3d4150ea4a4070a94070ff3c95458d91d70d2cc6c54f41b4ad4cb28a5bd82d';

function qm(){
    global._gb_ts = parseInt(new Date().getTime() / 1000);
    global._gb_ns = randomString()
    let  qsk  = `k=${k}&ns=${window._gb_ns}&ts=${window._gb_ts}`
    const md5key = MD5.hex_md5(qsk.toLocaleLowerCase());
    global._gb_k = md5key
}
// qm(k)
// setInterval(()=>{
//     qm(k)
// }, 1000*2)
qm(k);setInterval(()=>{var _0x4d203c={'YsFot':function(_0x54c7fa,_0x33b644){return _0x54c7fa(_0x33b644);}};_0x4d203c['YsFot'](qm,k);},0x3e8*0x2);






