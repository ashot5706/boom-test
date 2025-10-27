// Services index file
const BoomService = require('./boom/boom.service');

// Create a singleton instance of the Boom service
const boomService = new BoomService();

module.exports = {
  boomService
};
