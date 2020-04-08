import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    FlatList,
    Platform,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import {Axios} from "../utils/axios"
import BettingOver from './BettingOver'
const NODATA_ICON = require('../assets/fangdajing.png')

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const pdtop = (height - 380)/2 + 35

class BetListView extends Component{
    _keyExtractor = (item,index) =>  item.id

    constructor(props){
        super(props)
        this.state = {
            stateTotal:0,
            stateRow:[],
            stateExtra:0
        }
    }
    static propTypes = {
        listType:PropTypes.string.isRequired,
        activeOption:PropTypes.object.isRequired
    }
    static defaultProps = {
    }
    componentDidMount() {
        this.getBetViewList()
    }
    async getBetViewList(){

        const {listType,activeOption} = this.props
        const _url = '/financial/fundsflow'
        const _data = {
            type: listType,
            // quickOptions: "ThisMonth",
            quickOptions:activeOption.quickOptions,
            pageSize: 25,
            pageIndex: 1,
        }
        const res = await  Axios.post(_url,_data)
        // console.log(res)
        const {extra ,rows,total} = res.data
        
        this.setState({
            stateTotal:total,
            stateRow:rows,
            stateExtra:extra
        })
    }
    _renderItem(item){
        const _id = JSON.stringify(item)
        const {stateRow} = this.state
        const isLastCard = _id == JSON.stringify(stateRow[stateRow.length -1])?true:false
        return(<BettingOver cardOption = {item} isLastCard={isLastCard}></BettingOver>)
    }
    renderNoMore(){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:pdtop}}>
                <Image style={{width:70,height:70}}  source={NODATA_ICON}></Image>
                <Text style={{fontSize:15,color:'#fff',marginTop:6}}>暂无内容</Text>
            </View>
        )
    }
    render(){
        const {stateExtra} = this.state
        return (
            <View style={{flex:1,backgroundColor:'#242428',paddingTop:8}}>
                <FlatList
                    data={this.state.stateRow}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => this._renderItem(item)}
                    ListEmptyComponent={this.renderNoMore()}
                    />
                <View style={{width:width,height:42,backgroundColor:'#4B525D',alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center',height:42}}>
                            <Text style={{color:'#fff',fontSize:13}}>总盈亏:</Text>
                            <Text style={[{color:'#F1935F',fontSize:13},stateExtra<0?{color:'#13D9C9'}:null]}> {stateExtra} </Text>
                            <Text style={{color:'#fff',fontSize:13}}>金币</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default BetListView;