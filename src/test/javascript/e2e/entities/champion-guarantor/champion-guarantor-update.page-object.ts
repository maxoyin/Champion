import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ChampionGuarantorUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.championGuarantor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#champion-guarantor-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#champion-guarantor-lastName'));
  phoneNumberInput: ElementFinder = element(by.css('input#champion-guarantor-phoneNumber'));
  addressInput: ElementFinder = element(by.css('input#champion-guarantor-address'));
  statusSelect: ElementFinder = element(by.css('select#champion-guarantor-status'));
  occupationInput: ElementFinder = element(by.css('input#champion-guarantor-occupation'));
  updatedOnInput: ElementFinder = element(by.css('input#champion-guarantor-updatedOn'));
  championSelect: ElementFinder = element(by.css('select#champion-guarantor-champion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }
  async setOccupationInput(occupation) {
    await this.occupationInput.sendKeys(occupation);
  }

  async getOccupationInput() {
    return this.occupationInput.getAttribute('value');
  }

  async setUpdatedOnInput(updatedOn) {
    await this.updatedOnInput.sendKeys(updatedOn);
  }

  async getUpdatedOnInput() {
    return this.updatedOnInput.getAttribute('value');
  }

  async championSelectLastOption() {
    await this.championSelect.all(by.tagName('option')).last().click();
  }

  async championSelectOption(option) {
    await this.championSelect.sendKeys(option);
  }

  getChampionSelect() {
    return this.championSelect;
  }

  async getChampionSelectedOption() {
    return this.championSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setFirstNameInput('firstName');
    expect(await this.getFirstNameInput()).to.match(/firstName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneNumberInput('phoneNumber');
    expect(await this.getPhoneNumberInput()).to.match(/phoneNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressInput('address');
    expect(await this.getAddressInput()).to.match(/address/);
    await waitUntilDisplayed(this.saveButton);
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setOccupationInput('occupation');
    expect(await this.getOccupationInput()).to.match(/occupation/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedOnInput('01-01-2001');
    expect(await this.getUpdatedOnInput()).to.eq('2001-01-01');
    await this.championSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
