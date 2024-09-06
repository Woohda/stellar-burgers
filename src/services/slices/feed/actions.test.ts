import { expect, test, describe } from '@jest/globals';
import { fetchFeeds } from './actions';
import feedReducer, { initialState } from './FeedSlice';

describe('test for async action fetch feeds', () => {
    const action = {
        pending:{
            type: fetchFeeds.pending.type,
            payload: [],
            error: ''
        },
        rejects:{
            type: fetchFeeds.rejected.type,
            error: { message: 'error' }
        },
        fulfilled:{
            type: fetchFeeds.fulfilled.type,
            payload: {
                orders: [1],
            }
        }
    };

    test('should be pending', () => {
        const newState = feedReducer(initialState, action.pending);
        expect(newState.fetchFeedStatus).toBe('pending');
        expect(newState.error).toBe('');
        expect(newState.orders).toEqual(action.pending.payload);
    });

    test('should be rejected', () => {
        const newState = feedReducer(initialState, action.rejects);
        expect(newState.fetchFeedStatus).toBe('failed');
        expect(newState.error).toBe('error');
    });

    test('should be fulfilled', () => {
        const newState = feedReducer(initialState, action.fulfilled);
        expect(newState.fetchFeedStatus).toBe('success');
        expect(newState.error).toBe('');
        expect(newState.orders).toEqual(action.fulfilled.payload.orders);   
    });
})