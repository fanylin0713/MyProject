import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { HANDLE_OPEN, HANDLE_CLOSE, SET_TITLE } from './types';

const reducer = handleActions(
  {
    [HANDLE_OPEN]: state => state.set('isOpen', true),
    [HANDLE_CLOSE]: state => state.set('isOpen', false),
    [SET_TITLE]: (state, action) => state.set('title', action.payload),
  },
  fromJS({
    isOpen: false,
    title: '',
  })
);

export default reducer;
