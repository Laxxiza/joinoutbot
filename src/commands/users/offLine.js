const { User: { User, updateUserStatus }, Statistics: { Statistics, updaeUserStat } } = require('../../database');
const { btyName, varDate } = require('../../utils');

async function offLine(ctx){
    const setStatus = "offline";
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    const userName = btyName(ctx.from.first_name, ctx.from.last_name);
    const userUserName = ctx.from.username;
    const time = varDate.getTimeOnlyString();

    try{
        let addInStat = await updaeUserStat(chatId, userId, setStatus, time);
        let user = await updateUserStatus(userId, setStatus);
        ctx.reply(`Прощай. Отдыхай и набирайся сил, ${userName}!`);
    }
    catch(err){
        console.log("err", err);
    }
}

module.exports = () => offLine;