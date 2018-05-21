const { browser, by, element } = require("protractor");

const loginPage = function () {
  this.getErrorMessage = function () {
    return element(by.binding("appCtrl.errorMessage")).getText();
  }

  this.getComponentById = function (componentId) {
    return element(by.id(componentId));
  }
  this.getComponentByCssText = function (tagName, text) {
    return element(by.cssContainingText(tagName, text));
  }
};

module.exports = new loginPage;