import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { setFileData, openFile, byteSize, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './champion.reducer';
import { IChampion } from 'app/shared/model/champion.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChampionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionUpdate = (props: IChampionUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { championEntity, loading, updating } = props;

  const { metaJson, metaJsonContentType } = championEntity;

  const handleClose = () => {
    props.history.push('/champion');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...championEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="championApp.champion.home.createOrEditLabel" data-cy="ChampionCreateUpdateHeading">
            <Translate contentKey="championApp.champion.home.createOrEditLabel">Create or edit a Champion</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : championEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="champion-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="champion-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="maxChampionIdLabel" for="champion-maxChampionId">
                  <Translate contentKey="championApp.champion.maxChampionId">Max Champion Id</Translate>
                </Label>
                <AvField
                  id="champion-maxChampionId"
                  data-cy="maxChampionId"
                  type="text"
                  name="maxChampionId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prospectiveIdLabel" for="champion-prospectiveId">
                  <Translate contentKey="championApp.champion.prospectiveId">Prospective Id</Translate>
                </Label>
                <AvField
                  id="champion-prospectiveId"
                  data-cy="prospectiveId"
                  type="text"
                  name="prospectiveId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="prospectiveIdLabel">
                  <Translate contentKey="championApp.champion.help.prospectiveId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="accountLabel" for="champion-account">
                  <Translate contentKey="championApp.champion.account">Account</Translate>
                </Label>
                <AvField
                  id="champion-account"
                  data-cy="account"
                  type="text"
                  name="account"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
                <UncontrolledTooltip target="accountLabel">
                  <Translate contentKey="championApp.champion.help.account" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="champion-firstName">
                  <Translate contentKey="championApp.champion.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="champion-firstName"
                  data-cy="firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="champion-lastName">
                  <Translate contentKey="championApp.champion.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="champion-lastName"
                  data-cy="lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="middleNameLabel" for="champion-middleName">
                  <Translate contentKey="championApp.champion.middleName">Middle Name</Translate>
                </Label>
                <AvField id="champion-middleName" data-cy="middleName" type="text" name="middleName" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="champion-phoneNumber">
                  <Translate contentKey="championApp.champion.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField
                  id="champion-phoneNumber"
                  data-cy="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="champion-status">
                  <Translate contentKey="championApp.champion.status">Status</Translate>
                </Label>
                <AvInput
                  id="champion-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && championEntity.status) || 'ACTIVE'}
                >
                  <option value="ACTIVE">{translate('championApp.ChampionStatus.ACTIVE')}</option>
                  <option value="INACTIVE">{translate('championApp.ChampionStatus.INACTIVE')}</option>
                  <option value="CHURNED">{translate('championApp.ChampionStatus.CHURNED')}</option>
                  <option value="DEACTIVATED">{translate('championApp.ChampionStatus.DEACTIVATED')}</option>
                  <option value="HPCOMPLETE">{translate('championApp.ChampionStatus.HPCOMPLETE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="champion-city">
                  <Translate contentKey="championApp.champion.city">City</Translate>
                </Label>
                <AvField
                  id="champion-city"
                  data-cy="city"
                  type="text"
                  name="city"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailAddressLabel" for="champion-emailAddress">
                  <Translate contentKey="championApp.champion.emailAddress">Email Address</Translate>
                </Label>
                <AvField id="champion-emailAddress" data-cy="emailAddress" type="text" name="emailAddress" />
              </AvGroup>
              <AvGroup check>
                <Label id="hasInsuranceLabel">
                  <AvInput
                    id="champion-hasInsurance"
                    data-cy="hasInsurance"
                    type="checkbox"
                    className="form-check-input"
                    name="hasInsurance"
                  />
                  <Translate contentKey="championApp.champion.hasInsurance">Has Insurance</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="hasDriverLicenseLabel">
                  <AvInput
                    id="champion-hasDriverLicense"
                    data-cy="hasDriverLicense"
                    type="checkbox"
                    className="form-check-input"
                    name="hasDriverLicense"
                  />
                  <Translate contentKey="championApp.champion.hasDriverLicense">Has Driver License</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdOnLabel" for="champion-createdOn">
                  <Translate contentKey="championApp.champion.createdOn">Created On</Translate>
                </Label>
                <AvField
                  id="champion-createdOn"
                  data-cy="createdOn"
                  type="date"
                  className="form-control"
                  name="createdOn"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="activatedOnLabel" for="champion-activatedOn">
                  <Translate contentKey="championApp.champion.activatedOn">Activated On</Translate>
                </Label>
                <AvField
                  id="champion-activatedOn"
                  data-cy="activatedOn"
                  type="date"
                  className="form-control"
                  name="activatedOn"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedOnLabel" for="champion-updatedOn">
                  <Translate contentKey="championApp.champion.updatedOn">Updated On</Translate>
                </Label>
                <AvField
                  id="champion-updatedOn"
                  data-cy="updatedOn"
                  type="date"
                  className="form-control"
                  name="updatedOn"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="welfareAnalystLabel" for="champion-welfareAnalyst">
                  <Translate contentKey="championApp.champion.welfareAnalyst">Welfare Analyst</Translate>
                </Label>
                <AvField id="champion-welfareAnalyst" data-cy="welfareAnalyst" type="text" name="welfareAnalyst" />
                <UncontrolledTooltip target="welfareAnalystLabel">
                  <Translate contentKey="championApp.champion.help.welfareAnalyst" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="maritalStatusLabel" for="champion-maritalStatus">
                  <Translate contentKey="championApp.champion.maritalStatus">Marital Status</Translate>
                </Label>
                <AvInput
                  id="champion-maritalStatus"
                  data-cy="maritalStatus"
                  type="select"
                  className="form-control"
                  name="maritalStatus"
                  value={(!isNew && championEntity.maritalStatus) || 'SINGLE'}
                >
                  <option value="SINGLE">{translate('championApp.MaritalStatus.SINGLE')}</option>
                  <option value="MARRIED">{translate('championApp.MaritalStatus.MARRIED')}</option>
                  <option value="DIVORCED">{translate('championApp.MaritalStatus.DIVORCED')}</option>
                  <option value="WIDOWED">{translate('championApp.MaritalStatus.WIDOWED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="stateOfOriginLabel" for="champion-stateOfOrigin">
                  <Translate contentKey="championApp.champion.stateOfOrigin">State Of Origin</Translate>
                </Label>
                <AvField id="champion-stateOfOrigin" data-cy="stateOfOrigin" type="text" name="stateOfOrigin" />
              </AvGroup>
              <AvGroup>
                <Label id="stateOfBirthLabel" for="champion-stateOfBirth">
                  <Translate contentKey="championApp.champion.stateOfBirth">State Of Birth</Translate>
                </Label>
                <AvField id="champion-stateOfBirth" data-cy="stateOfBirth" type="text" name="stateOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="bankNameLabel" for="champion-bankName">
                  <Translate contentKey="championApp.champion.bankName">Bank Name</Translate>
                </Label>
                <AvField id="champion-bankName" data-cy="bankName" type="text" name="bankName" />
              </AvGroup>
              <AvGroup>
                <Label id="bankAccountNumberLabel" for="champion-bankAccountNumber">
                  <Translate contentKey="championApp.champion.bankAccountNumber">Bank Account Number</Translate>
                </Label>
                <AvField id="champion-bankAccountNumber" data-cy="bankAccountNumber" type="text" name="bankAccountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="bankAccountNameLabel" for="champion-bankAccountName">
                  <Translate contentKey="championApp.champion.bankAccountName">Bank Account Name</Translate>
                </Label>
                <AvField id="champion-bankAccountName" data-cy="bankAccountName" type="text" name="bankAccountName" />
              </AvGroup>
              <AvGroup>
                <Label id="neatOfKinNameLabel" for="champion-neatOfKinName">
                  <Translate contentKey="championApp.champion.neatOfKinName">Neat Of Kin Name</Translate>
                </Label>
                <AvField id="champion-neatOfKinName" data-cy="neatOfKinName" type="text" name="neatOfKinName" />
              </AvGroup>
              <AvGroup>
                <Label id="nextOfKinPhoneLabel" for="champion-nextOfKinPhone">
                  <Translate contentKey="championApp.champion.nextOfKinPhone">Next Of Kin Phone</Translate>
                </Label>
                <AvField id="champion-nextOfKinPhone" data-cy="nextOfKinPhone" type="text" name="nextOfKinPhone" />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="champion-dateOfBirth">
                  <Translate contentKey="championApp.champion.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvField id="champion-dateOfBirth" data-cy="dateOfBirth" type="date" className="form-control" name="dateOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="bvnLabel" for="champion-bvn">
                  <Translate contentKey="championApp.champion.bvn">Bvn</Translate>
                </Label>
                <AvField id="champion-bvn" data-cy="bvn" type="text" name="bvn" />
              </AvGroup>
              <AvGroup>
                <Label id="houseAddressLabel" for="champion-houseAddress">
                  <Translate contentKey="championApp.champion.houseAddress">House Address</Translate>
                </Label>
                <AvField id="champion-houseAddress" data-cy="houseAddress" type="text" name="houseAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="emergencyContactNameLabel" for="champion-emergencyContactName">
                  <Translate contentKey="championApp.champion.emergencyContactName">Emergency Contact Name</Translate>
                </Label>
                <AvField id="champion-emergencyContactName" data-cy="emergencyContactName" type="text" name="emergencyContactName" />
              </AvGroup>
              <AvGroup>
                <Label id="emergencyContactNumberLabel" for="champion-emergencyContactNumber">
                  <Translate contentKey="championApp.champion.emergencyContactNumber">Emergency Contact Number</Translate>
                </Label>
                <AvField id="champion-emergencyContactNumber" data-cy="emergencyContactNumber" type="text" name="emergencyContactNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="entryChannelLabel" for="champion-entryChannel">
                  <Translate contentKey="championApp.champion.entryChannel">Entry Channel</Translate>
                </Label>
                <AvField id="champion-entryChannel" data-cy="entryChannel" type="text" name="entryChannel" />
              </AvGroup>
              <AvGroup>
                <Label id="hmoProviderLabel" for="champion-hmoProvider">
                  <Translate contentKey="championApp.champion.hmoProvider">Hmo Provider</Translate>
                </Label>
                <AvField id="champion-hmoProvider" data-cy="hmoProvider" type="text" name="hmoProvider" />
              </AvGroup>
              <AvGroup>
                <Label id="hmoNumberLabel" for="champion-hmoNumber">
                  <Translate contentKey="championApp.champion.hmoNumber">Hmo Number</Translate>
                </Label>
                <AvField id="champion-hmoNumber" data-cy="hmoNumber" type="text" name="hmoNumber" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="metaJsonLabel" for="metaJson">
                    <Translate contentKey="championApp.champion.metaJson">Meta Json</Translate>
                  </Label>
                  <br />
                  {metaJson ? (
                    <div>
                      {metaJsonContentType ? (
                        <a onClick={openFile(metaJsonContentType, metaJson)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {metaJsonContentType}, {byteSize(metaJson)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('metaJson')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_metaJson" data-cy="metaJson" type="file" onChange={onBlobChange(false, 'metaJson')} />
                  <AvInput type="hidden" name="metaJson" value={metaJson} />
                </AvGroup>

                <UncontrolledTooltip target="metaJsonLabel">
                  <Translate contentKey="championApp.champion.help.metaJson" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="dateEngagedLabel" for="champion-dateEngaged">
                  <Translate contentKey="championApp.champion.dateEngaged">Date Engaged</Translate>
                </Label>
                <AvField id="champion-dateEngaged" data-cy="dateEngaged" type="date" className="form-control" name="dateEngaged" />
              </AvGroup>
              <AvGroup>
                <Label id="dateDisengagedLabel" for="champion-dateDisengaged">
                  <Translate contentKey="championApp.champion.dateDisengaged">Date Disengaged</Translate>
                </Label>
                <AvField id="champion-dateDisengaged" data-cy="dateDisengaged" type="date" className="form-control" name="dateDisengaged" />
              </AvGroup>
              <AvGroup>
                <Label id="ratingLabel" for="champion-rating">
                  <Translate contentKey="championApp.champion.rating">Rating</Translate>
                </Label>
                <AvField id="champion-rating" data-cy="rating" type="string" className="form-control" name="rating" />
              </AvGroup>
              <AvGroup>
                <Label id="helmetNumberLabel" for="champion-helmetNumber">
                  <Translate contentKey="championApp.champion.helmetNumber">Helmet Number</Translate>
                </Label>
                <AvField id="champion-helmetNumber" data-cy="helmetNumber" type="text" name="helmetNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="registrationNumberLabel" for="champion-registrationNumber">
                  <Translate contentKey="championApp.champion.registrationNumber">Registration Number</Translate>
                </Label>
                <AvField id="champion-registrationNumber" data-cy="registrationNumber" type="text" name="registrationNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneBrandLabel" for="champion-phoneBrand">
                  <Translate contentKey="championApp.champion.phoneBrand">Phone Brand</Translate>
                </Label>
                <AvField id="champion-phoneBrand" data-cy="phoneBrand" type="text" name="phoneBrand" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneImeNumberLabel" for="champion-phoneImeNumber">
                  <Translate contentKey="championApp.champion.phoneImeNumber">Phone Ime Number</Translate>
                </Label>
                <AvField id="champion-phoneImeNumber" data-cy="phoneImeNumber" type="text" name="phoneImeNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="contractorIdLabel" for="champion-contractorId">
                  <Translate contentKey="championApp.champion.contractorId">Contractor Id</Translate>
                </Label>
                <AvField id="champion-contractorId" data-cy="contractorId" type="text" name="contractorId" />
              </AvGroup>
              <AvGroup>
                <Label id="serviceIdLabel" for="champion-serviceId">
                  <Translate contentKey="championApp.champion.serviceId">Service Id</Translate>
                </Label>
                <AvField id="champion-serviceId" data-cy="serviceId" type="text" name="serviceId" />
              </AvGroup>
              <AvGroup>
                <Label id="packageIdLabel" for="champion-packageId">
                  <Translate contentKey="championApp.champion.packageId">Package Id</Translate>
                </Label>
                <AvField id="champion-packageId" data-cy="packageId" type="text" name="packageId" />
              </AvGroup>
              <AvGroup>
                <Label id="deliveryServiceIdLabel" for="champion-deliveryServiceId">
                  <Translate contentKey="championApp.champion.deliveryServiceId">Delivery Service Id</Translate>
                </Label>
                <AvField id="champion-deliveryServiceId" data-cy="deliveryServiceId" type="text" name="deliveryServiceId" />
              </AvGroup>
              <AvGroup>
                <Label id="statusIdLabel" for="champion-statusId">
                  <Translate contentKey="championApp.champion.statusId">Status Id</Translate>
                </Label>
                <AvField id="champion-statusId" data-cy="statusId" type="text" name="statusId" />
              </AvGroup>
              <AvGroup>
                <Label id="reasonIdLabel" for="champion-reasonId">
                  <Translate contentKey="championApp.champion.reasonId">Reason Id</Translate>
                </Label>
                <AvField id="champion-reasonId" data-cy="reasonId" type="text" name="reasonId" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/champion" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  championEntity: storeState.champion.entity,
  loading: storeState.champion.loading,
  updating: storeState.champion.updating,
  updateSuccess: storeState.champion.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionUpdate);
