import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
  } from 'react-native';
import {Axios} from "../utils/axios"
import HeaderContext from '../HeaderCom';
import StrandCard from '../strandCard'
import SingleCard from '../singleCard'


class BetDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            cardData:null
        }
    }

    componentDidMount() {
        this._initCard()
    }
    async _initCard(){
        const {route} = this.props
        if(route.params&&route.params.ticketId){
            const {ticketId} = route.params
            const url = `/ticket/order/detail?ticketId=${ticketId}`
            const res = await Axios.get(url)
            // console.log(res)
            this.setState({
                cardData:res.data
            })
        }
        
    }
    openCard(){
        const {cardData} = this.state 
        if(cardData == null){return}
        // const item = JSON.parse(JSON.stringify(cardData))
        if (cardData.parlayRule == 11) {
            return (<SingleCard itemData={cardData} statusProps={2} />)
        } else {
            return (<StrandCard itemData={cardData} statusProps={2} />)
        }
       
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#202226',position:'relative'}}>
                <HeaderContext titleName='我的订单' navigation={this.props.navigation}></HeaderContext>
                <ScrollView>
                    {this.openCard()}
                </ScrollView>
            </View>
        )
    }
}

export default BetDetails
