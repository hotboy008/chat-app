import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";

export const createChatAsync = (uid1, uid2)  => () => {
    const chatDB = db.ref(`chats/${uid1}${uid2}`);

    chatDB.set({ user1: uid1, user2: uid2, messages: [] });
}

export const getAllChatAsync = userId => (dispatch, getState) => {
    const chatDB = db.ref('chats');
    let chats = [];
    
    chatDB.once('value').then(snapshot => {
        if(snapshot.exists()){
            for (const [_, val] of Object.entries(snapshot.val())) {
                chats.push(val);
            }
        }
    }).then(() => {
        chats = chats.filter(chat => {
            return (chat.user1 === userId) || (chat.user2 === userId);
        });
        
        dispatch(getAllChatsByUser(chats));
    });
}

export const sendMessageAsync = text => (_, getState) => {
    const currentUser = getState().auth.currentUser;
    const currentChat = getState().chats.currentChat;

    const msgDB = db.ref(`chats/${currentChat[0].user1}${currentChat[0].user2}/messages`);
    const msgContainer = msgDB.push();
    const msg = { data: Date.now(), user: currentUser, text: text };
    msgContainer.set(msg);
}

export const updateChatsAsync = () => dispatch => {
    const chatDB = db.ref('/chats');
    chatDB.on('child_added', snapshot => {
        if(snapshot.exists()){
            dispatch(updateChats(snapshot.val()));
        }
    })
}

export const updateMessageAsync = () => (dispatch, getState) => {
    const currentChat = getState().chats.currentChat;

    if(currentChat[0]){
        const msgDB = db.ref(`chats/${currentChat[0].user1}${currentChat[0].user2}/messages`);

        msgDB.on('child_added', snapshot => {
        if(snapshot.exists()){
            dispatch(updateMessage([snapshot.key, snapshot.val()]));
        }
    });
    }
}

const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        currentChat: {},
        chats: []
    },
    reducers:{
        setCurrentChat(state, action){
            state.currentChat = action.payload;
        },
        getAllChatsByUser(state, action){
            state.chats = action.payload;
        },
        updateChats(state, action){
            state.chats.push(action.payload);
        },
        updateMessage(state, action){
            if(state.currentChat[0].messages){
                if(!state.currentChat[0].messages.hasOwnProperty(action.payload[0])){
                    Object.assign(state.currentChat[0].messages, { [action.payload[0]]: action.payload[1] });
                }
            }
            else{
                Object.assign(state.currentChat[0], { messages: {} });
                Object.assign(state.currentChat[0].messages, { [action.payload[0]]: action.payload[1] });
            }
        },
    }
})

export const chatsSelector = state => state.chats.chats;
export const messagesSelector = state => (state.chats.currentChat.length > 0) ? state.chats.currentChat[0].messages : undefined;
export const { getMessageByChat, getAllChatsByUser, getNewMessage, updateMessage, updateChats, setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;