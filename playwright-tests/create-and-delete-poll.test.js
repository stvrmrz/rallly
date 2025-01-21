const { test, expect } = require('@playwright/test');
const LandingPage = require('./pages/landing-page');
const NewPollPage = require('./pages/new-polls-page');
const PollPage = require('./pages/polls-page');

test('Create a new poll', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const newPollPage = new NewPollPage(page);

  // Step 1: Navigate to the app landing page
  await landingPage.navigateToLandingPage();

  // Step 2: Navigate to the new poll creation page
  await landingPage.navigateToCreatePoll();

  // Step 3: Create a new poll and close the overlay dialog
  const pollPageWithDialogClosed = await newPollPage.createPollAndCloseDialog(
    'Monthly Meeting',                // Poll title
    'Steve\'s Coffee Shop',           // Poll location
    'Choose dates that work for you!' // Poll description
  );

  // Step 4: Verify that the poll page is open
  await expect(pollPageWithDialogClosed.page.getByRole('heading', { name: 'Participants' })).toBeVisible();
});

test('Validate error messages for empty poll fields', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const newPollPage = new NewPollPage(page);

  // Step 1: Navigate to the app landing page
  await landingPage.navigateToLandingPage();

  // Step 2: Navigate to the new poll creation page
  await landingPage.navigateToCreatePoll();

  // Step 3: Attempt to create a poll with empty fields for title, location, and description
  const errorMessage = await newPollPage.createPoll('', '', '');

  // Step 4: Verify the appropriate error message is returned
  expect(errorMessage).toBe('“Title” is required');
});

test('Delete a poll', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const newPollPage = new NewPollPage(page);
  const pollPage = new PollPage(page);

  // Step 1: Navigate to the app landing page
  await landingPage.navigateToLandingPage();

  // Step 2: Navigate to the new poll creation page
  await landingPage.navigateToCreatePoll();

  // Step 3: Create a new poll and close the overlay dialog
  const pollPageWithDialogClosed = await newPollPage.createPollAndCloseDialog(
    'Poll to delete',                // Poll title
    'Temporary location',            // Poll location
    'Temporary description'          // Poll description
  );

  // Step 4: Verify that the poll page is open
  await expect(pollPageWithDialogClosed.page.getByRole('heading', { name: 'Participants' })).toBeVisible();

  // Step 5: Delete the poll
  await pollPage.deletePoll();

  // Step 6: Verify that the poll has been deleted
  await expect(page.getByText('No polls')).toBeVisible();
});
