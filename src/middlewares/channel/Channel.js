const { Channel: { Channel, newChannel } } = require("../../database");

async function channelpass(ctx, next) {
    const chatId = ctx.chat.id;

    try {
        let channel = await Channel.findById(chatId);
        if (!channel) {
            console.log("[MW Channel]НУжен новый чат");
            await newChannel();
        } else {
            console.log("[MW Channel]Чат уже был создан");
        }
    } catch (err) {
        console.log("[MW Channel]err", err);
        console.log("[MW Channel]Новый чат не был создан");
    }
    next();
}

module.exports = channelpass;
