async function command(ctx, next) {
    const commandReg = new RegExp(/^[#\/][а-яА-Я\w]+$/);
    const commandText = ctx.message.text;
    const isCommand = commandText.match(commandReg);
    //console.log(isCommand);
    if (isCommand) {
        if(ctx.chat.type == "private"){
            ctx.reply("На данный момент комманды обрабатываются только в чате где находится бот!");
            return false;
        }
        if (!ctx.session) {
            ctx.session = new Map();
        }
        next();
    }
    else {
        console.log("[MW isCommand] Сообщение не является коммандой");
    }
}

module.exports = command;
