import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import FieldAgentUpdatePage from './field-agent-update.page-object';

const expect = chai.expect;
export class FieldAgentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('championApp.fieldAgent.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-fieldAgent'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FieldAgentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('field-agent-heading'));
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
    await navBarPage.getEntityPage('field-agent');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFieldAgent() {
    await this.createButton.click();
    return new FieldAgentUpdatePage();
  }

  async deleteFieldAgent() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fieldAgentDeleteDialog = new FieldAgentDeleteDialog();
    await waitUntilDisplayed(fieldAgentDeleteDialog.deleteModal);
    expect(await fieldAgentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/championApp.fieldAgent.delete.question/);
    await fieldAgentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fieldAgentDeleteDialog.deleteModal);

    expect(await isVisible(fieldAgentDeleteDialog.deleteModal)).to.be.false;
  }
}
