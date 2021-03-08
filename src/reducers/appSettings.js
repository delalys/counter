import * as AppSettingsActionTypes from '../constants/AppSettingsActionTypes';
import gradients from '../data/gradients';


const initialState = {
    appIsMute: false,
    appIsCondensed: false,
    gradients: gradients,
    appSettingsIsDisplayed: false,
    gradient: 5,
}

export default function appSettings(state = initialState, action) {
	switch (action.type) {
		case AppSettingsActionTypes.DISPLAY_APP_SETTINGS:
            return {
                ...state, appSettingsIsDisplayed: !state.appSettingsIsDisplayed
            }
		case AppSettingsActionTypes.MUTE_APP:
            return {
                ...state, appIsMute: !state.appIsMute
            }
        case AppSettingsActionTypes.CONDENSE_APP:
            return {
                ...state, appIsCondensed: !state.appIsCondensed
            }
        case AppSettingsActionTypes.COLORIZE_APP:
            return {
                ...state, gradient: action.indexGradient,
            }
		default:
			return state
	}
}