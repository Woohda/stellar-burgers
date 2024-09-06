import cypress from "cypress";
import { URL } from "../../src/services/api/index";
import { 
    ID_BUN, 
    ID_ANOTHER_BUN, 
    ID_INGREDIENTS_SOURCE, 
    ID_INGREDIENTS_MAIN, 
    BURGER_CONSTRUCTOR } from "cypress/constants";


describe("E2E testing App", () => {
    beforeEach(() => {
        cy.visit('/');
        cy.viewport(1440, 800);
        cy.get('#modals').as('modal');
        cy.intercept('GET', `${URL}/ingredients`, {
            fixture: 'ingredients.json'
        });
        cy.intercept('POST', `${URL}/auth/login`, {
            fixture: 'user.json'
        });
        cy.intercept('GET', `${URL}/auth/user`, {
            fixture: 'user.json'
        });
        cy.intercept('POST', `${URL}/orders`, {
            fixture: 'orderResponse.json'
        });
    });

    describe("adding ingredients to a burger", () => {
        it("should add bun", () => {
            cy.get(ID_BUN).children("button").click({force: true}); // добавляем булку в конструктор
            cy.get(ID_BUN).find('.counter__num').contains('2'); // проверяем индикатор количества на ингредиенте
            cy.get(BURGER_CONSTRUCTOR).find('.constructor-element').should('have.length', 2); // проверяем количество ингредиентов в конструкторе
            cy.get(BURGER_CONSTRUCTOR).contains('.constructor-element__text', 'Флюоресцентная булка R2-D3'); // проверяем название ингредиента в конструкторе
        });
        it("should add another bun", () => {
            cy.get(ID_ANOTHER_BUN).children("button").click({force: true}); // добавляем булку в конструктор
            cy.get(ID_ANOTHER_BUN).find('.counter__num').contains('2'); // проверяем индикатор количества на ингредиенте
            cy.get(BURGER_CONSTRUCTOR).find('.constructor-element').should('have.length', 2); // проверяем количество ингредиентов в конструкторе
            cy.get(BURGER_CONSTRUCTOR).contains('.constructor-element__text', 'Краторная булка N-200i'); // проверяем название ингредиента в конструкторе
        });
        it("should add and remove ingredients", () => {
            cy.get(ID_INGREDIENTS_SOURCE).children("button").click({force: true}); // добавляем ингредиент в конструктор
            cy.get(ID_INGREDIENTS_SOURCE).find('.counter__num').contains('1'); // проверяем индикатор количества на ингредиенте
            cy.get(ID_INGREDIENTS_MAIN).children("button").click({force: true});  // добавляем ингредиент в конструктор
            cy.get(ID_INGREDIENTS_MAIN).find('.counter__num').contains('1'); // проверяем индикатор количества на ингредиенте
            cy.get(BURGER_CONSTRUCTOR).find('.constructor-element').should('have.length', 2); // проверяем количество ингредиентов в конструкторе
            cy.get(BURGER_CONSTRUCTOR).find(ID_INGREDIENTS_SOURCE).find('.constructor-element__action').children('svg').click({force: true}); // удаляем ингредиент из конструктора
            cy.get(BURGER_CONSTRUCTOR).find(ID_INGREDIENTS_SOURCE).should('not.exist'); // проверяем отсутствие ингредиента в конструкторе
        });   
    });

})