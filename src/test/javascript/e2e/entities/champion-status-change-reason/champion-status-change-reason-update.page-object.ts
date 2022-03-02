import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ChampionStatusChangeReasonUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.championStatusChangeReason.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  reasonInput: ElementFinder = element(by.css('input#champion-status-change-reason-reason'));
  reasonForChampionStatusSelect: ElementFinder = element(by.css('select#champion-status-change-reason-reasonForChampionStatus'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReasonInput(reason) {
    await this.reasonInput.sendKeys(reason);
  }

  async getReasonInput() {
    return this.reasonInput.getAttribute('value');
  }

  async setReasonForChampionStatusSelect(reasonForChampionStatus) {
    await this.reasonForChampionStatusSelect.sendKeys(reasonForChampionStatus);
  }

  async getReasonForChampionStatusSelect() {
    return this.reasonForChampionStatusSelect.element(by.css('option:checked')).getText();
  }

  async reasonForChampionStatusSelectLastOption() {
    await this.reasonForChampionStatusSelect.all(by.tagName('option')).last().click();
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
    await this.setReasonInput('reason');
    expect(await this.getReasonInput()).to.match(/reason/);
    await waitUntilDisplayed(this.saveButton);
    await this.reasonForChampionStatusSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
