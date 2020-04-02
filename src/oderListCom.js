import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import StrandCard from './strandCard'
import SingleCard from './singleCard'

import PropTypes from 'prop-types';
import headers from './utils/fetch'

/**
 * 订单列表 
 * */
class OderListComponent extends Component {
    constructor(props) {
        super()
        this.state = {
            pageIndex: 1
        }
    }
    static propTypes = {
        statusProps: PropTypes.number.isRequired
    }
    static defaultProps = {
        // statusProps:1
    };
    componentDidMount(){
        this.getOderListData()
    }
    //TODO: 开发本地请求 后面使用native 客户端请求
    getOderListData() {
        const _data = {
            status: this.props.statusProps,
            settleDate: '',
            pageSize: 40,
            pageIndex: this.state.pageIndex
        }
        const url = 'https://appplus.rrystv.com/ticket/order/list'
        fetch(url,{
            method:'POST',
            headers:headers,
            body:JSON.stringify(_data)
        }).then((response) => response.json()).then((res)=>{
            // console.log(res)
            const resData = res.data

                
        }) 

    }
    render() {
        return (
            <ScrollView>
                <StrandCard></StrandCard>
                <SingleCard></SingleCard>
                <StrandCard></StrandCard>
                <StrandCard></StrandCard>
            </ScrollView>
        )
    }
}

export default OderListComponent;