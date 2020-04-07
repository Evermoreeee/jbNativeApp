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
import PropTypes from "prop-types";
import { AnimationConfig ,toFixt2 ,getTimeFliters,sportTypeFliters} from './utils/utils'

const LIVE_ICON = require('./assets/liveIcon.png')

const OPRN_ICON = require('./assets/open.png')
const CLOSE_ICON = require('./assets/close.png')
const VS_ICON = require('./assets/ic_vs.png')
const BG_JB = require('./assets/shuiyin_a.png')
const YING_ICON = require('./assets/ic_ying.png')
const SHU_ICON = require('./assets/ic_shu.png')
const TIE_ICON = require('./assets/img_zoudi.png')

class SingleCard extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            CardDetailShow: false
        }
    }
    static propTypes = {
        itemData: PropTypes.object.isRequired,
    }

    //* 点击card 底部的折叠按钮
    _handleCardBottom() {
        LayoutAnimation.configureNext(AnimationConfig);
        this.setState({
            CardDetailShow: !this.state.CardDetailShow
        })
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

    _renderCardContext(){
        const ItemData = this.props.itemData
        //* 下注项详情
        const DetailData = ItemData.details[0]
        //展开单card render
        if(this.state.CardDetailShow){
            return ( <View style={styles.FoldCard}>
                <View style={styles.FoldlistCom}>
                    <Text style={styles.FoldLeft}>比赛时间:</Text>
                    <Text style={styles.FoldRight}>{getTimeFliters(DetailData.matchDate)}</Text>
                </View>
                <View style={styles.FoldlistCom}>
                    <Text style={styles.FoldLeft}>订单号:</Text>
                    <Text style={styles.FoldRight}>{ItemData.orderId}</Text>
                </View>
                <View style={styles.FoldlistCom}>
                    <Text style={styles.FoldLeft}>投注时间:</Text>
                    <Text style={styles.FoldRight}>{ItemData.createTime}</Text>
                </View>
            </View>)
        }else{
            return null
        }
    }
    render() {
        const ItemData = this.props.itemData
        //* 下注项详情
        const DetailData = ItemData.details[0]
        //* score or vs_icon
        let matchScoreArray = ['','']
        let _renderScore = (<Image style={{width:32,height:42,marginHorizontal:15}} source={VS_ICON}></Image>)
        if(DetailData.matchScore != '' && DetailData.matchScore!= null){
            matchScoreArray = DetailData.matchScore.split(':')
            _renderScore = (<Text style={[styles.scoreNumber, { paddingHorizontal: 30,}]}>:</Text>)
        }
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
        const balanceText =  _text
        const betShowNumber = _number

        //* 走地盘 oddsKind
        const _renderLive = DetailData.oddsKind == 'LiveScout'?(<Image style={styles.liveIcon} source={LIVE_ICON}></Image>):null
        
        //* card open or close
        const BottomIcon = !this.state.CardDetailShow ? CLOSE_ICON : OPRN_ICON
        
        return (
            <View style={styles.CardContainer}>
                <ImageBackground style={styles.shiuyinBg} source={BG_JB}></ImageBackground>
                {/* //*输赢 */}
                {this.betWinIconRender(ItemData)}
                
                <View style={styles.cardCom}>
                    {/* //*title */}
                    <View style={[styles.pdtop, { paddingHorizontal: 30, paddingTop: 12 }]}>
                        <View style={styles.scoreCom}>
                            <View style={styles.scoreName}>
                                <Image style={styles.teamIcon} source={{ uri: DetailData.team1Flag?DetailData.team1Flag:null }}></Image>
                                <Text numberOfLines={1} style={styles.teamZh}>{DetailData.team1Zh} </Text>
                            </View>
                            <Text style={styles.scoreNumber}>{matchScoreArray[0]}</Text>
                        </View>
                        {_renderScore}
                        <View style={styles.scoreCom}>
                            <Text style={styles.scoreNumber}>{matchScoreArray[1]}</Text>
                            <View style={styles.scoreName}>
                                <Image style={styles.teamIcon} source={{ uri: DetailData.team2Flag?DetailData.team2Flag:null }}></Image>
                                <Text numberOfLines={1} style={styles.teamZh}>{DetailData.team2Zh}</Text>
                            </View>
                        </View>
                    </View>
                    {/* //* oder info */}
                    <View style={[styles.pdtop]}>
                        <Text style={[styles.leftText]}>玩法:</Text>
                        <Text style={styles.rightText}>({sportTypeFliters(DetailData.sportType) }){DetailData.marketName}</Text>
                        {/* dataType.oddsKind */}
                        { _renderLive }
                    </View>
                    {/* //*投注项   下注队伍+下注项+odds */}
                    <View style={[styles.pdtop, { paddingTop: 6, paddingRight: 16 }]}>
                        <Text style={[styles.leftText]}>投注项:</Text>
                        <Text style={styles.rightText}>{DetailData.outcomeName} {DetailData.specialBetName}@{DetailData.showOdds}</Text>
                        <View style={styles.pkIcon}>
                            <Text style={{ fontSize: 12, color: '#fff' }}>{HANDICAP}</Text>
                        </View>
                    </View>

                    <View style={[styles.pdtop, { paddingTop: 6 }]}>
                        <Text style={[styles.leftText]}>投注额:</Text>
                        <Text style={styles.rightText}>{toFixt2(ItemData.betAmount)}</Text>
                    </View>

                    <Text style={styles.Profitable}>{balanceText} {betShowNumber}</Text>
                </View>

                {/* //!折叠栏 */}
                { this._renderCardContext()}

                <TouchableOpacity onPress={() => { this._handleCardBottom() }}>
                    <View style={styles.buttonBottom}>
                        <Image style={styles.sanIcon} source={BottomIcon}></Image>
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
        flexDirection: 'column',
        
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
    FoldCard: {
        marginHorizontal: 8,
        minHeight: 50,
        backgroundColor: '#333539',
        paddingTop: 6,
        paddingBottom: 12
    },
    teamZh: {
        fontSize: 12, color: '#fff'
    },
    FoldlistCom: {
        // marginVertical:8,
        marginTop: 8,
        flexDirection: 'row'
    },
    FoldLeft: {
        textAlign: "right",
        width: 72,
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
    rightText: {
        fontSize: 13, color: '#fff', flex: 1, marginLeft: 8
    },
    liveIcon: {
        height: 15,
        width: 50,
        marginRight: 16,
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
        fontSize: 14,
        color: '#13D9C9',
        textAlign: 'right',
        paddingTop: 8,
        paddingRight: 16,
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