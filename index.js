const { Bot, InlineKeyboard } = require("grammy");
require('@dotenvx/dotenvx').config({path: __dirname + '/.env'})

const bot = new Bot(process.env.ACCESS_KEY);
const products = [
    {
        name: 'Saucy - Staxx Unlimited Raceplay Custom',
        price: 20.00,
        description: 'Someone ordered a custom through Saucy',
        photoUrl: 'http://vignette2.wikia.nocookie.net/fallout/images/e/e6/Fallout4_Nuka_Cola_Quantum.png'
    },
    {
        name: 'Custom',
        price: 15.00,
        description: 'Price Per minute',
        photoUrl: 'https://vignette2.wikia.nocookie.net/fallout/images/b/b9/Iguana_on_a_stick.png'
  }
]
bot.command("start", async (ctx) =>
    { 
      await ctx.reply("Hello what would you be interested in ?")
      const inlineKeyboard = new InlineKeyboard().text("Staxxx Raceplay Paradise").row()
                                                 .text("Custom").row()
      await ctx.reply({reply_markup: inlineKeyboard})
    })


// Starting the bot
bot.start();