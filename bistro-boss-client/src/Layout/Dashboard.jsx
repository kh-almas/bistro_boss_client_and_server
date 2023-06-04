import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {Helmet} from "react-helmet";

const Dashboard = () => {
    const isAdmin = true;
    return (
        <div>
            <div className="drawer drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {
                            isAdmin ?
                                <>
                                    <li><Link to={'/dashboard/user'}>All User</Link></li>
                                </>
                                :
                                <>
                                    <li><Link to={'/'}>User Home</Link></li>
                                    <li><Link to={'/'}>Reservation</Link></li>
                                    <li><Link to={'/'}>Payment History</Link></li>
                                    <li><Link to={'/'}>My Cart</Link></li>
                                </>
                        }
                        {/* Sidebar content here */}

                        <div className="divider"></div>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/manu'}>Manu</Link></li>
                        <li><Link to={'/shop'}>Shop</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;