import store, { rootReducer } from './store';

describe('test for root reducer in store', () => {
    test('should return state store', () => {
        const expected = rootReducer(undefined, { type: '' });
        expect(expected).toEqual(store.getState());
        });
})
    