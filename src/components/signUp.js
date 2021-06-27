import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../slices/authSlice";
import { style } from '../styles/styles'

export default function SignUp(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    function formHandle(e){
        e.preventDefault();
        dispatch(signUp({ email, password }));
        history.push('/');    
    }

    return (
        <div className='container'>
            <form style={ style.login } onSubmit={formHandle}>
                <h3 style={style.h3}>Sign up</h3>
                <label>
                    Username<br />
                    <input type='text' style={style.input} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <br/>Password<br/>
                    <input type='password' style={style.input} onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <br/>Password confirmation<br/>
                    <input type='password' style={style.input} />
                </label>
                <input type='submit' value='Sign up' className='btn' style={style.btn} />
                <div style={ style.link }>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    )
}