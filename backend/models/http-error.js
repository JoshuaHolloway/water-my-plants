// ==============================================

class HttpError extends Error {
  // --------------------------------------------

  constructor(message, errorCode) {
    // -Add a message property to the
    //  instances we create based on this class.
    super(message); // forward the message

    // Add a code property
    this.code = errorCode;
  }

  // --------------------------------------------
}

// ==============================================

module.exports = HttpError;
