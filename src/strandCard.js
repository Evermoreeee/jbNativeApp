import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,

} from 'react-native';
const LIVE_ICON = require('./assets/liveIcon.png')
const SAN_ICON = require('./assets/san.png')

class StrandCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CardDetailShow: false
        }
    }
    render() {
        const _renderOder = (
            <>  
            <View style={[styles.pdtop, { paddingTop: 6 }]}>
                    <Text style={[styles.leftText]}>订单号:</Text>
                    <Text style={styles.rightText}>921331313131424243</Text>
                </View>
                <View style={[styles.pdtop, { paddingTop: 6 }]}>
                    <Text style={[styles.leftText]}>投时间:</Text>
                    <Text style={styles.rightText}>2018/08/16 17:55</Text>
                </View>
                
            </>
        )
        const _renderOderDetail = this.state.CardDetailShow? (
            <View style={styles.detailCom}>
                  <Text style={styles.StrandDetail}>(足球)全场-1X2</Text>
                  <Text style={styles.StrandDetail}>[印度足球甲级联赛]</Text>
                  <Text style={styles.StrandDetail}>皇家克什米尔1:0你洛卡</Text>
                  <Text style={styles.StrandDetail}>03/04 16:30</Text>
            </View>
        ):null
        
        const _oderNumber = this.state.CardDetailShow ? _renderOder : null
        return (
            <View style={styles.CardContainer}>
                <View style={styles.cardCom}>
                    {/* title */}
                    <View style={styles.pdtop}>
                        <Text style={[styles.leftText, styles.topLeft]}>串关</Text>
                        <Text style={{ fontSize: 15, color: '#13D9C9', marginLeft: 8 }}>(2串1)</Text>
                    </View>

                    {/* <View style={[styles.pdtop]}>
                        <Text style={[styles.leftText]}>玩法:</Text>
                        <Text style={styles.rightText}>(足球)全场-让分</Text>
                        <Image style={styles.liveIcon} source={LIVE_ICON}></Image>
                    </View> */}
                    {/* //! 投注额 串关中 包含折叠 */}
                    <View style={[styles.pdtop, { paddingTop: 6, paddingRight: 8 }]}>
                        <Text style={[styles.leftText]}>投注项:</Text>
                        <View style={{flex:1}}>
                            <Text style={styles.rightText}>你卡洛@5.3</Text>
                            {/* //!detailContext */}
                            {_renderOderDetail }
                            <Text style={styles.rightText}>ARSENAL 0(0.5)@1.79</Text>
                            {/* //!detailContext */}
                            {_renderOderDetail }

                            <Text style={styles.rightText}>大3.5/4@1.79</Text>
                            {/* //!detailContext */}
                            {_renderOderDetail }

                        </View>
                        <View style={styles.pkIcon}>
                            <Text style={{ fontSize: 12, color: '#fff' }}>欧洲盘</Text>
                        </View>
                    </View>

                    

                    {/* //* 订单号和 投注时间 折叠 */}
                    {_oderNumber}

                    <View style={[styles.pdtop, { paddingTop: 6 }]}>
                        <Text style={[styles.leftText]}>投注额:</Text>
                        <Text style={styles.rightText}>100.00</Text>
                    </View>

                    <Text style={styles.Profitable}>可盈利 +300</Text>
                </View>
                {/* //*底部按钮 */}
                <TouchableOpacity onPress={() => { this._handleCardBottom() }}>
                    <View style={styles.buttonBottom}>
                        <Image style={styles.sanIcon} source={SAN_ICON}></Image>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    
    //*  点击card 底部的折叠按钮
    _handleCardBottom() {
        this.setState({
            CardDetailShow: !this.state.CardDetailShow
        })
    }
}

export default StrandCard;
const styles = StyleSheet.create({
    CardContainer: {
        marginTop: 1,
        flexDirection: 'column'
    },
    cardCom: {
        flex: 1,
        backgroundColor: '#45484E',
        paddingBottom:12
    },
    StrandDetail:{
        marginLeft:8,
        marginTop:4,
        flex:1,
        color:"#AAA"
    },
    detailCom:{
        marginTop:6,
        marginBottom:12
    },
    buttonBottom: {
        backgroundColor: '#2F3032',
        height: 26,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sanIcon: {
        width: 18,
        height: 14
    },
    topLeft: {
        color: '#fff',
        fontSize: 15
    },

    pdtop: {
        paddingTop: 10, flexDirection: "row"
    },
    leftText: {
        width: 70,
        // backgroundColor:'#fff333',
        textAlign: 'right',
        color: '#AAAAAA',
        fontSize: 13
    },
    rightText:{
        fontSize: 13, color: '#fff', flex: 1 ,marginLeft:8
    },
    liveIcon: {
        height: 15,
        width: 50,
        marginRight: 8,
    },
    pkIcon: {
        height: 18,
        width: 51,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Profitable: {
        flex: 1,
        fontSize: 15,
        color: '#13D9C9',
        textAlign: 'right',
        paddingTop:8,
        paddingRight: 8,
    }
});