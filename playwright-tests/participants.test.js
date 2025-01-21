const { test, expect } = require('@playwright/test');
const LandingPage = require('./pages/landing-page');
const NewPollPage = require('./pages/new-polls-page');
const ParticipantPage = require('./pages/participants-page');

test('Add participant', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const newPollPage = new NewPollPage(page);
  const participantPage = new ParticipantPage(page);

  // Step 1: Navigate to the app landing page
  await landingPage.navigateToLandingPage();

  // Step 2: Navigate to the new poll creation page
  await landingPage.navigateToCreatePoll();

  // Step 3: Create a new poll and close the overlay dialog
  const pollPageWithDialogClosed = await newPollPage.createPollAndCloseDialog(
    'Poll to add participant',       // Poll title
    'Temporary location',            // Poll location
    'Temporary description'          // Poll description
  );

  // Step 4: Verify that the poll page is open
  await expect(pollPageWithDialogClosed.page.getByRole('heading', { name: 'Participants' })).toBeVisible();

  // Step 5: Add a participant to the poll
  await participantPage.addParticipant();

  // Step 6: Verify that the participant menu is visible
  await expect(page.getByTestId('participant-menu')).toBeVisible();
});
