const { test, expect } = require('@playwright/test');
const NewPollPage = require('./pages/new-polls-page');
const LandingPage = require('./pages/landing-page');
const PollPage = require('./pages/polls-page');

test('Edit poll options to specify times', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const newPollPage = new NewPollPage(page);
    const pollPage = new PollPage(page);

    // Open the app landing page
    await landingPage.navigateToLandingPage();
    // Naviage to the new polls page
    await landingPage.navigateToCreatePoll();
    // Create a poll and close the dialog
    const pollPageWithDialogClosed = await newPollPage.createPollAndCloseDialog(
      'Poll to edit options',
      'Temporary location',
      'Temporary description'
    );
    // Open poll manage option menu, set specified times, and Save
    await pollPage.editOptions();
    // Verify specified times in participant menu
    await page.getByTestId('add-participant-button').click();
    await expect(page.getByRole('button', { name: '1h' }).first()).toBeVisible();
  });