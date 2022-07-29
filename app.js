const axios = require('axios');
const fs = require('fs');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const {
    email,
    options
} = require('./config')

// 零点随机时间
const randomSec = Math.floor(Math.random() * 60);
const randomMin = Math.floor(Math.random() * 60);
const randomTime = `${randomSec} ${randomMin} 0 * * *`;

// 签到抽奖流程
async function startTask(options) {

    // 签到查询
    const {
        data: checkState
    } = await axios(options.getCheckStatus);
    if (!checkState.data) {
        setTimeout(async () => {
            // 签到
            const {
                data: checkIn
            } = await axios(options.checkIn);
            if (checkIn.err_no === 15001) {
                // 抽奖次数查询
                const {
                    data: getlotteryStatus
                } = await axios(options.getlotteryStatus);
                if (getlotteryStatus.data.free_count === 1) {
                    // 抽奖
                    const {
                        data: draw
                    } = await axios(options.draw);
                    if (draw.err_msg === 'success') {
                        // 签到数据
                        const {
                            data: count
                        } = await axios(options.getCurCount);
                        // 矿石数据
                        const {
                            data: point
                        } = await axios(options.getCurPoint);
                        const lottery_name = draw.data.lottery_name;
                        const total_lucky_value = draw.data.total_lucky_value;
                        const draw_lucky_value = draw.data.total_lucky_value;
                        let nowTime = new Date();
                        let message = `
                            <h3>签到成功</h3>
                            <h3>签到时间 ${nowTime}</h3
                            <h3>本次免费抽奖获得奖品： ${lottery_name}</h3
                            <h3>本次抽奖获得幸运值为： ${draw_lucky_value},</h3
                            <h3>当前幸运值为: ${total_lucky_value}/6000</h3
                            <h3>已连续签到${count.data.cont_count}天,累计签到${count.data.sum_count}天,当前累计矿石${point.data}块</h3`
                        let log = {
                            lottery_name,
                            total_lucky_value,
                            draw_lucky_value,
                            count: `连续签到${count.data.cont_count}天,累计签到${count.data.sum_count}天`,
                            point: `当前累计矿石${point.data}块`,
                            time: nowTime,
                        }
                        logging(log)
                        sendEmail(message)
                    }
                }
            }
        }, 3000);

    }

}



// 日志
function logging(log) {
    log = new Date().getTime() + '---' + JSON.stringify(log) + '\n';
    fs.appendFile('logs.txt', log, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("日志写入成功！");
        fs.readFile('logs.txt', function (err, data) {
            if (err) {
                return console.error('日志写入失败', err);
            }
        });
    });
}


// 邮件发送
// 建立 SMTP连接池
const transporter = nodemailer.createTransport({
    host: email.config.smtp,
    secureConnection: true,
    port: email.port,
    secure: true,
    auth: {
        user: email.config.sender,
        pass: email.config.password
    }
})
// 

function sendEmail(message) {
    const mailOptions = {
        from: `"${email.config.name} ?"<${email.config.sender}`,
        to: email.config.receiv,
        subject: email.config.title,
        title: email.config.title,
        html: message
    };
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) return console.log(err);
        console.log('message:', res.messageId);
        console.log('sent:', res.response);
    })
}

// 定点执行
schedule.scheduleJob(randomTime, () => {
    try {
        startTask(options);
    } catch (error) {
        sendEmail('出错了请检查cookie是否过期:', error)
    }
})
