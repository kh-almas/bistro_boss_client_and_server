import React from 'react';
import {Helmet} from "react-helmet";
import {FaTrashAlt, FaIdCardAlt} from "react-icons/fa";
import useUserInAdmin from "../../Hooks/useUserInAdmin.jsx";
import Swal from "sweetalert2";

const AllUser = () => {
    const [user, refetch] = useUserInAdmin();
    const handelDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Wanna remove this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/user/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.deletedCount > 0){
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }
    const handelRoleUpdate = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Wanna remove this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update this user role to admin'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/user/role/${id}`, {
                    method: "PATCH"
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.modifiedCount > 0){
                            refetch();
                            Swal.fire(
                                'Updated!',
                                'User role change to admin',
                                'success'
                            )
                        }
                    })

            }
        })
    }
    return (
        <>
            <Helmet>
                <title>bistro boss - all user</title>
            </Helmet>
            <div className="p-16">
                <div className="mb-12">
                    <h3>Total User: {user.length}</h3>
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
                                <th>Role</th>
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
                                        <td>
                                            {
                                                item.role !== 'admin' ?
                                                    <>
                                                        <button onClick={() => handelRoleUpdate(item._id)} className="btn btn-ghost btn-sm"><FaIdCardAlt></FaIdCardAlt></button>
                                                    </>
                                                    : <>Admin</>
                                            }
                                        </td>
                                        <td>
                                            <button onClick={() => handelDelete(item._id)} className="btn btn-ghost btn-sm"><FaTrashAlt></FaTrashAlt></button>
                                        </td>
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