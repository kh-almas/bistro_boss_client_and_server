import {Outlet, useLocation} from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";


const Main = () => {
    const location = useLocation();
    const checkLoginPath = location.pathname.includes('/login') || location.pathname.includes('/registration');
    return (
        <div>
            {
                checkLoginPath || <NavBar></NavBar>
            }
            <Outlet></Outlet>
            {
                checkLoginPath || <Footer></Footer>
            }
        </div>
    );
};

export default Main;