import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChampionGuarantor, defaultValue } from 'app/shared/model/champion-guarantor.model';

export const ACTION_TYPES = {
  FETCH_CHAMPIONGUARANTOR_LIST: 'championGuarantor/FETCH_CHAMPIONGUARANTOR_LIST',
  FETCH_CHAMPIONGUARANTOR: 'championGuarantor/FETCH_CHAMPIONGUARANTOR',
  CREATE_CHAMPIONGUARANTOR: 'championGuarantor/CREATE_CHAMPIONGUARANTOR',
  UPDATE_CHAMPIONGUARANTOR: 'championGuarantor/UPDATE_CHAMPIONGUARANTOR',
  PARTIAL_UPDATE_CHAMPIONGUARANTOR: 'championGuarantor/PARTIAL_UPDATE_CHAMPIONGUARANTOR',
  DELETE_CHAMPIONGUARANTOR: 'championGuarantor/DELETE_CHAMPIONGUARANTOR',
  RESET: 'championGuarantor/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChampionGuarantor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ChampionGuarantorState = Readonly<typeof initialState>;

// Reducer

export default (state: ChampionGuarantorState = initialState, action): ChampionGuarantorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHAMPIONGUARANTOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHAMPIONGUARANTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CHAMPIONGUARANTOR):
    case REQUEST(ACTION_TYPES.UPDATE_CHAMPIONGUARANTOR):
    case REQUEST(ACTION_TYPES.DELETE_CHAMPIONGUARANTOR):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONGUARANTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CHAMPIONGUARANTOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHAMPIONGUARANTOR):
    case FAILURE(ACTION_TYPES.CREATE_CHAMPIONGUARANTOR):
    case FAILURE(ACTION_TYPES.UPDATE_CHAMPIONGUARANTOR):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONGUARANTOR):
    case FAILURE(ACTION_TYPES.DELETE_CHAMPIONGUARANTOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMPIONGUARANTOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMPIONGUARANTOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHAMPIONGUARANTOR):
    case SUCCESS(ACTION_TYPES.UPDATE_CHAMPIONGUARANTOR):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONGUARANTOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHAMPIONGUARANTOR):
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

const apiUrl = 'api/champion-guarantors';

// Actions

export const getEntities: ICrudGetAllAction<IChampionGuarantor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHAMPIONGUARANTOR_LIST,
  payload: axios.get<IChampionGuarantor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IChampionGuarantor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHAMPIONGUARANTOR,
    payload: axios.get<IChampionGuarantor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IChampionGuarantor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHAMPIONGUARANTOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChampionGuarantor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHAMPIONGUARANTOR,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IChampionGuarantor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_CHAMPIONGUARANTOR,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChampionGuarantor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHAMPIONGUARANTOR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
