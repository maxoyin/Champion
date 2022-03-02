import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFieldAgent, defaultValue } from 'app/shared/model/field-agent.model';

export const ACTION_TYPES = {
  FETCH_FIELDAGENT_LIST: 'fieldAgent/FETCH_FIELDAGENT_LIST',
  FETCH_FIELDAGENT: 'fieldAgent/FETCH_FIELDAGENT',
  CREATE_FIELDAGENT: 'fieldAgent/CREATE_FIELDAGENT',
  UPDATE_FIELDAGENT: 'fieldAgent/UPDATE_FIELDAGENT',
  PARTIAL_UPDATE_FIELDAGENT: 'fieldAgent/PARTIAL_UPDATE_FIELDAGENT',
  DELETE_FIELDAGENT: 'fieldAgent/DELETE_FIELDAGENT',
  RESET: 'fieldAgent/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFieldAgent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type FieldAgentState = Readonly<typeof initialState>;

// Reducer

export default (state: FieldAgentState = initialState, action): FieldAgentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FIELDAGENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FIELDAGENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FIELDAGENT):
    case REQUEST(ACTION_TYPES.UPDATE_FIELDAGENT):
    case REQUEST(ACTION_TYPES.DELETE_FIELDAGENT):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_FIELDAGENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FIELDAGENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FIELDAGENT):
    case FAILURE(ACTION_TYPES.CREATE_FIELDAGENT):
    case FAILURE(ACTION_TYPES.UPDATE_FIELDAGENT):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_FIELDAGENT):
    case FAILURE(ACTION_TYPES.DELETE_FIELDAGENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELDAGENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELDAGENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FIELDAGENT):
    case SUCCESS(ACTION_TYPES.UPDATE_FIELDAGENT):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_FIELDAGENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FIELDAGENT):
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

const apiUrl = 'api/field-agents';

// Actions

export const getEntities: ICrudGetAllAction<IFieldAgent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FIELDAGENT_LIST,
  payload: axios.get<IFieldAgent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IFieldAgent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FIELDAGENT,
    payload: axios.get<IFieldAgent>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFieldAgent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FIELDAGENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFieldAgent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FIELDAGENT,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IFieldAgent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_FIELDAGENT,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFieldAgent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FIELDAGENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
