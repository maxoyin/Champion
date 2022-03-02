import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WebNotificationComponentsPage from './web-notification.page-object';
import WebNotificationUpdatePage from './web-notification-update.page-object';
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

describe('WebNotification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let webNotificationComponentsPage: WebNotificationComponentsPage;
  let webNotificationUpdatePage: WebNotificationUpdatePage;
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
    webNotificationComponentsPage = new WebNotificationComponentsPage();
    webNotificationComponentsPage = await webNotificationComponentsPage.goToPage(navBarPage);
  });

  it('should load WebNotifications', async () => {
    expect(await webNotificationComponentsPage.title.getText()).to.match(/Web Notifications/);
    expect(await webNotificationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete WebNotifications', async () => {
    const beforeRecordsCount = (await isVisible(webNotificationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(webNotificationComponentsPage.table);
    webNotificationUpdatePage = await webNotificationComponentsPage.goToCreateWebNotification();
    await webNotificationUpdatePage.enterData();

    expect(await webNotificationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(webNotificationComponentsPage.table);
    await waitUntilCount(webNotificationComponentsPage.records, beforeRecordsCount + 1);
    expect(await webNotificationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await webNotificationComponentsPage.deleteWebNotification();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(webNotificationComponentsPage.records, beforeRecordsCount);
      expect(await webNotificationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(webNotificationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
