import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Animated,
    Image,
    ScrollView,
    RefreshControl,
    VirtualizedList,
    ActivityIndicator,
    ListFooterComponent,
} from 'react-native';
// import PullToRefresh, { PullToRefreshHeaderProps } from 'react-native-pull-to-refresh-custom';

import StrandCard from './strandCard'
import SingleCard from './singleCard'
import BottomView from './BottomView'

import { toFixt2 } from './utils/utils'

import PropTypes from 'prop-types';
import headers from './utils/fetch'
import {Axios} from './utils/axios'

/**
 * 订单列表 
 * */
class OderListComponent extends React.PureComponent {
    _keyExtractor = (item,index) =>  item.id
    constructor(props) {
        super()
        this.state = {
            pageIndex: 1,
            oderListData: [],
            isTotalSize: 0, //总条数
            endMorePageList: false, //最后一页
            isLoading: false,
            refreshing: false,
            extraData: {
                leftNumber: 0,
                rightNumber: 0
            }
        }
    }
    static propTypes = {
        statusProps: PropTypes.number.isRequired,
        dataProps: PropTypes.string
    }
    static defaultProps = {
        dataProps: ''
    };
    componentDidMount() {
        this.getOderListData()
    }
    //TODO: 开发本地请求 后面使用native 客户端请求
    async getOderListData(loadMorePageIndex) {
        const _data = {
            status: this.props.statusProps,
            settleDate: this.props.dataProps,
            pageSize: 40,
            pageIndex: loadMorePageIndex > 1 ? loadMorePageIndex : 1
        }
        // console.log('>>>>>>>>>>>>>>'+JSON.stringify(_data))
        const url = '/ticket/order/list'
        const res = await Axios.post(url,_data)
        const resData = res.data

        const active = this.props.statusProps

        let { extra } = resData
        let leftNumber = extra.totalBetAmount
        let rightNumber = extra.totalPossibleTurnover

        if (active == 2) {
            rightNumber = extra.totalTurnover
        } else if (active == -1) {
            rightNumber = extra.totalBetAmount
        }

        resData.rows.forEach((item, index) => {
            item['key'] = index
        });
        //* Rows list 
        let listData = resData.rows

        //* more page
        if (loadMorePageIndex > 1) {
            listData = [...this.state.oderListData, ...listData]
        }
        //* last page
        let endMorePageList = false
        if (resData.total == listData.length) {
            endMorePageList = true
        }

        this.setState({
            oderListData: listData,
            isTotalSize: resData.total,
            endMorePageList: endMorePageList,
            isLoading:false,
            extraData: {
                leftNumber: toFixt2(leftNumber),
                rightNumber: toFixt2(rightNumber)
            },
        })
        //* 列表为空的时候
        if (resData.rows.length == 0 && _data.pageIndex == 1) {
            this.setState({
                endRender: true
            })
        }
    }

    _renderItem =(item)=> {
        if (item.parlayRule == 11) {
            return (<SingleCard itemData={item} statusProps={this.props.statusProps} />)
        } else {
            return (<StrandCard itemData={item} statusProps={this.props.statusProps} />)
        }
    }
    //! 下拉刷新
    onRefresh(){
        this.setState({
            isLoading:true,
            pageIndex: 1,
            endMorePageList:false
        })
        this.getOderListData(1)
    }
    //* 上啦加载更多
    loadMoreData(refreshing) {
        if(this.state.endMorePageList){return;}
        const pageIndex = this.state.pageIndex + 1
        this.setState({
            pageIndex: pageIndex
        })
        this.getOderListData(pageIndex)
    }
    //* 上啦加载更多render 
    genIndicator() {

        if(this.state.endMorePageList){
            return(
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{color:'#fff',paddingVertical:8,textAlign:'center'}}>暂无更多订单</Text>
                </View>
            )
        }else{
            return <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator
                    style={[styles.indicator, { marginTop: 8 }]}
                    animating={true}
                />
                <Text style={{ flex: 1, color: '#fff', textAlign: 'center', fontSize: 13, paddingVertical: 8 }}>正在加载更多</Text>
            </View>
        }
        
    }
    _getItemCount (data)  {
        return data ? Math.ceil(data.length / this.props.numColumns) : 0;
      };
    _listRenderComponent() {
        if (!this.state.endRender) {
            return (

                //! 尝试使用VirtualizedList   windowSize  removeClippedSubviews
                // <VirtualizedList
                //     data={this.state.oderListData}
                //     renderItem={({ item }) => this._renderItem(item)}
                //     getItemCount={}
                // >

                // </VirtualizedList>
                <FlatList
                    style={{flex:1}}
                    data={this.state.oderListData}
                    renderItem={({ item }) => this._renderItem(item)}
                    refreshControl = {
                        <RefreshControl
                          title={'加载中...'}
                          tintColor={'#13D9C9'}
                          titleColor={'#13D9C9'}//只有ios有效
                          refreshing={this.state.isLoading}
                          onRefresh={()=>{
                            this.onRefresh();
                          }}
                        />
                    }
                      
                    windowSize={70}
                    removeClippedSubviews={true}
                    ListFooterComponent={() => this.genIndicator()}//上拉加载更多视图
                    onEndReached={() => {
                        this.loadMoreData()
                    }}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => index.toString()}
                />
            )
        } else {
            const NODATA_ICON = require('./assets/fangdajing.png')
            return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center",marginBottom:30 }}>
                <Image style={{width:70,height:70}} source={NODATA_ICON}></Image>
                <Text style={{ color: '#fff', fontSize: 14,marginTop:8 }}>暂无相关订单</Text>
                </View>)
        }
    }
   
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._listRenderComponent()}
                <BottomView statusProps={this.props.statusProps} extraProps={this.state.extraData}></BottomView>
            </View>
        )
    }
}



export default OderListComponent;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    bottomView: {
        height: 44,
        backgroundColor: '#fff333',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomtext: {
        height: 44,
        flex: 1,
        backgroundColor: '#474C58',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
    }
})