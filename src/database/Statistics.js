const { Statistics } = require("../models");
const Stat = require("../models/Statistics");
const { varDate } = require("../utils");
const { getDateOnlyString } = require('../utils/varDate');

async function newStat(Id) {
    const chatId = Id;
    try{
        let newStat = new Statistics({
            _id: chatId,
            ch_id: chatId,
            statistics: [{
                date: getDateOnlyString(),
                timeStamp: Date.now()
            }]
        });
        let saveStat = await newStat.save();
        console.log("[DB]Новая статистика создана");
    }
    catch(err){
        console.error("err", err);
        console.log("[DB]Новая статистика не создана");
    }
    
}

async function updaeUserStat(Id, UserId, Status, Time){
    const chatId = Id;
    const userId = UserId;
    const status = Status;
    const time = Time;
    const date = varDate.getDateOnlyString();
    const filter = {'_id':chatId, 'statistics': { $elemMatch:  { 'date':date } } };
    const options = { $push : { 'statistics.$.usersStat': { 'tg_id':userId, 'status':status, 'time':time } } };
    updateStat(chatId, options, filter);
}

async function updateStat(Id, Options, Filter){
    const chatId = Id;
    const filter = Filter ?? { '_id':chatId };
    const options = Options;
    try{
        if (options) {
            let update = await Statistics.findOneAndUpdate(filter, options);
            console.log("[DB]Данные статистики обновлены");
        }
        else{
            console.log("[DB]Пустые опции обновления");
        }
    }
    catch(err){
        console.log("err", err);
        console.log("[DB]Ошибка обновления данных статистики");
    }
}

module.exports = { Statistics, newStat, updaeUserStat, updateStat };