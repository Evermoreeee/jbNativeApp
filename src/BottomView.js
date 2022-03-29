
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ScrollView
} from 'react-native';

export default class BottomView extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let leftText = '总投注额',rightText = '总可盈利'

        console.log('-----')
        const { statusProps} = this.props
            switch (statusProps) {
                case 2:
                    rightText='总盈亏'
                    break;
                case -1:
                    rightText='总退款'
                default:
                    break;
            }
            // console.log('=+++++++++---==+++---')
            // console.log(this.props.extraProps)
        return (
            <View style={styles.bottomView}>
                <View style={styles.bottomtext}>
                    <Text style={{color:Colors.left_text_color,fontSize:13}}>{leftText}:</Text>
                    <Text style={{color:Colors.left_higt_color,fontSize:13}}>  {this.props.extraProps.leftNumber}</Text>
                </View>
                <View style={[styles.bottomtext,{backgroundColor:'#717C8C'}]}>
                    <Text style={{color:Colors.right_text_color,fontSize:13}}>{rightText}:</Text>
                    <Text style={{color:Colors.right_higt_color,fontSize:13}}>  {this.props.extraProps.rightNumber}</Text>
                </View>
            </View>
        )
    }
}

const Colors = {
    left_text_color:'#8790AB',
    left_higt_color:'#fff',
    right_text_color:'#424D5E',
    right_higt_color:'#90D2D0',
}

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
    bottomView:{
        height:44,
        backgroundColor:'#fff333',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    bottomtext:{
        height:44,
        flex:1,
        backgroundColor:'#474C58',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        fontSize:13,
    }
  })