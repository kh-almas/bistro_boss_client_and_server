import React, {useContext} from 'react';
import {AuthContext} from "../Provider/AuthProvider.jsx";
import {useQuery} from "@tanstack/react-query";

const UseUserInAdmin = () => {
    const {loading} = useContext(AuthContext);

    const {data: user = [], refetch} = useQuery(['users'] , async () =>  {
            const res = await fetch('http://localhost:3000/users');
            return res.json();
        }
    )

    return [user, refetch];
};

export default UseUserInAdmin;