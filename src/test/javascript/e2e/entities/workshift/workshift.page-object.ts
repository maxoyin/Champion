import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import WorkshiftUpdatePage from './workshift-update.page-object';

const expect = chai.expect;
export class WorkshiftDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('championApp.workshift.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-workshift'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class WorkshiftComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('workshift-heading'));
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
    await navBarPage.getEntityPage('workshift');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateWorkshift() {
    await this.createButton.click();
    return new WorkshiftUpdatePage();
  }

  async deleteWorkshift() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const workshiftDeleteDialog = new WorkshiftDeleteDialog();
    await waitUntilDisplayed(workshiftDeleteDialog.deleteModal);
    expect(await workshiftDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/championApp.workshift.delete.question/);
    await workshiftDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(workshiftDeleteDialog.deleteModal);

    expect(await isVisible(workshiftDeleteDialog.deleteModal)).to.be.false;
  }
}
