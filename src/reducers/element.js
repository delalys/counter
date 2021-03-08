import * as ElementActionTypes from '../constants/ElementActionTypes';
import helpers from './../helpers';
import initialState from './../data/initialState';

export default function element(state = initialState, action) {
	switch (action.type) {
        case ElementActionTypes.ADD_ELEMENT:
            return {
                ...state, elements: [
                    ...state.elements, action.element
                ]
            }
        case ElementActionTypes.DELETE_ELEMENT:
            return {
                ...state, elements: [
                    ...state.elements.slice(0, action.indexElement),
                    ...state.elements.slice(action.indexElement + 1)
                ]
            }
		case ElementActionTypes.DISPLAY_ELEMENT_SETTINGS:
            return {
                ...state, elements: (helpers.setStateElement([...state.elements], action.indexElement, action.propertyName, action.newValue)),
            }
        case ElementActionTypes.DISPLAY_ELEMENT_IN_FULL_SCREEN:
            return {
                ...state, elements: action.newElements,
            }
		case ElementActionTypes.RESET_ELEMENT_COUNT:
            return {
                ...state, elements: action.newElements
            }
        case ElementActionTypes.RENAME_ELEMENT:
            return {
                ...state, elements: (helpers.setStateElement([...state.elements], action.indexElement, action.propertyName, action.newValue)),
            }
        case ElementActionTypes.CHANGE_ELEMENT_INCREMENT_BY:
            return {
                ...state, elements: (helpers.setStateElement([...state.elements], action.indexElement, action.propertyName, action.newValue)),
            }
        case ElementActionTypes.CHANGE_ELEMENT_COUNT:
            return {
                ...state, elements: (helpers.setStateElement([...state.elements], action.indexElement, action.propertyName, action.newValue)),
            }
        case ElementActionTypes.CHANGE_ELEMENT_COUNT_HISTORY:
            let newElementsCountHistory = action.elements;
            newElementsCountHistory[action.indexElement].countHistory.unshift(action.newValue);
            return {
                ...state, elements: newElementsCountHistory
            }
        case ElementActionTypes.REMOVE_ONE_ELEMENT_COUNT_HISTORY:
            return {
                ...state, elements: (helpers.setStateElement([...state.elements], action.indexElement, action.propertyName, action.newValue)),
            }
        case ElementActionTypes.CHANGE_ELEMENT_COUNT_HISTORY_GROUP_BY_DAY:
            return {
                ...state, elements: (helpers.setStateElement([...state.elements], action.indexElement, action.propertyName, action.newValue)),
            }
        default:
            return state
	}
}



