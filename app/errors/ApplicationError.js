/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable class-methods-use-this */
class ApplicationError extends Error {
  get details() {
    return {};
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        details: this.details,
      }
    }
  }
}

module.exports = ApplicationError;
