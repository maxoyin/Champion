import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class FieldAgentUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.fieldAgent.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  accountIdInput: ElementFinder = element(by.css('input#field-agent-accountId'));
  cityIdInput: ElementFinder = element(by.css('input#field-agent-cityId'));
  stateIdInput: ElementFinder = element(by.css('input#field-agent-stateId'));
  updatedOnInput: ElementFinder = element(by.css('input#field-agent-updatedOn'));
  workshiftSelect: ElementFinder = element(by.css('select#field-agent-workshift'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAccountIdInput(accountId) {
    await this.accountIdInput.sendKeys(accountId);
  }

  async getAccountIdInput() {
    return this.accountIdInput.getAttribute('value');
  }

  async setCityIdInput(cityId) {
    await this.cityIdInput.sendKeys(cityId);
  }

  async getCityIdInput() {
    return this.cityIdInput.getAttribute('value');
  }

  async setStateIdInput(stateId) {
    await this.stateIdInput.sendKeys(stateId);
  }

  async getStateIdInput() {
    return this.stateIdInput.getAttribute('value');
  }

  async setUpdatedOnInput(updatedOn) {
    await this.updatedOnInput.sendKeys(updatedOn);
  }

  async getUpdatedOnInput() {
    return this.updatedOnInput.getAttribute('value');
  }

  async workshiftSelectLastOption() {
    await this.workshiftSelect.all(by.tagName('option')).last().click();
  }

  async workshiftSelectOption(option) {
    await this.workshiftSelect.sendKeys(option);
  }

  getWorkshiftSelect() {
    return this.workshiftSelect;
  }

  async getWorkshiftSelectedOption() {
    return this.workshiftSelect.element(by.css('option:checked')).getText();
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
    await this.setAccountIdInput('accountId');
    expect(await this.getAccountIdInput()).to.match(/accountId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCityIdInput('cityId');
    expect(await this.getCityIdInput()).to.match(/cityId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStateIdInput('stateId');
    expect(await this.getStateIdInput()).to.match(/stateId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedOnInput('01-01-2001');
    expect(await this.getUpdatedOnInput()).to.eq('2001-01-01');
    await this.workshiftSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
