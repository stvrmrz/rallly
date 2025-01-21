const NewPollsPage = require('./new-polls-page'); // Import the NewPollsPage class

/**
 * Represents the landing page of the application.
 */
class LandingPage {
  constructor(page) {
    this.page = page; // Assigns the Playwright `page` object to the instance
  }

  /**
   * Navigates to the landing page.
   */
  async navigateToLandingPage() {
    await this.page.goto('http://localhost:3000/'); // Navigate to the Landing page
  }

  /**
   * Navigates from the landing page to the new poll creation page.
   * @returns {NewPollsPage} An instance of the NewPollsPage class for further interactions.
   */
  async navigateToCreatePoll() {
    await this.page.getByRole('navigation').getByRole('link', { name: 'Create' }).click();
    await this.page.waitForURL('/new');
    return new NewPollsPage(this.page);
  }
}

module.exports = LandingPage;
