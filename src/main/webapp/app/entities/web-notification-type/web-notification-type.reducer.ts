import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IWebNotificationType, defaultValue } from 'app/shared/model/web-notification-type.model';

export const ACTION_TYPES = {
  FETCH_WEBNOTIFICATIONTYPE_LIST: 'webNotificationType/FETCH_WEBNOTIFICATIONTYPE_LIST',
  FETCH_WEBNOTIFICATIONTYPE: 'webNotificationType/FETCH_WEBNOTIFICATIONTYPE',
  CREATE_WEBNOTIFICATIONTYPE: 'webNotificationType/CREATE_WEBNOTIFICATIONTYPE',
  UPDATE_WEBNOTIFICATIONTYPE: 'webNotificationType/UPDATE_WEBNOTIFICATIONTYPE',
  PARTIAL_UPDATE_WEBNOTIFICATIONTYPE: 'webNotificationType/PARTIAL_UPDATE_WEBNOTIFICATIONTYPE',
  DELETE_WEBNOTIFICATIONTYPE: 'webNotificationType/DELETE_WEBNOTIFICATIONTYPE',
  RESET: 'webNotificationType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWebNotificationType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type WebNotificationTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: WebNotificationTypeState = initialState, action): WebNotificationTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WEBNOTIFICATIONTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WEBNOTIFICATIONTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_WEBNOTIFICATIONTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_WEBNOTIFICATIONTYPE):
    case REQUEST(ACTION_TYPES.DELETE_WEBNOTIFICATIONTYPE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_WEBNOTIFICATIONTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_WEBNOTIFICATIONTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WEBNOTIFICATIONTYPE):
    case FAILURE(ACTION_TYPES.CREATE_WEBNOTIFICATIONTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_WEBNOTIFICATIONTYPE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_WEBNOTIFICATIONTYPE):
    case FAILURE(ACTION_TYPES.DELETE_WEBNOTIFICATIONTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEBNOTIFICATIONTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEBNOTIFICATIONTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_WEBNOTIFICATIONTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_WEBNOTIFICATIONTYPE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_WEBNOTIFICATIONTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_WEBNOTIFICATIONTYPE):
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

const apiUrl = 'api/web-notification-types';

// Actions

export const getEntities: ICrudGetAllAction<IWebNotificationType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_WEBNOTIFICATIONTYPE_LIST,
  payload: axios.get<IWebNotificationType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IWebNotificationType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WEBNOTIFICATIONTYPE,
    payload: axios.get<IWebNotificationType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IWebNotificationType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WEBNOTIFICATIONTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWebNotificationType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WEBNOTIFICATIONTYPE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IWebNotificationType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_WEBNOTIFICATIONTYPE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWebNotificationType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WEBNOTIFICATIONTYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
