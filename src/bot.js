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
        bot.startPolling();
    }
);

bot.use(session());
bot.use(stage.middleware());
bot.on("text", initSession, isAdmin);

bot.use(privateCommand);

bot.on("text", CommandHundler, isAdmin);

bot.on("text", Stat, User); //!нужно создание чата или нет

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

bot.on("new_chat_member", newChannelHundler());
bot.on("left_chat_member", leftChannelHundler());
