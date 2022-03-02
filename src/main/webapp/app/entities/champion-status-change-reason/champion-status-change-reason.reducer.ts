import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChampionStatusChangeReason, defaultValue } from 'app/shared/model/champion-status-change-reason.model';

export const ACTION_TYPES = {
  FETCH_CHAMPIONSTATUSCHANGEREASON_LIST: 'championStatusChangeReason/FETCH_CHAMPIONSTATUSCHANGEREASON_LIST',
  FETCH_CHAMPIONSTATUSCHANGEREASON: 'championStatusChangeReason/FETCH_CHAMPIONSTATUSCHANGEREASON',
  CREATE_CHAMPIONSTATUSCHANGEREASON: 'championStatusChangeReason/CREATE_CHAMPIONSTATUSCHANGEREASON',
  UPDATE_CHAMPIONSTATUSCHANGEREASON: 'championStatusChangeReason/UPDATE_CHAMPIONSTATUSCHANGEREASON',
  PARTIAL_UPDATE_CHAMPIONSTATUSCHANGEREASON: 'championStatusChangeReason/PARTIAL_UPDATE_CHAMPIONSTATUSCHANGEREASON',
  DELETE_CHAMPIONSTATUSCHANGEREASON: 'championStatusChangeReason/DELETE_CHAMPIONSTATUSCHANGEREASON',
  RESET: 'championStatusChangeReason/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChampionStatusChangeReason>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ChampionStatusChangeReasonState = Readonly<typeof initialState>;

// Reducer

export default (state: ChampionStatusChangeReasonState = initialState, action): ChampionStatusChangeReasonState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHAMPIONSTATUSCHANGEREASON_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHAMPIONSTATUSCHANGEREASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CHAMPIONSTATUSCHANGEREASON):
    case REQUEST(ACTION_TYPES.UPDATE_CHAMPIONSTATUSCHANGEREASON):
    case REQUEST(ACTION_TYPES.DELETE_CHAMPIONSTATUSCHANGEREASON):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONSTATUSCHANGEREASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CHAMPIONSTATUSCHANGEREASON_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHAMPIONSTATUSCHANGEREASON):
    case FAILURE(ACTION_TYPES.CREATE_CHAMPIONSTATUSCHANGEREASON):
    case FAILURE(ACTION_TYPES.UPDATE_CHAMPIONSTATUSCHANGEREASON):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONSTATUSCHANGEREASON):
    case FAILURE(ACTION_TYPES.DELETE_CHAMPIONSTATUSCHANGEREASON):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMPIONSTATUSCHANGEREASON_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMPIONSTATUSCHANGEREASON):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHAMPIONSTATUSCHANGEREASON):
    case SUCCESS(ACTION_TYPES.UPDATE_CHAMPIONSTATUSCHANGEREASON):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONSTATUSCHANGEREASON):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHAMPIONSTATUSCHANGEREASON):
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

const apiUrl = 'api/champion-status-change-reasons';

// Actions

export const getEntities: ICrudGetAllAction<IChampionStatusChangeReason> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHAMPIONSTATUSCHANGEREASON_LIST,
  payload: axios.get<IChampionStatusChangeReason>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IChampionStatusChangeReason> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHAMPIONSTATUSCHANGEREASON,
    payload: axios.get<IChampionStatusChangeReason>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IChampionStatusChangeReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHAMPIONSTATUSCHANGEREASON,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChampionStatusChangeReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHAMPIONSTATUSCHANGEREASON,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IChampionStatusChangeReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONSTATUSCHANGEREASON,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChampionStatusChangeReason> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHAMPIONSTATUSCHANGEREASON,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
