import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class IncidentTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.incidentType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  incidentTypeCodeInput: ElementFinder = element(by.css('input#incident-type-incidentTypeCode'));
  incidentTypeDisplayNameInput: ElementFinder = element(by.css('input#incident-type-incidentTypeDisplayName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIncidentTypeCodeInput(incidentTypeCode) {
    await this.incidentTypeCodeInput.sendKeys(incidentTypeCode);
  }

  async getIncidentTypeCodeInput() {
    return this.incidentTypeCodeInput.getAttribute('value');
  }

  async setIncidentTypeDisplayNameInput(incidentTypeDisplayName) {
    await this.incidentTypeDisplayNameInput.sendKeys(incidentTypeDisplayName);
  }

  async getIncidentTypeDisplayNameInput() {
    return this.incidentTypeDisplayNameInput.getAttribute('value');
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
    await this.setIncidentTypeCodeInput('incidentTypeCode');
    expect(await this.getIncidentTypeCodeInput()).to.match(/incidentTypeCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIncidentTypeDisplayNameInput('incidentTypeDisplayName');
    expect(await this.getIncidentTypeDisplayNameInput()).to.match(/incidentTypeDisplayName/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
