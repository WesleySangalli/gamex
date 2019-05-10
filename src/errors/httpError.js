class httpError extends Error {
  constructor(code, message, stack) {
    super(message);
    this.code = code;
    this.stack = stack;
  }
}

module.exports = httpError;
