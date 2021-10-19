const { User: { User, newUser }} = require('../../database');
const btyName = require('../../utils/btyName');

async function userpass(ctx, next){
    //console.log("Проверка наличия юзера в базе");
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    const userName = btyName(ctx.from.first_name, ctx.from.last_name);
    const userUserName = ctx.from.username;
    try{
        let user = await User.findById(userId);
        if(!user){
            user = await newUser(userId, userName, userUserName, chatId);
            console.log('[MW User Pass]Новый пользователь был создан');
        }
        else if(user){
            console.log('[MW User Pass]Новый пользователь уже был ранее создан');
        }
        ctx.session.user = user;
    }
    catch(err){
        console.log("err", err);
        console.log("[MW User Pass]Ошибка обработки пользователя");
    }
    next();
}

module.exports = userpass;