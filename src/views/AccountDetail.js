

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    LayoutAnimation
} from 'react-native';
// import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


import HeaderContext from '../HeaderCom';
const BACK_ICON = require('../assets/fanhui_copy.png')

//手机屏幕的宽度
const width = Dimensions.get('window').width;
const mleft = (width/3 - 52)/2
const HomeScreen = function(){
    return (<View style={{flex:1,backgroundColor:'#242428'}}><Text> 123</Text></View>)
}
class AccountDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            rightName:null,
            showOption:false,
            activeOption:{name:'今日',quickOptions:'Today'},
            TABS_DATA : [
                { title: '投注盈亏', active: 0 ,em:0},
                { title: '充值明细', active: 1 ,em:0},
                { title: '活动礼金', active: 2 ,em:0},
            ],
            QuickData : [
                {name:'今日',quickOptions:'Today'},
                {name:'7天',quickOptions:'Seven'},
                {name:'30天',quickOptions:'Thirty'},
                {name:'本月',quickOptions:'ThisMonth'},
            ]
           
        }
    }
    //* tabs  
    tabViewRender(){
        const _render = this.state.TABS_DATA.map((item,index)=>{
            return (
                <View style={styles.textStyle} tabLabel={JSON.stringify(item)}></View>)
        })
        return _render ;
    }
    //* 下拉时间选择菜单 
    rightRender(){
        const {activeOption} = this.state
        return(<View style={styles.rightContainer}>
            <Text style={{fontSize:13,color:'#fff'}}>{activeOption.name}</Text>
            <Image style={styles.backIcon} source={BACK_ICON}></Image>
        </View>)
    }
    render(){
        let Tabs = this.state.TABS_DATA
        const QuickOptions = this.state.QuickData.map((item,index)=>{
            return (
                <TouchableOpacity onPress={()=>{
                    this.setState({
                        activeOption:item
                    })
                }}>
                    <Text style={[styles.quickItem, index ==  3?{borderBottomWidth:0,}:null]}>{item.name}</Text>
                </TouchableOpacity>
            )
        })

        const _renderQuickOptions = this.state.showOption?QuickOptions:null
        return(
            <View style={styles.container}>
                <HeaderContext titleName='账目明细' rightRender = {this.rightRender.bind(this)}></HeaderContext>
                {/* 下拉菜单 */}

                <View style={styles.listOption}>
                    {_renderQuickOptions}
                </View>
                <NavigationContainer>
                    <Tab.Navigator
                        tabBarOptions={{
                            activeTintColor:'#13D9C9',
                            inactiveTintColor:'#fff',
                            labelStyle: { fontSize: 13 ,marginTop: 0,paddingTop: 0,paddingBottom:6,},
                            tabStyle:{height:40 },
                            indicatorStyle:{
                              backgroundColor:'#13D9C9',
                              height:3,
                              borderRadius:4,
                              width:52,
                              marginLeft: mleft,
                            },
                            style: { backgroundColor: '#2D3237' },
                          }}
                        >
                        <Tab.Screen name="投注盈亏" component={HomeScreen} />
                        <Tab.Screen name="充值明细" component={HomeScreen} />
                        <Tab.Screen name="活动礼金" component={HomeScreen} />
                    </Tab.Navigator>
                </NavigationContainer>

                {/* <ScrollableTabView
                    style={styles.container}
                    tabBarUnderlineStyle={styles.lineStyle}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarActiveTextColor='#13D9C9'
                >
                    <View style={styles.textStyle} tabLabel={JSON.stringify(Tabs[0])}>
                        <Text style={{color:'#fff',textAlign:'center'}}>投注盈亏</Text>
                    </View>
                    <View style={styles.textStyle} tabLabel={JSON.stringify(Tabs[1])}>
                    <Text style={{color:'#fff',textAlign:'center'}}>充值明细</Text>

                    </View>
                    <View style={styles.textStyle} tabLabel={JSON.stringify(Tabs[2])}>
                    <Text style={{color:'#fff',textAlign:'center'}}>活动礼金</Text>
                    </View>
                </ScrollableTabView> */}
                 
            </View>
        )
    }
}

export default AccountDetail;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#242428',
        zIndex:1,
    },
    lineStyle: {
        width:38,
        height:3,
        borderRadius:15,
        backgroundColor:'#13D9C9',
        marginLeft:48
    },
    textStyle:{
        flex:1,
        backgroundColor:'#242428'
    },
    rightContainer:{
        flex:1,
        alignItems:'center',
        flexDirection:'row',
    },
    backIcon:{
        width:16,
        height:14,
        marginLeft:4
    },
    listOption:{
        position:'absolute',
        top:62,
        right:6,
        width:100,
        backgroundColor:'#484D59',
        borderRadius:5,
        zIndex:99,
        paddingHorizontal:11,
        
    },
    quickItem:{
        fontSize:13,
        color:'#fff',
        textAlign:'center',
        paddingVertical: 12,
        borderBottomWidth:1,
        borderBottomColor:'#2E3034'
    }
});