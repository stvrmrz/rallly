const { test, expect } = require('@playwright/test');
const NewPollsPage = require('./pages/new-polls-page');
const PollPage = require('./pages/polls-page');
const LandingPage = require('./pages/landing-page');

test('Create new poll', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const newPollsPage = new NewPollsPage(page);
  // Open the app landing page
  await landingPage.navigateToLandingPage();
  // Naviage to the new polls page
  await landingPage.navigateToCreatePoll();
  // Create a poll and close the dialog
  const pollPageWithDialogClosed = await newPollsPage.createPollAndCloseDialog(
    'Monthly Meeting',
    'Steve\'s Coffee Shop',
    'Choose dates that work for you!'
  );
  // Verify polls page is open
  await expect(pollPageWithDialogClosed.page.getByRole('heading', { name: 'Participants' })).toBeVisible();
});

test('Delete existing poll', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const newPollsPage = new NewPollsPage(page);
  const pollsPage = new PollPage(page);
  // Open the app landing page
  await landingPage.navigateToLandingPage();
  // Naviage to the new polls page
  await landingPage.navigateToCreatePoll();
  // Create a poll and close the dialog
  const pollPageWithDialogClosed = await newPollsPage.createPollAndCloseDialog(
    'Poll to delete',
    'Temporary location',
    'Temporary description'
  );
  // Verify polls page is open
  await expect(pollPageWithDialogClosed.page.getByRole('heading', { name: 'Participants' })).toBeVisible();
  // Delete poll
  await pollsPage.deletePoll();
  await expect(page.getByText('No polls')).toBeVisible();

});