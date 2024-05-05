class ChatMessage {
  constructor({chatId, userId, messageId, message, firstName}) {
    this.#chatId = chatId
    this.#userId = userId
    this.#messageId = messageId
    this.#message = message
    this.#firstName = firstName
  }
}

export { ChatMessage };
