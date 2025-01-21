const NewPollsPage = require('./new-polls-page'); // Import the NewPollsPage class

class LandingPage {
  constructor(page) {
    this.page = page; // Assigns the Playwright `page` object to the instance
  }

  async navigateToLandingPage() {
    await this.page.goto('http://localhost:3000/'); // Navigate to the Landing page
  }

  async navigateToCreatePoll() {
    // Click the "Create" link to naviage to the new polls page
    await this.page.getByRole('navigation').getByRole('link', { name: 'Create' }).click();

    // Wait for the navigation to complete
    await this.page.waitForURL('/new');

    // Return an instance of NewPollsPage for further interactions
    return new NewPollsPage(this.page);
  }
}

module.exports = LandingPage;