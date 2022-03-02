import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChampionStatusHistory, defaultValue } from 'app/shared/model/champion-status-history.model';

export const ACTION_TYPES = {
  FETCH_CHAMPIONSTATUSHISTORY_LIST: 'championStatusHistory/FETCH_CHAMPIONSTATUSHISTORY_LIST',
  FETCH_CHAMPIONSTATUSHISTORY: 'championStatusHistory/FETCH_CHAMPIONSTATUSHISTORY',
  CREATE_CHAMPIONSTATUSHISTORY: 'championStatusHistory/CREATE_CHAMPIONSTATUSHISTORY',
  UPDATE_CHAMPIONSTATUSHISTORY: 'championStatusHistory/UPDATE_CHAMPIONSTATUSHISTORY',
  PARTIAL_UPDATE_CHAMPIONSTATUSHISTORY: 'championStatusHistory/PARTIAL_UPDATE_CHAMPIONSTATUSHISTORY',
  DELETE_CHAMPIONSTATUSHISTORY: 'championStatusHistory/DELETE_CHAMPIONSTATUSHISTORY',
  RESET: 'championStatusHistory/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChampionStatusHistory>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ChampionStatusHistoryState = Readonly<typeof initialState>;

// Reducer

export default (state: ChampionStatusHistoryState = initialState, action): ChampionStatusHistoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHAMPIONSTATUSHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHAMPIONSTATUSHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CHAMPIONSTATUSHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_CHAMPIONSTATUSHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_CHAMPIONSTATUSHISTORY):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONSTATUSHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CHAMPIONSTATUSHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHAMPIONSTATUSHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_CHAMPIONSTATUSHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_CHAMPIONSTATUSHISTORY):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONSTATUSHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_CHAMPIONSTATUSHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMPIONSTATUSHISTORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMPIONSTATUSHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHAMPIONSTATUSHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_CHAMPIONSTATUSHISTORY):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONSTATUSHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHAMPIONSTATUSHISTORY):
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

const apiUrl = 'api/champion-status-histories';

// Actions

export const getEntities: ICrudGetAllAction<IChampionStatusHistory> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHAMPIONSTATUSHISTORY_LIST,
  payload: axios.get<IChampionStatusHistory>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IChampionStatusHistory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHAMPIONSTATUSHISTORY,
    payload: axios.get<IChampionStatusHistory>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IChampionStatusHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHAMPIONSTATUSHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChampionStatusHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHAMPIONSTATUSHISTORY,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IChampionStatusHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONSTATUSHISTORY,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChampionStatusHistory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHAMPIONSTATUSHISTORY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
