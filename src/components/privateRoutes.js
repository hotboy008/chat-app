import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from 'prop-types'

export default function PrivateRoutes({ component: Component }){
    const currentUser = useSelector(state => state.auth.currentUser);

    return (
        <>
            {currentUser ? <Component /> : <Redirect to='/login' />}
        </>
    )
}

PrivateRoutes.propTypes = {
    component: PropTypes.func.isRequired
}