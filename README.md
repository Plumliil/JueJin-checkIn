# 掘金签到抽奖

### 快速上手

#### 介绍

本脚本可以自动签到以及免费抽奖，定时执行任务，并会发送邮件告知签到抽奖详情

#### 安装

下载文件

~~~shell
git clone git@github.com:Plumliil/JueJin-checkIn.git
~~~
安装依赖

~~~javascript
npm install
~~~

下载后更改配置文件并部署到服务器即可

### 文件介绍
#### config.js 配置文件
cookie值具有时效性，当服务不起作用时，请检查cookie是否过期
~~~javascript
// cookie获取方式
// 登录掘金网站，F12进入开发者模式，点击网络（network）
// 刷新页面，搜索pin_tab_lead...点击进入详情 下拉找到cookie复制值
const cookie = 'xxx'; // 掘金网站cookie

module.exports = {
    // 邮件发送相关参数
    email:{
        port:465, // 一般为465 若不起作用改为 587
        config:{
            smtp:'smtp.xxx.com', // 发件服务器，需要邮箱开启smtp服务
            sender:'xxx@xxx.xxx', // 发件邮箱
            password:'xxxxxx', // 邮箱密码
            name:'掘金签到小助手 ：）', // 邮件标题
            receiv:'xxx@xxx.xxx', // 收件邮箱
            title:'签到详情', // 邮件标题
            body:'' // 发件内容
        }
        
    },
    // 接口相关
    options: {
        // 签到
        checkIn: {
            url: 'https://api.juejin.cn/growth_api/v1/check_in',
            method: 'post',
            headers: {
                cookie
            }
        },
        // 获取签到信息
        getCheckStatus: {
            url: `https://api.juejin.cn/growth_api/v1/get_today_status`,
            method: 'get',
            headers: {
                cookie
            }
        },
        // 获取签到签到天数信息
        getCurCount: {
            url: 'https://api.juejin.cn/growth_api/v1/get_counts',
            method: 'get',
            headers: {
                cookie
            }
        },
        // 获取矿石总数信息
        getCurPoint: {
            url: 'https://api.juejin.cn/growth_api/v1/get_cur_point',
            method: 'get',
            headers: {
                cookie
            }
        },
        // 获取抽奖状态（是否可以免费抽奖）
        getlotteryStatus: {
            url: 'https://api.juejin.cn/growth_api/v1/lottery_config/get',
            method: 'get',
            headers: {
                cookie
            }
        },
        // 抽奖
        draw: {
            url: 'https://api.juejin.cn/growth_api/v1/lottery/draw',
            method: 'post',
            headers: {
                cookie
            }
        },
    }
}
~~~
#### app.js 入口文件
在入口文件中实现签到抽奖功能，定时发送功能以及邮件发送功能
在此可以自定义邮件发送内容

#### logs.txt 签到日志记录
txt文本，对签到数据进行记录
