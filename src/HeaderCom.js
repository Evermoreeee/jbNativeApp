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
        rightRender:PropTypes.any
    }
    static defaultProps = {
        rightRender:null
    }
    renderTabBar(props) {
        if(this.props.rightRender == null){
          return null;
        } else {
          return React.cloneElement(this.props.rightRender(props), props);
        }
    }
    render() {
        const { titleName } = this.props
        return (
            <LinearGradient colors={['#4B525D', '#35383D']} style={styles.container}>
                <Image style={styles.backIcon} source={BACK_ICON}></Image>
                <Text style={styles.titleStyle}>{titleName}</Text>
                <View style={styles.rightBox}>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        width: 8,
        height: 15,
        position: 'absolute',
        left: 18,
        top: 42
    },
    titleStyle : {
        fontSize: 17,
        color: '#fff',
    },
    rightBox:{
        width: 60,
        height: 26,
        position: 'absolute',
        top:35,
        right:6,
        // backgroundColor:'#daf'
    },
  
});