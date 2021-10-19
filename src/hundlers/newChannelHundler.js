const { Admin: { Admin, addChannel }, Channel: { Channel, newChannel } } = require('../database');
const text = require('../text');

async function newBotChannel(ctx) {
    const chatId = ctx.chat.id;
    const chatName = ctx.chat.title;
    const userId = ctx.from.id;
    const newMember = ctx.message.new_chat_member;

    if (newMember.id == ctx.botInfo.id) {
        console.log("[MW NewMember]Добавлен бот");
        try{
            let admin = await Admin.findById(userId);
            let adminChannels = admin?.ch_ids.some((chat) => chat);
            if(admin && !adminChannels){
                let newChan = await newChannel(chatId, chatName, userId);
                await addChannel(userId, chatId);
                console.log("[MW NewMember]Чат создан/Бот добавлен");
            }
            else if(adminChannels){
                console.log("[MW NewMember]Бот не был добавлен");
                await ctx.reply("У данного капитана уже есть чаты!");
                ctx.leaveChat();
            }
            else {
                console.log("[MW NewMember]Бот не был добавлен");
                await ctx.reply(text.notAccess);
                ctx.leaveChat();
            }
        }
        catch(err){
            console.log("err", err);
            ctx.leaveChat();
        }
    } else {
        console.log("[MW NewMember]Пришел польз");
    }
}

module.exports = () => newBotChannel;
