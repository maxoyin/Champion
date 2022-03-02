import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ChampionStatusHistoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.championStatusHistory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusSelect: ElementFinder = element(by.css('select#champion-status-history-status'));
  statusEndedOnInput: ElementFinder = element(by.css('input#champion-status-history-statusEndedOn'));
  commentsInput: ElementFinder = element(by.css('input#champion-status-history-comments'));
  inactiveStartDateInput: ElementFinder = element(by.css('input#champion-status-history-inactiveStartDate'));
  inactiveEndDateInput: ElementFinder = element(by.css('input#champion-status-history-inactiveEndDate'));
  championStatusChangeReasonSelect: ElementFinder = element(by.css('select#champion-status-history-championStatusChangeReason'));
  championSelect: ElementFinder = element(by.css('select#champion-status-history-champion'));

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
  async setStatusEndedOnInput(statusEndedOn) {
    await this.statusEndedOnInput.sendKeys(statusEndedOn);
  }

  async getStatusEndedOnInput() {
    return this.statusEndedOnInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return this.commentsInput.getAttribute('value');
  }

  async setInactiveStartDateInput(inactiveStartDate) {
    await this.inactiveStartDateInput.sendKeys(inactiveStartDate);
  }

  async getInactiveStartDateInput() {
    return this.inactiveStartDateInput.getAttribute('value');
  }

  async setInactiveEndDateInput(inactiveEndDate) {
    await this.inactiveEndDateInput.sendKeys(inactiveEndDate);
  }

  async getInactiveEndDateInput() {
    return this.inactiveEndDateInput.getAttribute('value');
  }

  async championStatusChangeReasonSelectLastOption() {
    await this.championStatusChangeReasonSelect.all(by.tagName('option')).last().click();
  }

  async championStatusChangeReasonSelectOption(option) {
    await this.championStatusChangeReasonSelect.sendKeys(option);
  }

  getChampionStatusChangeReasonSelect() {
    return this.championStatusChangeReasonSelect;
  }

  async getChampionStatusChangeReasonSelectedOption() {
    return this.championStatusChangeReasonSelect.element(by.css('option:checked')).getText();
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
    await this.setStatusEndedOnInput('01-01-2001');
    expect(await this.getStatusEndedOnInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommentsInput('comments');
    expect(await this.getCommentsInput()).to.match(/comments/);
    await waitUntilDisplayed(this.saveButton);
    await this.setInactiveStartDateInput('01-01-2001');
    expect(await this.getInactiveStartDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setInactiveEndDateInput('01-01-2001');
    expect(await this.getInactiveEndDateInput()).to.eq('2001-01-01');
    await this.championStatusChangeReasonSelectLastOption();
    await this.championSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
