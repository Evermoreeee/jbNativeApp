import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';

// import Color from "../utils/Color";
import LinearGradient from 'react-native-linear-gradient'
const BACK_ICON = require('./assets/back.png')
class HeaderContext extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const { titleName } = this.props

        const titleStyle = {
            fontSize: 17,
            color:'#fff',
        }
        return(
            <LinearGradient  colors={['#4B525D', '#35383D']} style={styles.container}>
                        <Image style={styles.backIcon} source={BACK_ICON}></Image>
                    <Text style={titleStyle}>{titleName}</Text>
            </LinearGradient>
        )
    }
}

export default HeaderContext;
const styles = StyleSheet.create({
    container: {
        height:68,
        paddingTop:30,
        alignItems:'center',
        justifyContent:'center',
    },
    backIcon:{
        width:8,
        height:15,
        position:'absolute',
        left:18,
        top:42
    }
  });