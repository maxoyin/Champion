import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class IncidentUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.incident.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  incidentAddressInput: ElementFinder = element(by.css('input#incident-incidentAddress'));
  statusSelect: ElementFinder = element(by.css('select#incident-status'));
  reportedOnInput: ElementFinder = element(by.css('input#incident-reportedOn'));
  reportedByInput: ElementFinder = element(by.css('input#incident-reportedBy'));
  updatedOnInput: ElementFinder = element(by.css('input#incident-updatedOn'));
  updatedByInput: ElementFinder = element(by.css('input#incident-updatedBy'));
  resolvedOnInput: ElementFinder = element(by.css('input#incident-resolvedOn'));
  reportingCommentsInput: ElementFinder = element(by.css('input#incident-reportingComments'));
  updateStatusCommentsInput: ElementFinder = element(by.css('input#incident-updateStatusComments'));
  championSelect: ElementFinder = element(by.css('select#incident-champion'));
  fieldAgentSelect: ElementFinder = element(by.css('select#incident-fieldAgent'));
  incidentTypeSelect: ElementFinder = element(by.css('select#incident-incidentType'));
  championSelect: ElementFinder = element(by.css('select#incident-champion'));
  fieldAgentSelect: ElementFinder = element(by.css('select#incident-fieldAgent'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIncidentAddressInput(incidentAddress) {
    await this.incidentAddressInput.sendKeys(incidentAddress);
  }

  async getIncidentAddressInput() {
    return this.incidentAddressInput.getAttribute('value');
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
  async setReportedOnInput(reportedOn) {
    await this.reportedOnInput.sendKeys(reportedOn);
  }

  async getReportedOnInput() {
    return this.reportedOnInput.getAttribute('value');
  }

  async setReportedByInput(reportedBy) {
    await this.reportedByInput.sendKeys(reportedBy);
  }

  async getReportedByInput() {
    return this.reportedByInput.getAttribute('value');
  }

  async setUpdatedOnInput(updatedOn) {
    await this.updatedOnInput.sendKeys(updatedOn);
  }

  async getUpdatedOnInput() {
    return this.updatedOnInput.getAttribute('value');
  }

  async setUpdatedByInput(updatedBy) {
    await this.updatedByInput.sendKeys(updatedBy);
  }

  async getUpdatedByInput() {
    return this.updatedByInput.getAttribute('value');
  }

  async setResolvedOnInput(resolvedOn) {
    await this.resolvedOnInput.sendKeys(resolvedOn);
  }

  async getResolvedOnInput() {
    return this.resolvedOnInput.getAttribute('value');
  }

  async setReportingCommentsInput(reportingComments) {
    await this.reportingCommentsInput.sendKeys(reportingComments);
  }

  async getReportingCommentsInput() {
    return this.reportingCommentsInput.getAttribute('value');
  }

  async setUpdateStatusCommentsInput(updateStatusComments) {
    await this.updateStatusCommentsInput.sendKeys(updateStatusComments);
  }

  async getUpdateStatusCommentsInput() {
    return this.updateStatusCommentsInput.getAttribute('value');
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

  async fieldAgentSelectLastOption() {
    await this.fieldAgentSelect.all(by.tagName('option')).last().click();
  }

  async fieldAgentSelectOption(option) {
    await this.fieldAgentSelect.sendKeys(option);
  }

  getFieldAgentSelect() {
    return this.fieldAgentSelect;
  }

  async getFieldAgentSelectedOption() {
    return this.fieldAgentSelect.element(by.css('option:checked')).getText();
  }

  async incidentTypeSelectLastOption() {
    await this.incidentTypeSelect.all(by.tagName('option')).last().click();
  }

  async incidentTypeSelectOption(option) {
    await this.incidentTypeSelect.sendKeys(option);
  }

  getIncidentTypeSelect() {
    return this.incidentTypeSelect;
  }

  async getIncidentTypeSelectedOption() {
    return this.incidentTypeSelect.element(by.css('option:checked')).getText();
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

  async fieldAgentSelectLastOption() {
    await this.fieldAgentSelect.all(by.tagName('option')).last().click();
  }

  async fieldAgentSelectOption(option) {
    await this.fieldAgentSelect.sendKeys(option);
  }

  getFieldAgentSelect() {
    return this.fieldAgentSelect;
  }

  async getFieldAgentSelectedOption() {
    return this.fieldAgentSelect.element(by.css('option:checked')).getText();
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
    await this.setIncidentAddressInput('incidentAddress');
    expect(await this.getIncidentAddressInput()).to.match(/incidentAddress/);
    await waitUntilDisplayed(this.saveButton);
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setReportedOnInput('01-01-2001');
    expect(await this.getReportedOnInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportedByInput('reportedBy');
    expect(await this.getReportedByInput()).to.match(/reportedBy/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedOnInput('01-01-2001');
    expect(await this.getUpdatedOnInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedByInput('updatedBy');
    expect(await this.getUpdatedByInput()).to.match(/updatedBy/);
    await waitUntilDisplayed(this.saveButton);
    await this.setResolvedOnInput('01-01-2001');
    expect(await this.getResolvedOnInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setReportingCommentsInput('reportingComments');
    expect(await this.getReportingCommentsInput()).to.match(/reportingComments/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdateStatusCommentsInput('updateStatusComments');
    expect(await this.getUpdateStatusCommentsInput()).to.match(/updateStatusComments/);
    await this.championSelectLastOption();
    await this.fieldAgentSelectLastOption();
    await this.incidentTypeSelectLastOption();
    await this.championSelectLastOption();
    await this.fieldAgentSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
