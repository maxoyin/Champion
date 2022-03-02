// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './field-agent.reducer';
import { IFieldAgent } from 'app/shared/model/field-agent.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFieldAgentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FieldAgent = (props: IFieldAgentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { fieldAgentList, match, loading } = props;
  return (
    <div>
      <h2 id="field-agent-heading" data-cy="FieldAgentHeading">
        <Translate contentKey="championApp.fieldAgent.home.title">Field Agents</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.fieldAgent.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.fieldAgent.home.createLabel">Create new Field Agent</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {fieldAgentList && fieldAgentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.fieldAgent.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.fieldAgent.accountId">Account Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.fieldAgent.cityId">City Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.fieldAgent.stateId">State Id</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.fieldAgent.updatedOn">Updated On</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.fieldAgent.workshift">Workshift</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fieldAgentList.map((fieldAgent, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${fieldAgent.id}`} color="link" size="sm">
                      {fieldAgent.id}
                    </Button>
                  </td>
                  <td>{fieldAgent.accountId}</td>
                  <td>{fieldAgent.cityId}</td>
                  <td>{fieldAgent.stateId}</td>
                  <td>
                    {fieldAgent.updatedOn ? <TextFormat type="date" value={fieldAgent.updatedOn} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{fieldAgent.workshift ? <Link to={`workshift/${fieldAgent.workshift.id}`}>{fieldAgent.workshift.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fieldAgent.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fieldAgent.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fieldAgent.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="championApp.fieldAgent.home.notFound">No Field Agents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ fieldAgent }: IRootState) => ({
  fieldAgentList: fieldAgent.entities,
  loading: fieldAgent.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FieldAgent);
