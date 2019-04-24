import { createActions } from 'redux-actions';

const actionMap = {
    COMPONENTS: {
        // HOME: {
        //     FETCH_GET_USERS: undefined,
        //     FETCH_GET_USERS_REQUEST: undefined,
        //     FETCH_GET_USERS_SUCCESS: undefined,
        //     FETCH_GET_USERS_FAILURE: undefined
        // },
        DIALOG: {
            HANDLE_OPEN: undefined,
            HANDLE_CLOSE: undefined,
            SET_TITLE: undefined,
        }
    }
};

export default createActions(actionMap);
