class AppError {
  message;
  statusError;

  constructor(message, statusError = 401) {
    this.message = message;
    this.statusError = statusError;
  }
}

module.exports = AppError;
