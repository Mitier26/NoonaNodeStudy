import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ user, children }) => {
    // children : 자식 컴포넌트
    return user ? children : <Navigate to="/login" />;
}



// user 값이 있다면 Todopage : redirect to /login

export default PrivateRoute