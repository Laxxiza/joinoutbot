const { User } = require("../models");
const { btyName } = require('../utils/');

async function newUser(Id, Name, Username, Ch_Id) {
    const chatId = Ch_Id;
    const userId = Id;
    const name = Name;
    const username = Username;
    try{
        let newUser = new User({
            _id: userId,
            tg_id: userId,
            tg_username: username,
            tg_name: name,
            ch_id: chatId
        });
        await newUser.save();
        console.log("[DB]Новый юзер создан!");
        return newUser;
    }
    catch(err){
        console.error("err", err);
        console.log("[DB]Новый юзер не создан!");
    }
}

async function updateUserStatus(Id, Status){
    const userId = Id;
    const status = Status;
    const options = {'status':status};
    updateUser(userId, options);
}

async function updateUser(Id, Options){
    const userId = Id;
    const options = Options;
    try{
        if (options) {
            let update = await User.findByIdAndUpdate(userId, options);
            console.log("[DB]Юзер отредактирован/изменен");

        } else {
            console.log("[DB]Пустые опции обновления");
        }
    }
    catch(err){
        console.log("err", err);
        console.log("[DB]Юзер не был отредактирован/изменен");
    }
}

module.exports = { User, newUser, updateUserStatus, updateUser };