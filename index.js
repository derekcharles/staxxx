const { Bot } = require("grammy");
require('@dotenvx/dotenvx').config({path: __dirname + '/.env'})

const bot = new Bot(process.env.ACCESS_KEY);

// Listening for messages
bot.command("start", async (ctx) => {
    const payload = ctx.match;
    if(payload.startsWith("bizChat")){
        const id = payload.slice(7);
        await ctx.reply(`Let's manage chat ${id}`);
    }
}),
// Starting the bot
bot.start();