const EVENTS = {
  MESSAGE: "message",
  CALLBACK_QUERY: "callback_query"
};

const CALLBACK_EVENTS = {
  book_activity_registration: "book_activity_registration",
  request_legalization: "request_legalization",
  ask_base_information: "ask_base_information"
};

const OPTIONS = {
  card_beaten_pesel_ukr: "Карта побиту з PESEL UKR",
  card_beaten: "Карта побиту",
  resident_card: "Карта резидента",
  card_pole: "Карта поляка",
}

const chatState = {}; // state for each chat

export { EVENTS, CALLBACK_EVENTS, OPTIONS, chatState };
