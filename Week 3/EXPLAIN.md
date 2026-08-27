# Week 3 Exercises Explained

## ex1-profile.js - Student Profile System

This is a student information system that retrieves and displays a student's introduction card.

The code is organized in layers. The Database layer stores student, field, and staff information. The Repository layer fetches data from the database. The Service layer handles business logic like validation and building student profiles. The Formatter layer formats data for display. Finally, the View layer orchestrates everything together.

When you call it with a student ID like "67111176", it validates the ID, fetches the student details, fetches their field information, calculates graduation year, and displays a formatted introduction card showing nickname, age, enrolled classes, field name, and graduation year.

The key idea is separation of concerns: each class has one clear responsibility, making the code easier to test and maintain.

## ex2-types.js - JavaScript Data Types

This exercise demonstrates JavaScript's data types and type conversions.

It shows that JavaScript has different types: string, number, boolean, undefined, null, and arrays. The typeof operator tells you what type something is, except for null which returns object due to a known JavaScript quirk.

The exercise also covers type casting. You can convert a string to a number using Number(). This is important because if you receive user input like "20", its a string, not the number 20. The comparison === checks both the value and the type, so "20" === 20 is false, but Number("20") === 20 is true.

Understanding types prevents bugs where your code treats strings as numbers or vice versa.

## ex3-calculator.js - Score Calculator

This calculates a student's total score for a subject by combining multiple score components and rescaling them.

A student has workshop, attendance, project, midterm, and final scores. The workshop score comes out of 60 but needs to be rescaled to 20 points. All other scores are already out of their final points. Sum them up and you get the total.

The code validates both the subject ID and student ID before looking up scores. If scores are found, it rescales the workshop component, calculates the total, and shows what score the student needs to reach 80. It also displays the total as a percentage.

The formatting layer presents all this in a readable output that shows each component and calculations.

## ex4-grade.js - Score to Grade Conversion

This converts a numeric score into a letter grade.

First it validates that the score is a valid number between 0 and 100. Then it checks the score against grade thresholds in descending order. If a score is 80 or higher, its an A. If its 75 or higher but below 80, its a B plus. And so on down to F for anything below 50.

The order matters. If you check lowest grades first, everything would be a D. By checking highest grades first, you correctly categorize the score.

## ex5-switch.js - Restaurant Order System

This is a complete restaurant ordering system that calculates bills.

Customers can order menu items in different sizes. Regular size has a multiplier of 1, Upgraded is 1.5 times the price, and Jumbo is 2 times. Each order specifies menu name, size, and quantity.

The system validates that each order has all required fields, that the menu item exists, and that quantity is positive. Invalid orders are filtered out. For valid orders, it calculates the price per item accounting for size multiplier and quantity, then sums everything up by menu item and creates a grand total.

Finally it formats a receipt showing each menu with quantities broken down by size, individual menu totals, and the grand total. If someone tries to order an invalid size, it defaults to Regular.

## ex6-login.js - User Authentication

This is a login system that checks username, password, account status, and age eligibility.

When a user tries to log in, the system first validates that username and password are non empty strings without extra whitespace. Then it looks up the user account in the database and verifies the password matches. It checks if the account is active. Finally it calculates the user's age from birth year and confirms they are at least 18 years old.

Each validation step returns a different HTTP status code and message. Bad input returns 400. Wrong credentials return 401. Account disabled or ineligible age returns 403. Success returns 200 with the username and role.

The architecture separates input validation, account lookup, business logic checks, and response formatting into different layers so each part is simple and testable.
