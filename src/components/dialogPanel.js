import { useEffect, useState } from 'react'
import { getAllUserAsync, usersSelector } from '../slices/usersSlice';
import { style } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { chatsSelector, createChatAsync, getAllChatAsync } from '../slices/chatSlice';
import propTypes from 'prop-types'

export default function DialogsPanel({ handleClick, switchDialog }){
    useEffect(() => {
        dispatch(getAllUserAsync());
        dispatch(getAllChatAsync(currentUser))
    }, []);

    const [userNickname, setUserNickname] = useState('');
    const dispatch = useDispatch();

    const users = useSelector(usersSelector);
    const currentUser = useSelector(state => state.auth.currentUser);
    const loading = useSelector(state => state.users.loading);
    const chats = useSelector(chatsSelector);
    const currentChat = useSelector(state => state.chats.currentChat);

    function searchHandle(){
        const user = users.find(user => user.nickname === userNickname);

        if(user && (user.id !== currentUser)){
            dispatch(createChatAsync(currentUser, user.id));
            setUserNickname('');
        }
        else{
            alert("User not found!");
        }
    }

    const chatUserId = chats.filter(chat => (chat.user1 === currentUser) || (chat.user2 === currentUser))
        .map(chat => (chat.user1 === currentUser) ? chat.user2 : chat.user1);

    const nickIdPairs = [...users].reduce((acc, user) => !chatUserId.includes(user.id) ? acc : [...acc, [user.nickname, user.id]], []);

    const chatCards = nickIdPairs.map(([nickname, id]) => {
        return (
            <div className='chatCard' style={ { backgroundColor: (currentChat.length > 0) &&
            ((id === currentChat[0].user1) || (id === currentChat[0].user2))  ? '#5d70ff' : '' } } key={id} onClick={() => {
                handleClick(id);
                switchDialog();
                }}> {nickname} </div>
        )
    })

    return (
        <>
            <div className='controll'>
                <input type='text' style={style.input} value={userNickname} onKeyDown={e => { (e.key === 'Enter') && searchHandle() } }
                onChange={e => setUserNickname(e.target.value)} placeholder='Email' />
                <button className='btn btnChat' disabled={loading} onClick={searchHandle} >Chat</button>
            </div>
            <div className='chatContainer'>
            { chatCards }
            </div>
        </>
    )
}

DialogsPanel.propTypes = {
    handleClick: propTypes.func,
    switchDialog: propTypes.func
}