import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { currentUserSelector, signOut } from "../slices/authSlice";
import DialogsPanel from "./dialogPanel";
import ChatPanel from "./chatPanel";
import { chatsSelector, messagesSelector, setCurrentChat, updateChatsAsync, updateMessageAsync } from "../slices/chatSlice";
import { useEffect, useState } from "react";
import { usersSelector } from "../slices/usersSlice";
import { BiMenu } from 'react-icons/bi'

export default function ChatRoom(){
    const history = useHistory();
    const dispatch = useDispatch();
    const chats = useSelector(chatsSelector);
    const currentUser = useSelector(currentUserSelector);
    const currentChat = useSelector(state => state.chats.currentChat);
    const users = useSelector(usersSelector);
    let messages = useSelector(messagesSelector)
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        dispatch(updateChatsAsync());
    }, []);

    useEffect(() => {
        [...users].map(user => {
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
        dispatch(updateMessageAsync());
    }

    function switchDialog(){
        setIsShow(prev => !prev);
    }

    return (
        <>
            <div className='container'>
                <div className='chatRoom'>
                    {(!isShow || (document.body.offsetWidth >= 1000)) &&
                        <div className='dialogPanel'>
                            <DialogsPanel handleClick={clickChat} />
                            <BiMenu className='btnDialog' size='38' style={{ position: 'absolute', bottom: '0px' }} onClick={switchDialog} color='white' />
                        </div>}
                    {isShow &&
                        <div className='chatPanel'>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <BiMenu className='btnDialog' style={{ position: 'absolute', top: '-2px' }} size='38' onClick={switchDialog} />
                            <button onClick={logOutHandle} className='btn btnLogout'>Logout</button>
                        </div>
                        <ChatPanel messages={currentChat ? messages : undefined} />
                    </div>}
                </div>
            </div>
        </>
    )
}