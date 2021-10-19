const { Statistics: { Statistics, newStat, updateStat } } = require('../../database');
const { varDate } = require('../../utils');

async function statpass(ctx, next){
    const chatId = ctx.chat.id;
    const date = varDate.getDateOnlyString();
    try{
        let statistics = await Statistics.findById(chatId); //.elemMatch('statistics', { 'date':date });
        let curDate = statistics?.statistics.some((stat) => stat.date == date);
        console.log(curDate);
        if(!statistics){
            await newStat(chatId);
            console.log("[MW Online-stat Pass]Новая статистика чата создана");
        }
        else if(statistics){
            if(curDate) {
                console.log("[MW Online-stat Pass]Cтатистика чата уже была ранее создана");
            }
            else {
                await updateStat(chatId, { $push: { 'statistics': { 'date':date, 'timeStamp': Date.now() } } });
                console.log("[MW Online-stat Pass]Новая дата статистики чата создана");
            }
        }
    }
    catch(err){
        console.log("err", err);
        console.log("[MW Online-stat Pass]Новая статистика чата не была создана");
    }
    next();
}

module.exports = statpass;