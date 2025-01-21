const { test, expect } = require('@playwright/test');
const NewPollPage = require('./pages/new-polls-page');
const LandingPage = require('./pages/landing-page');
const ParticipantPage = require('./pages/participants-page');

test('Add participant', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const newPollPage = new NewPollPage(page);
    const participantPage = new ParticipantPage(page);
    // Open the app landing page
    await landingPage.navigateToLandingPage();
    // Naviage to the new polls page
    await landingPage.navigateToCreatePoll();
    // Create a poll and close the dialog
    const pollPageWithDialogClosed = await newPollPage.createPollAndCloseDialog(
      'Poll to add participant',
      'Temporary location',
      'Temporary description'
    );
    // Verify polls page is open
    await expect(pollPageWithDialogClosed.page.getByRole('heading', { name: 'Participants' })).toBeVisible();
    // Add participant
    await participantPage.addParticipant();
    // Verify participant menu
    await expect(page.getByTestId('participant-menu')).toBeVisible();
  });