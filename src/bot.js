const { Telegraf,  Markup, session, Scenes: { BaseScene, Stage } } = require("telegraf");
const mongoose = require("mongoose");
const data = require("./data");
const { AdminScene, StartScene, StatScene } = require('./controllers');
const { isAdmin } = require('./middlewares/admin');
const { privateCommand, groupCommand, initSession } = require('./middlewares/helps');
const { User, userCommand } = require('./middlewares/user/');
const { Stat } = require('./middlewares/statistics');
const { setAdmin, getStat } = require('./commands/admins'); //temp
const { onLine, offLine, timeOut, dinner, fakename } = require('./commands/users');
const { newChannelHundler, leftChannelHundler, newMember, leftMember, CommandHundler } = require('./hundlers');

//const Markup = require('telegraf/markup');

const bot = new Telegraf(data.token);

const stage = new Stage([ 
    AdminScene,
    StartScene,
    StatScene
]);

mongoose.connect(
    data.mongoLink,
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) {
            return console.log(err);
        }
        //bot.context.db = client.db("chatAdmin");
        bot.startPolling();
    }
);

bot.use(session());
bot.use(stage.middleware());
bot.telegram.sendMessage("-1001486496396", "Всем спасибо, кто учавствовал в тестировании данного бота. \nНа данный момент работа над ботом приостановлена. \n С любовью, ваш @lunachrysy");

// bot.use((ctx, next) => {
//     if(ctx.from.username != "lunachrysy") next();
//     const isPrivate = ctx.chat.type == "private";
//     if(isPrivate){
//         console.log("Private");
//     }
//     else {
//         console.log("Not private");
//     }
//     next();
// });

bot.on("text", initSession, isAdmin);

bot.use(privateCommand);

bot.on("text", CommandHundler, isAdmin);

bot.on("text", Stat, User); //!нужно создание чата или нет

//bot.use(stage.middleware());
bot.use((ctx, next) => {
    console.log("Context", ctx);
    next();
});

bot.command("admin", setAdmin);
bot.command("stat", async (ctx) => {
    ctx.scene.enter('startScene');
});

bot.hears(/#налинии/, userCommand('online'), onLine());
bot.hears(/#перерыв/, userCommand('timeout'), timeOut());
bot.hears(/#обед/, userCommand('dinner'), dinner());
bot.hears(/#завершил/, userCommand('offline'), offLine());
bot.hears(/#псевданим/, fakename());
bot.hears(/#test/, async (ctx) => { ctx.reply(`${ctx.chat.type} ${ctx.chat.id}`) });

bot.on("new_chat_member", newChannelHundler());
bot.on("left_chat_member", leftChannelHundler());
