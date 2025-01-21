const { test, expect } = require('@playwright/test');
const NewPollPage = require('./pages/new-polls-page');
const PollPage = require('./pages/polls-page');
const LandingPage = require('./pages/landing-page');

test('Create a new poll', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const newPollPage = new NewPollPage(page);
  // Open the app landing page
  await landingPage.navigateToLandingPage();
  // Naviage to the new polls page
  await landingPage.navigateToCreatePoll();
  // Create a poll and close the dialog
  const pollPageWithDialogClosed = await newPollPage.createPollAndCloseDialog(
    'Monthly Meeting',
    'Steve\'s Coffee Shop',
    'Choose dates that work for you!'
  );
  // Verify polls page is open
  await expect(pollPageWithDialogClosed.page.getByRole('heading', { name: 'Participants' })).toBeVisible();
});

test('Delete a poll', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const newPollPage = new NewPollPage(page);
  const pollPage = new PollPage(page);
  // Open the app landing page
  await landingPage.navigateToLandingPage();
  // Naviage to the new polls page
  await landingPage.navigateToCreatePoll();
  // Create a poll and close the Share dialog
  const pollPageWithDialogClosed = await newPollPage.createPollAndCloseDialog(
    'Poll to delete',
    'Temporary location',
    'Temporary description'
  );
  // Verify polls page is open
  await expect(pollPageWithDialogClosed.page.getByRole('heading', { name: 'Participants' })).toBeVisible();
  // Delete poll
  await pollPage.deletePoll();
  await expect(page.getByText('No polls')).toBeVisible();

});