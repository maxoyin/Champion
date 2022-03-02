import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import IncidentTypeUpdatePage from './incident-type-update.page-object';

const expect = chai.expect;
export class IncidentTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('championApp.incidentType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-incidentType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class IncidentTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('incident-type-heading'));
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
    await navBarPage.getEntityPage('incident-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateIncidentType() {
    await this.createButton.click();
    return new IncidentTypeUpdatePage();
  }

  async deleteIncidentType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const incidentTypeDeleteDialog = new IncidentTypeDeleteDialog();
    await waitUntilDisplayed(incidentTypeDeleteDialog.deleteModal);
    expect(await incidentTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/championApp.incidentType.delete.question/);
    await incidentTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(incidentTypeDeleteDialog.deleteModal);

    expect(await isVisible(incidentTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
