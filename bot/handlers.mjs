//region Local Imports
import { CALLBACK_EVENTS, OPTIONS, chatState } from "./consts.mjs";
import { messageIdsMap } from "./sharedState.mjs";
import { validatePhoneNumber } from "./validation/numberValidation.mjs";
import { isRateLimited } from "./utilities/isRateLimited.mjs";
//endregion

function handleIncomingMessage({ bot, chatId, message, firstName, reply_to_message, userId }) {
  // Check if user is rate limited
  if (isRateLimited(chatId)) {
    bot.sendMessage(chatId, "You are sending too many requests. Please try again later.");
    return;
  }

  const messageId = messageIdsMap.get(chatId);

  let isMessageIdMatched = messageId === 'phoneNumber' || messageId === reply_to_message?.message_id;
  switch (true) {
    case /^\/start/i.test(message):
      handleFirstVisit({ bot, chatId, firstName });
      break;
    case isMessageIdMatched:
      handleSayGoodbyeSoon({bot, chatId, msg: message, userId, firstName});
      break;
    default:
      // handleUnknownMessage(bot, chatId);
      break;
  }
}

async function handleCallbackQuery(
  bot,
  {
    data,
    message: {
      chat: { id: chatId },
    }
  }
) {

  if (data === CALLBACK_EVENTS.book_activity_registration) {
    bot.sendMessage(chatId, `Виберіть:`, {
      reply_markup: {
        one_time_keyboard: true,
        inline_keyboard: [
          [
            { text: "Реєстрація Spolka z O.O.", url: process.env.GOOGLE_FORM_URL },
            { text: "Реєстрація JDG", url: process.env.GOOGLE__SUB_FORM_URL } // First button on first row
          ]
        ]
      }
    });
  }

  if (data === CALLBACK_EVENTS.request_legalization) {
    bot.sendMessage(chatId, `Виберіть:`, {
      reply_markup: {
        one_time_keyboard: true,
        inline_keyboard: [
          [
            { text: "Карта побиту з PESEL UKR", callback_data: 'card_beaten_pesel_ukr' },
            { text: "Карта побиту", callback_data: 'card_beaten' }
          ],
          [
            { text: "Карта резидента", callback_data: 'resident_card' },
            { text: "Карта поляка", callback_data: 'card_pole' }
          ]
        ]
      }
    });
  }

  if (Object.keys(OPTIONS).includes(data)) {
    const { message_id } = await bot.sendMessage(
      chatId,
      "Підкажіть, будь ласка, ваш контактний номер телефону?",
      {
        reply_markup: {
          force_reply: true
        }
      }
    );
    
    chatState.option = data;
    messageIdsMap.set(chatId, message_id);
  }
}

function handleFirstVisit({ bot, chatId, firstName }) {
  bot.sendMessage(
    chatId,
    `Привіт 🙋‍♀️Тебе вітає Legal Expert-бот. 
Тут ти знайдеш інформацію щодо юридичних послуг для тебе і твого бізнесу
Обирай ту юридичну послугу, яка тобі пасує
  `,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Записатися на консультацію",
              url: process.env.CALENDLY_SCHEDULING_URL
            }
          ],
          [
            {
              text: "Запис на реєстрацію діяльності",
              callback_data: "book_activity_registration"
            }
          ],
          [
            {
              text: "Легалізація",
              callback_data: "request_legalization"
            }
          ]
        ]
      }
    }
  );
}

async function handleSayGoodbyeSoon({bot, chatId, msg, userId, firstName}) {
  if(validatePhoneNumber(msg)) {
   bot.sendMessage(chatId, "Дякуємо, ми зв'яжемося з вами щодо вашого питання найближчим часом.");
   messageIdsMap.delete(chatId)
   bot.sendMessage(process.env.YOUR_TELEGRAM_CHAT_ID, `к.т.:${msg}; имя: ${firstName}.; Питання з приводу: ${OPTIONS[chatState?.option]}`)
  } else {
    const msg = await bot.sendMessage(
      chatId,
      "Будь ласка, введіть привильний номер телефону в міжнародному форматі наприклад, (+48 123456789) ",
      {
        reply_markup: {
          force_reply: true
        }
      }
    );
    messageIdsMap.set(chatId, 'phoneNumber')
    // console.log('msg', msg);
  }
}

export { handleIncomingMessage, handleCallbackQuery, handleFirstVisit };
