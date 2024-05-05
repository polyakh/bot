class UserRequest {
  constructor({chatId, userId, messageId, message, firstName}) {
    this.#chatId = chatId
    this.#userId = userId
    this.#messageId = messageId
    this.#message = message
    this.#firstName = firstName
  }

  get chatId () {
    return this.#chatId
  }
  get userId () {
    return this.#userId
  }

  get messageId () {
    return this.#messageId
  }

  get message () {
    return this.#message
  }

  get firstName () {
    return this.#firstName
  }

  isMessageIdMatched(messageId) {
    return messageId === 'phoneNumber' || this.messageId
  }
}

export { UserRequest };
