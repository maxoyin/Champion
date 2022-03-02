import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './champion-guarantor.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChampionGuarantorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionGuarantorDetail = (props: IChampionGuarantorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { championGuarantorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="championGuarantorDetailsHeading">
          <Translate contentKey="championApp.championGuarantor.detail.title">ChampionGuarantor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{championGuarantorEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="championApp.championGuarantor.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{championGuarantorEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="championApp.championGuarantor.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{championGuarantorEntity.lastName}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="championApp.championGuarantor.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{championGuarantorEntity.phoneNumber}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="championApp.championGuarantor.address">Address</Translate>
            </span>
          </dt>
          <dd>{championGuarantorEntity.address}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="championApp.championGuarantor.status">Status</Translate>
            </span>
          </dt>
          <dd>{championGuarantorEntity.status}</dd>
          <dt>
            <span id="occupation">
              <Translate contentKey="championApp.championGuarantor.occupation">Occupation</Translate>
            </span>
          </dt>
          <dd>{championGuarantorEntity.occupation}</dd>
          <dt>
            <span id="updatedOn">
              <Translate contentKey="championApp.championGuarantor.updatedOn">Updated On</Translate>
            </span>
          </dt>
          <dd>
            {championGuarantorEntity.updatedOn ? (
              <TextFormat value={championGuarantorEntity.updatedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="championApp.championGuarantor.champion">Champion</Translate>
          </dt>
          <dd>{championGuarantorEntity.champion ? championGuarantorEntity.champion.maxChampionId : ''}</dd>
        </dl>
        <Button tag={Link} to="/champion-guarantor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/champion-guarantor/${championGuarantorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ championGuarantor }: IRootState) => ({
  championGuarantorEntity: championGuarantor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionGuarantorDetail);
