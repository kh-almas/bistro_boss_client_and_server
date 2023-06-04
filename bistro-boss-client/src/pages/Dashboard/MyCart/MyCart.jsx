import React from 'react';
import {Helmet} from "react-helmet";
import useCart from "../../../Hooks/useCart.jsx";
import { FaTrashAlt } from "react-icons/fa";

const MyCart = () => {
    const [isLoading, refetch, isError, cart, error] = useCart();
    console.log(cart);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    console.log(totalPrice);
    return (
        <>
            <Helmet>
                <title>bistro boss - my cart</title>
            </Helmet>
            <div className="p-16">
                <div className="flex justify-between mb-12">
                    <div>
                        <h3>Total Product: {cart?.length || 0}</h3>
                    </div>
                    <div>
                        <h3><button className="btn btn-active btn-secondary btn-sm">Buy Now</button></h3>
                    </div>
                    <div>
                        <h3>Total Price: ${totalPrice}</h3>
                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th className="text-end">Price</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                cart?.map((item, index) =>
                                    <tr key={index}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td className="text-end">
                                            {item.price}
                                        </td>
                                        <th>
                                            <button className="btn btn-ghost btn-sm"><FaTrashAlt></FaTrashAlt></button>
                                        </th>
                                    </tr>
                                )
                            }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyCart;