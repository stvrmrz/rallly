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

    async deletePoll() {
      await this.page.getByRole('button', { name: 'Manage' }).click(); // Locate the Manage button by its role and click
      await this.page.getByRole('menuitem', { name: 'Delete' }).click(); // Locate the Delete menu item by its role and click
      await this.page.getByRole('button', { name: 'Delete' }).click(); // Locate the Delete button by its role and click
    }
}
  
  module.exports = PollPage;