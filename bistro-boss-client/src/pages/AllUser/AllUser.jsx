import React from 'react';
import {Helmet} from "react-helmet";
import {FaTrashAlt, FaIdCardAlt} from "react-icons/fa";
import useUserInAdmin from "../../Hooks/useUserInAdmin.jsx";

const AllUser = () => {
    const [user, refetch] = useUserInAdmin();
    console.log(user);
    return (
        <>
            <Helmet>
                <title>bistro boss - all user</title>
            </Helmet>
            <div className="p-16">
                <div className="mb-12">
                    <h3>Total User: </h3>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                user?.map((item, index) =>
                                    <tr key={index}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.email}
                                        </td>
                                        <th>
                                            <button onClick={() => handelDelete(item._id)} className="btn btn-ghost btn-sm"><FaIdCardAlt></FaIdCardAlt></button>
                                            <button onClick={() => handelDelete(item._id)} className="btn btn-ghost btn-sm"><FaTrashAlt></FaTrashAlt></button>
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

export default AllUser;