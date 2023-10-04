Feature: User Login on saucedemo website

Scenario: User sees error message when login button is clicked without entering credentials
    Given User is located on the main page of saucedemo website
    When User clicks the "Login" button
    Then User should see the "Epic sadface: Username is required" error message

Examples:
    | username  | password              |            errorMessage            |
    |           |                       | Epic sadface: Username is required |