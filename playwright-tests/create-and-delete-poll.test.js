const { test, expect } = require('@playwright/test');
const NewPollsPage = require('./pages/new-polls-page');
const HomePage = require('./pages/home-page')

test('Create new poll', async ({ page }) => {
  const homePage = new HomePage(page);
  const newPollsPage = new NewPollsPage(page);
  // Land on the Home page
  await homePage.navigateToHomePage();
  // Naviage to the new polls page
  await homePage.navigateToCreatePoll();
  // Create poll
  await newPollsPage.createPoll(
    'Monthly Meeting',
    'Steve\'s Coffee Shop',
    'Hello, please choose dates that work for you!'
  );
  // Close dialoge and assert polls page
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('heading', { name: 'Participants' })).toBeVisible();
});

test('Delete existing poll', async ({ page }) => {
  const homePage = new HomePage(page);
  const newPollsPage = new NewPollsPage(page);
  // Land on the Home page
  await homePage.navigateToHomePage();
  // Naviage to the new polls page
  await homePage.navigateToCreatePoll();
  // Create poll
  await newPollsPage.createPoll(
    'Poll to Delete',
    'Temporary Location',
    'Temporary Description'
  );
  // Close dialoge and assert polls page
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('heading', { name: 'Participants' })).toBeVisible();
  // Delete poll
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).click()
  await expect(page.getByText('No polls')).toBeVisible();

});