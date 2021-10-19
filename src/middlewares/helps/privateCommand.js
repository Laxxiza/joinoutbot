async function private(ctx, next) {
    const isPrivate = ctx.chat.type == "private";
    if (!isPrivate) {
        return next();
    }
    console.log("Private Отправляем кнопки");
    ctx.scene.enter("startScene");
}

module.exports = private;
