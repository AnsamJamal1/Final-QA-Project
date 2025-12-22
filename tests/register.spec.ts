import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Register Feature', () => {
    test('Valid Registration', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await page.goto('/auth/register');
        await registerPage.register( 'Test', 'User', '1990-01-01', 'Main St 123', '12345', 'Nablus', 'West Bank', 'Palestine, State of', '1234567890', `test${Date.now()}@test.com`, 'Password123!');
        await expect(page.locator('[role="alert"]')).not.toBeVisible();
    });
});