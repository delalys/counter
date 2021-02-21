import * as AppSettingsActionTypes from '../constants/AppSettingsActionTypes';

export const displayAppSettings = () => {
    return {
        type: AppSettingsActionTypes.DISPLAY_APP_SETTINGS,
    }
}

export const muteApp = () => {
    return {
        type: AppSettingsActionTypes.MUTE_APP,
    }
}

export const condenseApp = () => {
    return {
        type: AppSettingsActionTypes.CONDENSE_APP,
    }
}

export const colorizeApp = (indexGradient) => {
    return {
        type: AppSettingsActionTypes.COLORIZE_APP,
        indexGradient,
    }
}