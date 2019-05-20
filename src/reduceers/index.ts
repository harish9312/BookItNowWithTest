import { combineReducers } from 'redux';
import { modelReducer } from './modelReducer';

export let rootReducer = combineReducers({
    models: modelReducer,
});
