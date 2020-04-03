import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Animated,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    ListFooterComponent,
} from 'react-native';
import PullToRefresh, { PullToRefreshHeaderProps } from 'react-native-pull-to-refresh-custom';

import StrandCard from './strandCard'
import SingleCard from './singleCard'
import BottomView from './BottomView'

import { toFixt2 } from './utils/utils'

import PropTypes from 'prop-types';
import headers from './utils/fetch'
/**
 * 订单列表 
 * */
class OderListComponent extends Component {
    constructor(props) {
        super()
        this.state = {
            pageIndex: 1,
            oderListData: [],
            endRender: false,
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
    getOderListData() {
        const _data = {
            //TODO: 先设置为1 方便调试
            status: this.props.statusProps,
            // status: 2,
            settleDate: this.props.dataProps,
            pageSize: 40,
            pageIndex: this.state.pageIndex
        }
        const url = 'https://appplus.rrystv.com/ticket/order/list'
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(_data)
        }).then((response) => response.json()).then((res) => {
            // console.log(res)
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
            //TODO: 上啦加载时修改
            if (resData.rows.length == 0) {
                this.setState({
                    endRender: true
                })
            }

            resData.rows.forEach((item, index) => {
                item['key'] = index
            });


            this.setState({
                oderListData: resData.rows,
                extraData: {
                    leftNumber: toFixt2(leftNumber),
                    rightNumber: toFixt2(rightNumber)
                },
            })
            // console.log(this.state.oderListData)
        })
    }

    _renderItem(item) {
        if (item.parlayRule == 11) {
            return (<SingleCard itemData={item} statusProps={this.props.statusProps} />)
        } else {
            return (<StrandCard itemData={item} statusProps={this.props.statusProps} />)
        }
    }

    loadData(refreshing) {
        console.log('loadData=========')
        if (refreshing) {
            this.setState({
                isLoading: true
            });
        }
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000);
    }
    genIndicator() {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator
                style={styles.indicator}
                size={'large'}
                animating={true}
            />
            <Text style={{ flex: 1, color: '#fff', textAlign: 'center' }}>正在加载更多</Text>
        </View>
    }
    _renderHeader(){
        return(<View style={{height:40,color:'#fff333'}}></View>)
    }
    onRefresh = () => {
        this.setState({
            refreshing: true,
        });
        setTimeout(() => {
            this.setState((prevState) => {
                return {
                    refreshing: false,
                };
            });
        }, 2000);
    };
    _listRenderComponent() {
        if (!this.state.endRender) {
            return (
                <PullToRefresh
                    HeaderComponent={Header}
                    headerHeight={100}
                    refreshTriggerHeight={140}
                    refreshingHoldHeight={140}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    style={{ flex: 1,}}
                >
                    <FlatList
                        data={this.state.oderListData}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item }) => this._renderItem(item)}
                        //要定制刷新外观不能用上面这个,要用下面这个
                        ListFooterComponent={() => this.genIndicator()}//上拉加载更多视图
                        onEndReached={() => {
                            this.loadData()
                        }}
                        onEndReachedThreshold={0.1}
                    />
                </PullToRefresh>
            )
        } else {
            return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>暂无相关订单</Text></View>)
        }
    }
    _keyExtractor = (item, index) => item.name;
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._listRenderComponent()}
                <BottomView statusProps={this.props.statusProps} extraProps={this.state.extraData}></BottomView>
            </View>
        )
    }
}

const headerStyle = {
    con: {
        height: 100,
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
    title: {
        fontSize: 22,
    }
};

 class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullDistance: props.pullDistance,
            percent: props.percent,
        };
    }

    setProgress( pullDistance, percent ) {
        this.setState({
            pullDistance,
            percent,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            pullDistance: nextProps.pullDistance,
            percent: nextProps.percent,
        });
    }

    render() {
        const { percentAnimatedValue, percent, refreshing } = this.props;
        const { percent: statePercent, pullDistance } = this.state;
        // console.log('header props 2222 ', statePercent, percent, refreshing); 
        let text = 'pull to refresh ';
        if (statePercent >= 1) {
            if (refreshing) {
                text = 'refreshing...';
            } else {
                text = 'release to refresh  ';
            }
        }
        text += pullDistance.toFixed(2);
        return (
            <Animated.View style={[headerStyle.con, { opacity: percentAnimatedValue }]}>
                <Text style={headerStyle.title}>{text}</Text>
            </Animated.View>
        );
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