import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ChampionStatusChangeReasonComponentsPage from './champion-status-change-reason.page-object';
import ChampionStatusChangeReasonUpdatePage from './champion-status-change-reason-update.page-object';
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

describe('ChampionStatusChangeReason e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let championStatusChangeReasonComponentsPage: ChampionStatusChangeReasonComponentsPage;
  let championStatusChangeReasonUpdatePage: ChampionStatusChangeReasonUpdatePage;
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
    championStatusChangeReasonComponentsPage = new ChampionStatusChangeReasonComponentsPage();
    championStatusChangeReasonComponentsPage = await championStatusChangeReasonComponentsPage.goToPage(navBarPage);
  });

  it('should load ChampionStatusChangeReasons', async () => {
    expect(await championStatusChangeReasonComponentsPage.title.getText()).to.match(/Champion Status Change Reasons/);
    expect(await championStatusChangeReasonComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ChampionStatusChangeReasons', async () => {
    const beforeRecordsCount = (await isVisible(championStatusChangeReasonComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(championStatusChangeReasonComponentsPage.table);
    championStatusChangeReasonUpdatePage = await championStatusChangeReasonComponentsPage.goToCreateChampionStatusChangeReason();
    await championStatusChangeReasonUpdatePage.enterData();

    expect(await championStatusChangeReasonComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(championStatusChangeReasonComponentsPage.table);
    await waitUntilCount(championStatusChangeReasonComponentsPage.records, beforeRecordsCount + 1);
    expect(await championStatusChangeReasonComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await championStatusChangeReasonComponentsPage.deleteChampionStatusChangeReason();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(championStatusChangeReasonComponentsPage.records, beforeRecordsCount);
      expect(await championStatusChangeReasonComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(championStatusChangeReasonComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
