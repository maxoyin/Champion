import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ChampionGuarantorUpdatePage from './champion-guarantor-update.page-object';

const expect = chai.expect;
export class ChampionGuarantorDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('championApp.championGuarantor.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-championGuarantor'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ChampionGuarantorComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('champion-guarantor-heading'));
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
    await navBarPage.getEntityPage('champion-guarantor');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateChampionGuarantor() {
    await this.createButton.click();
    return new ChampionGuarantorUpdatePage();
  }

  async deleteChampionGuarantor() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const championGuarantorDeleteDialog = new ChampionGuarantorDeleteDialog();
    await waitUntilDisplayed(championGuarantorDeleteDialog.deleteModal);
    expect(await championGuarantorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /championApp.championGuarantor.delete.question/
    );
    await championGuarantorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(championGuarantorDeleteDialog.deleteModal);

    expect(await isVisible(championGuarantorDeleteDialog.deleteModal)).to.be.false;
  }
}
