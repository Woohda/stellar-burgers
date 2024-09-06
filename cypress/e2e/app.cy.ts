import { 
    baseURL,
    ID_BUN, 
    ID_ANOTHER_BUN, 
    ID_INGREDIENTS_SOURCE, 
    ID_INGREDIENTS_MAIN, 
    BURGER_CONSTRUCTOR } from "cypress/constants";


describe("E2E testing App", () => {
    beforeEach(() => {
        // перехват запроса на получение ингредиентов
        cy.intercept('GET', `${baseURL}/ingredients`, { 
            fixture: 'ingredients.json'
        });  
        // перехват запроса на авторизацию
        cy.intercept('POST', `${baseURL}/auth/login`, {
            fixture: 'user.json'
        });
        // перехват запроса на получение пользователя
        cy.intercept('GET', `${baseURL}/auth/user`, {
            fixture: 'user.json'
        });
        // перехват запроса на создание заказа
        cy.intercept('POST', `${baseURL}/orders`, {
            fixture: 'order.json'
        });

        localStorage.setItem('refreshToken', 'test-refreshToken');
        cy.setCookie('accessToken', 'test-accessToken');
        cy.getAllLocalStorage().should('be.not.empty');
        cy.getCookie('accessToken').should('be.not.empty');

        cy.visit('/');
        cy.viewport(1440, 800);
    });

    afterEach(() => {
        localStorage.clear();
        cy.clearAllCookies();
        cy.getAllLocalStorage().should('be.empty');
        cy.getAllCookies().should('be.empty');
    });

    // тест на добавление ингредиентов
    describe("test for adding ingredients to a burger", () => {
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

    // тест на создание заказа
    describe('test for making an order', () => {
        it('should make an order', () => {
            cy.get(ID_BUN).children("button").click({force: true}); // добавляем булку в конструктор
            cy.get(ID_INGREDIENTS_SOURCE).children("button").click({force: true}); // добавляем ингредиент в конструктор
            cy.get(ID_INGREDIENTS_MAIN).children("button").click({force: true});  // добавляем ингредиент в конструктор
            cy.get(BURGER_CONSTRUCTOR).contains('.text', '3403'); // проверяем цену в конструкторе
            cy.get(BURGER_CONSTRUCTOR).find(`[data-cy=${"order-button"}]`).click({force: true}); // кликаем на кнопку оформления заказа
            cy.get('#modals').should('be.not.empty'); // проверяем видимость модального окна
            cy.get('#modals').find('h2').contains('52074'); // проверяем заголовок модального окна  
        });    
    })
    // тест на открытие и закрытие модального окна
    describe('test for modal', () => {
        it('open modal window ingredient and check url data', () => {
          cy.get('#modals').should('be.empty'); // проверяем невидимость модального окна
          cy.get(ID_INGREDIENTS_SOURCE).children('a').click({force: true}); // кликаем на ингредиент 
          cy.get('#modals').should('be.not.empty'); // проверяем видимость модального окна
          cy.url().should('include', '643d69a5c3f7b9001cfa0942'); // проверяем url ингредиента
          cy.get('#modals').find('h3').contains('Соус Spicy-X'); // проверяем заголовока модального окна с названием ингредиента
        });
        it('close modal window ingredient by click X button', () => {
            cy.get('#modals').should('be.empty'); // проверяем невидимость модального окна
            cy.get(ID_INGREDIENTS_SOURCE).children('a').click({force: true}); // кликаем на ингредиент
            cy.get('#modals').should('be.not.empty'); // проверяем видимость модального окна
            cy.get('#modals').find('svg').click({force: true}); // кликаем на кнопку закрытия модального окна
            cy.get('#modals').should('be.empty'); // проверяем невидимость модального окна
          });
          it('close modal window ingredient by click overlay', () => {
            cy.get('#modals').should('be.empty'); // проверяем невидимость модального окна
            cy.get(ID_INGREDIENTS_SOURCE).children('a').click({force: true}); // кликаем на ингредиент
            cy.get('#modals').should('be.not.empty'); // проверяем видимость модального окна
            cy.get(`[data-cy='overlay']`).click({ force: true }); // кликаем на оверлей
            cy.get('#modals').should('be.empty'); // проверяем невидимость модального окна
          });
          it('close modal window ingredient by press Escape', () => {
            cy.get('#modals').should('be.empty'); // проверяем невидимость модального окна
            cy.get(ID_INGREDIENTS_SOURCE).children('a').click({force: true}); // кликаем на ингредиент
            cy.get('#modals').should('be.not.empty'); // проверяем видимость модального окна
            cy.get('body').trigger('keydown', { key: 'Escape' }); // нажимаем на Escape
            cy.get('#modals').should('be.empty'); // проверяем невидимость модального окна
          });
    });

})