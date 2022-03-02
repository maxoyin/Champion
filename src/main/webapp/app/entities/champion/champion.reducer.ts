import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChampion, defaultValue } from 'app/shared/model/champion.model';

export const ACTION_TYPES = {
  FETCH_CHAMPION_LIST: 'champion/FETCH_CHAMPION_LIST',
  FETCH_CHAMPION: 'champion/FETCH_CHAMPION',
  CREATE_CHAMPION: 'champion/CREATE_CHAMPION',
  UPDATE_CHAMPION: 'champion/UPDATE_CHAMPION',
  PARTIAL_UPDATE_CHAMPION: 'champion/PARTIAL_UPDATE_CHAMPION',
  DELETE_CHAMPION: 'champion/DELETE_CHAMPION',
  SET_BLOB: 'champion/SET_BLOB',
  RESET: 'champion/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChampion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ChampionState = Readonly<typeof initialState>;

// Reducer

export default (state: ChampionState = initialState, action): ChampionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHAMPION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHAMPION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CHAMPION):
    case REQUEST(ACTION_TYPES.UPDATE_CHAMPION):
    case REQUEST(ACTION_TYPES.DELETE_CHAMPION):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_CHAMPION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CHAMPION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHAMPION):
    case FAILURE(ACTION_TYPES.CREATE_CHAMPION):
    case FAILURE(ACTION_TYPES.UPDATE_CHAMPION):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_CHAMPION):
    case FAILURE(ACTION_TYPES.DELETE_CHAMPION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMPION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMPION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHAMPION):
    case SUCCESS(ACTION_TYPES.UPDATE_CHAMPION):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_CHAMPION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHAMPION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/champions';

// Actions

export const getEntities: ICrudGetAllAction<IChampion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHAMPION_LIST,
  payload: axios.get<IChampion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IChampion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHAMPION,
    payload: axios.get<IChampion>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IChampion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHAMPION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChampion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHAMPION,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IChampion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_CHAMPION,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChampion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHAMPION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
