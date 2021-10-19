const { User: { User } } = require('../database');

async function start(ctx, next){
    if(ctx.chat.type != "private") return false;
    const isAdmin = ctx.session?.isAdmin;
    const userId = ctx.from.id;
    try{
        let user = await User.findById(userId);
        if(!user || isAdmin){
            
        }
    }
    catch(err){
        console.log("[MW Start]err", err)
    }
}

module.exports = start;