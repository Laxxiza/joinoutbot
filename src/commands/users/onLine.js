const { User: { User, updateUserStatus }, Statistics: { Statistics, updaeUserStat } } = require('../../database');
const { btyName, varDate } = require('../../utils');

async function onLine(ctx){
    const setStatus = "online";
    const userStatus = ctx.session?.user.status;
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    const userName = btyName(ctx.from.first_name, ctx.from.last_name);
    const userUserName = ctx.from.username;
    const time = varDate.getTimeOnlyString();

    try{
        let message = `Приветствую на линии. Удачного дня, ${userName}!`;
        let addInStat = await updaeUserStat(chatId, userId, setStatus, time);
        let user = await updateUserStatus(userId, setStatus);
        switch(userStatus){
            case 'timeout': message = `Заправился чаем, ${userName}? Теперь можно и поработать!`; break;
            case 'dinner': message = `После вкусного обеда по закону Марины... Вообщем, поработать нужно!`; break;
        }
        ctx.reply(message);
    }
    catch(err){
        console.log("err", err);
    }
}

module.exports = () => onLine;