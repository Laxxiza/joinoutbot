const { Admin: { Admin, newAdmin } } = require('../../database');
const { btyName } = require('../../utils');

async function setAdmin(ctx){
    let admin = await Admin.findById(ctx.from.id);
    let name = btyName(ctx.from.first_name, ctx.from.last_name);
    if(!admin){
        let adminNew = await newAdmin(ctx.from.id, name, ctx.from.username);
        console.log("New admin create");
        ctx.reply("Добавил тебя в админы");
    }
    else{
        ctx.reply("Тебя уже добавили в админы");
        console.log("Admin is not created");
    }
}

module.exports = setAdmin;