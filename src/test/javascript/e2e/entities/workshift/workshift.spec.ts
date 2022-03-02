import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WorkshiftComponentsPage from './workshift.page-object';
import WorkshiftUpdatePage from './workshift-update.page-object';
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

describe('Workshift e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let workshiftComponentsPage: WorkshiftComponentsPage;
  let workshiftUpdatePage: WorkshiftUpdatePage;
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
    workshiftComponentsPage = new WorkshiftComponentsPage();
    workshiftComponentsPage = await workshiftComponentsPage.goToPage(navBarPage);
  });

  it('should load Workshifts', async () => {
    expect(await workshiftComponentsPage.title.getText()).to.match(/Workshifts/);
    expect(await workshiftComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Workshifts', async () => {
    const beforeRecordsCount = (await isVisible(workshiftComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(workshiftComponentsPage.table);
    workshiftUpdatePage = await workshiftComponentsPage.goToCreateWorkshift();
    await workshiftUpdatePage.enterData();

    expect(await workshiftComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(workshiftComponentsPage.table);
    await waitUntilCount(workshiftComponentsPage.records, beforeRecordsCount + 1);
    expect(await workshiftComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await workshiftComponentsPage.deleteWorkshift();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(workshiftComponentsPage.records, beforeRecordsCount);
      expect(await workshiftComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(workshiftComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
