import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,

} from 'react-native';
import PropTypes from "prop-types";
const LIVE_ICON = require('./assets/liveIcon.png')
const SAN_ICON = require('./assets/san.png')

class SingleCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CardDetailShow: false
        }
    }
    //*  点击card 底部的折叠按钮
    _handleCardBottom() {
        this.setState({
            CardDetailShow: !this.state.CardDetailShow
        })
    }
    render() {
        const teamImage1 = 'https://static.visa0.com/38084.png'
        const teamImage2 = 'https://static.visa0.com/47465.png'

        const _renderItem = (<View style={styles.FoldCard}>
            <View style={styles.FoldlistCom}>
                <Text style={styles.FoldLeft}>比赛时间:</Text>
                <Text style={styles.FoldRight}>04/05 15:00</Text>
            </View>
            <View style={styles.FoldlistCom}>
                <Text style={styles.FoldLeft}>订单号:</Text>
                <Text style={styles.FoldRight}>893178391631631ww23</Text>
            </View>
            <View style={styles.FoldlistCom}>
                <Text style={styles.FoldLeft}>投注时间:</Text>
                <Text style={styles.FoldRight}>2018/08/16 17:55</Text>
            </View>
        </View>)

        let _renderCardContext = this.state.CardDetailShow ? _renderItem : <View></View>
        return (

            <View style={styles.CardContainer}>
                <View style={styles.cardCom}>
                    {/* //*title */}
                    <View style={[styles.pdtop, { paddingHorizontal: 30, paddingTop: 12 }]}>
                        <View style={styles.scoreCom}>
                            <View style={styles.scoreName}>
                                <Image style={styles.teamIcon} source={{ uri: teamImage1 }}></Image>
                                <Text style={{ fontSize: 12, color: '#fff' }}>罢赛咯那</Text>
                            </View>
                            <Text style={styles.scoreNumber}>3</Text>
                        </View>
                        <Text style={[styles.scoreNumber, { paddingHorizontal: 30 }]}>:</Text>
                        <View style={styles.scoreCom}>
                            <Text style={styles.scoreNumber}>3</Text>
                            <View style={styles.scoreName}>
                                <Image style={styles.teamIcon} source={{ uri: teamImage2 }}></Image>
                                <Text style={{ fontSize: 12, color: '#fff' }}>皇家马德里</Text>
                            </View>
                        </View>
                    </View>
                    {/* //* oder info */}
                    <View style={[styles.pdtop]}>
                        <Text style={[styles.leftText]}>玩法:</Text>
                        <Text style={styles.rightText}>(足球)全场-让分</Text>
                        <Image style={styles.liveIcon} source={LIVE_ICON}></Image>
                    </View>

                    <View style={[styles.pdtop, { paddingTop: 6, paddingRight: 8 }]}>
                        <Text style={[styles.leftText]}>投注项:</Text>
                        <Text style={styles.rightText}>ARSENAL 0(0.5)@1.79</Text>
                        <View style={styles.pkIcon}>
                            <Text style={{ fontSize: 12, color: '#fff' }}>欧洲盘</Text>
                        </View>
                    </View>

                    <View style={[styles.pdtop, { paddingTop: 6 }]}>
                        <Text style={[styles.leftText]}>投注额:</Text>
                        <Text style={styles.rightText}>100.00</Text>
                        {/* <Image style={styles.liveIcon} source={LIVE_ICON}></Image> */}
                    </View>

                    <Text style={styles.Profitable}>可盈利 +300</Text>
                </View>

                {/* //!折叠栏 */}
                {_renderCardContext}

                <TouchableOpacity onPress={() => { this._handleCardBottom() }}>
                    <View style={styles.buttonBottom}>
                        <Image style={styles.sanIcon} source={SAN_ICON}></Image>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

export default SingleCard;
const styles = StyleSheet.create({


    CardContainer: {
        marginTop: 1,
        // minHeight: 201,
        flexDirection: 'column'
    },

    FoldCard: {
        marginHorizontal: 8,
        minHeight: 50,
        backgroundColor: '#333539',
        paddingBottom: 8
    },
    FoldlistCom: {
        // marginVertical:8,
        marginTop: 8,
        flexDirection: 'row'
    },
    FoldLeft: {
        textAlign: "right",
        width: 62,
        color: '#AAAAAA',
        fontSize: 13
    },
    FoldRight: {
        color: '#fff',
        marginLeft: 8
    },


    cardCom: {
        flex: 1,
        backgroundColor: '#45484E',
        paddingBottom: 12
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
    rightText: {
        fontSize: 13, color: '#fff', flex: 1, marginLeft: 8
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
    },

    scoreCom: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center'
    },
    scoreName: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"#fff333"
    },
    scoreNumber: {
        fontSize: 20,
        color: '#fff'
    },
    teamIcon: {
        width: 24,
        height: 24,
        backgroundColor: '#A3A5A6',
        borderRadius: 24,
        marginBottom: 6,
    }
});