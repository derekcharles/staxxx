const { Bot } = require("grammy");
require('@dotenvx/dotenvx').config()

const bot = new Bot(process.env.ACCESS_KEY);

// Listening for messages
bot.on("message:text", (ctx) => ctx.reply("Received: " + ctx.message.text));

// Starting the bot
bot.start();