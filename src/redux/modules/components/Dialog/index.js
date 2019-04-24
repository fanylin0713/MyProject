import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getIsOpen, getTitle } from './selectors';

import * as actions from './actions';

import Dialog from 'components/Dialog';

const mapStateToProps = state => ({
  isOpen: getIsOpen(state),
  title: getTitle(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog);
