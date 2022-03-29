import ModelReduxRest from 'utils/magic-redux-rest';

import { ENDPOINT, ENTITY_NAME, ENTITY_PLURAL_NAME, PAGE_SIZE } from '../constants';

const config = {
  entityName: ENTITY_NAME,
  entityNamePluralName: ENTITY_PLURAL_NAME,
  ApiUrl: ENDPOINT,
  pageSize: PAGE_SIZE
};

const userModel = new ModelReduxRest(config);

export const userActions = userModel.actions;
export const userReducer = userModel.reducer;
