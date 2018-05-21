const { browser, by, element } = require("protractor");

const inboxPage = function () {
  this.currentUser = element(by.css("span .navbar-text pull-right"));

  this.composeButton = element(by.cssContainingText("button", "Compose"));
  this.sendButton = element(by.cssContainingText("button", "Send"));

  this.recipientInput = element(by.css(".contacts div input"));
  this.subjectInput = element(by.model("email-subject"));
  this.emailContent = element(by.className("note-editable"));

  this.getPageById = function (page) {
    return element(by.css("[ui-sref=" + page + "]"));
  }
};

module.exports = new inboxPage;