import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ChampionStatusChangeReasonUpdatePage from './champion-status-change-reason-update.page-object';

const expect = chai.expect;
export class ChampionStatusChangeReasonDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('championApp.championStatusChangeReason.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-championStatusChangeReason'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ChampionStatusChangeReasonComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('champion-status-change-reason-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('champion-status-change-reason');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateChampionStatusChangeReason() {
    await this.createButton.click();
    return new ChampionStatusChangeReasonUpdatePage();
  }

  async deleteChampionStatusChangeReason() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const championStatusChangeReasonDeleteDialog = new ChampionStatusChangeReasonDeleteDialog();
    await waitUntilDisplayed(championStatusChangeReasonDeleteDialog.deleteModal);
    expect(await championStatusChangeReasonDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /championApp.championStatusChangeReason.delete.question/
    );
    await championStatusChangeReasonDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(championStatusChangeReasonDeleteDialog.deleteModal);

    expect(await isVisible(championStatusChangeReasonDeleteDialog.deleteModal)).to.be.false;
  }
}
