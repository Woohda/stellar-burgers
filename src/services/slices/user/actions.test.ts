import { expect, test, describe } from '@jest/globals';
import { fetchUser, fetchUserOrders, loginUser, logoutUser, registerUser, updateUser } from './actions';
import userReducer, { initialState } from './UserSlice';

describe('test for async actions user', () => {
    describe('test for async action fetch user', () => {
        const action = {
            pending:{
                type: fetchUser.pending.type,
                payload: null,
                error: ''
            },
            rejects:{
                type: fetchUser.rejected.type,
                error: { message: 'error' }
            },
            fulfilled:{
                type: fetchUser.fulfilled.type,
                payload: {
                    user: { name: 'name', email: 'email' }
                }
            }
        };

        test('should be pending', () => {
            const newState = userReducer(initialState, action.pending);
            expect(newState.fetchUserRequestStatus).toBe('pending');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.pending.payload);
        });

        test('should be rejected', () => {
            const newState = userReducer(initialState, action.rejects);
            expect(newState.fetchUserRequestStatus).toBe('failed');
            expect(newState.error).toBe('error');
        }); 

        test('should be fulfilled', () => {
            const newState = userReducer(initialState, action.fulfilled);
            expect(newState.fetchUserRequestStatus).toBe('success');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.fulfilled.payload.user);
        });
    });

    describe('test for async action login user', () => {
        const action = {
            pending:{
                type: loginUser.pending.type,
                payload: null,
                error: ''
            },
            rejects:{
                type: loginUser.rejected.type,
                error: { message: 'error' }
            },
            fulfilled:{
                type: loginUser.fulfilled.type,
                payload: {
                    isAuthChecked: true,
                    user: { name: 'name', email: 'email' }
                }
            }
        };

        test('should be pending', () => {
            const newState = userReducer(initialState, action.pending);
            expect(newState.fetchUserRequestStatus).toBe('pending');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.pending.payload);
        });

        test('should be rejected', () => {
            const newState = userReducer(initialState, action.rejects);
            expect(newState.fetchUserRequestStatus).toBe('failed');
            expect(newState.error).toBe('error');
        }); 

        test('should be fulfilled', () => {
            const newState = userReducer(initialState, action.fulfilled);
            expect(newState.fetchUserRequestStatus).toBe('success');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.fulfilled.payload.user);
            expect(newState.isAuthChecked).toBe(true);
        });
    });

    describe('test for async action logout user', () => {
        const action = {
            pending:{
                type: logoutUser.pending.type,
                payload: null,
                error: ''
            },
            rejects:{
                type: logoutUser.rejected.type,
                error: { message: 'error' }
            },
            fulfilled:{
                type: logoutUser.fulfilled.type,
                payload: null
            }
        };

        test('should be pending', () => {
            const newState = userReducer(initialState, action.pending);
            expect(newState.fetchUserRequestStatus).toBe('pending');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.pending.payload);
        });

        test('should be rejected', () => {
            const newState = userReducer(initialState, action.rejects);
            expect(newState.fetchUserRequestStatus).toBe('failed');
            expect(newState.error).toBe('error');
        }); 

        test('should be fulfilled', () => {
            const newState = userReducer(initialState, action.fulfilled);
            expect(newState.fetchUserRequestStatus).toBe('success');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.fulfilled.payload);
        });
    });

    describe('test for async action register user', () => {
        const action = {
            pending:{
                type: registerUser.pending.type,
                payload: null,
                error: ''
            },
            rejects:{
                type: registerUser.rejected.type,
                error: { message: 'error' }
            },
            fulfilled:{
                type: registerUser.fulfilled.type,
                payload: {
                    user: { name: 'name', email: 'email' }
                }
            }
        };

        test('should be pending', () => {
            const newState = userReducer(initialState, action.pending);
            expect(newState.fetchUserRequestStatus).toBe('pending');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.pending.payload);
        });

        test('should be rejected', () => {
            const newState = userReducer(initialState, action.rejects);
            expect(newState.fetchUserRequestStatus).toBe('failed');
            expect(newState.error).toBe('error');
        }); 

        test('should be fulfilled', () => {
            const newState = userReducer(initialState, action.fulfilled);
            expect(newState.fetchUserRequestStatus).toBe('success');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.fulfilled.payload.user);
        });
    });

    describe('test for async action update user', () => {
        const action = {
            pending:{
                type: updateUser.pending.type,
                payload: null,
                error: ''
            },
            rejects:{
                type: updateUser.rejected.type,
                error: { message: 'error' }
            },
            fulfilled:{
                type: updateUser.fulfilled.type,
                payload: {
                    user: { name: 'name', email: 'email' }
                }
            }
        };

        test('should be pending', () => {
            const newState = userReducer(initialState, action.pending);
            expect(newState.fetchUserRequestStatus).toBe('pending');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.pending.payload);
        });

        test('should be rejected', () => {
            const newState = userReducer(initialState, action.rejects);
            expect(newState.fetchUserRequestStatus).toBe('failed');
            expect(newState.error).toBe('error');
        }); 

        test('should be fulfilled', () => {
            const newState = userReducer(initialState, action.fulfilled);
            expect(newState.fetchUserRequestStatus).toBe('success');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.fulfilled.payload.user);
        });
    });

    describe('test for async action fetch user orders', () => {
        const action = {
            pending:{
                type: fetchUserOrders.pending.type,
                payload: null,
                error: ''
            },
            rejects:{
                type: fetchUserOrders.rejected.type,
                error: { message: 'error' }
            },
            fulfilled:{
                type: fetchUserOrders.fulfilled.type,
                payload: ['oreder #1', 'oreder #2'] 
            }
        };

        test('should be pending', () => {
            const newState = userReducer(initialState, action.pending);
            expect(newState.fetchUserRequestStatus).toBe('pending');
            expect(newState.error).toBe('');
            expect(newState.user).toEqual(action.pending.payload);
        });

        test('should be rejected', () => {
            const newState = userReducer(initialState, action.rejects);
            expect(newState.fetchUserRequestStatus).toBe('failed');
            expect(newState.error).toBe('error');
        }); 

        test('should be fulfilled', () => {
            const newState = userReducer(initialState, action.fulfilled);
            expect(newState.fetchUserRequestStatus).toBe('success');
            expect(newState.error).toBe('');
            expect(newState.userOrders).toEqual(action.fulfilled.payload);
        });
    });

})