const cookie = 'xxx';

module.exports = {
    email:{
        port:465,
        config:{
            smtp:'smtp.xxx.com',
            sender:'xxx@xxx.xxx',
            password:'xxxxxx',
            name:'掘金签到小助手 ：）',
            receiv:'xxxx', 
            title:'签到详情',
            body:'' // 发件内容
        }
        
    },
    options: {
        checkIn: {
            url: 'https://api.juejin.cn/growth_api/v1/check_in',
            method: 'post',
            headers: {
                cookie
            }
        },
        getCheckStatus: {
            url: `https://api.juejin.cn/growth_api/v1/get_today_status`,
            method: 'get',
            headers: {
                cookie
            }
        },
        getCheckDays: {
            url: 'https://api.juejin.cn/growth_api/v1/get_counts',
            method: 'get',
            headers: {
                cookie
            }
        },
        getCurCount: {
            url: 'https://api.juejin.cn/growth_api/v1/get_counts',
            method: 'get',
            headers: {
                cookie
            }
        },
        getCurPoint: {
            url: 'https://api.juejin.cn/growth_api/v1/get_cur_point',
            method: 'get',
            headers: {
                cookie
            }
        },
        getlotteryStatus: {
            url: 'https://api.juejin.cn/growth_api/v1/lottery_config/get',
            method: 'get',
            headers: {
                cookie
            }
        },
        draw: {
            url: 'https://api.juejin.cn/growth_api/v1/lottery/draw',
            method: 'post',
            headers: {
                cookie
            }
        },
    }
}