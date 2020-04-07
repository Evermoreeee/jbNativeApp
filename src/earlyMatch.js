import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation
} from 'react-native';
// import { Tabs } from '@ant-design/react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
// import  from './components/ScrollableTabBar'
// import MatchTabsView from './MatchTabsView'
import OderListComponent from './oderListCom'

export default class EarlyMatch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekOptions:[]
        }
    }
    componentDidMount(){
        this.getMatchDate()
    }
    render() {
        let _tab_view = this.state.weekOptions.map((tab, i) => {

            return (
                <View style={{flex:1}} key={i} tabLabel={JSON.stringify(tab)}>
                    <OderListComponent statusProps = {this.props.statusProps} dataProps = {tab.weekdata}></OderListComponent>
                </View>
            )
        })
        return (
            <View style={{ flex: 1 }}>
                <ScrollableTabView
                    style={{ backgroundColor: '#0E0F15' }}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#13D9C9'
                    textStyle={{fontSize: 10,}}
                >
                    {_tab_view}
                </ScrollableTabView>
            </View>
        )
    }
    getMatchDate() {
        let weekOptions = [];
        for (let i = 0; i < 7; i++) {
            weekOptions.push(this.getDay(-i));
        }
        // console.log(weekOptions)

        this.setState({
            weekOptions:weekOptions
        })
    }
    getDay(day) {
        let today = new Date();
        let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        today.setTime(targetday_milliseconds);
        let tYear = today.getFullYear();
        let tMonth = today.getMonth();
        let tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        let weekdata = `${tYear}-${tMonth}-${tDate}`;
        return {
            time: `${tMonth}/${tDate}`,
            weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
                new Date(weekdata).getDay()
            ],
            weekdata: weekdata
        };
    }
    doHandleMonth(month) {
        var m = month;
        if (month.toString().length == 1) {
          m = "0" + month;
        }
        return m;
      }
}

const styles = StyleSheet.create({
   
    lineStyle: {
        width: 24,
        height: 2,
        borderRadius: 15,
        backgroundColor: '#13D9C9',
        marginLeft: 5
    },
})