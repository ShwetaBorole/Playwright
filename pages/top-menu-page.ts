import { expect, Locator, Page } from '@playwright/test';

export class TopMenuPage {
    readonly page: Page;
    
    // Locators for the TOP navigation bar
    readonly docsLink: Locator;
    readonly apiLink: Locator;
    readonly communityLink: Locator;
    readonly javaDropdown: Locator;

    // Locators for the LEFT sidebar navigation
    readonly installationLink: Locator;
    readonly writingTestsLink: Locator;
    readonly traceViewerLink: Locator;

    // Expected text for assertions
    readonly javaIntroText: string = 'Playwright is distributed as a set of Maven modules.';

    constructor(page: Page) {
        this.page = page;

        // 1. TOP NAV: Scoping to the general navigation
        this.docsLink = page.getByRole('navigation').getByRole('link', { name: 'Docs' });
        this.apiLink = page.getByRole('navigation').getByRole('link', { name: 'API' });
        this.communityLink = page.getByRole('navigation').getByRole('link', { name: 'Community' });
        this.javaDropdown = page.getByRole('navigation').getByRole('button', { name: 'Java' });

        // 2. SIDEBAR NAV: Scoping specifically to the 'Main' (sidebar) navigation
        this.installationLink = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Installation' });
        this.writingTestsLink = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Writing tests' });
        this.traceViewerLink = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Trace Viewer' });
    }

    // --- Actions ---

    async clickInstallation() {
        await this.installationLink.click();
    }

    async clickApi() {
        await this.apiLink.click();
    }

    // --- Assertions ---

    async assertJavaIntroVisible() {
        // This searches for the specific text we stored at the top
        await expect(this.page.getByText(this.javaIntroText)).toBeVisible();
    }

    async assertPageUrl(expectedUrl: RegExp) {
        await expect(this.page).toHaveURL(expectedUrl);
    }
}

export default TopMenuPage;