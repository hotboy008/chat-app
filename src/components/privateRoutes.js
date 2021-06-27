import { useSelector } from "react-redux";
import { Redirect } from "react-router";

export default function PrivateRoutes({ component: Component }){
    const currentUser = useSelector(state => {
        return state.auth.currentUser;
    });

    return (
        <>
            {currentUser ? <Component /> : <Redirect to='/login' />}
        </>
    )
}