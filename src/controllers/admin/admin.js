const { Telegraf, Markup, Scenes: { BaseScene, Stage } } = require("telegraf");
const { scenes } = require('../../text/main.json');
const { getAdminKeyboard, getBackKeyboard } = require('../../utils/keyboards');

const adminScene = new BaseScene('adminScene');

adminScene.enter(async (ctx) => {
    console.log("Enter from admin");
    await ctx.editMessageText(scenes.start, getAdminKeyboard());
    //ctx.scene.leave();
});

adminScene.action("statPan", async (ctx) => {
    await ctx.scene.enter("statScene");
    ctx.answerCbQuery();
});

adminScene.action("goback", async (ctx) => {
    ctx.deleteMessage();
    await ctx.scene.enter("startScene");
    ctx.answerCbQuery();
});

adminScene.leave(async (ctx) => {
    console.log("Leave from admin");
})

module.exports = adminScene;