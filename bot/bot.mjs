//region Global Imports
import TelegramBot from "node-telegram-bot-api";
//endregion

//region Local Imports
import { setupBotHandlers } from "./setupBotHandlers.mjs";
//endregion

const { TELEGRAM_BOT_TOKEN } = process.env;
const optionsTelegramBot = {
  // webHook: { port: PORT }
  polling: true
  // key: readFileSync('../server.key'),
  // cert: readFileSync('../server.crt')
};

async function startBot() {
  if (!TELEGRAM_BOT_TOKEN) {
    throw "ERROR: env variables not set.";
  }
  try {
    const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, optionsTelegramBot);
    await setupBotHandlers(bot);
    console.log("Telegram bot started");
  } catch (error) {
    console.error("Error starting Telegram bot:", error);
    process.exit(1);
  }
}

export { startBot };
