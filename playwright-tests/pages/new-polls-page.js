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
   * Creates a poll and optionally verifies error messages for invalid inputs.
   * @param {string|null} title - The title of the poll (can be empty or null for negative tests).
   * @param {string|null} location - The location of the poll (can be empty or null for negative tests).
   * @param {string|null} description - The description of the poll (can be empty or null for negative tests).
   * @returns {PollPage|string} - Returns a PollPage instance on success, or an error message if poll creation fails.
   */
  async createPoll(title, location, description) {
    // Step 1: Fill in the poll details
    if (title !== null) await this.page.fill('[placeholder="Monthly Meetup"]', title);
    if (location !== null) await this.page.fill('[placeholder="Joe\'s Coffee Shop"]', location);
    if (description !== null) await this.page.fill('[placeholder="Hey everyone, please choose the dates that work for you!"]', description);

    // Step 2: Select dates for the poll
    await this.page.click('[title="Next month"]');
    await this.page.click("text=/^7$/");
    await this.page.click("text=/^14$/");
    await this.page.click("text=/^21$/");

    // Step 3: Click the Create Poll button
    await this.page.getByRole('button', { name: 'Create poll' }).click();

    // Step 4: Check for error messages
    if (await this.page.isVisible('text="“Title” is required"')) {
      return '“Title” is required';
    }

    if (await this.page.isVisible('text="You can\'t create a poll"')) {
      return 'You can\'t create a poll';
    }

    // Step 5: If no errors, return a PollPage instance (with dialog overlay)
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
