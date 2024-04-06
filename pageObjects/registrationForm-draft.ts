import { Locator } from "@playwright/test";

export interface RegistrationFormLocators {
  signupNameInput: string;
  signupLastNameInput: string;
  signupEmailInput: string;
  signupPasswordInput: string;
  signupRepeatPasswordInput: string;
}

export const registrationFormLocators: RegistrationFormLocators = {
  signupNameInput: "input#signupName",
  signupLastNameInput: "input#signupLastName",
  signupEmailInput: "input#signupEmail",
  signupPasswordInput: "input#signupPassword",
  signupRepeatPasswordInput: "input#signupRepeatPassword",
};
