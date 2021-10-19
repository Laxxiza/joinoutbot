const { Statistics: { Statistics, newStat } } = require('../../database');

async function statistics(ctx, next){
    //if(ctx.chat.type == "private") return false;
    const chatId = ctx.chat.id;
    Statistics.findById(chatId, (err, online) => {
        if(err){
            console.log("[MW Stat Init]Cтатистика чата не была создана");
            ctx.reply("Ошибка создания статистики!");
            console.error(err);
        }
        if(!online){
            newStat(chatId);
            console.log("[MW Stat Init]Новая статистика чата создана");
            ctx.reply("Статистика для данного чата создана!");
        }
        else if(online){
            console.log("[MW Stat Init]Статистика чата уже была ранее создана");
        }
    });
    next();
}

module.exports = statistics;