import { store } from '../store/index';
export function dispatch(action) {
    store.dispatch(action);
}
