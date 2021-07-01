import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from '../firebase'

export const loginAsync = (email, password) => dispatch =>{
    auth.signInWithEmailAndPassword(email, password);

    auth.onAuthStateChanged(user => {
        if(user){
            dispatch(login(user.uid));
        }
    });
}

export const signUpAsync = (email, nickname, password) => () =>{
    auth.createUserWithEmailAndPassword(email, password);

    auth.onAuthStateChanged(user => {
        if(user){
            const usersDB = db.ref(`users/'user${user.uid}`);
            usersDB.set({ user: user.email, nickname: nickname, id: user.uid});
        }
    })
};

export const authSlice = createSlice({
    name: 'auth',
    initialState:{ 
        currentUser: null
    },
    reducers:{
        login(state, action){
            state.currentUser = action.payload;
        },
        signOut(){
            auth.signOut();
        }
    }
});

export const currentUserSelector = state => state.auth.currentUser;
export const { login, signOut } = authSlice.actions;
export default authSlice.reducer;