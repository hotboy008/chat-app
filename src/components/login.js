import { Link, useHistory } from "react-router-dom";
import { style } from "../styles/styles";
import { loginAsync } from "../slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();
    const dispatch = useDispatch();

    function formHandle(e){
        e.preventDefault();
        dispatch(loginAsync(email, password));
        history.push('/');
    }

    return(
        <div className='container'>
            <form style={ style.login } onSubmit={formHandle}>
                <h3 style={style.h3}>Login</h3>
                <label>
                    Email<br />
                    <input type='text' style={style.input} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <br/>Password<br/>
                    <input type='password' style={style.input} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type='submit' value='Login' className='btn' style={style.btn} />
                <div style={ style.link }>
                    <Link to='/signup'>Sign up</Link>
                </div>
            </form>
        </div>
    )
}