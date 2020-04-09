import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    Platform,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
const BACK_ICON = require('../assets/you.png')
const BG_JB = require('../assets/ic_shuiyin_fly.png')
import {toFixt2} from '../utils/utils'
class BettingOver extends Component{
    constructor(props){
        super(props)
    }
    static propTypes = {
        cardOption:PropTypes.object.isRequired,
        isLastCard:PropTypes.bool,
        listType:PropTypes.string.isRequired,

    }
    static defaultProps = {
        isLastCard:false
    }
    rightBackButton(isBeting){
        if(isBeting){
            return (
                <Image style={styles.righgtGo} source={BACK_ICON}></Image>
            )
        }else{
            return (<View style={styles.righgtGo}></View>)
        }
    }
    render(){
        const { cardOption ,isLastCard ,listType } = this.props
        const dataArray = cardOption.title.split(cardOption.matchScore)
        const isBeting = listType=='WinOrlose'?true:false
        return (
            
            <View style={styles.container}> 
                <View style={styles.leftLineCom}>
                    <View style={styles.borderYuan}></View>
                    <View style={[styles.borderLine,isLastCard?{width:0}:null]}></View>
                </View>
                
                <View style={styles.cardCom}>
                    <View style={styles.cardText}>
                        <View style={styles.leftTextRow}>
                            <View style={styles.topCom} >
                                <Text style={{fontSize: 13,color:'#fff'}}>{dataArray[0]}</Text>
                                <Text style={{fontSize: 13,color:'#13D9C9'}}>{cardOption.matchScore}</Text>
                                <Text numberOfLines={1} style={{fontSize: 13,color:'#fff',flex:1,marginRight:3}}>{dataArray[1]}</Text>
                            </View>
                            <Text style={[{fontSize: 13,color:'#F1935F'},cardOption.amount<0?{color:'#fff'}:null]}>{isBeting?'':'+'}{toFixt2(cardOption.amount)}</Text>
                        </View>
                        <View style={styles.leftTextRow}>
                            { this.renderDesc(cardOption) }
                            <Text style={{fontSize: 13,color:'#8D8E91',marginRight:5}}>{cardOption.confirmTime}</Text>
                            <Text style={{fontSize: 13,color:'#8D8E91'}}>{isBeting?'盈亏':''}</Text>
                        </View>
                    </View>
                    {this.rightBackButton(isBeting)}
                    <ImageBackground style={styles.fqbjStyle} source={BG_JB}></ImageBackground>
                </View>
            </View>
            
        )
    }
    renderDesc(cardOption){
        if(cardOption.desc != ''){
            return(<Text numberOfLines={1} style={{flex:1,fontSize: 13,color:'#8D8E91',marginRight:4}}>{cardOption.desc}</Text>)
        }else{
            return null
        }
    }
}

export default BettingOver;
const styles = StyleSheet.create({
    container: {
        height: 68,
        flexDirection:'row'
    },
    fqbjStyle:{
        width:75,
        height:45,
        position:'absolute',
        right:36,
        top:8
    },
    leftLineCom:{
        width:21,
        marginHorizontal:3,
        // backgroundColor:'#fff888'
        alignItems:'center'
    },
    cardCom:{
        flex:1,
        backgroundColor:'#45484E',
        borderRadius:3,
        marginRight:8,
        // marginTop:8,
        marginBottom:8,
        flexDirection:'row',
        alignItems:'center'
    },
    righgtGo:{
        width:9,
        height:13,
        marginHorizontal:6
    },
    
    borderYuan:{
        width:9,
        height:9,
        borderRadius:9,
        borderWidth:1,
        borderColor:'#fff',
    },
    borderLine:{
        width:1,
        flex:1,
        backgroundColor:'#fff'
    },

    cardText:{
        flex:1,
        marginLeft:10,
        marginVertical: 7,
    },
    leftTextRow:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    topCom:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    }
});