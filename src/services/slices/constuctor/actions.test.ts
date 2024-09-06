import { expect, test, describe } from '@jest/globals';
import postRequestOrder from './actions';
import constructorReducer, { initialState } from './ConstructorSlice';

describe('test for async action POST request order', () => {
    const action = {
        pending:{
            type: postRequestOrder.pending.type,
            payload: null,
            error: ''
        },
        rejects:{
            type: postRequestOrder.rejected.type,
            error: { message: 'error' }
        },
        fulfilled:{
            type: postRequestOrder.fulfilled.type,
            payload: {
                order: { number: 1 }
            },
            error: ''
        }
    };

    test('should be pending', () => {
        const newState = constructorReducer(initialState, action.pending);
        expect(newState.orderRequestStatus).toBe('pending');
        expect(newState.error).toBe('');
        expect(newState.orderModalData).toEqual(action.pending.payload);
    })

    test('should be rejected', () => {
        const newState = constructorReducer(initialState, action.rejects);
        expect(newState.orderRequestStatus).toBe('failed');
        expect(newState.error).toBe('error');
    })

    test('should be fulfilled', () => {
        const newState = constructorReducer(initialState, action.fulfilled);
        expect(newState.orderRequestStatus).toBe('success');
        expect(newState.error).toBe('');
        expect(newState.orderModalData?.number).toEqual(action.fulfilled.payload.order.number);
    })
});