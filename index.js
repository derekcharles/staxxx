const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
const fs = require("fs");
const FormData = require("form-data");
//for testing
require("@dotenvx/dotenvx").config({ path: __dirname + "/.env" });

const wantSaleMenu = {
  inline_keyboard: [
    [
      {
        text: "Yes",
        callback_data: "Yes",
      },
      {
        text: "No",
        callback_data: "No",
      },
    ],
  ],
};
const extrasMenu = {
  inline_keyboard: [
    [
      {
        text: "UNBLOCK ME $50",
        callback_data: "UNBLOCK ME $50",
      },
    ],
    [
      {
        text: "Blackmail $250",
        callback_data: "Blackmail $250",
      },
    ],
  ],
};
const customSaleQuestion = {
  inline_keyboard: [
    [
      {
        text: "RP/Fetish Custom",
        callback_data: "RP/Fetish Custom",
      },
    ],
    [
      {
        text: "Video Call",
        callback_data: "Video Call",
      },
    ],
    [
      {
        text: "Extras",
        callback_data: "Extras",
      },
    ],
  ],
};
const bot = new TelegramBot(process.env.ACCESS_KEY, { polling: true });
bot.on("business_message", async (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  const reply = msg.text;
  if (reply.toLowerCase().includes("/menu")) {
    let readStream = fs.createReadStream("./menu.jpg");
    let form = new FormData();
    form.append("photo", readStream);
    try {
      await fetch(
        `https://api.telegram.org/bot${process.env.ACCESS_KEY}/sendPhoto?chat_id=${chatId}&business_connection_id=${msg.business_connection_id}`,

        {
          method: "POST",
          body: form,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});
