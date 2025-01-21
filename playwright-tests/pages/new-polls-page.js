const PollPage = require('./polls-page'); // Import PollPage class

class NewPollsPage {
  constructor(page) {
    this.page = page; // Assigns the Playwright `page` object to the instance
  }

  async gotoNewPollPage() {
    await this.page.goto('/new'); // Navigate to the New Poll Page
  }

  async createPoll(title, location, description) {
    // Fill in the poll title
    await this.page.fill('[placeholder="Monthly Meetup"]', title);
    // Fill in the poll location
    await this.page.fill('[placeholder="Joe\'s Coffee Shop"]', location);
    // Fill in the poll description
    await this.page.fill('[placeholder="Hey everyone, please choose the dates that work for you!"]', description);
    // Click on Next month and select dates
    await this.page.click('[title="Next month"]');
    await this.page.click("text=/^7$/");
    await this.page.click("text=/^14$/");
    await this.page.click("text=/^21$/");
    // Click the Create poll button
    await this.page.getByRole('button', { name: 'Create poll' }).click();

    // Return a PollPage instance for further interactions
    return new PollPage(this.page);
  }

  async createPollAndCloseDialog(title, location, description) {
    // Create the poll and navigate to the Poll Page
    const pollPage = await this.createPoll(title, location, description);

    // Close the dialog
    await pollPage.closeDialog();

    // Return the PollPage instance with the dialog closed
    return pollPage;
  }
}

module.exports = NewPollsPage;