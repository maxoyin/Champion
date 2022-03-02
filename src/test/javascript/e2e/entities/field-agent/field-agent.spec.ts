import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FieldAgentComponentsPage from './field-agent.page-object';
import FieldAgentUpdatePage from './field-agent-update.page-object';
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

describe('FieldAgent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fieldAgentComponentsPage: FieldAgentComponentsPage;
  let fieldAgentUpdatePage: FieldAgentUpdatePage;
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
    fieldAgentComponentsPage = new FieldAgentComponentsPage();
    fieldAgentComponentsPage = await fieldAgentComponentsPage.goToPage(navBarPage);
  });

  it('should load FieldAgents', async () => {
    expect(await fieldAgentComponentsPage.title.getText()).to.match(/Field Agents/);
    expect(await fieldAgentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FieldAgents', async () => {
    const beforeRecordsCount = (await isVisible(fieldAgentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(fieldAgentComponentsPage.table);
    fieldAgentUpdatePage = await fieldAgentComponentsPage.goToCreateFieldAgent();
    await fieldAgentUpdatePage.enterData();

    expect(await fieldAgentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fieldAgentComponentsPage.table);
    await waitUntilCount(fieldAgentComponentsPage.records, beforeRecordsCount + 1);
    expect(await fieldAgentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fieldAgentComponentsPage.deleteFieldAgent();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fieldAgentComponentsPage.records, beforeRecordsCount);
      expect(await fieldAgentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fieldAgentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
