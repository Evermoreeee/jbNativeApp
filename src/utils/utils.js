

export const AnimationConfig = {
    duration: 100,   //动画持续时间
    create: {    //若是新布局的动画类型
        type: 'linear',  //线性模式，LayoutAnimation.Types.linear 写法亦可
        property: 'opacity'  //动画属性，除了opacity 还有一个 scaleXY 可以配置，LayoutAnimation.Properties.opacity 写法亦可
    },
    update: {  //若是布局更新的动画类型
        type: 'linear',   //弹跳模式
        springDamping: 0.4  //弹跳阻尼系数
    }
}

export const toFixt2 = number =>{
    return Number(number).toFixed(2)
}

//* 时间格式化过滤
export const getTimeFliters = data => {
    let dataArray = data.split(" ");
    let dayArray = dataArray[0].split("-");
    let time = dataArray[1].substring(0, 5);
    return `${dayArray[1]}/${dayArray[2]} ${time}`;
}

//* 🏊‍♀️typeFliters
export const sportTypeFliters = type =>{
    let _sportName = ''
    switch(type){
        case 'Soccer': _sportName = '足球';break;
        case 'Basketball': _sportName = '篮球';break;
        case 'ESports': _sportName = '电竞';break;
        case 'Tennis': _sportName = '网球';break;
        case 'Snooker': _sportName = '斯诺克';break;
    }
    return _sportName;
}