import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ChampionStatusHistoryComponentsPage from './champion-status-history.page-object';
import ChampionStatusHistoryUpdatePage from './champion-status-history-update.page-object';
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

describe('ChampionStatusHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let championStatusHistoryComponentsPage: ChampionStatusHistoryComponentsPage;
  let championStatusHistoryUpdatePage: ChampionStatusHistoryUpdatePage;
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
    championStatusHistoryComponentsPage = new ChampionStatusHistoryComponentsPage();
    championStatusHistoryComponentsPage = await championStatusHistoryComponentsPage.goToPage(navBarPage);
  });

  it('should load ChampionStatusHistories', async () => {
    expect(await championStatusHistoryComponentsPage.title.getText()).to.match(/Champion Status Histories/);
    expect(await championStatusHistoryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ChampionStatusHistories', async () => {
    const beforeRecordsCount = (await isVisible(championStatusHistoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(championStatusHistoryComponentsPage.table);
    championStatusHistoryUpdatePage = await championStatusHistoryComponentsPage.goToCreateChampionStatusHistory();
    await championStatusHistoryUpdatePage.enterData();

    expect(await championStatusHistoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(championStatusHistoryComponentsPage.table);
    await waitUntilCount(championStatusHistoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await championStatusHistoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await championStatusHistoryComponentsPage.deleteChampionStatusHistory();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(championStatusHistoryComponentsPage.records, beforeRecordsCount);
      expect(await championStatusHistoryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(championStatusHistoryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
