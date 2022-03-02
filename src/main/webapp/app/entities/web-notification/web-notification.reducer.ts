import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IWebNotification, defaultValue } from 'app/shared/model/web-notification.model';

export const ACTION_TYPES = {
  FETCH_WEBNOTIFICATION_LIST: 'webNotification/FETCH_WEBNOTIFICATION_LIST',
  FETCH_WEBNOTIFICATION: 'webNotification/FETCH_WEBNOTIFICATION',
  CREATE_WEBNOTIFICATION: 'webNotification/CREATE_WEBNOTIFICATION',
  UPDATE_WEBNOTIFICATION: 'webNotification/UPDATE_WEBNOTIFICATION',
  PARTIAL_UPDATE_WEBNOTIFICATION: 'webNotification/PARTIAL_UPDATE_WEBNOTIFICATION',
  DELETE_WEBNOTIFICATION: 'webNotification/DELETE_WEBNOTIFICATION',
  RESET: 'webNotification/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWebNotification>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type WebNotificationState = Readonly<typeof initialState>;

// Reducer

export default (state: WebNotificationState = initialState, action): WebNotificationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WEBNOTIFICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WEBNOTIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_WEBNOTIFICATION):
    case REQUEST(ACTION_TYPES.UPDATE_WEBNOTIFICATION):
    case REQUEST(ACTION_TYPES.DELETE_WEBNOTIFICATION):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_WEBNOTIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_WEBNOTIFICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WEBNOTIFICATION):
    case FAILURE(ACTION_TYPES.CREATE_WEBNOTIFICATION):
    case FAILURE(ACTION_TYPES.UPDATE_WEBNOTIFICATION):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_WEBNOTIFICATION):
    case FAILURE(ACTION_TYPES.DELETE_WEBNOTIFICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEBNOTIFICATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEBNOTIFICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_WEBNOTIFICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_WEBNOTIFICATION):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_WEBNOTIFICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_WEBNOTIFICATION):
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

const apiUrl = 'api/web-notifications';

// Actions

export const getEntities: ICrudGetAllAction<IWebNotification> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_WEBNOTIFICATION_LIST,
  payload: axios.get<IWebNotification>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IWebNotification> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WEBNOTIFICATION,
    payload: axios.get<IWebNotification>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IWebNotification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WEBNOTIFICATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWebNotification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WEBNOTIFICATION,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IWebNotification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_WEBNOTIFICATION,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWebNotification> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WEBNOTIFICATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
