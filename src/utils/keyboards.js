const { Markup } = require("telegraf");
const { keyboards } = require("../text/main");

const mainKey = keyboards.main_keyboard;
const adminKey = keyboards.admin_keyboard;
const backKey = keyboards.back_keyboard;
const buttons = {
    start: {
        adminPan: Markup.button.callback(mainKey.admin, "adminPan"),
        userPan: Markup.button.callback(mainKey.user, "userPan"),
    },
    admin: {
        statistics: Markup.button.callback(adminKey.statistics, "statPan"),
    },
    goback: Markup.button.callback(backKey.back, "goback")
}

function getFullKeyboard(){
    const mainKeyboard = Markup.inlineKeyboard([
        buttons.start.adminPan,
        buttons.start.userPan
    ]);
    return mainKeyboard;
}

function getAdminKeyboard(){
    const mainKeyboard = Markup.inlineKeyboard([
        buttons.admin.statistics,
        buttons.goback
    ]);
    return mainKeyboard;
}

function getUserKeyboard(){
    const mainKeyboard = Markup.inlineKeyboard([
        buttons.start.userPan
    ]);
    return mainKeyboard;
}

function getBackKeyboard(){
    const mainKeyboard = Markup.inlineKeyboard([
        buttons.goback
    ]);
    return mainKeyboard;
}

module.exports = { getFullKeyboard, getAdminKeyboard, getUserKeyboard, getBackKeyboard };