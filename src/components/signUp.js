import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signUpAsync } from "../slices/authSlice";
import { style } from '../styles/styles'

export default function SignUp(){
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    function formHandle(e){
        e.preventDefault();
        
        if(password === passwordConfirm){
            dispatch(signUpAsync(email, nickname, password));
            
            setEmail('');
            setNickname('');
            setPassword('');
            setPasswordConfirm('');

            history.push('/');
        }
        else{
            alert('Passwords is diffrent!')
        }
    }

    return (
        <div className='container'>
            <form style={ style.login } onSubmit={formHandle}>
                <h3 style={style.h3}>Sign up</h3>
                <label>
                    Email<br />
                    <input type='text' style={style.input} value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <br />Nickname<br />
                    <input type='text' style={style.input} value={nickname} onChange={e => setNickname(e.target.value)} />
                </label>
                <label>
                    <br/>Password<br/>
                    <input type='password' style={style.input} value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <br/>Password confirmation<br/>
                    <input type='password' style={style.input} value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                </label>
                <input type='submit' value='Sign up' className='btn' style={style.btn} />
                <div style={ style.link }>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    )
}