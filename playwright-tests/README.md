## About The Project
Playwright Tests for Rallly: Main Directory for tests are stored in playwright-tests/

This repository contains Playwright tests for the Rallly application, a tool for finding common meeting times among groups. The tests validate key functionalities such as creating polls, deleting polls, editing poll options, and adding participants. The code is structured using the Page Object Model (POM) to ensure maintainability and scalability.

## Setup Instructions

Please follow these steps if you'd like to clone the repo so you can can see the files yourself

### Test Configuration

- This project contains multiple Playwright configurations:
  - **`playwright.config.js`**:
    - Used for the Playwright tests in the `playwright-tests/` directory.
    - This configuration ensures only the relevant tests are executed.
  - **`playwright.config.ts`**:
    - Related to other tests in the repository that use TypeScript.
    - This configuration is not used for the Playwright tests submitted for this exercise.

- To ensure only the relevant tests run, the `testDir` in `playwright.config.js` is set to `./playwright-tests`, and unrelated files are ignored.


Please have a GitHub account and set up your SSH key so you may git pull the latest changes to the repository. It's
reccomended to install Visual Studio code as well.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/stvrmrz/rallly.git
   ```
2. Open the repo 
   ```sh
   cd rallly
   ```
3. Install Dependencies
Install the necessary dependencies, including Prisma using yarn or npm:
   ```sh
   yarn install
   ```
   ```sh
   npm install
   ```
4. Set Up Environment Variables
Copy the .env.development file to .env:
   ```sh
   cp .env.development .env
   ```
5. Start the Application Locally
To run the application locally make sure Docker is installed and running. Start the necessary services:
   ```sh
   yarn docker:up
   ```
   ```sh
   npm run docker:up
   ```
6. Reset the database to set up a clean slate:
   ```sh
   yarn db:reset
   ```
   ```sh
   npm run db:reset
   ```
7. Start the application:
   ```sh
   yarn dev
   ```
   ```sh
   npm run dev
   ```
8. The app will now be running at http://localhost:3000.
9. Install Playwright
   ```sh
   npx playwright install
   ```
10. To run all Playwright tests:
   ```sh
   npx playwright test
   ```
11. To debug tests with Playwright Inspector:
   ```sh
   npx playwright test --debug
   ```


## Approach
1. Page Object Model (POM):
    - Each major page (Landing Page, New Poll Page, Poll Page, Participant Page) is encapsulated in its own class.
    - Reusable methods like createPoll, deletePoll, and addParticipant simplify test logic and reduce redundancy.
2. Test Independence:
    - Tests do not rely on pre-existing data and create their own data as part of the test workflow.
    - For example, a new poll is created at the start of every test requiring poll data.
3. Focus on Core Functionality: Tests target core features such as: 
    - Creating polls.
    - Validating error messages for invalid inputs.
    - Editing poll options.
    - Adding participants.
    - Deleting polls.
4. Clear Error Handling:
    - Tests for negative scenarios (e.g., attempting to create a poll with empty fields) validate error messages to ensure the app handles edge cases.

## Coding Decisions
1. Docker and Database Setup:
    - Used Docker to set up the database and other services locally, ensuring a clean environment for testing.
    - yarn db:reset ensures consistent starting conditions for tests.
2. Playwright for E2E Testing:
    - Playwright was chosen for its ability to handle complex workflows and its built-in tools like debugging, locators, and assertions.
3. POM for Scalability:
    - Encapsulating page-specific logic in POM classes makes the code reusable and easier to maintain.
4. Focus on Critical Features:
    - Tests focus on catching breaking changes in key workflows without aiming for full test coverage.