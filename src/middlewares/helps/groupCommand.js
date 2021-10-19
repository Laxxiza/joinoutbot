async function group(ctx, next){
    const isPrivate = ctx.chat.type == "private";
    const commandReg = new RegExp(/^[\/][а-яА-Я\w]+$/);
    if(isPrivate){
        console.log("Not Private Пропускаем дальше ля выполнения комманд");
        next();
    }
}

module.exports = group;