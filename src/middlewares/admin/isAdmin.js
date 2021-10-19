const { Admin: { Admin, newAdmin } } = require('../../database');
const { btyName } = require('../../utils/');

async function isAdmin(ctx, next){
    const userId = ctx.from.id;
    const userName = btyName(ctx.from.first_name, ctx.from.last_name);
    const userUserName = ctx.from.username;
    //ctx.session.isAdmin = false;

    try{
        let admin = await Admin.findById(userId);
        if(!admin){
            console.log("[MW Admin]Админ не найден");
            ctx.session.isAdmin = false;
        }
        else{
            console.log("[MW Admin]Админ найден");
            ctx.session.isAdmin = true;
        }
    }
    catch(err){
        console.log("err", err);
        console.log("[MW Admin]Ошибка");
    }
    next();
}

module.exports = isAdmin;