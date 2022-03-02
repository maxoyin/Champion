import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import WebNotificationUpdatePage from './web-notification-update.page-object';

const expect = chai.expect;
export class WebNotificationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('championApp.webNotification.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-webNotification'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class WebNotificationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('web-notification-heading'));
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
    await navBarPage.getEntityPage('web-notification');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateWebNotification() {
    await this.createButton.click();
    return new WebNotificationUpdatePage();
  }

  async deleteWebNotification() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const webNotificationDeleteDialog = new WebNotificationDeleteDialog();
    await waitUntilDisplayed(webNotificationDeleteDialog.deleteModal);
    expect(await webNotificationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/championApp.webNotification.delete.question/);
    await webNotificationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(webNotificationDeleteDialog.deleteModal);

    expect(await isVisible(webNotificationDeleteDialog.deleteModal)).to.be.false;
  }
}
