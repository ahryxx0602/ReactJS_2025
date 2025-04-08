import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    error: null,
    users: [],
    topDoctors: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true,
                error: null
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data || [],
                isLoadingGender: false
            }

        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
                isLoadingGender: false,
                genders: [],
                error: action.error || "Failed to fetch genders"
            }

        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                isLoadingPosition: true,
                error: null
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data || [],
                isLoadingPosition: false
            }

        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
                isLoadingPosition: false,
                positions: [],
                error: action.error || "Failed to fetch positions"
            }

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                isLoadingRole: true,
                error: null
            };

        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data || [],
                isLoadingRole: false
            }

        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
                isLoadingRole: false,
                roles: [],
                error: action.error || "Failed to fetch roles"
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.user || []
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            return {
                ...state,
                users: []
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            return {
                ...state,
                topDoctors: action.dataDoctors
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            return {
                ...state,
                topDoctors: []
            }

        default:
            return state;
    }
}

export default adminReducer;