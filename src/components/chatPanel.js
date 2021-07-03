import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAsync } from "../slices/chatSlice";
import propTypes from "prop-types";

export default function ChatPanel({ messages }){
    const [message, setMessage] = useState('');
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser);
    const currentChat = useSelector(state => state.chats.currentChat);
    const msgRef = createRef();

    function handleSend(){
        dispatch(sendMessageAsync(message))
        setMessage('');
    }

    useEffect(() => {
        if(msgRef.current){
            msgRef.current.scrollTo(0, msgRef.current.scrollHeight - msgRef.current.offsetHeight);
        }
    })

    return (
        <>
            {(currentChat.length > 0) ?
            <>
                <div className='messageContent' ref={msgRef}>
                    {(messages !== undefined) && messages.map((msg, i) => <div className='message'
                    style={{ backgroundColor: (msg.user !== currentUser) ? '#6d5dff' : '#be5dff' }} key={i}>{msg.text}
                    </div>)}
                </div>
                <div className='controll'>
                    <input style={{ width: '100%', marginRight: '5px' }} type='text'
                    placeholder='Enter a message' value={message} onKeyDown={ e => { (e.key === 'Enter') && handleSend() } }
                    onChange={e => setMessage(e.target.value)} />
                    <button className='btn' onClick={handleSend}>Send</button>
                </div>
            </> :
            <div style={{ margin: 'auto' }}>Select or start a chat</div>}
        </>
    )
}

ChatPanel.propTypes = {
    messages: propTypes.array
}