import React, {useContext} from 'react';
import {AuthContext} from "../Provider/AuthProvider.jsx";
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const {user, loading} = useContext(AuthContext);

    const { isLoading, refetch, isError, data : cart = [], error } = useQuery({
        queryKey: ['cart', user?.email],
        enabled:!loading,
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/carts?email=${user?.email}`);
            return response.json();
        },
    })

    return [isLoading, refetch, isError, cart, error];
}

export default useCart;