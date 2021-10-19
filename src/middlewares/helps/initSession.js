async function session(ctx, next){
    if (!ctx.session) {
        ctx.session = new Map();
    }
    next();
}

module.exports = session;