const crypto = require('crypto');
module.exports = function genateUniqueId(){
  return crypto.randomBytes(4).toString('HEX');
}