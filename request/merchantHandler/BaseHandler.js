// base-handler.js
class BaseHandler {
    checkAccount() {
      throw new Error("checkAccount() must be implemented by the subclass.");
    }
  
    bindAccount() {
      
    }
  }
  
  module.exports = BaseHandler;