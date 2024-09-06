import { expect, test, describe } from '@jest/globals';
import getOrderByNumber from './actions';
import orderReducer, { initialState } from './OrderSlice';

describe('test for async action get order by number', () => {
    const action = {
        pending:{
            type: getOrderByNumber.pending.type,
            payload: null,
            error: ''
        },
        rejects:{
            type: getOrderByNumber.rejected.type,
            error: { message: 'error' }
        },
        fulfilled:{
            type: getOrderByNumber.fulfilled.type,
            payload: {
                orders: ['order'],
            }
        }
    };

    test('should be pending', () => {
        const newState = orderReducer(initialState, action.pending);
        expect(newState.orderResponseStatus).toBe('pending');
        expect(newState.error).toBe('');
        expect(newState.orderData).toEqual(action.pending.payload);
    });

    test('should be rejected', () => {
        const newState = orderReducer(initialState, action.rejects);
        expect(newState.orderResponseStatus).toBe('failed');
        expect(newState.error).toBe('error');
    });

    test('should be fulfilled', () => {
        const newState = orderReducer(initialState, action.fulfilled);
        expect(newState.orderResponseStatus).toBe('success');
        expect(newState.orderData).toEqual(action.fulfilled.payload.orders[0]);
    });
})