import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../Provider/AuthProvider.jsx";
import Swal from 'sweetalert2';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../Hooks/useCart.jsx";

const NavBar = () => {
    const {user, logOut} = useContext(AuthContext);
    const [isLoading, refetch, isError, cart, error] = useCart();

    const handelLogout = () =>{
        logOut()
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'You are loged out',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch((error) => {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Something is wrong',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }

    const navOptions = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/manu'}>Manu</Link></li>
        <li><Link to={'/shop'}>Shop</Link></li>
    </>

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <>
                                <img src={user?.photoURL} alt="profile_img" className="w-12 h-12 rounded-full mr-4"/>
                                <button onClick={handelLogout} className="mr-4">Logout</button>
                                <Link to={'/dashboard/cart'}>
                                    <button className="btn">
                                        <FaShoppingCart className="text-lg mr-1"></FaShoppingCart>
                                        <div className="badge">{cart?.length || 0}</div>
                                    </button>
                                </Link>
                            </>
                            :
                            <>
                                <Link to={'/login'}>Login</Link>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default NavBar;