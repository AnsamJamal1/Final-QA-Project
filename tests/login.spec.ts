import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/login');
    });

    test('Valid Login Test', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login( process.env.EMAIL!, process.env.PASSWORD! );
        await expect(page.locator('[role="alert"]')).not.toBeVisible();
    });

    test('Invalid Login Test', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('wrong@email.com', '123456');
        await expect(page.locator('.alert')).toBeVisible();
    });

});