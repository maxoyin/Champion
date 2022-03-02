import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import WebNotificationTypeUpdatePage from './web-notification-type-update.page-object';

const expect = chai.expect;
export class WebNotificationTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('championApp.webNotificationType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-webNotificationType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class WebNotificationTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('web-notification-type-heading'));
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
    await navBarPage.getEntityPage('web-notification-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateWebNotificationType() {
    await this.createButton.click();
    return new WebNotificationTypeUpdatePage();
  }

  async deleteWebNotificationType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const webNotificationTypeDeleteDialog = new WebNotificationTypeDeleteDialog();
    await waitUntilDisplayed(webNotificationTypeDeleteDialog.deleteModal);
    expect(await webNotificationTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /championApp.webNotificationType.delete.question/
    );
    await webNotificationTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(webNotificationTypeDeleteDialog.deleteModal);

    expect(await isVisible(webNotificationTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
