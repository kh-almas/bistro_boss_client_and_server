import React, {useContext} from 'react';
import {AuthContext} from "../../../Provider/AuthProvider.jsx";
import Swal from "sweetalert2";
import {useLocation, useNavigate} from "react-router-dom";
import useCart from "../../../Hooks/useCart.jsx";

const ProductCard = ({item}) => {
    const {user} = useContext(AuthContext);
    const {name, image, price, recipe, _id} = item;
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const handleCart = () => {
        if(user && user.email)
        {
            const cartItem = {menuItemId: _id, user: user.email, name, image, price}
            fetch('http://localhost:3000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Data is saved in cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }else{
            Swal.fire({
                title: 'Do you want to save the changes?',
                showCancelButton: true,
                confirmButtonText: 'Login now',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: {from: location}});
                }
            })
        }
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-[#111827] text-white absolute right-12 top-6 py-1 px-2 rounded">${price}</p>
            <div className="card-body text-center">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center mt-4">
                    <button onClick={() => handleCart()} className="btn btn-outline border-0 border-b-4 mt-4">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;