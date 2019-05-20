import { compose, createStore, Store } from 'redux';
import { IImmutableObject } from '../interfaces';
import { rootReducer } from '../reduceers/index';
export function configureStore(): Store<{ models: IImmutableObject }> {

    let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        composeEnhancers()
    );

    return store;
}
export const store = configureStore();
