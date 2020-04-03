/**
 * @format
 */

import {AppRegistry ,UIManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import TabsNav from './src/tabsNav'
// import {  } from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent(appName, () => App);
