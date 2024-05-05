//region Global Imports
import TelegramBot from "node-telegram-bot-api";
//endregion

//region Local Imports
import { setupBotHandlers } from "./setup-bot-handlers.mjs";
import * as handlers from "./handlers.mjs";
import { config } from "../config.mjs";
//endregion

const optionsTelegramBot = {
  polling: true
};

async function startBot() {
  if (!config.TELEGRAM_BOT_TOKEN) {
    throw "ERROR: env variables not set.";
  }
  try {
    const bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN, optionsTelegramBot);
    await setupBotHandlers(bot, handlers);
    console.log("Telegram bot started");
  } catch (error) {
    console.error("Error starting Telegram bot:", error);
    process.exit(1);
  }
}

export { startBot };
