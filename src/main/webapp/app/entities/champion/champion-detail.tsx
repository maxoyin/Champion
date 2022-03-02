import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './champion.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChampionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionDetail = (props: IChampionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { championEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="championDetailsHeading">
          <Translate contentKey="championApp.champion.detail.title">Champion</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{championEntity.id}</dd>
          <dt>
            <span id="maxChampionId">
              <Translate contentKey="championApp.champion.maxChampionId">Max Champion Id</Translate>
            </span>
          </dt>
          <dd>{championEntity.maxChampionId}</dd>
          <dt>
            <span id="prospectiveId">
              <Translate contentKey="championApp.champion.prospectiveId">Prospective Id</Translate>
            </span>
            <UncontrolledTooltip target="prospectiveId">
              <Translate contentKey="championApp.champion.help.prospectiveId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{championEntity.prospectiveId}</dd>
          <dt>
            <span id="account">
              <Translate contentKey="championApp.champion.account">Account</Translate>
            </span>
            <UncontrolledTooltip target="account">
              <Translate contentKey="championApp.champion.help.account" />
            </UncontrolledTooltip>
          </dt>
          <dd>{championEntity.account}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="championApp.champion.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{championEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="championApp.champion.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{championEntity.lastName}</dd>
          <dt>
            <span id="middleName">
              <Translate contentKey="championApp.champion.middleName">Middle Name</Translate>
            </span>
          </dt>
          <dd>{championEntity.middleName}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="championApp.champion.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{championEntity.phoneNumber}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="championApp.champion.status">Status</Translate>
            </span>
          </dt>
          <dd>{championEntity.status}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="championApp.champion.city">City</Translate>
            </span>
          </dt>
          <dd>{championEntity.city}</dd>
          <dt>
            <span id="emailAddress">
              <Translate contentKey="championApp.champion.emailAddress">Email Address</Translate>
            </span>
          </dt>
          <dd>{championEntity.emailAddress}</dd>
          <dt>
            <span id="hasInsurance">
              <Translate contentKey="championApp.champion.hasInsurance">Has Insurance</Translate>
            </span>
          </dt>
          <dd>{championEntity.hasInsurance ? 'true' : 'false'}</dd>
          <dt>
            <span id="hasDriverLicense">
              <Translate contentKey="championApp.champion.hasDriverLicense">Has Driver License</Translate>
            </span>
          </dt>
          <dd>{championEntity.hasDriverLicense ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdOn">
              <Translate contentKey="championApp.champion.createdOn">Created On</Translate>
            </span>
          </dt>
          <dd>
            {championEntity.createdOn ? <TextFormat value={championEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="activatedOn">
              <Translate contentKey="championApp.champion.activatedOn">Activated On</Translate>
            </span>
          </dt>
          <dd>
            {championEntity.activatedOn ? (
              <TextFormat value={championEntity.activatedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedOn">
              <Translate contentKey="championApp.champion.updatedOn">Updated On</Translate>
            </span>
          </dt>
          <dd>
            {championEntity.updatedOn ? <TextFormat value={championEntity.updatedOn} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="welfareAnalyst">
              <Translate contentKey="championApp.champion.welfareAnalyst">Welfare Analyst</Translate>
            </span>
            <UncontrolledTooltip target="welfareAnalyst">
              <Translate contentKey="championApp.champion.help.welfareAnalyst" />
            </UncontrolledTooltip>
          </dt>
          <dd>{championEntity.welfareAnalyst}</dd>
          <dt>
            <span id="maritalStatus">
              <Translate contentKey="championApp.champion.maritalStatus">Marital Status</Translate>
            </span>
          </dt>
          <dd>{championEntity.maritalStatus}</dd>
          <dt>
            <span id="stateOfOrigin">
              <Translate contentKey="championApp.champion.stateOfOrigin">State Of Origin</Translate>
            </span>
          </dt>
          <dd>{championEntity.stateOfOrigin}</dd>
          <dt>
            <span id="stateOfBirth">
              <Translate contentKey="championApp.champion.stateOfBirth">State Of Birth</Translate>
            </span>
          </dt>
          <dd>{championEntity.stateOfBirth}</dd>
          <dt>
            <span id="bankName">
              <Translate contentKey="championApp.champion.bankName">Bank Name</Translate>
            </span>
          </dt>
          <dd>{championEntity.bankName}</dd>
          <dt>
            <span id="bankAccountNumber">
              <Translate contentKey="championApp.champion.bankAccountNumber">Bank Account Number</Translate>
            </span>
          </dt>
          <dd>{championEntity.bankAccountNumber}</dd>
          <dt>
            <span id="bankAccountName">
              <Translate contentKey="championApp.champion.bankAccountName">Bank Account Name</Translate>
            </span>
          </dt>
          <dd>{championEntity.bankAccountName}</dd>
          <dt>
            <span id="neatOfKinName">
              <Translate contentKey="championApp.champion.neatOfKinName">Neat Of Kin Name</Translate>
            </span>
          </dt>
          <dd>{championEntity.neatOfKinName}</dd>
          <dt>
            <span id="nextOfKinPhone">
              <Translate contentKey="championApp.champion.nextOfKinPhone">Next Of Kin Phone</Translate>
            </span>
          </dt>
          <dd>{championEntity.nextOfKinPhone}</dd>
          <dt>
            <span id="dateOfBirth">
              <Translate contentKey="championApp.champion.dateOfBirth">Date Of Birth</Translate>
            </span>
          </dt>
          <dd>
            {championEntity.dateOfBirth ? (
              <TextFormat value={championEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="bvn">
              <Translate contentKey="championApp.champion.bvn">Bvn</Translate>
            </span>
          </dt>
          <dd>{championEntity.bvn}</dd>
          <dt>
            <span id="houseAddress">
              <Translate contentKey="championApp.champion.houseAddress">House Address</Translate>
            </span>
          </dt>
          <dd>{championEntity.houseAddress}</dd>
          <dt>
            <span id="emergencyContactName">
              <Translate contentKey="championApp.champion.emergencyContactName">Emergency Contact Name</Translate>
            </span>
          </dt>
          <dd>{championEntity.emergencyContactName}</dd>
          <dt>
            <span id="emergencyContactNumber">
              <Translate contentKey="championApp.champion.emergencyContactNumber">Emergency Contact Number</Translate>
            </span>
          </dt>
          <dd>{championEntity.emergencyContactNumber}</dd>
          <dt>
            <span id="entryChannel">
              <Translate contentKey="championApp.champion.entryChannel">Entry Channel</Translate>
            </span>
          </dt>
          <dd>{championEntity.entryChannel}</dd>
          <dt>
            <span id="hmoProvider">
              <Translate contentKey="championApp.champion.hmoProvider">Hmo Provider</Translate>
            </span>
          </dt>
          <dd>{championEntity.hmoProvider}</dd>
          <dt>
            <span id="hmoNumber">
              <Translate contentKey="championApp.champion.hmoNumber">Hmo Number</Translate>
            </span>
          </dt>
          <dd>{championEntity.hmoNumber}</dd>
          <dt>
            <span id="metaJson">
              <Translate contentKey="championApp.champion.metaJson">Meta Json</Translate>
            </span>
            <UncontrolledTooltip target="metaJson">
              <Translate contentKey="championApp.champion.help.metaJson" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {championEntity.metaJson ? (
              <div>
                {championEntity.metaJsonContentType ? (
                  <a onClick={openFile(championEntity.metaJsonContentType, championEntity.metaJson)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {championEntity.metaJsonContentType}, {byteSize(championEntity.metaJson)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="dateEngaged">
              <Translate contentKey="championApp.champion.dateEngaged">Date Engaged</Translate>
            </span>
          </dt>
          <dd>
            {championEntity.dateEngaged ? (
              <TextFormat value={championEntity.dateEngaged} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateDisengaged">
              <Translate contentKey="championApp.champion.dateDisengaged">Date Disengaged</Translate>
            </span>
          </dt>
          <dd>
            {championEntity.dateDisengaged ? (
              <TextFormat value={championEntity.dateDisengaged} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="rating">
              <Translate contentKey="championApp.champion.rating">Rating</Translate>
            </span>
          </dt>
          <dd>{championEntity.rating}</dd>
          <dt>
            <span id="helmetNumber">
              <Translate contentKey="championApp.champion.helmetNumber">Helmet Number</Translate>
            </span>
          </dt>
          <dd>{championEntity.helmetNumber}</dd>
          <dt>
            <span id="registrationNumber">
              <Translate contentKey="championApp.champion.registrationNumber">Registration Number</Translate>
            </span>
          </dt>
          <dd>{championEntity.registrationNumber}</dd>
          <dt>
            <span id="phoneBrand">
              <Translate contentKey="championApp.champion.phoneBrand">Phone Brand</Translate>
            </span>
          </dt>
          <dd>{championEntity.phoneBrand}</dd>
          <dt>
            <span id="phoneImeNumber">
              <Translate contentKey="championApp.champion.phoneImeNumber">Phone Ime Number</Translate>
            </span>
          </dt>
          <dd>{championEntity.phoneImeNumber}</dd>
          <dt>
            <span id="contractorId">
              <Translate contentKey="championApp.champion.contractorId">Contractor Id</Translate>
            </span>
          </dt>
          <dd>{championEntity.contractorId}</dd>
          <dt>
            <span id="serviceId">
              <Translate contentKey="championApp.champion.serviceId">Service Id</Translate>
            </span>
          </dt>
          <dd>{championEntity.serviceId}</dd>
          <dt>
            <span id="packageId">
              <Translate contentKey="championApp.champion.packageId">Package Id</Translate>
            </span>
          </dt>
          <dd>{championEntity.packageId}</dd>
          <dt>
            <span id="deliveryServiceId">
              <Translate contentKey="championApp.champion.deliveryServiceId">Delivery Service Id</Translate>
            </span>
          </dt>
          <dd>{championEntity.deliveryServiceId}</dd>
          <dt>
            <span id="statusId">
              <Translate contentKey="championApp.champion.statusId">Status Id</Translate>
            </span>
          </dt>
          <dd>{championEntity.statusId}</dd>
          <dt>
            <span id="reasonId">
              <Translate contentKey="championApp.champion.reasonId">Reason Id</Translate>
            </span>
          </dt>
          <dd>{championEntity.reasonId}</dd>
        </dl>
        <Button tag={Link} to="/champion" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/champion/${championEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ champion }: IRootState) => ({
  championEntity: champion.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionDetail);
