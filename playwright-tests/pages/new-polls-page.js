class NewPollsPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/new');
    }

    async createPoll(title, location, description) {
        // Fill in the poll title
        await this.page.fill('[placeholder="Monthly Meetup"]', title);
        // Fill in the poll location
        await this.page.fill('[placeholder="Joe\'s Coffee Shop"]', location);
        // Fill in the poll description
        await this.page.fill('[placeholder="Hey everyone, please choose the dates that work for you!"]', description);
        // Click on Next month and select a few date
        await this.page.click('[title="Next month"]');
        await this.page.click("text=/^7$/");
        await this.page.click("text=/^14$/");
        await this.page.click("text=/^21$/");
        // Click on Create poll button
        await this.page.getByRole('button', { name: 'Create poll' }).click();
    }
}

module.exports = NewPollsPage;