import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './field-agent.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFieldAgentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FieldAgentDetail = (props: IFieldAgentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fieldAgentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fieldAgentDetailsHeading">
          <Translate contentKey="championApp.fieldAgent.detail.title">FieldAgent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{fieldAgentEntity.id}</dd>
          <dt>
            <span id="accountId">
              <Translate contentKey="championApp.fieldAgent.accountId">Account Id</Translate>
            </span>
            <UncontrolledTooltip target="accountId">
              <Translate contentKey="championApp.fieldAgent.help.accountId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{fieldAgentEntity.accountId}</dd>
          <dt>
            <span id="cityId">
              <Translate contentKey="championApp.fieldAgent.cityId">City Id</Translate>
            </span>
            <UncontrolledTooltip target="cityId">
              <Translate contentKey="championApp.fieldAgent.help.cityId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{fieldAgentEntity.cityId}</dd>
          <dt>
            <span id="stateId">
              <Translate contentKey="championApp.fieldAgent.stateId">State Id</Translate>
            </span>
            <UncontrolledTooltip target="stateId">
              <Translate contentKey="championApp.fieldAgent.help.stateId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{fieldAgentEntity.stateId}</dd>
          <dt>
            <span id="updatedOn">
              <Translate contentKey="championApp.fieldAgent.updatedOn">Updated On</Translate>
            </span>
          </dt>
          <dd>
            {fieldAgentEntity.updatedOn ? (
              <TextFormat value={fieldAgentEntity.updatedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="championApp.fieldAgent.workshift">Workshift</Translate>
          </dt>
          <dd>{fieldAgentEntity.workshift ? fieldAgentEntity.workshift.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/field-agent" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/field-agent/${fieldAgentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fieldAgent }: IRootState) => ({
  fieldAgentEntity: fieldAgent.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FieldAgentDetail);
