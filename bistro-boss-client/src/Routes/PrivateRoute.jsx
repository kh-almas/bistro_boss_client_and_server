import React, {useContext, useState} from 'react';
import {AuthContext} from "../Provider/AuthProvider.jsx";
import {ScaleLoader} from "react-spinners";
import {Navigate, useLocation} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if (loading){
        return <>
            <div className="min-h-screen flex justify-center items-center">
                <ScaleLoader color="#000000" />
            </div>
        </>
    }

    if(user){
        return children;
    }

    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>


};

export default PrivateRoute;