import { removeInstance, saveInstance } from '../actions/modelActions';
import { store } from '../store/index';

export class BaseModel<T> {

    static resource: string;

    resource: string;

    constructor(public props: T & {
        id?: string
    }) {
        this.resource = this.constructor.resource;
        this.props = props;
    }

    getStoreKey(): string {
        return `${this.resource}${this.props.id}`;
    }

    $save(identifer?: string) {
        saveInstance(this, this.getStoreKey(), identifer);
        return this;
    }

    static get(id: string, state = store.getState()) {
        let models = state.models;
        let storeKey = `${this.resource}${id}`;
        return models.toJS ? models.get(storeKey) : models[storeKey];
    }

    static list(state = store.getState()) {
        return (state.models).filter(instance => {
            return (instance.resource === this.resource);
        }).toArray();
    }

    static deleteAll<T extends BaseModel<{}>>(instances = this.list()) {
        instances.forEach((inst) => {
            removeInstance(inst.getStoreKey());
        });
    }
}
