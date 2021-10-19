function command(status) {
    return async function (ctx, next) {
        const userStatus = ctx.session?.user.status;
        try {
            if (userStatus == status) {
                let replyMess = '';
                switch(status){
                    case 'online': replyMess = "Вижу, что ты уже на линии!"; break;
                    case 'timeout': replyMess = "Я вижу, что ты на уже на перерыве!"; break;
                    case 'dinner': replyMess = "Обед? Ты уже обедаешь!"; break;
                    case 'offline': replyMess = "Тебя сейчас и так нет на линии!"; break;
                }
                ctx.reply(replyMess);
                return false;
            }
            next();
        } catch (err) {
            console.log("err", err);
            console.log(
                "[MW User Command]Ошибка обработки команды пользователя"
            );
        }
    };
}

module.exports = command;
