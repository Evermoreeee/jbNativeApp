import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
// import { Tabs } from '@ant-design/react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
// import ScrollableTabBar from './components/ScrollableTabBar'
// import MatchTabsView from './MatchTabsView'

const TABS_DATA = [
    {id:1,title:'周三'},
    {id:2,title:'周四'},
    {id:3,title:'周五'},
    {id:4,title:'周六'},
    {id:5,title:'周天'},
    {id:6,title:'周一'},
    {id:7,title:'周二'},
    {id:8,title:'周二'},
    {id:9,title:'周二'},
    {id:10,title:'周二'},
    {id:11,title:'周二'},

]
export default class EarlyMatch extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let _tab_view = TABS_DATA.map((tab,i) => {
            
            return(
                <View key={i}  tabLabel={JSON.stringify(tab)}>
                    <Text style={{color:'#fff'}}>1111</Text>
                    {/* <MatchTabsView></MatchTabsView> */}
                </View>
            )
        })
        return(
            <View style={{flex:1}}>
                <ScrollableTabView 
                    style ={{backgroundColor:'#2f343a'}}
                    renderTabBar={() => <ScrollableTabBar  />}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#13D9C9'
                    >
                    { _tab_view }
                </ScrollableTabView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    ScrollableTabView:{
        color:'#fff',
        backgroundColor:'#0E0F15'
    },
    lineStyle: {
        width:30,
        height:2,
        borderRadius:15,
        backgroundColor:'#13D9C9',
        marginLeft:10
      },
})