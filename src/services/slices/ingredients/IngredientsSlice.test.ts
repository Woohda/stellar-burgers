import { expect, test, describe, jest } from '@jest/globals';
import { initialState, sortIngredientsByType } from './IngredientsSlice';
import { mockIngredients, filteredIngredients } from './testData';

describe('tests for ingredients slice', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('test for sort ingredients by type', () => {
        test('should sort ingredients by type', () => {
            const state = { ingredients: { ...initialState, ingredients: mockIngredients}};
            const result = sortIngredientsByType(state, 'main');
            expect(result).toEqual(filteredIngredients);
        });
    });
});