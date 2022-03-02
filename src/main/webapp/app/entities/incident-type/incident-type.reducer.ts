import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIncidentType, defaultValue } from 'app/shared/model/incident-type.model';

export const ACTION_TYPES = {
  FETCH_INCIDENTTYPE_LIST: 'incidentType/FETCH_INCIDENTTYPE_LIST',
  FETCH_INCIDENTTYPE: 'incidentType/FETCH_INCIDENTTYPE',
  CREATE_INCIDENTTYPE: 'incidentType/CREATE_INCIDENTTYPE',
  UPDATE_INCIDENTTYPE: 'incidentType/UPDATE_INCIDENTTYPE',
  PARTIAL_UPDATE_INCIDENTTYPE: 'incidentType/PARTIAL_UPDATE_INCIDENTTYPE',
  DELETE_INCIDENTTYPE: 'incidentType/DELETE_INCIDENTTYPE',
  RESET: 'incidentType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIncidentType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type IncidentTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: IncidentTypeState = initialState, action): IncidentTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INCIDENTTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INCIDENTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_INCIDENTTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_INCIDENTTYPE):
    case REQUEST(ACTION_TYPES.DELETE_INCIDENTTYPE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_INCIDENTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_INCIDENTTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INCIDENTTYPE):
    case FAILURE(ACTION_TYPES.CREATE_INCIDENTTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_INCIDENTTYPE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_INCIDENTTYPE):
    case FAILURE(ACTION_TYPES.DELETE_INCIDENTTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INCIDENTTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INCIDENTTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_INCIDENTTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_INCIDENTTYPE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_INCIDENTTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_INCIDENTTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/incident-types';

// Actions

export const getEntities: ICrudGetAllAction<IIncidentType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INCIDENTTYPE_LIST,
  payload: axios.get<IIncidentType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IIncidentType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INCIDENTTYPE,
    payload: axios.get<IIncidentType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IIncidentType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INCIDENTTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIncidentType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INCIDENTTYPE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IIncidentType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_INCIDENTTYPE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIncidentType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INCIDENTTYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
