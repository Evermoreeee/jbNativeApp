import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Animated,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import HeaderContext from '../HeaderCom';
const BACK_ICON = require('../assets/fanhui_copy.png')


class RenderNewHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            showOption:false,
            activeOption:{name:'今日',quickOptions:'Today'},
        }
        this.QuickData = [
            {name:'今日',quickOptions:'Today'},
            {name:'7天',quickOptions:'Seven'},
            {name:'30天',quickOptions:'Thirty'},
            {name:'本月',quickOptions:'ThisMonth'},
        ]
    }
    static propTypes = {
        callBackFunc:PropTypes.func.isRequired
    }
    static defaultProps = {
    }
      //* 下拉时间选择菜单 
    rightRender(){
        const {activeOption} = this.state
        return(<View style={styles.rightContainer}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{
                this.setState({
                    showOption:!this.state.showOption
                })
            }}>
                <Text style={{fontSize:13,color:'#fff'}}>{activeOption.name}</Text>
                <Image style={styles.backIcon} source={BACK_ICON}></Image>
            </TouchableOpacity>
        </View>)
    }
    hendleCheck = item =>{
        if(item == this.state.activeOption){
            this.setState({
                showOption:false
             })
            return;
        }else{
            this.props.callBackFunc(item)
            this.setState({
                activeOption:item,
                showOption:false
             })
        }
    }
    render(){
        // let Tabs = this.state.TABS_DATA
        const QuickOptions = this.QuickData.map((item,index)=>{
            return (
                <TouchableOpacity key={index} onPress={()=>{
                    // this.setState({
                    //     activeOption:item,
                    //     showOption:false
                    // })
                    this.hendleCheck(item)
                }}>
                    <Text style={[styles.quickItem, index ==  3?{borderBottomWidth:0,}:null]}>{item.name}</Text>
                </TouchableOpacity>
            )
        })

        const _renderQuickOptions = this.state.showOption?QuickOptions:null

        return(
            <>
                <HeaderContext titleName='账目明细' rightRender = {this.rightRender.bind(this)}></HeaderContext>
                {/* //*下拉菜单 */}
                <View style={styles.listOption}>
                    {_renderQuickOptions}
                </View>
            </>
        )
    }
}

export default RenderNewHeader;

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