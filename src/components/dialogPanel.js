import { useEffect, useState } from 'react'
import { getAllUserAsync, usersSelector } from '../slices/usersSlice';
import { style } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { chatsSelector, createChatAsync, getAllChatAsync } from '../slices/chatSlice';

export default function DialogsPanel({ handleClick }){
    useEffect(() => {
        dispatch(getAllUserAsync());
        dispatch(getAllChatAsync(currentUser))
    }, []);

    const [userEmail, setUserEmail] = useState('');
    const dispatch = useDispatch();

    const users = useSelector(usersSelector);
    const currentUser = useSelector(state => state.auth.currentUser);
    const loading = useSelector(state => state.users.loading);
    const chats = useSelector(chatsSelector);
    const currentChat = useSelector(state => state.chats.currentChat);

    function searchHandle(){
        const user = users.find(user => user.email === userEmail);

        if(user && (user.id !== currentUser)){
            dispatch(createChatAsync(currentUser, user.id));
            setUserEmail('');
        }
        else{
            alert("User not found!");
        }
    }

    const chatUserId = chats.filter(chat => (chat.user1 === currentUser) || (chat.user2 === currentUser))
        .map(chat => (chat.user1 === currentUser) ? chat.user2 : chat.user1);

    const emailIdPairs = users.reduce((acc, user) => !chatUserId.includes(user.id) ? acc : [...acc, [user.email, user.id]], []);

    const chatCards = emailIdPairs.map(([email, id]) => {
        return (
            <div className='chatCard' style={ { backgroundColor: (currentChat.length > 0) && ((id === currentChat[0].user1) || (id === currentChat[0].user2))  ? '#5d70ff' : '' } } key={id} onClick={() => {
                handleClick(id);
                }}> {email} </div>
        )
    })

    return (
        <>
            <div className='controll'>
                <input type='text' style={style.input} value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder='Email' />
                <button className='btn' disabled={loading} style={style.btnChat} onClick={searchHandle} >Chat</button>
            </div>
            <div className='chatContainer'>
            { chatCards }
            </div>
        </>
    )
}