const { test, expect } = require('@playwright/test');

test('Check Rallly homepage title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle("Home");
});

test('Create new poll', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('navigation').getByRole('link', { name: 'Create' }).click();
  
  // Assert create-poll-page and create poll
  await expect(page.getByText('EventDescribe what your event')).toBeVisible();
  await page.getByPlaceholder('Monthly Meetup').click();
  await page.getByPlaceholder('Monthly Meetup').fill('Monthly Meeting');
  await page.getByPlaceholder('Joe\'s Coffee Shop').click();
  await page.getByPlaceholder('Joe\'s Coffee Shop').fill('Steve\'s Coffee Shop');
  await page.getByPlaceholder('Hey everyone, please choose').click();
  await page.getByPlaceholder('Hey everyone, please choose').fill('Hello, please choose dates that work for you!');
  await page.click('[title="Next month"]');
  await page.click("text=/^7$/");
  await page.click("text=/^14$/");
  await page.click("text=/^21$/");
  await page.getByRole('button', { name: 'Create poll' }).click();
  
  // Assert poll-page
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('heading', { name: 'Participants' })).toBeVisible();
});

test('Delete existing poll', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('navigation').getByRole('link', { name: 'Create' }).click();
  
  // Assert create-poll-page and create poll
  await expect(page.getByText('EventDescribe what your event')).toBeVisible();
  await page.getByPlaceholder('Monthly Meetup').click();
  await page.getByPlaceholder('Monthly Meetup').fill('Monthly Meeting');
  await page.getByPlaceholder('Joe\'s Coffee Shop').click();
  await page.getByPlaceholder('Joe\'s Coffee Shop').fill('Steve\'s Coffee Shop');
  await page.getByPlaceholder('Hey everyone, please choose').click();
  await page.getByPlaceholder('Hey everyone, please choose').fill('Hello, please choose dates that work for you!');
  await page.click('[title="Next month"]');
  await page.click("text=/^7$/");
  await page.click("text=/^14$/");
  await page.click("text=/^21$/");
  await page.getByRole('button', { name: 'Create poll' }).click();
  
  // Assert poll-page
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('heading', { name: 'Participants' })).toBeVisible();

  // Delete poll
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('No polls')).toBeVisible();

});