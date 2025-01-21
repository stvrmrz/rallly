const PollPage = require('./polls-page'); // Import PollPage class

/**
 * Represents the new poll creation page.
 */
class NewPollPage {
  constructor(page) {
    this.page = page; // Assigns the Playwright `page` object to the instance
  }

  /**
   * Navigates to the new poll creation page.
   */
  async gotoNewPollPage() {
    await this.page.goto('/new'); // Navigate to the New Poll Page
  }

  /**
   * Creates a new poll with the provided details.
   * @param {string} title - The poll title.
   * @param {string} location - The poll location.
   * @param {string} description - The poll description.
   * @returns {PollPage} An instance of the PollPage class for further interactions.
   */
  async createPoll(title, location, description) {
    await this.page.fill('[placeholder="Monthly Meetup"]', title);
    await this.page.fill('[placeholder="Joe\'s Coffee Shop"]', location);
    await this.page.fill('[placeholder="Hey everyone, please choose the dates that work for you!"]', description);
    await this.page.click('[title="Next month"]');
    await this.page.click("text=/^7$/");
    await this.page.click("text=/^14$/");
    await this.page.click("text=/^21$/");
    await this.page.getByRole('button', { name: 'Create poll' }).click();
    return new PollPage(this.page);
  }

  /**
   * Creates a new poll and closes the overlay dialog.
   * @param {string} title - The poll title.
   * @param {string} location - The poll location.
   * @param {string} description - The poll description.
   * @returns {PollPage} An instance of the PollPage class with the dialog closed.
   */
  async createPollAndCloseDialog(title, location, description) {
    const pollPage = await this.createPoll(title, location, description);
    await pollPage.closeDialog();
    return pollPage;
  }
}

module.exports = NewPollPage;
