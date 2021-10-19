const { Channel } = require('../models');

async function newChannel(Id, Name, Admin_Id) {
    const chatId = Id;
    const chatName = Name;
    const adminId = Admin_Id;
    try{
        let newChannel = new Channel({
            _id: chatId,
            ch_id: chatId,
            ch_name: chatName,
            admins_id: [adminId],
            isWork: true
        });
        await newChannel.save();
        console.log("[DB]Новый чат создан!");
        return newChannel;
    }
    catch(err){
        console.error("[DB]err", err);
        console.log("[DB]Новый чат не создан!");
    }
}

async function deleteChannel(Id) {
    const chatId = Id;
    try{
        let deleteChannel = await Channel.findByIdAndRemove(chatId);
        console.log("[DB]Чат удален!");
    }
    catch(err){
        console.log("err", err);
        console.log("[DB]Чат не был удален!");
    }
}

async function updateChannelAdmin(Id, UserId){
    const chatId = Id;
    const userId = UserId;
    const options = {$push:{ 'admins_id':userId }};
    updateUser(chatId, options);
}

async function updateChannel(Id, Options){
    const userId = Id;
    const options = Options;
    try{
        if (options) {
            let update = await Channel.findByIdAndUpdate(userId, options);
            console.log("[DB]Чат отредактирован/изменен");

        } else {
            console.log("[DB]Пустые опции обновления");
        }
    }
    catch(err){
        console.log("err", err);
        console.log("[DB]Чат не был отредактирован/изменен");
    }
}

module.exports = { Channel, newChannel, deleteChannel, updateChannelAdmin }