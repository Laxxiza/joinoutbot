const { Telegraf, Markup, Scenes: { BaseScene, Stage } } = require("telegraf");
const { scenes } = require('../../text/main.json');
const { getFullKeyboard, getUserKeyboard, getBackKeyboard } = require('../../utils/keyboards');
const { Admin:{ Admin }, Statistics:{ Statistics }, User:{ User } } = require('../../database');

const statScene = new BaseScene('statScene');

statScene.enter(async (ctx) => {
    console.log("Enter from stat");
    await ctx.editMessageText("Пришли дату в формате дд-мм-гггг");
    //ctx.scene.leave();
});

statScene.hears(/\d{2}\-\d{2}\-\d{4}/, async (ctx) => {
    //await ctx.editMessageText(ctx.message.text);
    const userId = ctx.from.id;
    const date = ctx.message.text;
    let admin = await Admin.findById(userId);
    let chat = admin.ch_ids[0];
    let stat = await Statistics.find({'_id':chat}).select({'statistics':{ $elemMatch: { "date":date } }});
    let userStat = stat[0].statistics[0].usersStat;
    let messArr = [];
    userStat.forEach(async support => {
        let userId = support.tg_id;
        let userStatus = support.status;
        let userTime = support.time;
        let user = await User.findById(userId);
        messArr.push(`Пользователь: ${user.tg_name}, статус: ${userStatus}${userTime ? `, время: ${userTime}` : ''}`);
        //console.log(`Пользователь: ${user.tg_name}, статус: ${userStatus}${userTime ? `, время: ${userTime}` : ''}`);
    });
    let messageReply = messArr.join(`\n`);
    console.log(messageReply, messArr);
    //ctx.reply(messageReply);
    //console.log(stat[0].statistics);
    //ctx.scene.enter("adminScene");
});

statScene.leave(async (ctx) => {
    console.log("Leave from stat");
})

module.exports = statScene;