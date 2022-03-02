import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IncidentTypeComponentsPage from './incident-type.page-object';
import IncidentTypeUpdatePage from './incident-type-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('IncidentType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let incidentTypeComponentsPage: IncidentTypeComponentsPage;
  let incidentTypeUpdatePage: IncidentTypeUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    incidentTypeComponentsPage = new IncidentTypeComponentsPage();
    incidentTypeComponentsPage = await incidentTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load IncidentTypes', async () => {
    expect(await incidentTypeComponentsPage.title.getText()).to.match(/Incident Types/);
    expect(await incidentTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete IncidentTypes', async () => {
    const beforeRecordsCount = (await isVisible(incidentTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(incidentTypeComponentsPage.table);
    incidentTypeUpdatePage = await incidentTypeComponentsPage.goToCreateIncidentType();
    await incidentTypeUpdatePage.enterData();

    expect(await incidentTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(incidentTypeComponentsPage.table);
    await waitUntilCount(incidentTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await incidentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await incidentTypeComponentsPage.deleteIncidentType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(incidentTypeComponentsPage.records, beforeRecordsCount);
      expect(await incidentTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(incidentTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
