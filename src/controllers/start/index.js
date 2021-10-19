const { Telegraf, Markup, Scenes: { BaseScene, Stage } } = require("telegraf");
const { scenes } = require('../../text/main.json');
const { getFullKeyboard, getUserKeyboard, getBackKeyboard } = require('../../utils/keyboards');

const startScene = new BaseScene('startScene');

let isAdmin;
let keyboard;

startScene.enter(async (ctx) => {
    console.log("Enter from start");
    isAdmin = ctx.session?.isAdmin;
    keyboard = isAdmin ? getFullKeyboard(): getUserKeyboard();
    await ctx.reply(scenes.start, keyboard);
});

startScene.action("adminPan", async (ctx) => {
    await ctx.scene.enter("adminScene");
    ctx.answerCbQuery();
});

startScene.action("goback", async (ctx) => {
    await ctx.editMessageText(scenes.start, keyboard);
    ctx.answerCbQuery();
});

startScene.leave(async (ctx) => {
    console.log("Leave from start");
})

module.exports = startScene;