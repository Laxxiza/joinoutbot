const { Admin: { Admin, removeChannel }, Channel: { Channel, deleteChannel } } = require('../database');

async function leftBotChannel(ctx) {
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    const leftMember = ctx.message.left_chat_member;

    if (leftMember.id == ctx.botInfo.id) {
        try{
            let channel = await Channel.findById(chatId);
            if(channel){
                let removeChan = await deleteChannel(chatId);
                await removeChannel(userId, chatId);
                console.log("[MW LeftBot]Бот удален из чата");
            }
            else{
                console.log("[MW LeftBot]Чат не был найтен в базе");
            }
        }
        catch(err){
            console.log("err", err);
        }
    }
    else{
        console.log("Ушел польз");
    }
}

module.exports = () => leftBotChannel;