import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    LayoutAnimation
} from 'react-native';
import { AnimationConfig ,toFixt2 ,getTimeFliters,sportTypeFliters} from './utils/utils'


const OPRN_ICON = require('./assets/open.png')
const CLOSE_ICON = require('./assets/close.png')
const BG_JB = require('./assets/shuiyin_a.png')
const YING_ICON = require('./assets/ic_ying.png')
const SHU_ICON = require('./assets/ic_shu.png')
const TIE_ICON = require('./assets/img_zoudi.png')

class StrandCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            CardDetailShow: false
        }
    }

    _renderBetDetail(item){
        return(
            <View style={styles.detailCom}>
                  <Text style={styles.StrandDetail}>({sportTypeFliters(item.sportType)}){item.marketName}</Text>
                  <Text style={styles.StrandDetail}>[{item.tournamentZh}]</Text>
                  <Text style={styles.StrandDetail}>{`${item.team1Zh}${item.matchScore}${item.team2Zh}`}你洛卡</Text>
                  <Text style={styles.StrandDetail}>{getTimeFliters(item.matchDate)}</Text>
            </View>
        )
    }

    betWinIconRender(ItemData){
        //* 输赢或者走低icon
        let WinBet_ICON = ItemData.winBet == "Win" ? YING_ICON:SHU_ICON
        if(ItemData.winBet == "Tie"){
            WinBet_ICON = TIE_ICON
        }
        if(this.props.statusProps == 2){
            return (
                <ImageBackground style={styles.betReturn} source={WinBet_ICON}></ImageBackground>
            )
        }else{
            return null
        }
        
    }
    render() {
        //* details
        const ItemData = this.props.itemData

        const ItemDataGetail = ItemData.details
        //* 欧盘 香港盘
        const HANDICAP = ItemData.handicap == 'European'?'欧洲盘':'香港盘'
        //* '可盈额' '已结算' balance
        let _text = '可盈额' 
        let _number = toFixt2(ItemData.possibleTurnover)
        
        if(this.props.statusProps == 2){
            _text = '已结算'
            _number = toFixt2(ItemData.profit)
        }
        if(this.props.statusProps == -1){
            _text = ItemData.statusDescription
        }
        if(ItemData.status == 'Canceled'){
            _number = toFixt2(ItemData.statusDescription)
        }
        const _renderOder = (
            <>  
                <View style={[styles.pdtop, { paddingTop: 6 }]}>
                    <Text style={[styles.leftText]}>订单号:</Text>
                    <Text style={styles.rightText}>{ItemData.orderId}</Text>
                </View>
                <View style={[styles.pdtop, { paddingTop: 6 }]}>
                    <Text style={[styles.leftText]}>投注时间:</Text>
                    <Text style={styles.rightText}>{ItemData.createTime}</Text>
                </View>
            </>
        )
        const _renderOderDetail = ItemDataGetail.map((item,index) => {
            return(
                <View key={index}>
                    <Text  style={[styles.rightText]}>{`${item.outcomeName}${item.specialBetName}@${item.showOdds}`}</Text>
                    {this.state.CardDetailShow?this._renderBetDetail(item,index):null}
                </View>
            )
        })

        //* card open or close
        const _oderNumber = this.state.CardDetailShow ? _renderOder : null
        const BottomIcon = !this.state.CardDetailShow ? CLOSE_ICON:OPRN_ICON
        //* 输赢或者走低icon
        let WinBet_ICON = ItemData.winBet == "Win" ? YING_ICON:SHU_ICON
        if(ItemData.winBet == "Tie"){
            WinBet_ICON = TIE_ICON
        }
        return (
            <View style={styles.CardContainer}>
                <ImageBackground style={styles.shiuyinBg} source={BG_JB}></ImageBackground>
                
                {this.betWinIconRender(ItemData)}

                <View style={styles.cardCom}>
                    {/* title */}
                    <View style={styles.pdtop}>
                        <Text style={[styles.leftText, styles.topLeft]}>串关</Text>
                        <Text style={{ fontSize: 15, color: '#13D9C9', marginLeft: 8 }}>({ItemDataGetail.length}串1)</Text>
                    </View>
                    
                    {/* //! 投注项 串关中 包含折叠 */}
                    <View style={[styles.pdtop, { paddingTop: 6, paddingRight: 16 }]}>
                        <Text style={[styles.leftText]}>投注项:</Text>
                        <View style={{flex:1}}>

                        {_renderOderDetail }

                        </View>
                        <View style={styles.pkIcon}>
                            <Text style={{ fontSize: 12, color: '#fff' }}>{HANDICAP}</Text>
                        </View>
                    </View>

                    {/* //* 订单号和 投注时间 折叠 */}
                    {_oderNumber}
                    {/* //* 投注额 */}
                    <View style={[styles.pdtop, { paddingTop: 6 }]}>
                        <Text style={[styles.leftText]}>投注额:</Text>
                        <Text style={styles.rightText}>{toFixt2(ItemData.betAmount)}</Text>
                    </View>
                    {/* //*可盈额 */}
                    <Text style={styles.Profitable}>{_text} {_number}</Text>
                </View>
                {/* //*底部按钮 */}
                <TouchableOpacity onPress={() => { this._handleCardBottom() }}>
                    <View style={styles.buttonBottom}>
                        <Image style={styles.sanIcon} source={BottomIcon}></Image>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    
    //*  点击card 底部的折叠按钮
    _handleCardBottom() {
        LayoutAnimation.configureNext(AnimationConfig);

        this.setState({
            CardDetailShow: !this.state.CardDetailShow
        })
    }
}

export default StrandCard;
const styles = StyleSheet.create({
    CardContainer: {
        marginTop: 1,
    },
    shiuyinBg:{
        position:'absolute',
        bottom:2,
        right:20,
        width:60,
        height:80,
        zIndex:10,
    },
    betReturn:{
        width:68,
        height:68,
        position:'absolute',
        zIndex:10,
        top:74,
        right:68,
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
        height: 32,
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
        width: 80,
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
        paddingRight: 16,
    }
});