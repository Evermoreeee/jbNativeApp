

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    StatusBar,
    SafeAreaView,
    LayoutAnimation
} from 'react-native';
// import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RenderNewHeader from './renderHeader'

// import HeaderContext from '../HeaderCom';
import BetListView from './BetListView';


const Tab = createMaterialTopTabNavigator();

//手机屏幕的宽度
const width = Dimensions.get('window').width;
const mleft = (width/3 - 52)/2

class AccountDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            rightName:null,
            activeOption:{name:'今日',quickOptions:'Today'},
        }
        this.TABS_DATA = [
            { title: '投注盈亏', active: 0 ,em:0,type:'WinOrlose'},
            { title: '充值明细', active: 1 ,em:0,type:'Recharge'},
            { title: '活动礼金', active: 2 ,em:0,type:'Events'},
        ]
    }
    handleCheckType = typeObj => {
        this.setState({
            activeOption:typeObj
        })
    }
    renderBetListView(){
        const tabs = this.TABS_DATA.map((item,index)=>{
            let _Bcomponent =()=>{
                return (<BetListView listType = {item.type} activeOption = {this.state.activeOption} navigation={this.props.navigation}></BetListView>)
            }
            return (
                <Tab.Screen key={index} name={item.title} component={ _Bcomponent} />
            )
        })
        return tabs;
    }
    render(){
        // console.log('render>>>>>>>>>>>>>')
        return(
            <View style={styles.container}>
                <RenderNewHeader callBackFunc = {this.handleCheckType }></RenderNewHeader>
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
                            {this.renderBetListView()}
                    </Tab.Navigator>
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