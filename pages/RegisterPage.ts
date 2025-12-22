import { Page } from '@playwright/test';

export class RegisterPage {
    constructor(private page: Page) {}

    //Locators
    firstNameInput = this.page.getByPlaceholder('First Name *');
    lastNameInput = this.page.getByPlaceholder('Last Name *');
    dateOfBirthInput = this.page.getByPlaceholder('YYYY-MM-DD');
    streetInput = this.page.getByPlaceholder('your street *');
    postalCodeInput = this.page.getByPlaceholder('your postcode *');
    cityInput = this.page.getByPlaceholder('your city *');
    stateInput = this.page.getByPlaceholder('your state *');
    countrySelect = this.page.getByRole('combobox', { name: 'Country' });
    phoneInput = this.page.getByPlaceholder('Phone *');
    emailInput = this.page.getByPlaceholder('Email *');
    passwordInput = this.page.getByPlaceholder('Password');
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
