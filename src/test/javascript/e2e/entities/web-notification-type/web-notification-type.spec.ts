import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WebNotificationTypeComponentsPage from './web-notification-type.page-object';
import WebNotificationTypeUpdatePage from './web-notification-type-update.page-object';
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

describe('WebNotificationType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let webNotificationTypeComponentsPage: WebNotificationTypeComponentsPage;
  let webNotificationTypeUpdatePage: WebNotificationTypeUpdatePage;
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
    webNotificationTypeComponentsPage = new WebNotificationTypeComponentsPage();
    webNotificationTypeComponentsPage = await webNotificationTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load WebNotificationTypes', async () => {
    expect(await webNotificationTypeComponentsPage.title.getText()).to.match(/Web Notification Types/);
    expect(await webNotificationTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete WebNotificationTypes', async () => {
    const beforeRecordsCount = (await isVisible(webNotificationTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(webNotificationTypeComponentsPage.table);
    webNotificationTypeUpdatePage = await webNotificationTypeComponentsPage.goToCreateWebNotificationType();
    await webNotificationTypeUpdatePage.enterData();

    expect(await webNotificationTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(webNotificationTypeComponentsPage.table);
    await waitUntilCount(webNotificationTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await webNotificationTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await webNotificationTypeComponentsPage.deleteWebNotificationType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(webNotificationTypeComponentsPage.records, beforeRecordsCount);
      expect(await webNotificationTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(webNotificationTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
