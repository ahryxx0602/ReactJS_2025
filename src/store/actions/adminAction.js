import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';
import { reject } from 'lodash';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0 && res.data) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed("Invalid response data"));
            }
        } catch (e) {
            dispatch(fetchGenderFailed(e.message || "Unknown error occurred"));
            console.log("fetch Gender Start: ", e);
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = (error) => ({
    type: actionTypes.FETCH_GENDER_FAILED,
    error
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            });
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0 && res.data) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed("Invalid response data"));
            }
        } catch (e) {
            dispatch(fetchPositionFailed(e.message || "Unknown error occurred"));
            console.log("fetch Position Start: ", e);
        }
    }

}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = (error) => ({
    type: actionTypes.FETCH_POSITION_FAILED,
    error
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            });
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0 && res.data) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed("Invalid response data"));
            }
        } catch (e) {
            dispatch(fetchRoleFailed(e.message || "Unknown error occurred"));
            console.log("fetch Role Start: ", e);
        }
    }

}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = (error) => ({
    type: actionTypes.FETCH_ROLE_FAILED,
    error
})

//Start doing end