import { Page } from '@playwright/test';

export class RegisterPage {
    constructor(private page: Page) {}

    // Registers Locators
    firstNameInput = this.page.getByPlaceholder('First name *');
    lastNameInput = this.page.getByPlaceholder('Your last name *');
    dateOfBirthInput = this.page.getByPlaceholder('YYYY-MM-DD');
    streetInput = this.page.getByPlaceholder('Your street *');
    postalCodeInput = this.page.getByPlaceholder('Your postcode *');
    cityInput = this.page.getByPlaceholder('Your city *');
    stateInput = this.page.getByPlaceholder('Your state *');
    countrySelect = this.page.getByRole('combobox', { name: 'Country' });
    phoneInput = this.page.getByPlaceholder('Your phone *');
    emailInput = this.page.getByPlaceholder('Your email *');
    passwordInput = this.page.getByPlaceholder('Your password');
    registerButton = this.page.getByRole('button', { name: 'Register' });

    //Actions
    async register(firstName: string, lastName: string, dateOfBirth: string, street: string, postalCode: string, 
                     city: string, state: string, country: string, phone: string, email: string, password: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.dateOfBirthInput.fill(dateOfBirth);
        await this.streetInput.fill(street);
        await this.postalCodeInput.fill(postalCode);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.countrySelect.selectOption({ label: 'Palestine, State of' });
        await this.phoneInput.fill(phone);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerButton.click();
    }
}
