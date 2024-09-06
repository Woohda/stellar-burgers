import { expect, test, describe, jest } from '@jest/globals';
import constructorReducer, { 
    initialState, 
    addIngredient, 
    moveIngredientUp, 
    moveIngredientDown, 
    removeIngredient,
    getTotalPrice,
    getFormatedUserOrder } from './ConstructorSlice';

import { 
    mockIngredientsInBurger, 
    changedBunInBurger, 
    sortedIngredientsInBurger, 
    removedIngredientInBurger,
    mockUserOrder } from './testData';


describe('tests for constructor slice', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('test for add ingredient reducer', () => {
        test('should add bun', () => {
            const newState = constructorReducer(initialState, addIngredient({
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            }));

            expect(newState.constructorItems.bun).toEqual({
                ...mockIngredientsInBurger.constructorItems.bun, 
                id: expect.any(String)
            });
        });

        test('should add ingredient', () => {
            const newState = constructorReducer(initialState, addIngredient({
                "_id": "643d69a5c3f7b9001cfa0942",
                "name": "Соус Spicy-X",
                "type": "sauce",
                "proteins": 30,
                "fat": 20,
                "carbohydrates": 40,
                "calories": 30,
                "price": 90,
                "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            }));

            const mockIngredient = mockIngredientsInBurger.constructorItems.ingredients[0];

            expect(newState.constructorItems.ingredients[0]).toEqual({...mockIngredient,
                id: expect.any(String)
            });
        });
    });

    describe('test for change bun reducer', () => {
        test('should change bun', () => {
            const newState = constructorReducer(mockIngredientsInBurger, addIngredient({
                "_id": "643d69a5c3f7b9001cfa093d",
                "name": "Флюоресцентная булка R2-D3",
                "type": "bun",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
            }));

            expect(newState.constructorItems.bun).toEqual({
                ...changedBunInBurger.constructorItems.bun, 
                id: expect.any(String)
            });
        }); 
    }); 

    describe('test for move ingredient reducer', () => {
        test('should move ingredient up', () => {
            const newState = constructorReducer(mockIngredientsInBurger, moveIngredientUp(0));
            expect(newState.constructorItems.ingredients).toEqual(sortedIngredientsInBurger.constructorItems.ingredients);
        });
        test('should move ingredient down', () => {
            const newState = constructorReducer(sortedIngredientsInBurger, moveIngredientDown(0));
            expect(newState.constructorItems.ingredients).toEqual(mockIngredientsInBurger.constructorItems.ingredients);
        });
    });

    describe('test for remove ingredient reducer', () => {
        test('should remove ingredient', () => {
            const newState = constructorReducer(mockIngredientsInBurger, removeIngredient("1sau2ce3"));
            expect(newState.constructorItems.ingredients).toEqual(removedIngredientInBurger.constructorItems.ingredients);
        });
    });

    describe('test for get total price selector', () => {
        test('should get total price', () => {
            const state = {composition: mockIngredientsInBurger};
            const result = getTotalPrice(state);
            expect(result).toBe(3024);
        });
    });

    describe('test for formation user order selector', () => {
        test('should formation user order', () => {
            const state = {composition: mockIngredientsInBurger};
            const result = getFormatedUserOrder(state);
            expect(result).toEqual(mockUserOrder);
        });
    });
});