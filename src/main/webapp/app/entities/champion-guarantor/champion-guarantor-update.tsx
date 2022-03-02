import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChampion } from 'app/shared/model/champion.model';
import { getEntities as getChampions } from 'app/entities/champion/champion.reducer';
import { getEntity, updateEntity, createEntity, reset } from './champion-guarantor.reducer';
import { IChampionGuarantor } from 'app/shared/model/champion-guarantor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChampionGuarantorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionGuarantorUpdate = (props: IChampionGuarantorUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { championGuarantorEntity, champions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/champion-guarantor');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getChampions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...championGuarantorEntity,
        ...values,
        champion: champions.find(it => it.id.toString() === values.championId.toString()),
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
          <h2 id="championApp.championGuarantor.home.createOrEditLabel" data-cy="ChampionGuarantorCreateUpdateHeading">
            <Translate contentKey="championApp.championGuarantor.home.createOrEditLabel">Create or edit a ChampionGuarantor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : championGuarantorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="champion-guarantor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="champion-guarantor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="champion-guarantor-firstName">
                  <Translate contentKey="championApp.championGuarantor.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="champion-guarantor-firstName"
                  data-cy="firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="champion-guarantor-lastName">
                  <Translate contentKey="championApp.championGuarantor.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="champion-guarantor-lastName"
                  data-cy="lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="champion-guarantor-phoneNumber">
                  <Translate contentKey="championApp.championGuarantor.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField
                  id="champion-guarantor-phoneNumber"
                  data-cy="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="champion-guarantor-address">
                  <Translate contentKey="championApp.championGuarantor.address">Address</Translate>
                </Label>
                <AvField
                  id="champion-guarantor-address"
                  data-cy="address"
                  type="text"
                  name="address"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="champion-guarantor-status">
                  <Translate contentKey="championApp.championGuarantor.status">Status</Translate>
                </Label>
                <AvInput
                  id="champion-guarantor-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && championGuarantorEntity.status) || 'ACTIVE'}
                >
                  <option value="ACTIVE">{translate('championApp.GuarantorsStatus.ACTIVE')}</option>
                  <option value="INACTIVE">{translate('championApp.GuarantorsStatus.INACTIVE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="occupationLabel" for="champion-guarantor-occupation">
                  <Translate contentKey="championApp.championGuarantor.occupation">Occupation</Translate>
                </Label>
                <AvField id="champion-guarantor-occupation" data-cy="occupation" type="text" name="occupation" />
              </AvGroup>
              <AvGroup>
                <Label id="updatedOnLabel" for="champion-guarantor-updatedOn">
                  <Translate contentKey="championApp.championGuarantor.updatedOn">Updated On</Translate>
                </Label>
                <AvField id="champion-guarantor-updatedOn" data-cy="updatedOn" type="date" className="form-control" name="updatedOn" />
              </AvGroup>
              <AvGroup>
                <Label for="champion-guarantor-champion">
                  <Translate contentKey="championApp.championGuarantor.champion">Champion</Translate>
                </Label>
                <AvInput id="champion-guarantor-champion" data-cy="champion" type="select" className="form-control" name="championId">
                  <option value="" key="0" />
                  {champions
                    ? champions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.maxChampionId}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/champion-guarantor" replace color="info">
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
  champions: storeState.champion.entities,
  championGuarantorEntity: storeState.championGuarantor.entity,
  loading: storeState.championGuarantor.loading,
  updating: storeState.championGuarantor.updating,
  updateSuccess: storeState.championGuarantor.updateSuccess,
});

const mapDispatchToProps = {
  getChampions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionGuarantorUpdate);
