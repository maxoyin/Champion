import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IWorkshift, defaultValue } from 'app/shared/model/workshift.model';

export const ACTION_TYPES = {
  FETCH_WORKSHIFT_LIST: 'workshift/FETCH_WORKSHIFT_LIST',
  FETCH_WORKSHIFT: 'workshift/FETCH_WORKSHIFT',
  CREATE_WORKSHIFT: 'workshift/CREATE_WORKSHIFT',
  UPDATE_WORKSHIFT: 'workshift/UPDATE_WORKSHIFT',
  PARTIAL_UPDATE_WORKSHIFT: 'workshift/PARTIAL_UPDATE_WORKSHIFT',
  DELETE_WORKSHIFT: 'workshift/DELETE_WORKSHIFT',
  RESET: 'workshift/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWorkshift>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type WorkshiftState = Readonly<typeof initialState>;

// Reducer

export default (state: WorkshiftState = initialState, action): WorkshiftState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WORKSHIFT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WORKSHIFT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_WORKSHIFT):
    case REQUEST(ACTION_TYPES.UPDATE_WORKSHIFT):
    case REQUEST(ACTION_TYPES.DELETE_WORKSHIFT):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_WORKSHIFT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_WORKSHIFT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WORKSHIFT):
    case FAILURE(ACTION_TYPES.CREATE_WORKSHIFT):
    case FAILURE(ACTION_TYPES.UPDATE_WORKSHIFT):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_WORKSHIFT):
    case FAILURE(ACTION_TYPES.DELETE_WORKSHIFT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WORKSHIFT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WORKSHIFT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_WORKSHIFT):
    case SUCCESS(ACTION_TYPES.UPDATE_WORKSHIFT):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_WORKSHIFT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_WORKSHIFT):
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

const apiUrl = 'api/workshifts';

// Actions

export const getEntities: ICrudGetAllAction<IWorkshift> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_WORKSHIFT_LIST,
  payload: axios.get<IWorkshift>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IWorkshift> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WORKSHIFT,
    payload: axios.get<IWorkshift>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IWorkshift> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WORKSHIFT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWorkshift> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WORKSHIFT,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IWorkshift> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_WORKSHIFT,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWorkshift> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WORKSHIFT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
