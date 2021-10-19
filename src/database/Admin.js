const { Admin } = require("../models");
const { btyName } = require('../utils/');

async function newAdmin(Id, Name, Username) {
    const userId = Id;
    const name = Name;
    const username = Username;
    try{
        let newAdmin = new Admin({
            _id: userId,
            tg_id: userId,
            tg_username: username,
            tg_name: name
        });
        await newAdmin.save();
        console.log("[DB]Новый админ создан!");
        return newAdmin;
    }
    catch(err){
        console.error("err", err);
        console.log("[DB]Новый админ не создан!");
    }
}

async function addChannel(Id, ChatId){
    const userId = Id;
    const chatId = ChatId;

    let options = { $push: {'ch_ids':chatId} };
    await updateAdmin(userId, options);
}

async function removeChannel(Id, ChatId){
    const userId = Id;
    const chatId = ChatId;

    let options = { $pull: {'ch_ids':chatId} };
    await updateAdmin(userId, options);
}

async function updateAdmin(Id, Options){
    const userId = Id;
    const options = Options;
    try{
        if (options) {
            let update = await Admin.findByIdAndUpdate(userId, options);
            console.log("[DB]Админ отредактирован/изменен");

        } else {
            console.log("[DB]Пустые опции обновления");
        }
    }
    catch(err){
        console.log("err", err);
        console.log("[DB]Админ не был отредактирован/изменен");
    }
}

module.exports = { Admin, newAdmin, addChannel, removeChannel };