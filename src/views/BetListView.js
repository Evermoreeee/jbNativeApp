import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native';
import PropTypes from "prop-types";
import {Axios} from "../utils/axios"
import BettingOver from './BettingOver'
import Recharge from './Recharge'
const NODATA_ICON = require('../assets/fangdajing.png')

const width = Dimensions.get('window').width;


class BetListView extends React.PureComponent{
    _keyExtractor = (item,index) =>  item.id

    constructor(props){
        super(props)
        this.state = {
            stateTotal:0,
            stateRow:[],
            stateExtra:0,
            isLoading:false
        }
        this.renderNoMore =false, // 为空列表
        this.endMorePageList = false //最后一业
        this.pageIndex = 1
    }
    static propTypes = {
        listType:PropTypes.string.isRequired,
        activeOption:PropTypes.object.isRequired
    }
    static defaultProps = {
    }
    componentDidMount() {
        this._initList()
    }
    async getBetViewList(loadMorePageIndex){
        // console.log('>>>>>>>>>>>' + loadMorePageIndex)
        const {listType,activeOption} = this.props
        const _url = '/financial/fundsflow'
        const _data = {
            type: listType,
            // quickOptions: "ThisMonth",
            quickOptions:activeOption.quickOptions,
            pageSize: 25,
            pageIndex: loadMorePageIndex,
        }
        // console.log(JSON.stringify(_data))
        const res = await  Axios.post(_url,_data)
        // console.log(res)
        return res.data;
    }
    _renderItem(item){
        const _id = JSON.stringify(item)
        const {stateRow} = this.state
        const {listType , navigation} = this.props
        const isLastCard = _id == JSON.stringify(stateRow[stateRow.length -1])?true:false
        if(listType == 'Recharge'){
            return(<Recharge cardOption = {item} isLastCard={isLastCard} listType={listType}></Recharge>)
        }else if(listType == 'WinOrlose'){
            return(
                <TouchableHighlight onPress={()=>{
                    navigation.navigate('Details',{ticketId:item.ticketID})
                }}>
                <BettingOver cardOption = {item} isLastCard={isLastCard} listType={listType} ></BettingOver>
                </TouchableHighlight>
            )
        }else{
            return(<BettingOver cardOption = {item} isLastCard={isLastCard} listType={listType} ></BettingOver>)
        }
    }
    //*上拉加载更多
    loadMoreData(){
        if(this.endMorePageList){  //最后一页
            return
        }
        this.pageIndex += 1
        this.getBetViewList(this.pageIndex).then( resData =>{
            const { rows ,total} = resData
            let _addRow = [...this.state.rows,...rows]
            if(_addRow.length == total){
                this.endMorePageList = true
            }
            this.setState({
                rows:_addRow
            })
            
        })
    }
    //init  下拉刷新和初始化数据时调用 ,pageindex = 1
    _initList(){
        this.getBetViewList(1).then(resData => {
            const {extra ,rows,total} = resData
            // 列表为空
            if(total == 0){
                this.renderNoMore = true
            }
            if(rows.length == total && total>0){
                this.endMorePageList = true
            }
            this.setState({
                isLoading:false,
                stateTotal:total,
                stateRow:rows,
                stateExtra:extra,
            })
        })
    }
    //* 下拉刷新
    onRefresh(){
        this.setState({
            isLoading:true,
            pageIndex: 1,
            endMorePageList:false
        })
        this._initList()
    }
    //上啦加载更多render 
    genIndicator() {
        if (this.endMorePageList) {
            return (
                <View style={{ justifyContent: 'center' ,}}>
                    <Text style={{ color: '#fff', textAlign: 'center' ,paddingVertical:5}}>暂无更多订单</Text>
                </View>
            )
        } else {
            return <View style={{  justifyContent: 'center'}}>
                <ActivityIndicator
                    style={[ { marginTop: 8 }]}
                    animating={true}
                />
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 13, paddingVertical: 8 }}>正在加载更多</Text>
            </View>
        }
    }

    _renderList(){
        if(this.renderNoMore){
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:-30,}}>
                    <Image style={{width:70,height:70}}  source={NODATA_ICON}></Image>
                    <Text style={{fontSize:15,color:'#fff',marginTop:6}}>暂无内容</Text>
                </View>
            )
        }else{
            return( 
                <FlatList
                    data={this.state.stateRow}
                    renderItem={({ item }) => this._renderItem(item)}
                    ListFooterComponent={() => this.genIndicator()}//上拉加载更多视图
                    ListHeaderComponent={() => <View style={{height:8}}></View>}
                    onEndReached={() => {
                        this.loadMoreData()
                    }}
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
                    onEndReachedThreshold={0.1}
                    windowSize={40}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    />
            )
        }
    }

    render(){

        const {stateExtra} = this.state
        const {listType} = this.props

        const isBeting = listType=='WinOrlose'?true:false
        const isRecharge = listType=='Recharge'?true:false
        return (
            <View style={{flex:1,backgroundColor:'#242428'}}>
                
                {this._renderList()}

                <View style={{width:width,height:42,backgroundColor:'#4B525D',alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center',height:42}}>
                            <Text style={{color:'#fff',fontSize:13}}>{isBeting?'总盈亏':'总计'}: </Text>
                            <Text style={{color:'#13D9C9',fontSize:13}}>{isBeting?stateExtra:Number(stateExtra).toFixed(1)} </Text>
                            <Text style={{color:'#fff',fontSize:13}}>{isRecharge?'元':'金币'}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default BetListView;
