import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';

import { 
    Eyes, 
    VisualGridRunner, 
    ClassicRunner, 
    Configuration, 
    BatchInfo, 
    Target 
} from '@applitools/eyes-playwright';

// 1. Applitools Setup
const USE_UFG = true; // Toggle for Ultra Fast Grid
const runner = USE_UFG ? new VisualGridRunner({ testConcurrency: 5 }) : new ClassicRunner();
const batch = new BatchInfo({ name: 'Playwright Website Visual Suite' });
const config = new Configuration().setBatch(batch).setApiKey(process.env.APPLITOOLS_API_KEY!);

let eyes: Eyes;

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;

test.beforeEach(async ({page}) => {
    eyes = new Eyes(runner, config);
    await eyes.open(page, 'Playwright Website', test.info().title);
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
}

test.describe('Playwright website', () => {

    test('has title', async () => {
        await homePage.assertPageTitle();
        await eyes.check('Home Page', Target.window().fully());
    });
    
    test('get started link', async ({ page }) => {
        // Act
        await clickGetStarted(page);
        // Assert
        await topMenuPage.assertPageUrl(pageUrl);
        await eyes.check('Get Started Page', Target.window().fully());
    });
    
    test('check Java page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
            await eyes.check('Java Documentation Page', Target.window().fully());
        });
      
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertNodeDescriptionNotVisible();
            await topMenuPage.assertJavaDescriptionVisible();
        });
    });
});

test.afterEach(async () => {
    // 3. Close Eyes to finalize the visual capture
    await eyes.close();
});

test.afterAll(async () => {
    // 4. Summarize results
    const results = await runner.getAllTestResults();
    console.log(results);
});