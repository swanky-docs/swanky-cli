'use strict';

let mockResponse = {
  error: false,
  exists: true
}

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const commandExists = (config, cb) => {
  cb(mockResponse.error, mockResponse.exists)
}

commandExists.__setMockResponse = __setMockResponse;

module.exports = commandExists;
