
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground
} from 'react-native';
import {toFixt2} from '../utils/utils'

const BG_JB = require('../assets/ic_shuiyin_fly.png')

const Recharge = (props) => {
    const { cardOption ,isLastCard} = props
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
                                <Text style={{fontSize: 13,color:'#fff'}}>{cardOption.title}</Text>
                            </View>
                            <Text style={[{fontSize: 13,color:'#fff'}]}>充值进行中</Text>
                        </View>
                        <View style={styles.leftTextRow}>
                            <View style={styles.topCom} >
                                <Text style={{fontSize: 13,color:'#8D8E91'}}>{cardOption.confirmTime}</Text>
                            </View>
                            <Text style={[{fontSize: 13,color:'#F1935F'}]}>+{toFixt2(cardOption.amount)}</Text>
                        </View>
                        <View style={styles.leftTextRow}>
                            <Text style={{fontSize: 13,color:'#8D8E91',marginRight:5}}>订单号: {cardOption.orderID}</Text>
                        </View>
                    </View>
                    <ImageBackground style={styles.fqbjStyle} source={BG_JB}></ImageBackground>
                </View>
            </View>
    )
}

export default Recharge;
const styles = StyleSheet.create({
    container: {
        height: 88,
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
        paddingRight:12,
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