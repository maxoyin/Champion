import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class WebNotificationUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.webNotification.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusSelect: ElementFinder = element(by.css('select#web-notification-status'));
  requestPayloadInput: ElementFinder = element(by.css('input#web-notification-requestPayload'));
  updatedOnInput: ElementFinder = element(by.css('input#web-notification-updatedOn'));
  updatedByInput: ElementFinder = element(by.css('input#web-notification-updatedBy'));
  closedOnInput: ElementFinder = element(by.css('input#web-notification-closedOn'));
  closedByInput: ElementFinder = element(by.css('input#web-notification-closedBy'));
  webNotificationTypeSelect: ElementFinder = element(by.css('select#web-notification-webNotificationType'));
  championSelect: ElementFinder = element(by.css('select#web-notification-champion'));

  getPageTitle() {
    return this.pageTitle;
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
  async setRequestPayloadInput(requestPayload) {
    await this.requestPayloadInput.sendKeys(requestPayload);
  }

  async getRequestPayloadInput() {
    return this.requestPayloadInput.getAttribute('value');
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

  async setClosedOnInput(closedOn) {
    await this.closedOnInput.sendKeys(closedOn);
  }

  async getClosedOnInput() {
    return this.closedOnInput.getAttribute('value');
  }

  async setClosedByInput(closedBy) {
    await this.closedByInput.sendKeys(closedBy);
  }

  async getClosedByInput() {
    return this.closedByInput.getAttribute('value');
  }

  async webNotificationTypeSelectLastOption() {
    await this.webNotificationTypeSelect.all(by.tagName('option')).last().click();
  }

  async webNotificationTypeSelectOption(option) {
    await this.webNotificationTypeSelect.sendKeys(option);
  }

  getWebNotificationTypeSelect() {
    return this.webNotificationTypeSelect;
  }

  async getWebNotificationTypeSelectedOption() {
    return this.webNotificationTypeSelect.element(by.css('option:checked')).getText();
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
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setRequestPayloadInput('requestPayload');
    expect(await this.getRequestPayloadInput()).to.match(/requestPayload/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedOnInput('01-01-2001');
    expect(await this.getUpdatedOnInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedByInput('updatedBy');
    expect(await this.getUpdatedByInput()).to.match(/updatedBy/);
    await waitUntilDisplayed(this.saveButton);
    await this.setClosedOnInput('01-01-2001');
    expect(await this.getClosedOnInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setClosedByInput('closedBy');
    expect(await this.getClosedByInput()).to.match(/closedBy/);
    await this.webNotificationTypeSelectLastOption();
    await this.championSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
