import * as ElementActionTypes from '../constants/ElementActionTypes';
import helpers from './../helpers';

const initialState = {
    elements: [
      {
        id: 1,
        value: 'Glass of water',
        count: 3,
        gradient: 2,
        color1: '#ba8f89',
        color2: '#c6786c',
        elementSettingsIsDisplayed: false,
        elementIsInFullScreen: false,
        incrementBy: 1,
      },
      {
        id: 2,
        value: 'Pushups',
        count: 50,
        gradient: 3,
        color1: '#ba8f89',
        color2: '#c6786c',
        elementSettingsIsDisplayed: false,
        elementIsInFullScreen: false,
        incrementBy: 10,
      },
      {
        id: 3,
        value: 'Day without smoking',
        count: 17,
        gradient: 4,
        color1: '#ba8f89',
        color2: '#c6786c',
        elementSettingsIsDisplayed: false,
        elementIsInFullScreen: false,
        incrementBy: 1,
      }
    ]
}


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
        default:
            return state
	}
}



