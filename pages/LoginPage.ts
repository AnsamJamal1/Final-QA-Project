import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    // LogIn Locators
    emailInput = this.page.getByPlaceholder('Your email');
    passwordInput = this.page.getByPlaceholder('Your password');
    loginButton = this.page.getByRole('button', { name: 'Login' });

    //Actions
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}