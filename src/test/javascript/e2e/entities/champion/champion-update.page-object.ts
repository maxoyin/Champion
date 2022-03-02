import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ChampionUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.champion.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  maxChampionIdInput: ElementFinder = element(by.css('input#champion-maxChampionId'));
  prospectiveIdInput: ElementFinder = element(by.css('input#champion-prospectiveId'));
  accountInput: ElementFinder = element(by.css('input#champion-account'));
  firstNameInput: ElementFinder = element(by.css('input#champion-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#champion-lastName'));
  middleNameInput: ElementFinder = element(by.css('input#champion-middleName'));
  phoneNumberInput: ElementFinder = element(by.css('input#champion-phoneNumber'));
  statusSelect: ElementFinder = element(by.css('select#champion-status'));
  cityInput: ElementFinder = element(by.css('input#champion-city'));
  emailAddressInput: ElementFinder = element(by.css('input#champion-emailAddress'));
  hasInsuranceInput: ElementFinder = element(by.css('input#champion-hasInsurance'));
  hasDriverLicenseInput: ElementFinder = element(by.css('input#champion-hasDriverLicense'));
  createdOnInput: ElementFinder = element(by.css('input#champion-createdOn'));
  activatedOnInput: ElementFinder = element(by.css('input#champion-activatedOn'));
  updatedOnInput: ElementFinder = element(by.css('input#champion-updatedOn'));
  welfareAnalystInput: ElementFinder = element(by.css('input#champion-welfareAnalyst'));
  maritalStatusSelect: ElementFinder = element(by.css('select#champion-maritalStatus'));
  stateOfOriginInput: ElementFinder = element(by.css('input#champion-stateOfOrigin'));
  stateOfBirthInput: ElementFinder = element(by.css('input#champion-stateOfBirth'));
  bankNameInput: ElementFinder = element(by.css('input#champion-bankName'));
  bankAccountNumberInput: ElementFinder = element(by.css('input#champion-bankAccountNumber'));
  bankAccountNameInput: ElementFinder = element(by.css('input#champion-bankAccountName'));
  neatOfKinNameInput: ElementFinder = element(by.css('input#champion-neatOfKinName'));
  nextOfKinPhoneInput: ElementFinder = element(by.css('input#champion-nextOfKinPhone'));
  dateOfBirthInput: ElementFinder = element(by.css('input#champion-dateOfBirth'));
  bvnInput: ElementFinder = element(by.css('input#champion-bvn'));
  houseAddressInput: ElementFinder = element(by.css('input#champion-houseAddress'));
  emergencyContactNameInput: ElementFinder = element(by.css('input#champion-emergencyContactName'));
  emergencyContactNumberInput: ElementFinder = element(by.css('input#champion-emergencyContactNumber'));
  entryChannelInput: ElementFinder = element(by.css('input#champion-entryChannel'));
  hmoProviderInput: ElementFinder = element(by.css('input#champion-hmoProvider'));
  hmoNumberInput: ElementFinder = element(by.css('input#champion-hmoNumber'));
  metaJsonInput: ElementFinder = element(by.css('input#file_metaJson'));
  dateEngagedInput: ElementFinder = element(by.css('input#champion-dateEngaged'));
  dateDisengagedInput: ElementFinder = element(by.css('input#champion-dateDisengaged'));
  ratingInput: ElementFinder = element(by.css('input#champion-rating'));
  helmetNumberInput: ElementFinder = element(by.css('input#champion-helmetNumber'));
  registrationNumberInput: ElementFinder = element(by.css('input#champion-registrationNumber'));
  phoneBrandInput: ElementFinder = element(by.css('input#champion-phoneBrand'));
  phoneImeNumberInput: ElementFinder = element(by.css('input#champion-phoneImeNumber'));
  contractorIdInput: ElementFinder = element(by.css('input#champion-contractorId'));
  serviceIdInput: ElementFinder = element(by.css('input#champion-serviceId'));
  packageIdInput: ElementFinder = element(by.css('input#champion-packageId'));
  deliveryServiceIdInput: ElementFinder = element(by.css('input#champion-deliveryServiceId'));
  statusIdInput: ElementFinder = element(by.css('input#champion-statusId'));
  reasonIdInput: ElementFinder = element(by.css('input#champion-reasonId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMaxChampionIdInput(maxChampionId) {
    await this.maxChampionIdInput.sendKeys(maxChampionId);
  }

  async getMaxChampionIdInput() {
    return this.maxChampionIdInput.getAttribute('value');
  }

  async setProspectiveIdInput(prospectiveId) {
    await this.prospectiveIdInput.sendKeys(prospectiveId);
  }

  async getProspectiveIdInput() {
    return this.prospectiveIdInput.getAttribute('value');
  }

  async setAccountInput(account) {
    await this.accountInput.sendKeys(account);
  }

  async getAccountInput() {
    return this.accountInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setMiddleNameInput(middleName) {
    await this.middleNameInput.sendKeys(middleName);
  }

  async getMiddleNameInput() {
    return this.middleNameInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }
  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setEmailAddressInput(emailAddress) {
    await this.emailAddressInput.sendKeys(emailAddress);
  }

  async getEmailAddressInput() {
    return this.emailAddressInput.getAttribute('value');
  }

  getHasInsuranceInput() {
    return this.hasInsuranceInput;
  }
  getHasDriverLicenseInput() {
    return this.hasDriverLicenseInput;
  }
  async setCreatedOnInput(createdOn) {
    await this.createdOnInput.sendKeys(createdOn);
  }

  async getCreatedOnInput() {
    return this.createdOnInput.getAttribute('value');
  }

  async setActivatedOnInput(activatedOn) {
    await this.activatedOnInput.sendKeys(activatedOn);
  }

  async getActivatedOnInput() {
    return this.activatedOnInput.getAttribute('value');
  }

  async setUpdatedOnInput(updatedOn) {
    await this.updatedOnInput.sendKeys(updatedOn);
  }

  async getUpdatedOnInput() {
    return this.updatedOnInput.getAttribute('value');
  }

  async setWelfareAnalystInput(welfareAnalyst) {
    await this.welfareAnalystInput.sendKeys(welfareAnalyst);
  }

  async getWelfareAnalystInput() {
    return this.welfareAnalystInput.getAttribute('value');
  }

  async setMaritalStatusSelect(maritalStatus) {
    await this.maritalStatusSelect.sendKeys(maritalStatus);
  }

  async getMaritalStatusSelect() {
    return this.maritalStatusSelect.element(by.css('option:checked')).getText();
  }

  async maritalStatusSelectLastOption() {
    await this.maritalStatusSelect.all(by.tagName('option')).last().click();
  }
  async setStateOfOriginInput(stateOfOrigin) {
    await this.stateOfOriginInput.sendKeys(stateOfOrigin);
  }

  async getStateOfOriginInput() {
    return this.stateOfOriginInput.getAttribute('value');
  }

  async setStateOfBirthInput(stateOfBirth) {
    await this.stateOfBirthInput.sendKeys(stateOfBirth);
  }

  async getStateOfBirthInput() {
    return this.stateOfBirthInput.getAttribute('value');
  }

  async setBankNameInput(bankName) {
    await this.bankNameInput.sendKeys(bankName);
  }

  async getBankNameInput() {
    return this.bankNameInput.getAttribute('value');
  }

  async setBankAccountNumberInput(bankAccountNumber) {
    await this.bankAccountNumberInput.sendKeys(bankAccountNumber);
  }

  async getBankAccountNumberInput() {
    return this.bankAccountNumberInput.getAttribute('value');
  }

  async setBankAccountNameInput(bankAccountName) {
    await this.bankAccountNameInput.sendKeys(bankAccountName);
  }

  async getBankAccountNameInput() {
    return this.bankAccountNameInput.getAttribute('value');
  }

  async setNeatOfKinNameInput(neatOfKinName) {
    await this.neatOfKinNameInput.sendKeys(neatOfKinName);
  }

  async getNeatOfKinNameInput() {
    return this.neatOfKinNameInput.getAttribute('value');
  }

  async setNextOfKinPhoneInput(nextOfKinPhone) {
    await this.nextOfKinPhoneInput.sendKeys(nextOfKinPhone);
  }

  async getNextOfKinPhoneInput() {
    return this.nextOfKinPhoneInput.getAttribute('value');
  }

  async setDateOfBirthInput(dateOfBirth) {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput() {
    return this.dateOfBirthInput.getAttribute('value');
  }

  async setBvnInput(bvn) {
    await this.bvnInput.sendKeys(bvn);
  }

  async getBvnInput() {
    return this.bvnInput.getAttribute('value');
  }

  async setHouseAddressInput(houseAddress) {
    await this.houseAddressInput.sendKeys(houseAddress);
  }

  async getHouseAddressInput() {
    return this.houseAddressInput.getAttribute('value');
  }

  async setEmergencyContactNameInput(emergencyContactName) {
    await this.emergencyContactNameInput.sendKeys(emergencyContactName);
  }

  async getEmergencyContactNameInput() {
    return this.emergencyContactNameInput.getAttribute('value');
  }

  async setEmergencyContactNumberInput(emergencyContactNumber) {
    await this.emergencyContactNumberInput.sendKeys(emergencyContactNumber);
  }

  async getEmergencyContactNumberInput() {
    return this.emergencyContactNumberInput.getAttribute('value');
  }

  async setEntryChannelInput(entryChannel) {
    await this.entryChannelInput.sendKeys(entryChannel);
  }

  async getEntryChannelInput() {
    return this.entryChannelInput.getAttribute('value');
  }

  async setHmoProviderInput(hmoProvider) {
    await this.hmoProviderInput.sendKeys(hmoProvider);
  }

  async getHmoProviderInput() {
    return this.hmoProviderInput.getAttribute('value');
  }

  async setHmoNumberInput(hmoNumber) {
    await this.hmoNumberInput.sendKeys(hmoNumber);
  }

  async getHmoNumberInput() {
    return this.hmoNumberInput.getAttribute('value');
  }

  async setMetaJsonInput(metaJson) {
    await this.metaJsonInput.sendKeys(metaJson);
  }

  async getMetaJsonInput() {
    return this.metaJsonInput.getAttribute('value');
  }

  async setDateEngagedInput(dateEngaged) {
    await this.dateEngagedInput.sendKeys(dateEngaged);
  }

  async getDateEngagedInput() {
    return this.dateEngagedInput.getAttribute('value');
  }

  async setDateDisengagedInput(dateDisengaged) {
    await this.dateDisengagedInput.sendKeys(dateDisengaged);
  }

  async getDateDisengagedInput() {
    return this.dateDisengagedInput.getAttribute('value');
  }

  async setRatingInput(rating) {
    await this.ratingInput.sendKeys(rating);
  }

  async getRatingInput() {
    return this.ratingInput.getAttribute('value');
  }

  async setHelmetNumberInput(helmetNumber) {
    await this.helmetNumberInput.sendKeys(helmetNumber);
  }

  async getHelmetNumberInput() {
    return this.helmetNumberInput.getAttribute('value');
  }

  async setRegistrationNumberInput(registrationNumber) {
    await this.registrationNumberInput.sendKeys(registrationNumber);
  }

  async getRegistrationNumberInput() {
    return this.registrationNumberInput.getAttribute('value');
  }

  async setPhoneBrandInput(phoneBrand) {
    await this.phoneBrandInput.sendKeys(phoneBrand);
  }

  async getPhoneBrandInput() {
    return this.phoneBrandInput.getAttribute('value');
  }

  async setPhoneImeNumberInput(phoneImeNumber) {
    await this.phoneImeNumberInput.sendKeys(phoneImeNumber);
  }

  async getPhoneImeNumberInput() {
    return this.phoneImeNumberInput.getAttribute('value');
  }

  async setContractorIdInput(contractorId) {
    await this.contractorIdInput.sendKeys(contractorId);
  }

  async getContractorIdInput() {
    return this.contractorIdInput.getAttribute('value');
  }

  async setServiceIdInput(serviceId) {
    await this.serviceIdInput.sendKeys(serviceId);
  }

  async getServiceIdInput() {
    return this.serviceIdInput.getAttribute('value');
  }

  async setPackageIdInput(packageId) {
    await this.packageIdInput.sendKeys(packageId);
  }

  async getPackageIdInput() {
    return this.packageIdInput.getAttribute('value');
  }

  async setDeliveryServiceIdInput(deliveryServiceId) {
    await this.deliveryServiceIdInput.sendKeys(deliveryServiceId);
  }

  async getDeliveryServiceIdInput() {
    return this.deliveryServiceIdInput.getAttribute('value');
  }

  async setStatusIdInput(statusId) {
    await this.statusIdInput.sendKeys(statusId);
  }

  async getStatusIdInput() {
    return this.statusIdInput.getAttribute('value');
  }

  async setReasonIdInput(reasonId) {
    await this.reasonIdInput.sendKeys(reasonId);
  }

  async getReasonIdInput() {
    return this.reasonIdInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setMaxChampionIdInput('maxChampionId');
    expect(await this.getMaxChampionIdInput()).to.match(/maxChampionId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setProspectiveIdInput('prospectiveId');
    expect(await this.getProspectiveIdInput()).to.match(/prospectiveId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountInput('account');
    expect(await this.getAccountInput()).to.match(/account/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFirstNameInput('firstName');
    expect(await this.getFirstNameInput()).to.match(/firstName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMiddleNameInput('middleName');
    expect(await this.getMiddleNameInput()).to.match(/middleName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneNumberInput('phoneNumber');
    expect(await this.getPhoneNumberInput()).to.match(/phoneNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setCityInput('city');
    expect(await this.getCityInput()).to.match(/city/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailAddressInput('emailAddress');
    expect(await this.getEmailAddressInput()).to.match(/emailAddress/);
    await waitUntilDisplayed(this.saveButton);
    const selectedHasInsurance = await this.getHasInsuranceInput().isSelected();
    if (selectedHasInsurance) {
      await this.getHasInsuranceInput().click();
      expect(await this.getHasInsuranceInput().isSelected()).to.be.false;
    } else {
      await this.getHasInsuranceInput().click();
      expect(await this.getHasInsuranceInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedHasDriverLicense = await this.getHasDriverLicenseInput().isSelected();
    if (selectedHasDriverLicense) {
      await this.getHasDriverLicenseInput().click();
      expect(await this.getHasDriverLicenseInput().isSelected()).to.be.false;
    } else {
      await this.getHasDriverLicenseInput().click();
      expect(await this.getHasDriverLicenseInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedOnInput('01-01-2001');
    expect(await this.getCreatedOnInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setActivatedOnInput('01-01-2001');
    expect(await this.getActivatedOnInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedOnInput('01-01-2001');
    expect(await this.getUpdatedOnInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setWelfareAnalystInput('welfareAnalyst');
    expect(await this.getWelfareAnalystInput()).to.match(/welfareAnalyst/);
    await waitUntilDisplayed(this.saveButton);
    await this.maritalStatusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setStateOfOriginInput('stateOfOrigin');
    expect(await this.getStateOfOriginInput()).to.match(/stateOfOrigin/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStateOfBirthInput('stateOfBirth');
    expect(await this.getStateOfBirthInput()).to.match(/stateOfBirth/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBankNameInput('bankName');
    expect(await this.getBankNameInput()).to.match(/bankName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBankAccountNumberInput('bankAccountNumber');
    expect(await this.getBankAccountNumberInput()).to.match(/bankAccountNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBankAccountNameInput('bankAccountName');
    expect(await this.getBankAccountNameInput()).to.match(/bankAccountName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNeatOfKinNameInput('neatOfKinName');
    expect(await this.getNeatOfKinNameInput()).to.match(/neatOfKinName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNextOfKinPhoneInput('nextOfKinPhone');
    expect(await this.getNextOfKinPhoneInput()).to.match(/nextOfKinPhone/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateOfBirthInput('01-01-2001');
    expect(await this.getDateOfBirthInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setBvnInput('bvn');
    expect(await this.getBvnInput()).to.match(/bvn/);
    await waitUntilDisplayed(this.saveButton);
    await this.setHouseAddressInput('houseAddress');
    expect(await this.getHouseAddressInput()).to.match(/houseAddress/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmergencyContactNameInput('emergencyContactName');
    expect(await this.getEmergencyContactNameInput()).to.match(/emergencyContactName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmergencyContactNumberInput('emergencyContactNumber');
    expect(await this.getEmergencyContactNumberInput()).to.match(/emergencyContactNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEntryChannelInput('entryChannel');
    expect(await this.getEntryChannelInput()).to.match(/entryChannel/);
    await waitUntilDisplayed(this.saveButton);
    await this.setHmoProviderInput('hmoProvider');
    expect(await this.getHmoProviderInput()).to.match(/hmoProvider/);
    await waitUntilDisplayed(this.saveButton);
    await this.setHmoNumberInput('hmoNumber');
    expect(await this.getHmoNumberInput()).to.match(/hmoNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMetaJsonInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateEngagedInput('01-01-2001');
    expect(await this.getDateEngagedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateDisengagedInput('01-01-2001');
    expect(await this.getDateDisengagedInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setRatingInput('5');
    expect(await this.getRatingInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setHelmetNumberInput('helmetNumber');
    expect(await this.getHelmetNumberInput()).to.match(/helmetNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRegistrationNumberInput('registrationNumber');
    expect(await this.getRegistrationNumberInput()).to.match(/registrationNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneBrandInput('phoneBrand');
    expect(await this.getPhoneBrandInput()).to.match(/phoneBrand/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneImeNumberInput('phoneImeNumber');
    expect(await this.getPhoneImeNumberInput()).to.match(/phoneImeNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setContractorIdInput('contractorId');
    expect(await this.getContractorIdInput()).to.match(/contractorId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setServiceIdInput('serviceId');
    expect(await this.getServiceIdInput()).to.match(/serviceId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPackageIdInput('packageId');
    expect(await this.getPackageIdInput()).to.match(/packageId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDeliveryServiceIdInput('deliveryServiceId');
    expect(await this.getDeliveryServiceIdInput()).to.match(/deliveryServiceId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStatusIdInput('statusId');
    expect(await this.getStatusIdInput()).to.match(/statusId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setReasonIdInput('reasonId');
    expect(await this.getReasonIdInput()).to.match(/reasonId/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
