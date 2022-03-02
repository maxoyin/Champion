import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ChampionStatusHistoryUpdatePage from './champion-status-history-update.page-object';

const expect = chai.expect;
export class ChampionStatusHistoryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('championApp.championStatusHistory.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-championStatusHistory'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ChampionStatusHistoryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('champion-status-history-heading'));
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
    await navBarPage.getEntityPage('champion-status-history');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateChampionStatusHistory() {
    await this.createButton.click();
    return new ChampionStatusHistoryUpdatePage();
  }

  async deleteChampionStatusHistory() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const championStatusHistoryDeleteDialog = new ChampionStatusHistoryDeleteDialog();
    await waitUntilDisplayed(championStatusHistoryDeleteDialog.deleteModal);
    expect(await championStatusHistoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /championApp.championStatusHistory.delete.question/
    );
    await championStatusHistoryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(championStatusHistoryDeleteDialog.deleteModal);

    expect(await isVisible(championStatusHistoryDeleteDialog.deleteModal)).to.be.false;
  }
}
