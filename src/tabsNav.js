

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
// import DefaultTabBar from './components/DefaultTabBar'

import HeaderContext from './HeaderCom';
import EarlyMatch from './earlyMatch'
import StrandCard from './strandCard'
import SingleCard from './singleCard'

const  TABS_DATA = [
    { title: '确认中', avtive: 1 ,em:0},
    { title: '未结算', avtive: 2 ,em:22},
    { title: '已结算', avtive: 3 ,em:30},
    { title: '已划单', avtive: 4 ,em:0},
]
class TabsNav extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let _tabViewContext = TABS_DATA.map((tab,i)=>{
            if(i != 2){
                return (
                    <View key={i} style={styles.textStyle} tabLabel={JSON.stringify(tab)}>
                        <ScrollView>
                            <StrandCard></StrandCard>
                            <SingleCard></SingleCard>
                            <StrandCard></StrandCard>
                            <StrandCard></StrandCard>
                        </ScrollView>
                    </View>
                )
            }else{
                return (
                    <View key={i} style={styles.textStyle} tabLabel={JSON.stringify(tab)}>
                        <EarlyMatch></EarlyMatch>
                    </View>
                )
            }
        })
        return(
            <View style={{flex:1}}>
                <HeaderContext titleName='我的订单'></HeaderContext>
                <ScrollableTabView
                    style={styles.container}
                    tabBarUnderlineStyle={styles.lineStyle}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarActiveTextColor='#13D9C9'
                >
                    {_tabViewContext}
                </ScrollableTabView>
            </View>
        )   
    }
}

export default TabsNav;
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#242428',
    },
    lineStyle: {
        width:39,
        height:3,
        borderRadius:15,
        backgroundColor:'#13D9C9',
        marginLeft:30
    },
    textStyle:{
        flex:1,
        backgroundColor:'#242428'
    }
  });