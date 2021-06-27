import { createSlice } from "@reduxjs/toolkit";
import { auth } from '../firebase'

export const loginAsync = (email, password) => dispatch =>{
    auth.signInWithEmailAndPassword(email, password).then(user => dispatch(login(user.user)));
}

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        currentUser: null
    },
    reducers:{
        login(state, action){
            state.currentUser = action.payload;
        },
        signUp(state, action){
            auth.createUserWithEmailAndPassword(action.payload.email, action.payload.password);
        }
    }
});

export const { login, signUp } = authSlice.actions;
export default authSlice.reducer;