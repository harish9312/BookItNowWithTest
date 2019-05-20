import { OrderedMap } from 'immutable';
import { SAVE_INSTANCE, REMOVE_INSTANCE } from '../constants/action-types';

export function modelReducer(state = OrderedMap({}), action) {
    switch (action.type) {
        case SAVE_INSTANCE:
            return state.set(action.key, action.instance);
        case REMOVE_INSTANCE:
            return state.delete(action.key);
        default:
            return state;
    }
}
