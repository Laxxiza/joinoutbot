const { User: { User, updateUserStatus }, Statistics: { Statistics, updaeUserStat } } = require('../../database');
const { btyName, varDate } = require('../../utils');

async function timeOut(ctx){
    const setStatus = "timeout";
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    const userName = btyName(ctx.from.first_name, ctx.from.last_name);
    const userUserName = ctx.from.username;
    const time = varDate.getTimeOnlyString();

    try{
        let addInStat = await updaeUserStat(chatId, userId, setStatus, time);
        let user = await updateUserStatus(userId, setStatus);
        ctx.reply(`Перерыв? Ну ладно, сходи, отдохни!`);
    }
    catch(err){
        console.log("err", err);
    }
}

module.exports = () => timeOut;