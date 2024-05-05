class UserRequest {
  constructor(userId, chatId, message, replyToMessageId) {
    this.#userId = userId;
    this.#chatId = chatId;
    this.#message = message;
    this.#replyToMessageId = replyToMessageId;
  }
}

export { UserRequest };
