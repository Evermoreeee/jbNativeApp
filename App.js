
import React from 'react';
import {
  StatusBar,
} from 'react-native';


import TabsNav from './src/tabsNav'
import AccountDetail from './src/views/AccountDetail'
const App = React$Node  => {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}></StatusBar>
      {/* <TabsNav></TabsNav> */}
      <AccountDetail></AccountDetail>
    </>
  );
};


export default App;
