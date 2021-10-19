const { User: { User, newUser }, Online: { Online, newOnline } } = require('../database');
const { btyName } = require('../utils/');

async function pass(ctx, next){
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    const userName = btyName(ctx.from.first_name, ctx.from.last_name);
    const userUserName = ctx.from.username;
    User.findById(userId, (err, user) => {
        if(err){
            console.log("[MW Main Pass]Ошибка обработки пользователя");
            console.error(err);
        }
        if(!user){
            newUser(userId, userName, userUserName, chatId);
            console.log('[MW Main Pass]Новый пользователь был создан');
        }
    });
    next();
}

module.exports = pass;