import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Platform,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
// import Color from "../utils/Color";
import LinearGradient from 'react-native-linear-gradient'
const BACK_ICON = require('./assets/back.png')

class HeaderContext extends Component {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        titleName: PropTypes.string.isRequired,
        rightRender:PropTypes.any,
        navigation:PropTypes.object
    }
    static defaultProps = {
        rightRender:null,
        navigation:null
    }
    renderTabBar(props) {
        if(this.props.rightRender == null){
          return null;
        } else {
          return React.cloneElement(this.props.rightRender(props), props);
        }
    }
    hendleBack(props){
        const { navigation } = this.props
        // navigation.goBack()
        // console.log(this.props)
        if(navigation){
            navigation.goBack()
        }
    }
    render() {
        const { titleName } = this.props
        return (
            <LinearGradient colors={['#4B525D', '#35383D']} style={styles.container}>
                    <TouchableOpacity onPress={()=>{this.hendleBack()}}>
                        <View style={styles.navBox}>
                            <Image style={styles.backIcon} source={BACK_ICON}></Image>
                        </View>
                    </TouchableOpacity>
                <Text style={styles.titleStyle}>{titleName}</Text>
               
                <View style={styles.navBox}>
                    {this.renderTabBar()}
                </View>
            </LinearGradient>
        )
    }
}

export default HeaderContext;
const styles = StyleSheet.create({
    container: {
        height: 68,
        paddingTop: 30,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBox:{
        width:80,
       justifyContent:'center'
    },
    backIcon: {
        width: 8,
        height: 15,
        marginLeft:15

    },
    titleStyle : {
        flex:1,
        fontSize: 17,
        color: '#fff',
        textAlign:'center'
    },
    rightBox:{
        width: 60,
        height: 26,
    },
  
});