import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ChampionGuarantorComponentsPage from './champion-guarantor.page-object';
import ChampionGuarantorUpdatePage from './champion-guarantor-update.page-object';
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

describe('ChampionGuarantor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let championGuarantorComponentsPage: ChampionGuarantorComponentsPage;
  let championGuarantorUpdatePage: ChampionGuarantorUpdatePage;
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
    championGuarantorComponentsPage = new ChampionGuarantorComponentsPage();
    championGuarantorComponentsPage = await championGuarantorComponentsPage.goToPage(navBarPage);
  });

  it('should load ChampionGuarantors', async () => {
    expect(await championGuarantorComponentsPage.title.getText()).to.match(/Champion Guarantors/);
    expect(await championGuarantorComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ChampionGuarantors', async () => {
    const beforeRecordsCount = (await isVisible(championGuarantorComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(championGuarantorComponentsPage.table);
    championGuarantorUpdatePage = await championGuarantorComponentsPage.goToCreateChampionGuarantor();
    await championGuarantorUpdatePage.enterData();

    expect(await championGuarantorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(championGuarantorComponentsPage.table);
    await waitUntilCount(championGuarantorComponentsPage.records, beforeRecordsCount + 1);
    expect(await championGuarantorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await championGuarantorComponentsPage.deleteChampionGuarantor();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(championGuarantorComponentsPage.records, beforeRecordsCount);
      expect(await championGuarantorComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(championGuarantorComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
