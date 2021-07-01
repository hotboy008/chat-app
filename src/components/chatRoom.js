import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { currentUserSelector, signOut } from "../slices/authSlice";
import DialogsPanel from "./dialogPanel";
import ChatPanel from "./chatPanel";
import { chatsSelector, messagesSelector, setCurrentChat, updateChats, updateChatsAsync, updateMessageAsync } from "../slices/chatSlice";
import { useEffect } from "react";
import { usersSelector } from "../slices/usersSlice";

export default function ChatRoom(){
    const history = useHistory();
    const dispatch = useDispatch();
    const chats = useSelector(chatsSelector);
    const currentUser = useSelector(currentUserSelector);
    const currentChat = useSelector(state => state.chats.currentChat);
    const users = useSelector(usersSelector);
    let messages = useSelector(messagesSelector)

    useEffect(() => {
        dispatch(updateChatsAsync());
    }, [currentUser]);

    useEffect(() => {
        users.map(user => {
            if(user.id === currentUser){
                document.title = user.nickname;
            }
        });
    });

    if(messages){
        const temp = [];

        for (const msgKey in messages) {
            temp.push(messages[msgKey])
        }

        messages = temp;
    }

    function logOutHandle(){
        dispatch(signOut());
        dispatch({ type: 'SIGN_OUT' });
        history.push('/login');
        document.title = 'Chat App';
    }

    function clickChat(idUser){
        const chat = chats.filter(chat => (chat.user1 === idUser) || (chat.user2 === idUser));

        dispatch(setCurrentChat(chat));
    }

    return (
        <>
            <div className='container'>
                <div className='chatRoom'>
                    <div className='dialogPanel'>
                        <DialogsPanel handleClick={clickChat} />
                    </div>
                    <div className='chatPanel'>
                        <ChatPanel messages={currentChat ? messages : undefined} />
                    </div>
                </div>
                <button onClick={logOutHandle} className='btn' style={{ position:"absolute", top:'20px', right:'30px' }}>Logout</button>
            </div>
        </>
    )
}