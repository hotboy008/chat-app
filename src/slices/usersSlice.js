import { createSlice } from '@reduxjs/toolkit'
import { db } from '../firebase';

export const getAllUserAsync = () => dispatch =>{
    db.ref().child('/users').get().then(snapshot => {
        snapshot.forEach(user => {
            dispatch(getAllUsers({ email: user.val().user, nickname: user.val().nickname, id: user.val().id }));
        });
    });
};

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: true
    },
    reducers:{
        getAllUsers(state, action){
            state.loading = true;
            
            if(Object.keys(action.payload).length !== 0){
                state.users.push(action.payload);
                state.loading = false;
            }
        }
    }
});

export const usersSelector = state => state.users.users;
export default usersSlice.reducer;
export const { getAllUsers } = usersSlice.actions;