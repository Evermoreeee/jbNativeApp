

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
// import DefaultTabBar from './components/DefaultTabBar'
import headers from './utils/fetch'


import HeaderContext from './HeaderCom';
import EarlyMatch from './earlyMatch'
import OderListComponent from './oderListCom'


class TabsNav extends Component{
    constructor(props){
        super(props)
        this.state = {
            TABS_DATA : [
                { title: '确认中', avtive: 1 ,em:0},
                { title: '未结算', avtive: 2 ,em:0},
                { title: '已结算', avtive: 3 ,em:0},
                { title: '已划单', avtive: 4 ,em:0},
            ]
        }
    }

    componentDidMount(){
        this.getOderCountData()
    }
    //TODO: 开发本地请求 后面使用native 客户端请求
    getOderCountData(){
        // console.log(headers)
        fetch('https://appplus.rrystv.com/ticket/order/count',{
            method:'GET',
            headers:headers
        }).then((response) => response.json()).then((res)=>{
            // console.log(res)
            const resData = res.data
            let oderTabsData = this.state.TABS_DATA

            oderTabsData[0].em = resData.unConfirm
            oderTabsData[1].em = resData.success
            this.setState({
                TABS_DATA:oderTabsData
            })
        })  
        
    }
    
    render(){
        let _tabViewContext = this.state.TABS_DATA.map((tab,i)=>{
            if(i != 2){
                return (
                    <View key={i} style={styles.textStyle} tabLabel={JSON.stringify(tab)}>
                        <OderListComponent statusProps = {i}></OderListComponent>
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