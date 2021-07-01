import { Link, useHistory } from "react-router-dom";
import { style } from "../styles/styles";
import { loginAsync } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const user = useSelector(state => state.auth.currentUser);
    const history = useHistory();
    
    useEffect(() => {
        if(user){
            history.push('/');
        }
    }, [user, history]);

    const dispatch = useDispatch();

    function formHandle(e){
        e.preventDefault();

        if(!validateEmail(email)){
            alert('Email is faild!')
            return 0;
        }

        dispatch(loginAsync(email, password));
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