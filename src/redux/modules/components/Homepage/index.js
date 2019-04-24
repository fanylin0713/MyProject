import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    handleOpen as handleDialogOpen,
    setTitle as setAlertDialogTitle,
} from 'redux/modules/components/Dialog/actions';
import Homepage from 'components/Homepage';

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            handleDialogOpen,
            setAlertDialogTitle,
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(Homepage);
