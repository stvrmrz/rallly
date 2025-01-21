const { test, expect } = require('@playwright/test');
const LandingPage = require('./pages/landing-page');
const NewPollPage = require('./pages/new-polls-page');
const PollPage = require('./pages/polls-page');

test('Edit poll options to specify times', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const newPollPage = new NewPollPage(page);
  const pollPage = new PollPage(page);

  // Step 1: Open the app landing page
  await landingPage.navigateToLandingPage();

  // Step 2: Navigate to the new poll creation page
  await landingPage.navigateToCreatePoll();

  // Step 3: Create a poll and close the overlay dialog
  const pollPageWithDialogClosed = await newPollPage.createPollAndCloseDialog(
    'Poll to edit options',           // Poll title
    'Temporary location',             // Poll location
    'Temporary description'           // Poll description
  );

  // Step 4: Verify that the poll page is open
  await expect(pollPageWithDialogClosed.page.getByRole('heading', { name: 'Participants' })).toBeVisible();

  // Step 5: Open the poll options, specify times, and save
  await pollPage.editOptions();

  // Step 6: Verify that the specified times are visible in the participant menu
  await page.getByTestId('add-participant-button').click(); // Open participant menu
  await expect(page.getByRole('button', { name: '1h' }).first()).toBeVisible(); // Verify 1-hour option
});
