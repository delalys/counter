import * as ElementActionTypes from '../constants/ElementActionTypes';

export const addElement = (element) => {
    return {
        type: ElementActionTypes.ADD_ELEMENT,
        element,
    }
}

export const deleteElement = (indexElement) => {
    return {
        type: ElementActionTypes.DELETE_ELEMENT,
        indexElement,
    }
}

export const displayElementSettings = (indexElement, propertyName, newValue) => {
    return {
        type: ElementActionTypes.DISPLAY_ELEMENT_SETTINGS,
        indexElement, 
        propertyName, 
        newValue
    }
}

export const displayElementInFullScreen = (newElements) => {
    return {
        type: ElementActionTypes.DISPLAY_ELEMENT_IN_FULL_SCREEN,
        newElements
    }
}

export const resetElementCount = (newElements) => {
    return {
        type: ElementActionTypes.RESET_ELEMENT_COUNT,
        newElements
    }
}

export const renameElement = (indexElement, propertyName, newValue, dateReadableFr) => {
    return {
        type: ElementActionTypes.RENAME_ELEMENT,
        indexElement,
        propertyName, 
        newValue, 
        dateReadableFr
    }
}

export const changeElementIncrementBy = (indexElement, propertyName, newValue) => {
    return {
        type: ElementActionTypes.CHANGE_ELEMENT_INCREMENT_BY,
        indexElement,
        propertyName, 
        newValue
    }
}

export const changeElementCount = (indexElement, propertyName, newValue) => {
    return {
        type: ElementActionTypes.CHANGE_ELEMENT_COUNT,
        indexElement,
        propertyName, 
        newValue
    }
}

export const changeElementCountHistory = (elements, indexElement, propertyName, newValue) => {
    return {
        type: ElementActionTypes.CHANGE_ELEMENT_COUNT_HISTORY,
        elements,
        indexElement,
        propertyName, 
        newValue,
    }
}

export const removeOneElementCountHistory = (elements, indexElement, propertyName, newValue) => {
    return {
        type: ElementActionTypes.REMOVE_ONE_ELEMENT_COUNT_HISTORY,
        elements,
        indexElement,
        propertyName,
        newValue,
    }
}

export const changeCountHistoryGroupByDay = (indexElement, propertyName, newValue) => {
    return {
        type: ElementActionTypes.CHANGE_ELEMENT_COUNT_HISTORY_GROUP_BY_DAY,
        indexElement,
        propertyName, 
        newValue
    }
}