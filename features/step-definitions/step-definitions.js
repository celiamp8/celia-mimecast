const { Given, When, Then } = require("cucumber");
const { browser, by, element } = require("protractor");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const loginPage = require("../page-objects/login-page.po.js");
const inboxPage = require("../page-objects/inbox-page.po.js");

Given("I am in the login page", async () => {
  await browser.get("https://login-alpha.mimecast.com");
  expect(browser.getTitle()).to.eventually.equal("Personal Portal");
});

Given("I am logged in", async () => {
  browser.get("https://login-alpha.mimecast.com");
  loginPage.getComponentById("username").sendKeys("celiamp8@gmail.com");
  browser.actions().sendKeys(protractor.Key.ENTER).perform();
  loginPage.getComponentById("password").sendKeys("autoTest2#");
  browser.actions().sendKeys(protractor.Key.ENTER).perform();
  await expect(inboxPage.currentUser.getText()).to.eventually.be.equal("celiamp8@gmail.com");
  expect(browser.getCurrentUrl()).to.eventually.contain("https://login-alpha.mimecast.com/m/secure/app/");
});


When("I input {string} in the {string} component", async (inputText, component) => {
  await loginPage.getComponentById(component).sendKeys(inputText);
});

When("I click the {string} {string}", async (text, component) => {
  if (component == "link") {
    component = "a";
  }
  await loginPage.getComponentByCssText(component, text).click();
});

When("I click the enter key", async () => {
  await browser.actions().sendKeys(protractor.Key.ENTER).perform();
});

When("I send a message to {string} with subject {string} and content {string}", async (email, subject, content) => {
  inboxPage.composeButton.click();
  inboxPage.recipientInput.click().sendKeys(email);
  browser.actions().sendKeys(protractor.Key.ENTER).perform();
  inboxPage.subjectInput.click().sendKeys(subject);
  inboxPage.emailContent.click().sendKeys(content);
  await inboxPage.sendButton.click();
});

When("I navigate to the {string} page", async (page) => {
  await inboxPage.getPageById(page).click();
});


Then("the {string} component should be present with status {string}", async (component, status) => {
  if (status == "enabled") {
    await expect(loginPage.getComponentById(component).isEnabled()).to.eventually.be.true;
  } else if (status == "disabled") {
    await expect(loginPage.getComponentById(component).isEnabled()).to.eventually.be.false;
  } else {
    console.log("Please type a valid status");
  }
});

Then("the {string} button should be present with status {string}", async (buttonText, status) => {
  if (status == "enabled") {
    await expect(loginPage.getComponentByCssText('button', buttonText).isEnabled()).to.eventually.be.true;
  } else if (status == "disabled") {
    await expect(loginPage.getComponentByCssText('button', buttonText).isEnabled()).to.eventually.be.false;
  } else {
    console.log("Please type a valid status");
  }
});

Then("the link {string} should be present", async (linkText) => {
  await expect(loginPage.getComponentByCssText('a', linkText).isPresent()).to.eventually.be.true;
});

Then("I should be in the {string} page", async (page) => {
  switch (page) {
    case "login":
      page = "https://login-alpha.mimecast.com/u/login/?gta=portal#/login";
      break;
    case "reset password":
      page = "https://login-alpha.mimecast.com/u/login/?gta=portal#/request-cloud-password-reset";
      break;
    case "inbox":
      page = "https://login-alpha.mimecast.com/m/secure/app/";
      break;
  }
  await expect(browser.getCurrentUrl()).to.eventually.contain(page);
});

Then("the {string} component should contain {string}", async (component, value) => {
  await expect(loginPage.getComponentById(component).getText()).to.eventually.contain(value);
});

Then("the {string} component should be empty", async (component) => {
  await expect(loginPage.getComponentById(component).getText()).to.eventually.be.empty;
});

Then("an error message appears with the text {string}", async (errorMessage) => {
  await expect(loginPage.getErrorMessage()).to.eventually.be.equal(errorMessage);
});

Then("I should see the email {string} sent to {string}", async (subject, emailRecipient) => {
  await expect(element(by.cssContainingText("trim-item-list", emailRecipient)).getText()).to.eventually.equal(emailRecipient);
  expect(element(by.binding("::item-subject")).getText()).to.eventually.equal(subject);
});