import { EVENTS } from "./consts.mjs";

function setupBotHandlers(bot, handlers) {
  bot.on(EVENTS.MESSAGE, (msg) => handlers.handleIncomingMessage(bot, msg));
  bot.on(EVENTS.CALLBACK_QUERY, (callbackQuery) => handlers.handleCallbackQuery(bot, callbackQuery));
}

export { setupBotHandlers };
