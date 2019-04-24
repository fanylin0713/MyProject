import { createSelector } from 'reselect';

export const getRootStates = state =>
  state.getIn(['components', 'Dialog']);

export const getIsOpen = createSelector(
  getRootStates,
  rootStates => rootStates.get('isOpen')
);

export const getTitle = createSelector(
  getRootStates,
  rootStates => rootStates.get('title')
);