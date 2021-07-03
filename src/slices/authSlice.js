import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from '../firebase'

export const loginAsync = (email, password) => dispatch =>{
    auth.signInWithEmailAndPassword(email, password).catch(err => {
        alert(err)
    });

    auth.onAuthStateChanged(user => {
        if(user){
            dispatch(login(user.uid));
        }
    });
}

export const signUpAsync = (email, nickname, password) => dispatch =>{
    let isNewNickname = true;

    db.ref('users').once('value').then(users => {
        users.forEach(user => {
            if(user.val().nickname === nickname){
                isNewNickname = false;
            }
        })

        if(isNewNickname){
            auth.createUserWithEmailAndPassword(email, password).catch(err => {
                alert(err)
            }).then(() => {
                auth.onAuthStateChanged(user => {
                    if(user){
                        const usersDB = db.ref(`users/'user${user.uid}`);
                        usersDB.set({ id: user.uid, nickname: nickname});

                        dispatch(login(user.uid));
                    }
                });
            });
        }
        else{
            alert('Nickname alredy exist!')
        }
    });
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