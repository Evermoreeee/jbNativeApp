/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry ,UIManager} from 'react-native';


import App from './App';
import AccApp from './src/views/AppNav'


import {name as appName} from './app.json';


//  //关闭其中某些yellow警告
//  console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key']; 
//  // 关闭全部yellow警告
// console.disableYellowBox = true 

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent(appName, () => AccApp);
AppRegistry.registerComponent('AccountDetail', () => AccApp);


