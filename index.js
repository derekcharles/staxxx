const TelegramBot = require('node-telegram-bot-api');
const fetch = require("node-fetch");
const fs = require("fs");
const FormData = require("form-data");
//for testing
require('@dotenvx/dotenvx').config({path: __dirname + '/.env'})

const wantSaleMenu = {
              "inline_keyboard": [[
                  {
                      "text": "Yes",
                      "callback_data": "Yes"           
                  }, 
                  {
                      "text": "No",
                      "callback_data": "No"            
                  }]
              ]
          }
const extrasMenu = {
            "inline_keyboard": [[
              {
                "text": "UNBLOCK ME $50",
                "callback_data": "UNBLOCK ME $50"
              }],
              [{
                "text": "Blackmail $250",
                "callback_data": "Blackmail $250"
              }],
            ]
}
const customSaleQuestion = {
            "inline_keyboard": [[
              {
                "text": "RP/Fetish Custom",
                "callback_data":"RP/Fetish Custom"
            }],
            [{
              "text":"Video Call",
              "callback_data": "Video Call"
            }],
            [{
              "text": "Extras",
              "callback_data": "Extras"
            }],
          ]
}
const bot = new TelegramBot(process.env.ACCESS_KEY,  {polling: true});
bot.on("business_message", async (msg) => {
  console.log(msg)
  const chatId = msg.chat.id;
  const business = await bot.getBusinessConnection(msg.business_connection_id)
  const reply = msg.text;
  if(reply){
    if(reply.toLowerCase().includes("menu") || reply.toLowerCase().includes("price")){
      bot.sendMessage(chatId, "Hello would you like to see my menu? 😈",{ reply_markup: wantSaleMenu,business_connection_id: business.id });
    }
  }
});
bot.on('callback_query', async (query) => {
  console.log(query)
  const business = await bot.getBusinessConnection(query.message.business_connection_id)
  const chatId = query.message.chat.id;
  const reply = query.data;
  if (reply.includes("Yes")) {
    let readStream = fs.createReadStream("./menu.jpg");
    
    let form = new FormData();
    form.append("photo", readStream);
    try{
        const response = await fetch(
      `https://api.telegram.org/bot${process.env.ACCESS_KEY}/sendPhoto?chat_id=${chatId}&business_connection_id=${query.message.business_connection_id}`,
    
      {
        method: "POST",
        body: form,
      }  
)}
    catch(err){
      console.log(err);
    }

  bot.sendMessage(chatId, "Would you like to order anything? 😈", {reply_markup: customSaleQuestion, business_connection_id:  query.message.business_connection_id})

  } else if (reply.includes("No")) {
    bot.sendMessage(chatId, "okay how can I help you today? 😈", {business_connection_id:  query.message.business_connection_id})

  }
  else if (reply.includes("RP/Fetish Custom")) {
    bot.sendMessage(chatId, "A RP/Fetish Custom! Sounds good 😈", {business_connection_id: query.message.business_connection_id})
  }
  else if (reply.includes("Video Call")){
    bot.sendMessage(chatId, "A video call! Good Choice! 😈", {business_connection_id: query.message.business_connection_id})
  }

});


