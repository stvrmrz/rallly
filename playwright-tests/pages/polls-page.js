class PollPage {
    constructor(page) {
      this.page = page; // Assigns the Playwright `page` object to the instance
    }
  
    async closeDialog() {
      const dialog = this.page.getByRole('dialog'); // Locate the dialog by its role
      await dialog.waitFor({ state: 'visible' }); // Wait for the dialog to be visible
      const closeDialogButton = dialog.getByRole('button', { name: 'Close' }); // Locate the Close button
      await closeDialogButton.click(); // Click to close the dialog
    }
  }
  
  module.exports = PollPage;  