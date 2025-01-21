class ParticipantPage {
  constructor(page) {
    this.page = page; // Assigns the Playwright `page` object to the instance
  }

  async addParticipant() {
    await this.page.getByTestId('add-participant-button').click();
    await this.page.getByTestId('vote-selector').first().click();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByPlaceholder('Jessie Smith').click();
    await this.page.getByPlaceholder('Jessie Smith').fill('Test User');
    await this.page.getByPlaceholder('jessie.smith@example.com').click();
    await this.page.getByPlaceholder('jessie.smith@example.com').fill('testuser@testuser.com');
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}

module.exports = ParticipantPage;