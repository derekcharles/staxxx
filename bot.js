const { Bot } = require("grammy");

const bot = new Bot("7571681882:AAE7_MELOkG1uEHgeU77oe2nmKEsUMKNQMA");

// Listening for messages
bot.on("message:text", (ctx) => ctx.reply("Received: " + ctx.message.text));

// Starting the bot
bot.start();