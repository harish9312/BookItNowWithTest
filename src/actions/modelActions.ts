import { BaseModel } from '../Models/BaseModel';
import { dispatch } from '../utilities/generalUtilities';
import { SAVE_INSTANCE, UPDATE_INSTANCE, REMOVE_INSTANCE, MERGE_INSTANCE } from '../constants/action-types';

export function saveInstance(instance: BaseModel<{}>, key: string, identifier?: string) {
    return dispatch({
        type: `${SAVE_INSTANCE}`,
        instance,
        key
    });
}

export function removeInstance(key: string) {
    return dispatch({
        type: REMOVE_INSTANCE,
        key,
    });
}
