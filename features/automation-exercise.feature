Feature: As a Mimecast user I want to cover simple test cases in order to verify the correct functioning of the application

  # CASE 1
  Scenario: Check the presence and status of the "Next" button and Email components in the login page
    Given I am in the login page
    Then the "Next" button should be present with status "disabled"
    And the "username" component should be present with status "enabled"

  # CASE 2
  Scenario: Check the presence and status of the Password component, Authentication options and links in the login page
    Given I am in the login page
    When I input "celiamp8@gmail.com" in the "username" component
    And I click the "Next" "button"
    Then the "password" component should be present with status "enabled"
    And the "type" component should be present with status "enabled"
    And the link "Log in as a different user." should be present
    And the link "Reset Cloud Password" should be present

  Scenario: Check the correct behaviour of the "Log in as a different user" link
    Given I am in the login page
    When I input "celiamp8@gmail.com" in the "username" component
    And I click the "Next" "button"
    And I click the "Log in as a different user." "link"
    Then I should be in the "login" page
    And the "Next" button should be present with status "disabled"
    And the "username" component should be present with status "enabled"
    And the "username" component should be empty

  Scenario: Check the correct behaviour of the "Reset Cloud Password" link
    Given I am in the login page
    When I input "celiamp8@gmail.com" in the "username" component
    And I click the "Next" "button"
    And I click the "Reset Cloud Password" "link"
    Then I should be in the "reset password" page
    And the "Reset Password" button should be present with status "disabled"
    And the link "Never mind, take me back to the login page." should be present

  Scenario: Check the correct behaviour of the "Never mind, take me back to the login page." link
    Given I am in the login page
    When I input "celiamp8@gmail.com" in the "username" component
    And I click the "Next" "button"
    And I click the "Reset Cloud Password" "link"
    And I click the "Never mind, take me back to the login page." "link"
    Then I should be in the "login" page
    And the "Log In" button should be present with status "disabled"
    And the "username" component should be present with status "disabled"
    And the "password" component should be present with status "enabled"
    And the "password" component should be empty

  # CASE 3
  Scenario: Check that a user cannot log in with an invalid email
    Given I am in the login page
    When I input "invalidMail" in the "username" component
    Then the "Next" button should be present with status "disabled"

  # CASE 4
  Scenario: Check that a user cannot log in with an invalid password
    Given I am in the login page
    When I input "celiamp8@gmail.com" in the "username" component
    And I click the "Next" "button"
    And I input "wrongPass" in the "password" component
    And I click the "Log In" "button"
    Then an error message appears with the text "Invalid user name, password or permissions."

  # CASE 5
  Scenario: Check that a user can log in succesfully with valid email and password
    Given I am in the login page
    When I input "celiamp8@gmail.com" in the "username" component
    And I click the "Next" "button"
    And I input "autoTest2#" in the "password" component
    And I click the enter key
    Then I should be in the "inbox" page

  # CASE 6
  Scenario: Check that as an identified user I am able to send a message
    Given I am logged in
    When I send a message to "celiamp8@gmail.com" with subject "Hello" and content "Hello world!"
    And I navigate to the "sent" page
    Then I should see the email "Hello" sent to "Celia Martin"