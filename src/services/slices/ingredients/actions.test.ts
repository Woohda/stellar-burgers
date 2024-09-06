import { expect, test, describe } from '@jest/globals';
import { fetchIngredients } from './actions';
import ingredientsReducer, { initialState } from './IngredientsSlice';

describe('test for async action fetch ingredients', () => {
    const action = {
        pending:{
            type: fetchIngredients.pending.type,
            payload: [],
            error: ''
        },
        rejects:{
            type: fetchIngredients.rejected.type,
            error: { message: 'error' }
        },
        fulfilled:{
            type: fetchIngredients.fulfilled.type,
            payload: {
                ingredients: ['bun', 'source', 'main' ],
            }
        }
    };

    test('should be pending', () => {
        const newState = ingredientsReducer(initialState, action.pending);
        expect(newState.fetchIngredientsStatus).toBe('pending');
        expect(newState.error).toBe('');
        expect(newState.ingredients).toEqual(action.pending.payload);
    });

    test('should be rejected', () => {
        const newState = ingredientsReducer(initialState, action.rejects);
        expect(newState.fetchIngredientsStatus).toBe('failed');
        expect(newState.error).toBe('error');
    });

    test('should be fulfilled', () => {
        const newState = ingredientsReducer(initialState, action.fulfilled);
        expect(newState.fetchIngredientsStatus).toBe('success');
        expect(newState.error).toBe('');
        expect(newState.ingredients).toEqual(action.fulfilled.payload);
    });
})