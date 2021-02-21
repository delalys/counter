import { combineReducers } from 'redux'

import element from './element';
import appSettings from './appSettings';

export default combineReducers({
	element,
	appSettings,
})
