const { test, expect } = require('@playwright/test');
const NewPollsPage = require('./pages/new-polls-page');

test('Check Rallly homepage title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle("Home");
});

test('Create new poll', async ({ page }) => {
  const newPollsPage = new NewPollsPage(page);

  await page.goto('http://localhost:3000/');
  await page.getByRole('navigation').getByRole('link', { name: 'Create' }).click();
  
  // Create poll
  await newPollsPage.createPoll(
    'Monthly Meeting',
    'Steve\'s Coffee Shop',
    'Hello, please choose dates that work for you!'
  );
  
  // Assert poll-page
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('heading', { name: 'Participants' })).toBeVisible();
});

test('Delete existing poll', async ({ page }) => {
  const newPollsPage = new NewPollsPage(page);
  await page.goto('http://localhost:3000/');
  await page.getByRole('navigation').getByRole('link', { name: 'Create' }).click();
  
  // Create poll
  await newPollsPage.createPoll(
    'Poll to Delete',
    'Temporary Location',
    'Temporary Description'
  );
  
  // Assert poll-page
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('heading', { name: 'Participants' })).toBeVisible();

  // Delete poll
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('No polls')).toBeVisible();

});