/**
 * Represents the poll management page.
 */
class PollPage {
    constructor(page) {
      this.page = page; // Assigns the Playwright `page` object to the instance
    }
  
    /**
     * Closes the overlay dialog.
     */
    async closeDialog() {
      const dialog = this.page.getByRole('dialog');
      await dialog.waitFor({ state: 'visible' });
      const closeDialogButton = dialog.getByRole('button', { name: 'Close' });
      await closeDialogButton.click();
    }
  
    /**
     * Deletes the current poll.
     */
    async deletePoll() {
      await this.page.getByRole('button', { name: 'Manage' }).click();
      await this.page.getByRole('menuitem', { name: 'Delete' }).click();
      await this.page.getByRole('button', { name: 'Delete' }).click();
    }
  
    /**
     * Edits poll options to specify times.
     */
    async editOptions() {
      await this.page.getByRole('button', { name: 'Manage' }).click();
      await this.page.getByRole('menuitem', { name: 'Edit options' }).click();
      await this.page.getByTestId('specify-times-switch').click();
      await this.page.getByRole('button', { name: 'Save' }).click();
    }
  }
  
  module.exports = PollPage;
  