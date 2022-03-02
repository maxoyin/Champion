import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class WebNotificationTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.webNotificationType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeInput: ElementFinder = element(by.css('input#web-notification-type-type'));
  displayNameInput: ElementFinder = element(by.css('input#web-notification-type-displayName'));
  oneLinerNoteInput: ElementFinder = element(by.css('input#web-notification-type-oneLinerNote'));
  detailedNoteInput: ElementFinder = element(by.css('input#web-notification-type-detailedNote'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async setDisplayNameInput(displayName) {
    await this.displayNameInput.sendKeys(displayName);
  }

  async getDisplayNameInput() {
    return this.displayNameInput.getAttribute('value');
  }

  async setOneLinerNoteInput(oneLinerNote) {
    await this.oneLinerNoteInput.sendKeys(oneLinerNote);
  }

  async getOneLinerNoteInput() {
    return this.oneLinerNoteInput.getAttribute('value');
  }

  async setDetailedNoteInput(detailedNote) {
    await this.detailedNoteInput.sendKeys(detailedNote);
  }

  async getDetailedNoteInput() {
    return this.detailedNoteInput.getAttribute('value');
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
    await this.setTypeInput('type');
    expect(await this.getTypeInput()).to.match(/type/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDisplayNameInput('displayName');
    expect(await this.getDisplayNameInput()).to.match(/displayName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOneLinerNoteInput('oneLinerNote');
    expect(await this.getOneLinerNoteInput()).to.match(/oneLinerNote/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDetailedNoteInput('detailedNote');
    expect(await this.getDetailedNoteInput()).to.match(/detailedNote/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
