import { initialState } from "./ConstructorSlice";

export const mockIngredientsInBurger = {
    ...initialState,
    constructorItems: {
        bun: {
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
            "id": "1bun2"
        },
        ingredients: [
            {
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
                "id": "1sau2ce3"
            },
            {
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "id": "1ma2in3"
            },
        ]
    }
};

export const mockUserOrder = [
    "643d69a5c3f7b9001cfa093c",
    "643d69a5c3f7b9001cfa0942",
    "643d69a5c3f7b9001cfa0941",
    "643d69a5c3f7b9001cfa093c",
];
   
export const changedBunInBurger = {
    ...initialState,
    constructorItems: {
        bun: {
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
        },
        ingredients: [
            {
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
            },
            {
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
            },
        ]
    }
};

export const sortedIngredientsInBurger = {
    ...initialState,
    constructorItems: {
        bun: {
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
            "id": "1bun2"
        },
        ingredients: [
            {
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "id": "1ma2in3"
            },
            {
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
                "id": "1sau2ce3"
            },
        ]
    }
};

export const removedIngredientInBurger = {
    ...initialState,
    constructorItems: {
        bun: {
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
            "id": "1bun2"
        },
        ingredients: [
            {
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "id": "1ma2in3"
            },
        ]
    }
};